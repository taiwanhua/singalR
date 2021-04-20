// <copyright file="FlowInstancesController.cs" company="openauth.me">
// Copyright (c) 2019 openauth.me. All rights reserved.
// </copyright>
// <author>www.cnblogs.com/yubaolee</author>
// <date>2018-09-06</date>
// <summary>流程實例控制器</summary>

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using OpenAuth.App;
using OpenAuth.App.Request;
using OpenAuth.App.Response;
using OpenAuth.Repository.Domain;

namespace OpenAuth.WebApi.Controllers
{
    /// <summary>
    /// 流程實例
    /// </summary>
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FlowInstancesController : ControllerBase
    {
        private readonly FlowInstanceApp _app;

        [HttpGet]
        public Response<FlowVerificationResp> Get(string id)
        {
            var result = new Response<FlowVerificationResp>();
            try
            {
                var flowinstance = _app.Get(id);
                result.Result = flowinstance.MapTo<FlowVerificationResp>();
            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return result;
        }

        /// <summary>
        /// 獲取一個流程實例的操作歷史記錄
        /// </summary>
        [HttpGet]
        public Response<List<FlowInstanceOperationHistory>> QueryHistories([FromQuery]QueryFlowInstanceHistoryReq request)
        {
            var result = new Response<List<FlowInstanceOperationHistory>>();
            try
            {
                result.Result= _app.QueryHistories(request);
            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return result;
        }


        /// <summary>建立一個新的流程實例</summary>
        /// <remarks> www.cnblogs.com/yubaolee, 2019-03-06. </remarks>
        [HttpPost]
        public Response Add([FromBody]AddFlowInstanceReq obj)
        {
            var result = new Response();
            try
            {
                _app.CreateInstance(obj);
            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return result;
        }

        //新增或修改
       [HttpPost]
        public Response Update(FlowInstance obj)
        {
            var result = new Response();
            try
            {
                _app.Update(obj);

            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return result;
        }

        /// <summary>
        /// 流程節點審批
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public Response Verification(VerificationReq request)
        {
            var response = new Response();
            try
            {
                _app.Verification(request);

            }
            catch (Exception ex)
            {
                response.Code = 500;
                response.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return response;
        }

        /// <summary>
        /// 載入列表
        /// </summary>
        [HttpGet]
        public async Task<TableData> Load([FromQuery]QueryFlowInstanceListReq request)
        {
            return await _app.Load(request);
        }

       [HttpPost]
        public Response Delete([FromBody]string[] ids)
        {
            var result = new Response();
            try
            {
                _app.Delete(ids);

            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return result;
        }

        public FlowInstancesController(FlowInstanceApp app) 
        {
            _app = app;
        }
    }
}