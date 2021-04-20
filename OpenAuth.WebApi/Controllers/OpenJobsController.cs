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
    /// 定時任務操作
    /// 【系統模組】
    /// </summary>
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OpenJobsController : ControllerBase
    {
        private readonly OpenJobApp _app;
        
        //獲取詳情
        [HttpGet]
        public Response<OpenJob> Get(string id)
        {
            var result = new Response<OpenJob>();
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
        /// 新增
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
       [HttpPost]
        public Response Add(AddOrUpdateOpenJobReq obj)
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
        /// 修改
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
       [HttpPost]
        public Response Update(AddOrUpdateOpenJobReq obj)
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
        public async Task<TableData> Load([FromQuery]QueryOpenJobListReq request)
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
        
        /// <summary>
        /// 獲取本地可執行的任務列表
        /// </summary>
        [HttpPost]
        public Response<List<string>> QueryLocalHandlers()
        {
            var result = new Response<List<string>>();
            try
            {
                result.Result = _app.QueryLocalHandlers();
            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return result;
        }
        
        /// <summary>
        /// 改變任務狀態，啟動/停止
        /// </summary>
        [HttpPost]
        public Response ChangeStatus(ChangeJobStatusReq req)
        {
            var result = new Response();
            try
            {
                _app.ChangeJobStatus(req);
                result.Message = "切換成功，可以在系統日誌中檢視執行結果";

            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return result;
        }
        

        public OpenJobsController(OpenJobApp app) 
        {
            _app = app;
        }
    }
}
