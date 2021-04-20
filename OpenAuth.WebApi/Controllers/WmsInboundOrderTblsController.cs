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
    /// 訂單頭部資訊
    /// </summary>
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class WmsInboundOrderTblsController : ControllerBase
    {
        private readonly WmsInboundOrderTblApp _app;
        
        //獲取詳情
        [HttpGet]
        public Response<WmsInboundOrderTbl> Get(string id)
        {
            var result = new Response<WmsInboundOrderTbl>();
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
        /// 新增訂單，可以同時新增頭/明細，也可以只新增頭，根據返回的ID再新增明細
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
       [HttpPost]
        public Response Add(AddOrUpdateWmsInboundOrderTblReq obj)
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
       /// 修改頭資訊,同時修改明細資訊
       /// 如果提交的明細有id，則編輯；
       /// 如果提交的明細沒有id，則新增;
       /// 如果資料庫中存在沒有提交的明細，則刪除資料庫中記錄
       /// </summary>
       /// <param name="obj"></param>
       /// <returns></returns>
       [HttpPost]
        public Response Update(AddOrUpdateWmsInboundOrderTblReq obj)
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
        public async Task<TableData> Load([FromQuery]QueryWmsInboundOrderTblListReq request)
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

        public WmsInboundOrderTblsController(WmsInboundOrderTblApp app) 
        {
            _app = app;
        }
    }
}
