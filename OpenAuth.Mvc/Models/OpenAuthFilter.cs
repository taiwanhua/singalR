using System.Linq;
using System.Reflection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using OpenAuth.App;
using OpenAuth.App.Interface;
using OpenAuth.Repository.Domain;

namespace OpenAuth.Mvc.Models
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

            //新增有允許匿名的Action，可以不用登錄訪問，如Login/Index
            var anonymous = description.MethodInfo.GetCustomAttribute(typeof(AllowAnonymousAttribute));
            if (anonymous != null)
            {
                return;
            }

            if (!_authUtil.CheckLogin())
            {
                context.Result = new RedirectResult("/Login/Index");
                return;
            }

            //------------------------以下內容都需要登錄--------------------------------------------

            //如果是ajax請求的，跳過模組授權認證
            var headers = context.HttpContext.Request.Headers;
            var xreq = headers.ContainsKey("x-requested-with");
            if (xreq && headers["x-requested-with"] == "XMLHttpRequest")
            {
                return;
            }

            var Controllername = description.ControllerName.ToLower();
            var Actionname = description.ActionName.ToLower();
            //控制器白名單，在該名單中的控制器，需要登錄，但不需要授權
            var whiteController = new[] {"usersession","home","redirects"};
            if (whiteController.Contains(Controllername))
            {
                return;
            }
            
            //URL白名單
            var whiteurls = new[] {"usermanager/changepassword", "usermanager/profile"};
            if (whiteurls.Contains(Controllername + "/" + Actionname))
            {
                return;
            }

            var currentModule = _authUtil.GetCurrentUser().Modules.FirstOrDefault(u => u.Url.ToLower().Contains(Controllername));
            //當前登錄使用者沒有Action記錄
            if (currentModule == null)
            {
                context.Result = new RedirectResult("/Error/Auth");
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
