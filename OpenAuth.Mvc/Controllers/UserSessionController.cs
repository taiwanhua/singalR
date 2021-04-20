// ***********************************************************************
// Assembly         : OpenAuth.Mvc
// Author           : 李玉寶
// Created          : 06-08-2018
//
// Last Modified By : 李玉寶
// Last Modified On : 07-04-2018
// ***********************************************************************
// <copyright file="UserSessionController.cs" company="OpenAuth.Mvc">
//     Copyright (c) http://www.openauth.me. All rights reserved.
// </copyright>
// <summary>
// 獲取登錄使用者的全部資訊
// 所有和當前登錄使用者相關的操作都在這裡
// </summary>
// ***********************************************************************

using System;
using System.Collections.Generic;
using System.Linq;
using Infrastructure;
using Infrastructure.Helpers;
using OpenAuth.App;
using OpenAuth.App.Interface;
using OpenAuth.App.Response;
using OpenAuth.Repository.Domain;

namespace OpenAuth.Mvc.Controllers
{
    public class UserSessionController : BaseController
    {
        private readonly AuthStrategyContext _authStrategyContext;
        public UserSessionController(IAuth authUtil) : base(authUtil)
        {
            _authStrategyContext = _authUtil.GetCurrentUser();
        }

        /// <summary>
        /// 獲取使用者資料
        /// </summary>
        /// <returns></returns>
        public string GetUserProfile()
        {
            var resp = new Response<UserView>();
            try
            {
                resp.Result = _authStrategyContext.User.MapTo<UserView>();
            }
            catch (Exception e)
            {
                resp.Code = 500;
                resp.Message = e.Message;
            }
            return JsonHelper.Instance.Serialize(resp);
        }

        public string GetUserName()
        {
            return _authUtil.GetUserName();
        }
        /// <summary>
        /// 獲取登錄使用者可訪問的所有模組，及模組的操作菜單
        /// </summary>
        public string GetModulesTree()
        {
            var moduleTree = _authStrategyContext.Modules.GenerateTree(u => u.Id, u => u.ParentId);
            return JsonHelper.Instance.Serialize(moduleTree);
        }

        /// <summary>
        /// datatable結構的模組列表
        /// </summary>
        /// <param name="pId"></param>
        /// <returns></returns>
        public string GetModulesTable(string pId)
        {
            string cascadeId = ".0.";
            if (!string.IsNullOrEmpty(pId))
            {
                var obj = _authStrategyContext.Modules.SingleOrDefault(u => u.Id == pId);
                if (obj == null)
                    throw new Exception("未能找到指定對像資訊");
                cascadeId = obj.CascadeId;
            }

            var query = _authStrategyContext.Modules.Where(u => u.CascadeId.Contains(cascadeId));

            return JsonHelper.Instance.Serialize(new TableData
            {
                data = query.ToList(),
                count = query.Count(),
            });

        }

        /// <summary>
        /// 獲取使用者可訪問的模組列表
        /// </summary>
        public string GetModules()
        {
            var resp = new Response<List<ModuleView>>();
            try
            {
                resp.Result = _authStrategyContext.Modules;
            }
            catch (Exception e)
            {
                resp.Code = 500;
                resp.Message = e.Message;
            }
            return JsonHelper.Instance.Serialize(resp);
        }

        /// <summary>
        /// 獲取登錄使用者可訪問的所有部門
        /// <para>用於樹狀結構</para>
        /// </summary>
        public string GetOrgs()
        {
             var resp = new Response<List<Org>>();
            try
            {
                resp.Result = _authStrategyContext.Orgs;
            }
            catch (Exception e)
            {
                resp.Code = 500;
                resp.Message = e.Message;
            }
            return JsonHelper.Instance.Serialize(resp);
        }

        /// <summary>
        /// 獲取當前登錄使用者可訪問的欄位
        /// </summary>
        /// <param name="moduleCode">模組的Code，如Category</param>
        /// <returns></returns>
        public string GetProperties(string moduleCode)
        {
            try
            {
                var list = _authStrategyContext.GetProperties(moduleCode);
                return JsonHelper.Instance.Serialize(new TableData
                {
                    data = list,
                    count = list.Count(),
                });
            }
            catch (Exception ex)
            {
                return JsonHelper.Instance.Serialize(new TableData
                    {
                        msg =ex.Message,
                        code = 500,
                    });
            }
        }

        /// <summary>
        /// 載入機構的全部下級機構
        /// </summary>
        /// <param name="orgId">機構ID</param>
        /// <returns></returns>
        public string GetSubOrgs(string orgId)
        {
            string cascadeId = ".0.";
            if (!string.IsNullOrEmpty(orgId))
            {
                var org = _authStrategyContext.Orgs.SingleOrDefault(u => u.Id == orgId);
                if (org == null)
                {
                    return JsonHelper.Instance.Serialize(new TableData
                    {
                        msg ="未找到指定的節點",
                        code = 500,
                    });
                }
                cascadeId = org.CascadeId;
            }

            var query = _authStrategyContext.Orgs.Where(u => u.CascadeId.Contains(cascadeId));

            return JsonHelper.Instance.Serialize(new TableData
            {
                data = query.ToList(),
                count = query.Count(),
            });
        }

    }
}