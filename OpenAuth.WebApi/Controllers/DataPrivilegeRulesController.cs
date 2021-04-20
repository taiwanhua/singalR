using System;
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
    /// 數據許可權控制
    /// </summary>
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DataPrivilegeRulesController : ControllerBase
    {
        private readonly DataPrivilegeRuleApp _app;
        
        /// <summary>
        /// 獲取數據許可權詳情
        /// </summary>
        /// <param name="id">數據許可權id</param>
        /// <returns></returns>
        [HttpGet]
        public Response<DataPrivilegeRule> Get(string id)
        {
            var result = new Response<DataPrivilegeRule>();
            try
            {
                result.Result = _app.Get(id);
            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return result;
        }
        /// <summary>
        /// 新增數據許可權
        /// </summary>
        /// <returns></returns>
       [HttpPost]
        public Response Add(AddOrUpdateDataPriviReq obj)
        {
            var result = new Response();
            try
            {
                _app.Add(obj);

            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return result;
        }

        /// <summary>
        /// 修改數據許可權
        /// </summary>
        /// <returns></returns>
       [HttpPost]
        public Response Update(AddOrUpdateDataPriviReq obj)
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
        /// 載入列表
        /// </summary>
        [HttpGet]
        public async Task<TableData> Load([FromQuery]QueryDataPrivilegeRuleListReq request)
        {
            return await _app.Load(request);
        }

        /// <summary>
        /// 批量刪除
        /// </summary>
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

        public DataPrivilegeRulesController(DataPrivilegeRuleApp app) 
        {
            _app = app;
        }
    }
}
