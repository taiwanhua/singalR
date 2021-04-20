using System;
using System.Threading.Tasks;
using Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenAuth.App;
using OpenAuth.App.Request;
using OpenAuth.App.Response;
using OpenAuth.Repository.Domain;

namespace OpenAuth.WebApi.Controllers
{
    /// <summary>
    /// 訂單明細
    /// </summary>
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class WmsInboundOrderDtblsController : ControllerBase
    {
        private readonly WmsInboundOrderDtblApp _app;
        
        //獲取詳情
        [HttpGet]
        public Response<WmsInboundOrderDtbl> Get(string id)
        {
            var result = new Response<WmsInboundOrderDtbl>();
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

        //新增
       [HttpPost]
        public Response<string> Add(AddOrUpdateWmsInboundOrderDtblReq obj)
        {
            var result = new Response<string>();
            try
            {
                _app.Add(obj);
                result.Result = obj.Id;
            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return result;
        }

        /// <summary>
        /// 修改明細
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
       [HttpPost]
        public Response Update(AddOrUpdateWmsInboundOrderDtblReq obj)
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
        [AllowAnonymous]
        public async Task<TableData> Load([FromQuery]QueryWmsInboundOrderDtblListReq request)
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

        public WmsInboundOrderDtblsController(WmsInboundOrderDtblApp app) 
        {
            _app = app;
        }
    }
}
