﻿using System;
using System.Collections.Generic;
using System.Linq;
 using System.Threading.Tasks;
 using Infrastructure;
 using Microsoft.AspNetCore.Authorization;
 using Microsoft.AspNetCore.Mvc;
using OpenAuth.App;
using OpenAuth.App.Interface;
using OpenAuth.App.Request;
using OpenAuth.Repository.Domain;

namespace OpenAuth.Mvc.Controllers
{
    public class OpenJobsController : BaseController
    {
        private readonly OpenJobApp _app;

         public OpenJobsController(OpenJobApp app, IAuth auth) : base(auth)
        {
            _app = app;
        }

        //主頁
        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        //新增或修改
        [HttpPost]
        public string Add(AddOrUpdateOpenJobReq obj)
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
        public string Update(AddOrUpdateOpenJobReq obj)
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
        /// 獲取本地可執行的任務列表
        /// </summary>
        [HttpPost]
        public string QueryLocalHandlers()
        {
            var result = new Response<List<string>>();
            try
            {
                result.Result = _app.QueryLocalHandlers();
            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return JsonHelper.Instance.Serialize(Result);
        }
        
        /// <summary>
        /// 改變任務狀態，啟動/停止
        /// </summary>
        [HttpPost]
        public string ChangeStatus(ChangeJobStatusReq req)
        {
            var result = new Response();
            try
            {
                _app.ChangeJobStatus(req);
                result.Message = "切換成功，可以在系統日誌中檢視執行結果";

            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return JsonHelper.Instance.Serialize(Result);
        }
        

        /// <summary>
        /// 載入列表
        /// </summary>
        public async Task<string> Load([FromQuery]QueryOpenJobListReq request)
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