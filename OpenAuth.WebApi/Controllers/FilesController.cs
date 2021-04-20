
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OpenAuth.App;
using OpenAuth.App.Request;
using OpenAuth.App.Response;
using OpenAuth.Repository.Domain;

namespace OpenAuth.WebApi.Controllers
{
    /// <summary>  檔案上傳</summary>
    /// <remarks>   yubaolee, 2019-03-08. </remarks>

    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FilesController :ControllerBase
    {

        private FileApp _app;

        public FilesController(FileApp app)
        {
            _app = app;
        }
        
        /// <summary>
        /// 載入附件列表
        /// </summary>
        [HttpGet]
        public async Task<TableData> Load([FromQuery]QueryFileListReq request)
        {
            return await _app.Load(request);
        }
        
        /// <summary>
        /// 刪除附件
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
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
        ///  批量上傳檔案接口
        /// <para>客戶端文字框需設定name='files'</para>
        /// </summary>
        /// <param name="files"></param>
        /// <returns>伺服器儲存的檔案資訊</returns>
        [HttpPost]
        public Response<IList<UploadFile>> Upload(IFormFileCollection files)
        {
            var result = new Response<IList<UploadFile>>();
            try
            {
                result.Result = _app.Add(files);
            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.Message;
            }

            return result;
        }
    }
}
