using Infrastructure;
using OpenAuth.App;
using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using OpenAuth.App.Interface;
using OpenAuth.App.Response;
using OpenAuth.Repository.Domain;
using System.Collections.Generic;

namespace OpenAuth.Mvc.Controllers
{
    public class ModuleManagerController : BaseController
    {
        private ModuleManagerApp _app;
        public ModuleManagerController(IAuth authUtil, ModuleManagerApp app) : base(authUtil)
        {
            _app = app;
        }

        // GET: /ModuleManager/
       
        public ActionResult Index()
        {
            return View();
        }

       
        public ActionResult Assign()
        {
            return View();
        }

        /// <summary>
        /// 載入角色模組
        /// </summary>
        /// <param name="firstId">The role identifier.</param>
        /// <returns>System.String.</returns>
        public string LoadForRole(string firstId)
        {
            var modules = _app.LoadForRole(firstId);
            return JsonHelper.Instance.Serialize(modules);
        }
                /// <summary>
        /// 獲取角色已經分配的欄位
        /// </summary>
        /// <param name="roleId">角色id</param>
        /// <param name="moduleCode">模組程式碼，如Category</param>
        /// <returns></returns>
        [HttpGet]
        public string LoadPropertiesForRole(string roleId, string moduleCode)
        {
            try
            {
                var props = _app.LoadPropertiesForRole(roleId, moduleCode);
                 var data = new Response<IEnumerable<string>>
                {
                    Result = props.ToList(),
                };
                return JsonHelper.Instance.Serialize(data);
            }
            catch (Exception ex)
            {
                return JsonHelper.Instance.Serialize(new Response
                    {
                        Message =ex.Message,
                        Code = 500,
                    });
            }
        }

        /// <summary>
        /// 根據某角色ID獲取可訪問某模組的菜單項
        /// </summary>
        /// <returns></returns>
        public string LoadMenusForRole(string moduleId, string firstId)
        {
            var menus = _app.LoadMenusForRole(moduleId, firstId);
            return JsonHelper.Instance.Serialize(menus);
        }

        /// <summary>
        /// 獲取發起頁面的菜單許可權
        /// </summary>
        /// <returns>System.String.</returns>
        public string LoadAuthorizedMenus(string modulecode)
        {
            var user = _authUtil.GetCurrentUser();
            var module = user.Modules.First(u =>u.Code == modulecode);
            if (module != null)
            {
                return JsonHelper.Instance.Serialize(module.Elements);

            }
            return "";
        }


        #region 新增編輯模組

        //新增模組
        [HttpPost]
       
        public string Add(Module model)
        {
            try
            {
                _app.Add(model);
            }
            catch (Exception ex)
            {
                Result.Code = 500;
                Result.Message = ex.InnerException?.Message??ex.Message;
            }
            return JsonHelper.Instance.Serialize(Result);
        }

        //修改模組
        [HttpPost]
       
        public string Update(Module model)
        {
            try
            {
                _app.Update(model);
            }
            catch (Exception ex)
            {
                Result.Code = 500;
                Result.Message = ex.InnerException?.Message ?? ex.Message;
            }
            return JsonHelper.Instance.Serialize(Result);
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

        #endregion 新增編輯模組

        /// <summary>
        /// 載入當前使用者可訪問模組的菜單
        /// </summary>
        /// <param name="moduleId">The module identifier.</param>
        /// <returns>System.String.</returns>
        public string LoadMenus(string moduleId)
        {
            var user = _authUtil.GetCurrentUser();

            var module = user.Modules.Single(u => u.Id == moduleId);
             
            var data = new TableData
            {
                data = module.Elements,
                count = module.Elements.Count(),
            };
            return JsonHelper.Instance.Serialize(data);
        }

        //新增菜單
        [HttpPost]
       
        public string AddMenu(ModuleElement model)
        {
            try
            {
                _app.AddMenu(model);
            }
            catch (Exception ex)
            {
                Result.Code = 500;
                Result.Message = ex.InnerException?.Message ?? ex.Message;
            }
            return JsonHelper.Instance.Serialize(Result);
        }

        //新增菜單
        [HttpPost]
       
        public string UpdateMenu(ModuleElement model)
        {
            try
            {
                _app.UpdateMenu(model);
            }
            catch (Exception ex)
            {
                Result.Code = 500;
                Result.Message = ex.InnerException?.Message ?? ex.Message;
            }
            return JsonHelper.Instance.Serialize(Result);
        }


        /// <summary>
        /// 刪除菜單
        /// </summary>
        [HttpPost]
        public string DelMenu(params string[] ids)
        {
            try
            {
                _app.DelMenu(ids);
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