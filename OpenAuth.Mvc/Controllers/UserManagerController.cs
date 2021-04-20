using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using OpenAuth.App;
using OpenAuth.App.Interface;
using OpenAuth.App.Request;
using OpenAuth.App.Response;

namespace OpenAuth.Mvc.Controllers
{
    public class UserManagerController : BaseController
    {
        private readonly UserManagerApp _app;
        public UserManagerController(IAuth authUtil, UserManagerApp app) : base(authUtil)
        {
            _app = app;
        }
        //
        // GET: /UserManager/
       
        public ActionResult Index()
        {
            return View();
        }
        
        public ActionResult Profile()
        {
            return View();
        }

        public ActionResult ChangePassword()
        {
            return View();
        }
        
        /// <summary>
        /// 修改使用者資料
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        public string ChangeProfile(ChangeProfileReq request)
        {
            try
            {
                _app.ChangeProfile(request);
                Result.Message = "修改成功，重新登錄生效";
            }
            catch (Exception ex)
            {
                Result.Code = 500;
                Result.Message = ex.InnerException?.Message ?? ex.Message;
            }
            return JsonHelper.Instance.Serialize(Result);
        }

        /// <summary>
        /// 修改密碼
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        public string ChangePassword(ChangePasswordReq request)
        {
            try
            {
                _app.ChangePassword(request);
            }
            catch (Exception ex)
            {
                Result.Code = 500;
                Result.Message = ex.InnerException?.Message ?? ex.Message;
            }
            return JsonHelper.Instance.Serialize(Result);
        }

        //新增或修改組織
        [HttpPost]
        public string AddOrUpdate(UpdateUserReq request)
        {
            try
            {
                _app.AddOrUpdate(request);

            }
            catch (Exception ex)
            {
                Result.Code = 500;
                Result.Message = ex.InnerException?.Message ?? ex.Message;
            }
            return JsonHelper.Instance.Serialize(Result);
        }

        /// <summary>
        /// 載入組織下面的所有使用者
        /// </summary>
        public async Task<string> Load([FromQuery]QueryUserListReq request)
        {
            var load = await _app.Load(request);
            return JsonHelper.Instance.Serialize(load);
        }

       [HttpPost]
        public string Delete(string[] ids)
        {
            try
            {
                _app.Delete(ids);
            }
            catch (Exception e)
            {
                Result.Code = 500;
                Result.Message = e.InnerException?.Message ?? e.Message;
            }

            return JsonHelper.Instance.Serialize(Result);
        }

        #region 獲取許可權數據

        /// <summary>
        /// 獲取使用者可訪問的賬號
        /// </summary>
        public async Task<string> GetAccessedUsers()
        {
            var data = await _app.Load(new QueryUserListReq());
            IEnumerable<UserView> users = data.data;
            var result = new Dictionary<string, object>();
            foreach (var user in users)
            {
                var item = new
                {
                    Account = user.Account,
                    RealName = user.Name,
                    id = user.Id,
                    text = user.Name,
                    value = user.Account,
                    parentId = "0",
                    showcheck = true,
                    img = "fa fa-user",
                };
                result.Add(user.Id, item);
            }

            return JsonHelper.Instance.Serialize(result);
        }
        #endregion

    }
}