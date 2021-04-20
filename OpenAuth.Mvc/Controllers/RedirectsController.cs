using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace OpenAuth.Mvc.Controllers
{
    public class RedirectsController : Controller
    {
        /// <summary>
        /// oauth認證跳轉頁面
        /// </summary>
        /// <returns></returns>
        [Authorize]
        public ActionResult IdentityAuth()
        {
            if (User.Identity.IsAuthenticated)
                return Redirect("/Home/Index");
            return View();
        }
    }
}
