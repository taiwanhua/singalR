using System;
using System.Collections.Generic;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using OpenAuth.App;
using OpenAuth.App.Request;
using OpenAuth.App.Response;
using OpenAuth.Repository.Domain;

namespace OpenAuth.WebApi.Controllers
{
    /// <summary>
    /// 表單操作
    /// </summary>
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly RoleApp _app;
        private readonly RevelanceManagerApp _revelanceManagerApp;
        public RolesController(RevelanceManagerApp revelanceManagerApp, RoleApp app) 
        {
            _revelanceManagerApp = revelanceManagerApp;
            _app = app;
        }

        [HttpGet]
        public Response<Role> Get(string id)
        {
            var result = new Response<Role>();
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
        /// 新增角色，如果當前登錄使用者不是System，則直接把新角色分配給當前登錄使用者
        /// </summary>
        [HttpPost]
        public Response<RoleView> Add(RoleView obj)
        {
            var result = new Response<RoleView>();
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
        
        /// <summary>
        /// 更新角色屬性
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
       [HttpPost]
        public Response Update(RoleView obj)
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
        public Response<List<Role>> Load([FromQuery]QueryRoleListReq request)
        {
            var result = new Response<List<Role>>();
            try
            {
                result.Result = _app.Load(request);

            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return result;
        }

        /// <summary>
        /// 載入使用者的角色
        /// </summary>
        [HttpGet]
        public Response<List<string>> LoadForUser(string userId)
        {
            var result = new Response<List<string>>();
            try
            {
                result.Result = _revelanceManagerApp.Get(Define.USERROLE, true, userId);
            }
            catch (Exception e)
            {
                result.Code = 500;
                result.Message = e.InnerException?.Message ?? e.Message;
            }

            return result;
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
    }
}