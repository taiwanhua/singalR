using Infrastructure;
using OpenAuth.App;
using System;
using Microsoft.AspNetCore.Mvc;
using OpenAuth.App.Interface;
using OpenAuth.Repository.Domain;

namespace OpenAuth.Mvc.Controllers
{
    public class OrgManagerController : BaseController
    {
        private OrgManagerApp _orgApp;
        public OrgManagerController(IAuth authUtil, OrgManagerApp orgApp) : base(authUtil)
        {
            _orgApp = orgApp;
        }

        //
        // GET: /OrgManager/
       
        public ActionResult Index()
        {
            return View();
        }
       
        /// <summary>
        /// 獲取使用者所能訪問的部門
        /// </summary>
        public string LoadForUser(string firstId)
        {
            var orgs = _orgApp.LoadForUser(firstId);
            return JsonHelper.Instance.Serialize(orgs);
        }

        //新增組織提交
        [HttpPost]
        public string Add(Org org)
        {
            try
            {
                _orgApp.Add(org);
            }
            catch (Exception ex)
            {
                  Result.Code = 500;
                Result.Message = ex.InnerException?.Message ?? ex.Message;
            }
            return JsonHelper.Instance.Serialize(Result);
        }

        //編輯
        [HttpPost]
        public string Update(Org org)
        {
            try
            {
                _orgApp.Update(org);
            }
            catch (Exception ex)
            {
                Result.Code = 500;
                Result.Message = ex.InnerException?.Message ?? ex.Message;
            }
            return JsonHelper.Instance.Serialize(Result);
        }

       /// <summary>
        /// 刪除指定ID的組織
        /// </summary>
        /// <returns>System.String.</returns>
        [HttpPost]
        public string Delete(string[] ids)
        {
            try
            {
                _orgApp.DelOrgCascade(ids);
            }
            catch (Exception e)
            {
                  Result.Code = 500;
                Result.Message = e.InnerException?.Message ?? e.Message;
            }

            return JsonHelper.Instance.Serialize(Result);
        }

    }
}