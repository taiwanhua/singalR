using System;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using OpenAuth.App;
using OpenAuth.App.Interface;
using OpenAuth.App.Request;

namespace OpenAuth.Mvc.Controllers
{
    public class AccessObjsController : BaseController
    {
        private readonly RevelanceManagerApp _app;

        public AccessObjsController(IAuth authUtil, RevelanceManagerApp app) : base(authUtil)
        {
            _app = app;
        }

        /// <summary>
        /// 新增關聯
        /// </summary>
        [HttpPost]
        public string Assign(AssignReq request)
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

            return JsonHelper.Instance.Serialize(result);
        }

        /// <summary>
        /// 取消關聯
        /// </summary>
        [HttpPost]
        public string UnAssign(AssignReq req)
        {
            try
            {
                _app.UnAssign(req);
            }
            catch (Exception ex)
            {
                Result.Code = 500;
                Result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return JsonHelper.Instance.Serialize(Result);
        }

        /// <summary>
        /// 角色分配數據欄位許可權
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AssignDataProperty(AssignDataReq request)
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

            return JsonHelper.Instance.Serialize(result);
        }

        /// <summary>
        /// 取消角色的數據欄位許可權
        /// <para>如果Properties為空，則把角色的某一個模組許可權全部刪除</para>
        /// <para>如果moduleId為空，直接把角色的所有授權刪除</para>
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        public string UnAssignDataProperty(AssignDataReq request)
        {
            var result = new Response();
            try
            {
                _app.UnAssignData(request);
            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return JsonHelper.Instance.Serialize(Result);
        }
        
        
        /// <summary>
        /// 角色分配使用者，整體提交，會覆蓋之前的配置
        /// </summary>
        [HttpPost]
        public string AssignRoleUsers(AssignRoleUsers request)
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

            return JsonHelper.Instance.Serialize(Result);
        }
        
        /// <summary>
        /// 部門分配使用者，整體提交，會覆蓋之前的配置
        /// </summary>
        [HttpPost]
        public string AssignOrgUsers(AssignOrgUsers request)
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

            return JsonHelper.Instance.Serialize(Result);
        }
    }
}