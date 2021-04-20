using System;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using OpenAuth.App;
using OpenAuth.Repository.Domain;

namespace OpenAuth.WebApi.Controllers
{
    /// <summary>
    /// 機構操作
    /// </summary>
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrgsController : ControllerBase
    {
        private readonly OrgManagerApp _app;

        /// <summary>
        /// 獲取機構詳情
        /// </summary>
        [HttpGet]
        public Response<Org> Get(string id)
        {
            var result = new Response<Org>();
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
        /// 新增機構
        /// <para>如果ID為空，會自動建立ID；會自動為當前登錄使用者分配新增的機構</para>
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        [HttpPost]
        public Response<Org> Add(Org obj)
        {
            var result = new Response<Org>();
            try
            {
                _app.Add(obj);
                result.Result = obj;
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
        public Response Update(Org obj)
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
        /// 刪除選中的部門及所有的子部門
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        [HttpPost]
        public Response Delete([FromBody]string[] ids)
        {
            var result = new Response();
            try
            {
                _app.DelOrgCascade(ids);

            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return result;
        }

        public OrgsController(OrgManagerApp app) 
        {
            _app = app;
        }
    }
}