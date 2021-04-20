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
    /// 程式碼產生器表字段結構
    /// </summary>
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BuilderTableColumnsController : ControllerBase
    {
        private readonly BuilderTableColumnApp _app;
        
        //獲取詳情
        [HttpGet]
        public Response<BuilderTableColumn> Get(string id)
        {
            var result = new Response<BuilderTableColumn>();
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
        

        //修改
       [HttpPost]
        public Response Update(AddOrUpdateBuilderTableColumnReq obj)
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
        public async Task<TableResp<BuilderTableColumn>> Load([FromQuery]QueryBuilderTableColumnListReq request)
        {
            var tableResp = await _app.Load(request);
            return tableResp;
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

        public BuilderTableColumnsController(BuilderTableColumnApp app) 
        {
            _app = app;
        }
    }
}
