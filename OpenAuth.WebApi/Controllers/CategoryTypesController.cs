using System;
 using System.Threading.Tasks;
 using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using OpenAuth.App;
using OpenAuth.App.Request;
using OpenAuth.App.Response;

 namespace OpenAuth.WebApi.Controllers
{
    /// <summary>
    /// 字典所屬分類管理
    /// </summary>
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CategoryTypesController : ControllerBase
    {
        private readonly CategoryTypeApp _app;

        //新增
       [HttpPost]
        public Response Add(AddOrUpdateCategoryTypeReq obj)
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

        //修改
       [HttpPost]
        public Response Update(AddOrUpdateCategoryTypeReq obj)
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
        public async Task<TableData> Load([FromQuery]QueryCategoryTypeListReq request)
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

        public CategoryTypesController(CategoryTypeApp app) 
        {
            _app = app;
        }
    }
}
