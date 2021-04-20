// ***********************************************************************
// Assembly         : OpenAuth.App
// Author           : 李玉寶
// Created          : 07-19-2018
//
// Last Modified By : 李玉寶
// Last Modified On : 07-19-2018
// ***********************************************************************
// <copyright file="FlowInstanceApp.cs" company="OpenAuth.App">
//     Copyright (c) http://www.openauth.me. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

using Infrastructure;
using OpenAuth.App.Flow;
using OpenAuth.App.Interface;
using OpenAuth.App.Request;
using OpenAuth.App.Response;
using OpenAuth.Repository.Domain;
using OpenAuth.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net.Http;
using System.Threading.Tasks;
using Infrastructure.Helpers;
using OpenAuth.Repository;

namespace OpenAuth.App
{
    /// <summary>
    /// 工作流實例表操作
    /// </summary>
    public class FlowInstanceApp : BaseApp<FlowInstance,OpenAuthDBContext>
    {
        private RevelanceManagerApp _revelanceApp;
        private FlowSchemeApp _flowSchemeApp;
        private FormApp _formApp;
        private IHttpClientFactory _httpClientFactory;
        private IServiceProvider _serviceProvider;

        #region 流程處理API

        /// <summary>
        /// 建立一個實例
        /// </summary>
        /// <returns></returns>
        public bool CreateInstance(AddFlowInstanceReq addFlowInstanceReq)
        {
            FlowScheme scheme = null;
            if (!string.IsNullOrEmpty(addFlowInstanceReq.SchemeId))
            {
                scheme = _flowSchemeApp.Get(addFlowInstanceReq.SchemeId);
            }

            if ((scheme == null) && !string.IsNullOrEmpty(addFlowInstanceReq.SchemeCode))
            {
                scheme = _flowSchemeApp.FindByCode(addFlowInstanceReq.SchemeCode);
            }

            if (scheme == null)
            {
                throw new Exception("該流程模板已不存在，請重新設計流程");
            }

            addFlowInstanceReq.SchemeContent = scheme.SchemeContent;

            var form = _formApp.FindSingle(scheme.FrmId);
            if (form == null)
            {
                throw new Exception("該流程模板對應的表單已不存在，請重新設計流程");
            }

            addFlowInstanceReq.FrmContentData = form.ContentData;
            addFlowInstanceReq.FrmContentParse = form.ContentParse;
            addFlowInstanceReq.FrmType = form.FrmType;
            addFlowInstanceReq.FrmId = form.Id;

            var flowInstance = addFlowInstanceReq.MapTo<FlowInstance>();

            //建立執行實例
            var wfruntime = new FlowRuntime(flowInstance);
            var user = _auth.GetCurrentUser();

            #region 根據執行實例改變當前節點狀態

            flowInstance.ActivityId = wfruntime.nextNodeId;
            flowInstance.ActivityType = wfruntime.GetNextNodeType();
            flowInstance.ActivityName = wfruntime.nextNode.name;
            flowInstance.PreviousId = wfruntime.currentNodeId;
            flowInstance.CreateUserId = user.User.Id;
            flowInstance.CreateUserName = user.User.Account;
            flowInstance.MakerList = (wfruntime.GetNextNodeType() != 4 ? GetNextMakers(wfruntime) : "");
            flowInstance.IsFinish = (wfruntime.GetNextNodeType() == 4 ? 1 : 0);

            UnitWork.Add(flowInstance);
            wfruntime.flowInstanceId = flowInstance.Id;

            if (flowInstance.FrmType == 1)
            {
                var t = Type.GetType("OpenAuth.App."+ flowInstance.DbName +"App");
                ICustomerForm icf = (ICustomerForm) _serviceProvider.GetService(t);
                icf.Add(flowInstance.Id, flowInstance.FrmData);
            }

            #endregion 根據執行實例改變當前節點狀態

            #region 流程操作記錄

            FlowInstanceOperationHistory processOperationHistoryEntity = new FlowInstanceOperationHistory
            {
                InstanceId = flowInstance.Id,
                CreateUserId = user.User.Id,
                CreateUserName = user.User.Name,
                CreateDate = DateTime.Now,
                Content = "【建立】"
                          + user.User.Name
                          + "建立了一個流程程序【"
                          + addFlowInstanceReq.Code + "/"
                          + addFlowInstanceReq.CustomName + "】"
            };
            UnitWork.Add(processOperationHistoryEntity);

            #endregion 流程操作記錄

            AddTransHistory(wfruntime);
            UnitWork.Save();
            return true;
        }

        /// <summary>
        /// 節點審核
        /// </summary>
        /// <param name="instanceId"></param>
        /// <returns></returns>
        public bool NodeVerification(string instanceId, Tag tag)
        {
            FlowInstance flowInstance = Get(instanceId);
            FlowInstanceOperationHistory flowInstanceOperationHistory = new FlowInstanceOperationHistory
            {
                InstanceId = instanceId,
                CreateUserId = tag.UserId,
                CreateUserName = tag.UserName,
                CreateDate = DateTime.Now
            };//操作記錄
            FlowRuntime wfruntime = new FlowRuntime(flowInstance);

            #region 會簽

            if (flowInstance.ActivityType == 0)//當前節點是會簽節點
            {
                //會簽時的【當前節點】一直是會簽開始節點
                //TODO: 標記會簽節點的狀態，這個地方感覺怪怪的
                wfruntime.MakeTagNode(wfruntime.currentNodeId, tag);

                string canCheckId = ""; //尋找當前登錄使用者可審核的節點Id
                foreach (string fromForkStartNodeId in wfruntime.FromNodeLines[wfruntime.currentNodeId].Select(u => u.to))
                {
                    var fromForkStartNode = wfruntime.Nodes[fromForkStartNodeId];  //與會前開始節點直接連線的節點
                    canCheckId = GetOneForkLineCanCheckNodeId(fromForkStartNode, wfruntime, tag);
                    if(!string.IsNullOrEmpty(canCheckId)) break;
                }

                if (canCheckId == "")
                {
                    throw (new Exception("審核異常,找不到審核節點"));
                }

                flowInstanceOperationHistory.Content = "【" + wfruntime.Nodes[canCheckId].name
                                                           + "】【" + DateTime.Now.ToString("yyyy-MM-dd HH:mm")
                                                           + "】" + (tag.Taged == 1 ? "同意" : "不同意") + ",備註："
                                                           + tag.Description;

                wfruntime.MakeTagNode(canCheckId, tag); //標記審核節點狀態
                string res = wfruntime.NodeConfluence(canCheckId, tag);
                if (res == TagState.No.ToString("D"))
                {
                    flowInstance.IsFinish = 3;
                }
                else if(!string.IsNullOrEmpty(res))
                {
                    flowInstance.PreviousId = flowInstance.ActivityId;
                    flowInstance.ActivityId = wfruntime.nextNodeId;
                    flowInstance.ActivityType = wfruntime.nextNodeType;
                    flowInstance.ActivityName = wfruntime.nextNode.name;
                    flowInstance.IsFinish = (wfruntime.nextNodeType == 4 ? 1 : 0);
                    flowInstance.MakerList =
                        (wfruntime.nextNodeType == 4 ? "" : GetNextMakers(wfruntime));

                    AddTransHistory(wfruntime);
                }
                else
                {
                    //會簽過程中，需要更新使用者
                    flowInstance.MakerList = GetForkNodeMakers(wfruntime, wfruntime.currentNodeId);
                    AddTransHistory(wfruntime);
                }
              
            }
            #endregion 會簽

            #region 一般審核

            else
            {
                wfruntime.MakeTagNode(wfruntime.currentNodeId, tag);
                if (tag.Taged == (int) TagState.Ok)
                {
                    flowInstance.PreviousId = flowInstance.ActivityId;
                    flowInstance.ActivityId = wfruntime.nextNodeId;
                    flowInstance.ActivityType = wfruntime.nextNodeType;
                    flowInstance.ActivityName = wfruntime.nextNode.name;
                    flowInstance.MakerList = wfruntime.nextNodeType == 4 ? "" : GetNextMakers(wfruntime);
                    flowInstance.IsFinish = (wfruntime.nextNodeType == 4 ? 1 : 0);
                    AddTransHistory(wfruntime);
                }
                else
                {
                    flowInstance.IsFinish = 3; //表示該節點不同意
                }
                flowInstanceOperationHistory.Content = "【" + wfruntime.currentNode.name
                                                           + "】【" + DateTime.Now.ToString("yyyy-MM-dd HH:mm")
                                                           + "】" + (tag.Taged == 1 ? "同意" : "不同意") + ",備註："
                                                           + tag.Description;
            }

            #endregion 一般審核

            flowInstance.SchemeContent = JsonHelper.Instance.Serialize(wfruntime.ToSchemeObj());

            UnitWork.Update(flowInstance);
            UnitWork.Add(flowInstanceOperationHistory);
            UnitWork.Save();

            wfruntime.NotifyThirdParty(_httpClientFactory.CreateClient(), tag);
            return true;
        }

        //會簽時，獲取一條會簽分支上面是否有使用者可審核的節點
        private string GetOneForkLineCanCheckNodeId(FlowNode fromForkStartNode, FlowRuntime wfruntime, Tag tag)
        {
            string canCheckId="";
            var node = fromForkStartNode;
            do  //沿一條分支線路執行，直到遇到會簽結束節點
            {
                var makerList = GetNodeMarkers(node);

                if (node.setInfo.Taged == null && !string.IsNullOrEmpty(makerList) && makerList.Split(',').Any(one => tag.UserId == one))
                {
                    canCheckId = node.id;
                    break;
                }

                node = wfruntime.GetNextNode(node.id);
            } while (node.type != FlowNode.JOIN);

            return canCheckId;
        }

        /// <summary>
        /// 駁回
        /// 如果NodeRejectStep不為空，優先使用；否則按照NodeRejectType駁回
        /// </summary>
        /// <returns></returns>
        public bool NodeReject(VerificationReq reqest)
        {
            var user = _auth.GetCurrentUser().User;

            FlowInstance flowInstance = Get(reqest.FlowInstanceId);

            FlowRuntime wfruntime = new FlowRuntime(flowInstance);

            string resnode = "";
            resnode = string.IsNullOrEmpty(reqest.NodeRejectStep) ? wfruntime.RejectNode(reqest.NodeRejectType) : reqest.NodeRejectStep;

            var tag = new Tag
            {
                Description = reqest.VerificationOpinion,
                Taged = (int) TagState.Reject,
                UserId = user.Id,
                UserName = user.Name
            };

            wfruntime.MakeTagNode(wfruntime.currentNodeId, tag);
            flowInstance.IsFinish = 4;//4表示駁回（需要申請者重新提交表單）
            if (resnode != "")
            {
                flowInstance.PreviousId = flowInstance.ActivityId;
                flowInstance.ActivityId = resnode;
                flowInstance.ActivityType = wfruntime.GetNodeType(resnode);
                flowInstance.ActivityName = wfruntime.Nodes[resnode].name;
                flowInstance.MakerList = GetNodeMarkers(wfruntime.Nodes[resnode]);//當前節點可執行的人資訊

                AddTransHistory(wfruntime);
            }

            UnitWork.Update(flowInstance);

            UnitWork.Add(new FlowInstanceOperationHistory
            {
                InstanceId = reqest.FlowInstanceId
                ,
                CreateUserId = user.Id
                ,
                CreateUserName = user.Name
                ,
                CreateDate = DateTime.Now
                ,
                Content = "【"
                          + wfruntime.currentNode.name
                          + "】【" + DateTime.Now.ToString("yyyy-MM-dd HH:mm") + "】駁回,備註："
                          + reqest.VerificationOpinion
            });

            UnitWork.Save();

            wfruntime.NotifyThirdParty(_httpClientFactory.CreateClient(), tag);

            return true;
        }

        #endregion 流程處理API

        #region 獲取各種節點的流程審核者
        /// <summary>
        /// 尋找下一步的執行人
        /// 一般用於本節點審核完成後，修改流程實例的當前執行人，可以做到通知等功能
        /// </summary>
        /// <returns></returns>
        private string GetNextMakers(FlowRuntime wfruntime)
        {
            string makerList = "";
            if (wfruntime.nextNodeId == "-1")
            {
                throw (new Exception("無法尋找到下一個節點"));
            }
            if (wfruntime.nextNodeType == 0)//如果是會簽節點
            {
                makerList = GetForkNodeMakers(wfruntime, wfruntime.nextNodeId);
            }
            else
            {
                makerList = GetNodeMarkers(wfruntime.nextNode);
                if (string.IsNullOrEmpty(makerList))
                {
                    throw (new Exception("無法尋找到節點的審核者,請檢視流程設計是否有問題!"));
                }
            }

            return makerList;
        }

        /// <summary>
        /// 獲取會簽開始節點的所有可執行者
        /// </summary>
        /// <param name="forkNodeId">會簽開始節點</param>
        /// <returns></returns>
        private string GetForkNodeMakers(FlowRuntime wfruntime, string forkNodeId)
        {
            string makerList="";
            foreach (string fromForkStartNodeId in wfruntime.FromNodeLines[forkNodeId].Select(u => u.to))
            {
                var fromForkStartNode = wfruntime.Nodes[fromForkStartNodeId]; //與會前開始節點直接連線的節點
                if (makerList != "")
                {
                    makerList += ",";
                }

                makerList += GetOneForkLineMakers(fromForkStartNode, wfruntime);
            }

            return makerList;
        }

        //獲取會簽一條線上的審核者,該審核者應該是已審核過的節點的下一個人
        private string GetOneForkLineMakers(FlowNode fromForkStartNode, FlowRuntime wfruntime)
        {
            string markers="";
            var node = fromForkStartNode;
            do  //沿一條分支線路執行，直到遇到第一個沒有審核的節點
            {
                if (node.setInfo != null && node.setInfo.Taged != null)  
                {
                    if (node.type != FlowNode.FORK && node.setInfo.Taged != (int) TagState.Ok)  //如果節點是不同意或駁回，則不用再找了
                    {
                        break;
                    }
                    node = wfruntime.GetNextNode(node.id);  //下一個節點
                    continue;
                }
                var marker = GetNodeMarkers(node);
                if (marker == "")
                {
                    throw (new Exception($"節點{node.name}沒有審核者,請檢查!"));
                }
                if (marker == "1")
                {
                    throw (new Exception($"節點{node.name}是會簽節點，不能用所有人,請檢查!"));
                }
                
                if (markers != "")
                {
                    markers += ",";
                }
                markers += marker;
                break;
            } while (node.type != FlowNode.JOIN);

            return markers;
        }

        /// <summary>
        /// 尋找該節點執行人
        /// </summary>
        /// <param name="node"></param>
        /// <returns></returns>
        private string GetNodeMarkers(FlowNode node)
        {
            string makerList = "";

            if (node.setInfo != null)
            {
                if (node.setInfo.NodeDesignate == Setinfo.ALL_USER)//所有成員
                {
                    makerList = "1";
                }
                else if (node.setInfo.NodeDesignate == Setinfo.SPECIAL_USER)//指定成員
                {
                    makerList = GenericHelpers.ArrayToString(node.setInfo.NodeDesignateData.users, makerList);
                }
                else if (node.setInfo.NodeDesignate == Setinfo.SPECIAL_ROLE)  //指定角色
                {
                    var users = _revelanceApp.Get(Define.USERROLE, false, node.setInfo.NodeDesignateData.roles);
                    makerList = GenericHelpers.ArrayToString(users, makerList);
                }
            }
            else  //如果沒有設定節點資訊，預設所有人都可以審核
            {
                makerList = "1";
            }
            return makerList;
        }
        #endregion

        /// <summary>
        /// 審核流程
        /// <para>李玉寶于2017-01-20 15:44:45</para>
        /// </summary>
        public void Verification(VerificationReq request)
        {
            var user = _auth.GetCurrentUser().User;
            var tag = new Tag
            {
                UserName = user.Name,
                UserId = user.Id,
                Description = request.VerificationOpinion,
                Taged = Int32.Parse(request.VerificationFinally)
            };
            bool isReject = TagState.Reject.Equals((TagState) tag.Taged);
            if (isReject)  //駁回
            {
                NodeReject(request);
            }
            else
            {
                NodeVerification(request.FlowInstanceId, tag);
            }
        }

        public void Update(FlowInstance flowScheme)
        {
            Repository.Update(flowScheme);
        }

        public async Task<TableData> Load(QueryFlowInstanceListReq request)
        {
            var result = new TableData();
            var user = _auth.GetCurrentUser();

            if (request.type == "wait")   //待辦事項
            {
                Expression<Func<FlowInstance, bool>> waitExp = u => (u.MakerList == "1" || u.MakerList.Contains(user.User.Id)) && u.IsFinish == 0;

                // 加入搜索自定義標題
                if (!string.IsNullOrEmpty(request.key))
                {
                    waitExp = waitExp.And(t => t.CustomName.Contains(request.key));
                }

                result.count = UnitWork.Find(waitExp).Count();

                result.data = UnitWork.Find(request.page, request.limit, "CreateDate descending", waitExp).ToList();
            }
            else if (request.type == "disposed")  //已辦事項（即我參與過的流程）
            {
                var instances = UnitWork.Find<FlowInstanceTransitionHistory>(u => u.CreateUserId == user.User.Id)
                    .Select(u => u.InstanceId).Distinct();
                var query = from ti in instances
                            join ct in UnitWork.Find<FlowInstance>(null) on ti equals ct.Id
                            select ct;

                // 加入搜索自定義標題
                if (!string.IsNullOrEmpty(request.key))
                {
                    query = query.Where(t => t.CustomName.Contains(request.key));
                }

                result.data = query.OrderByDescending(u => u.CreateDate)
                    .Skip((request.page - 1) * request.limit)
                    .Take(request.limit).ToList();
                result.count = instances.Count();
            }
            else  //我的流程
            {
                Expression<Func<FlowInstance, bool>> myFlowExp = u => u.CreateUserId == user.User.Id;

                // 加入搜索自定義標題
                if (!string.IsNullOrEmpty(request.key))
                {
                    myFlowExp = myFlowExp.And(t => t.CustomName.Contains(request.key));
                }

                result.count = UnitWork.Find(myFlowExp).Count();
                result.data = UnitWork.Find(request.page, request.limit,
                    "CreateDate descending", myFlowExp).ToList();
            }

            return result;
        }

        /// <summary>
        /// 新增扭轉記錄
        /// </summary>
        private void AddTransHistory(FlowRuntime wfruntime)
        {
            var tag = _auth.GetCurrentUser().User;
            UnitWork.Add(new FlowInstanceTransitionHistory
            {
                InstanceId = wfruntime.flowInstanceId,
                CreateUserId = tag.Id,
                CreateUserName = tag.Name,
                FromNodeId = wfruntime.currentNodeId,
                FromNodeName = wfruntime.currentNode.name,
                FromNodeType = wfruntime.currentNodeType,
                ToNodeId = wfruntime.nextNodeId,
                ToNodeName = wfruntime.nextNode.name,
                ToNodeType = wfruntime.nextNodeType,
                IsFinish = wfruntime.nextNodeType == 4 ? 1 : 0,
                TransitionSate = 0
            });
        }

        public FlowInstanceApp(IUnitWork<OpenAuthDBContext> unitWork, IRepository<FlowInstance,OpenAuthDBContext> repository
        , RevelanceManagerApp app, FlowSchemeApp flowSchemeApp, FormApp formApp, IHttpClientFactory httpClientFactory,IAuth auth, IServiceProvider serviceProvider) 
            : base(unitWork, repository, auth)
        {
            _revelanceApp = app;
            _flowSchemeApp = flowSchemeApp;
            _formApp = formApp;
            _httpClientFactory = httpClientFactory;
            _serviceProvider = serviceProvider;
        }

        public List<FlowInstanceOperationHistory> QueryHistories(QueryFlowInstanceHistoryReq request)
        {
            return UnitWork.Find<FlowInstanceOperationHistory>(u => u.InstanceId == request.FlowInstanceId)
                .OrderByDescending(u => u.CreateDate).ToList();
        }
    }
}