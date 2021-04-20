using System;
using System.Threading.Tasks;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using OpenAuth.App;
using OpenAuth.App.Interface;
using OpenAuth.App.Request;

namespace OpenAuth.Mvc.Controllers
{
    public class DataPrivilegeRulesController : BaseController
    {
        private readonly DataPrivilegeRuleApp _app;

         public DataPrivilegeRulesController(DataPrivilegeRuleApp app, IAuth auth) : base(auth)
        {
            _app = app;
        }

        //主頁
        public ActionResult Index()
        {
            return View();
        }

        //新增或修改
        [HttpPost]
        public string Add(AddOrUpdateDataPriviReq obj)
        {
            try
            {
                _app.Add(obj);

            }
            catch (Exception ex)
            {
                Result.Code = 500;
                Result.Message = ex.Message;
            }
            return JsonHelper.Instance.Serialize(Result);
        }

        //新增或修改
        [HttpPost]
        public string Update(AddOrUpdateDataPriviReq obj)
        {
            try
            {
                _app.Update(obj);

            }
            catch (Exception ex)
            {
                Result.Code = 500;
                Result.Message = ex.Message;
            }
            return JsonHelper.Instance.Serialize(Result);
        }

        /// <summary>
        /// 載入列表
        /// </summary>
        public async Task<string> Load([FromQuery]QueryDataPrivilegeRuleListReq request)
        {
            var objs = await _app.Load(request);
            return JsonHelper.Instance.Serialize(objs);
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
                Result.Message = e.Message;
            }

            return JsonHelper.Instance.Serialize(Result);
        }
    }
}