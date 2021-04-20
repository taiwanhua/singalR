
using System;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using OpenAuth.App;
using OpenAuth.App.Interface;
using OpenAuth.App.Request;

namespace OpenAuth.WebApi.Controllers
{
    /// <summary>
    /// 分配資源/分配欄位等
    /// </summary>
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccessObjsController : ControllerBase
    {
        private readonly RevelanceManagerApp _app;
        private readonly IAuth _authUtil;
        public AccessObjsController(IAuth authUtil, RevelanceManagerApp app) 
        {
            _app = app;
            _authUtil = authUtil;
        }

        /// <summary>
        /// 新增關聯
        /// <para>比如給使用者分配資源，那麼firstId就是使用者ID，secIds就是資源ID列表</para>
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public Response Assign(AssignReq request)
        {
            var result = new Response();
            try
            {
                _app.Assign(request);
            }
            catch (Exception ex)
            {
                  result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return result;
        }
        /// <summary>
        /// 取消關聯
        /// </summary>
        [HttpPost]
        public Response UnAssign(AssignReq request)
        {
            var result = new Response();
            try
            {
                _app.UnAssign(request);
            }
            catch (Exception ex)
            {
                  result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return result;
        }
        
        /// <summary>
        /// 角色分配數據欄位許可權
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public Response AssignDataProperty(AssignDataReq request)
        {
            var result = new Response();
            try
            {
                _app.AssignData(request);
            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return result;
        }
        /// <summary>
        /// 取消角色的數據欄位許可權
        /// <para>如果Properties為空，則把角色的某一個模組許可權全部刪除</para>
        /// <para>如果moduleId為空，直接把角色的所有授權刪除</para>
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        private static string lockobj = "lock";
        [HttpPost]
        public Response UnAssignDataProperty(AssignDataReq request)
        {
            var result = new Response();
            try
            {
                lock (lockobj)
                {
                    _app.UnAssignData(request);
                }
            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return result;
        }
        
        
        /// <summary>
        /// 角色分配使用者，整體提交，會覆蓋之前的配置
        /// </summary>
        [HttpPost]
        public Response AssignRoleUsers(AssignRoleUsers request)
        {
            var result = new Response();
            try
            {
                _app.AssignRoleUsers(request);
            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return result;
        }
        
        /// <summary>
        /// 部門分配使用者，整體提交，會覆蓋之前的配置
        /// </summary>
        [HttpPost]
        public Response AssignOrgUsers(AssignOrgUsers request)
        {
            var result = new Response();
            try
            {
                _app.AssignOrgUsers(request);
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