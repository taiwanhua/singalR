using System.Reflection;
using Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using OpenAuth.App;
using OpenAuth.App.Interface;
using OpenAuth.Repository.Domain;

namespace OpenAuth.WebApi.Model
{
    public class OpenAuthFilter : IActionFilter
    {
        private readonly IAuth _authUtil;
        private readonly SysLogApp _logApp;

        public OpenAuthFilter(IAuth authUtil, SysLogApp logApp)
        {
            _authUtil = authUtil;
            _logApp = logApp;
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            var description =
                (Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor)context.ActionDescriptor;

            var Controllername = description.ControllerName.ToLower();
            var Actionname = description.ActionName.ToLower();

            //匿名標識
            var authorize = description.MethodInfo.GetCustomAttribute(typeof(AllowAnonymousAttribute));
            if (authorize != null)
            {
                return;
            }

            if (!_authUtil.CheckLogin())
            {
                context.HttpContext.Response.StatusCode = 401;
                context.Result = new JsonResult(new Response
                {
                    Code = 401,
                    Message = "認證失敗，請提供認證資訊"
                });
                return;
            }
            _logApp.Add(new SysLog
            {
                Content = $"使用者訪問",
                Href = $"{Controllername}/{Actionname}",
                CreateName = _authUtil.GetUserName(),
                CreateId = _authUtil.GetCurrentUser().User.Id,
                TypeName = "訪問日誌"
            });
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            return;
        }
    }
}
