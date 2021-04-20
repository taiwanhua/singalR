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
    /// 程式碼產生器相關操作
    /// </summary>
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BuilderTablesController : ControllerBase
    {
        private readonly BuilderTableApp _app;
        
        /// <summary>
        /// 建立一個程式碼產生的模版
        /// <para>會自動建立欄位明細資訊，新增成功后使用BuilderTableColumnsController.Load載入欄位明細</para>
        /// <returns>返回新增的模版ID</returns>
        /// </summary>
       [HttpPost]
        public Response<string> Add(AddOrUpdateBuilderTableReq obj)
        {
            var result = new Response<string>();
            try
            {
                result.Result = _app.Add(obj);

            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return result;
        }

        /// <summary>
        /// 只修改表資訊，不會更新明細
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
       [HttpPost]
        public Response Update(AddOrUpdateBuilderTableReq obj)
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
        public async Task<TableResp<BuilderTable>> Load([FromQuery]QueryBuilderTableListReq request)
        {
            return await _app.Load(request);
        }

        /// <summary>
        /// 批量刪除程式碼產生模版和對應的欄位資訊
        /// </summary>
       [HttpPost]
        public Response Delete([FromBody]string[] ids)
        {
            var result = new Response();
            try
            {
                _app.DelTableAndcolumns(ids);

            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return result;
        }
        
        /// <summary>
        /// 建立實體
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPost]
        public Response CreateEntity(CreateEntityReq obj)
        {
            var result = new Response();
            try
            {
                _app.CreateEntity(obj);

            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return result;
        }
        
        /// <summary>
        /// 建立業務邏輯層
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPost]
        public Response CreateBusiness(CreateBusiReq obj)
        {
            var result = new Response();
            try
            {
                _app.CreateBusiness(obj);

            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return result;
        }
        
        /// <summary>
        /// 建立vue界面
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPost]
        public Response CreateVue(CreateVueReq obj)
        {
            var result = new Response();
            try
            {
                _app.CreateVue(obj);
                _app.CreateVueApi(obj);

            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return result;
        }

        public BuilderTablesController(BuilderTableApp app) 
        {
            _app = app;
        }
    }
}
