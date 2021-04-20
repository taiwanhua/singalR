// ***********************************************************************
// Assembly         : OpenAuth.WebApi
// Author           : yubaolee
// Created          : 07-11-2016
//
// Last Modified By : yubaolee
// Last Modified On : 07-11-2016
// Contact :
// File: CheckController.cs
// 登錄相關的操作
// ***********************************************************************

using Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenAuth.App;
using OpenAuth.App.Interface;
using OpenAuth.App.Response;
using OpenAuth.App.SSO;
using OpenAuth.Repository.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using Infrastructure.Helpers;
using Microsoft.Extensions.Logging;

namespace OpenAuth.WebApi.Controllers
{
    /// <inheritdoc />
    /// <summary>
    /// 登錄及與登錄資訊獲取相關的接口
    /// </summary>
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CheckController : ControllerBase
    {
        private readonly IAuth _authUtil;
        private ILogger _logger;
        private AuthStrategyContext _authStrategyContext;

        public CheckController(IAuth authUtil, ILogger<CheckController> logger)
        {
            _authUtil = authUtil;
            _logger = logger;
            _authStrategyContext = _authUtil.GetCurrentUser();
        }
        
        /// <summary>
        /// 獲取登錄使用者資料
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Response<UserView> GetUserProfile()
        {
            var resp = new Response<UserView>();
            try
            {
                resp.Result = _authStrategyContext.User.MapTo<UserView>();
            }
            catch (Exception e)
            {
                resp.Code = 500;
                resp.Message = e.Message;
            }

            return resp;
        }

        /// <summary>
        /// 檢驗token是否有效
        /// </summary>
        /// <param name="token">The token.</param>
        /// <param name="requestid">備用參數.</param>
        [HttpGet]
       
        public Response<bool> GetStatus()
        {
            var result = new Response<bool>();
            try
            {
                result.Result = _authUtil.CheckLogin();
            }
            catch (Exception ex)
            {
                result.Code = Define.INVALID_TOKEN;
                result.Message = ex.Message;
            }

            return result;
        }
        /// <summary>
        /// 獲取登錄使用者的所有可訪問的角色
        /// </summary>
        [HttpGet]
        public Response<List<Role>> GetRoles()
        {
            var result = new Response<List<Role>>();
            try
            {
                result.Result = _authStrategyContext.Roles;
            }
            catch (CommonException ex)
            {
                if (ex.Code == Define.INVALID_TOKEN)
                {
                    result.Code = ex.Code;
                    result.Message = ex.Message;
                }
                else
                {
                    result.Code = 500;
                    result.Message = ex.InnerException != null
                        ? "OpenAuth.WebAPI資料庫訪問失敗:" + ex.InnerException.Message
                        : "OpenAuth.WebAPI資料庫訪問失敗:" + ex.Message;
                }

            }

            return result;
        }

        /// <summary>
        /// 獲取當前登錄使用者可訪問的欄位
        /// </summary>
        /// <param name="moduleCode">模組的Code，如Category</param>
        /// <returns></returns>
        [HttpGet]
        public Response<List<KeyDescription>> GetProperties(string moduleCode)
        {
            var result = new Response<List<KeyDescription>>();
            try
            {
                result.Result = _authStrategyContext.GetProperties(moduleCode);
            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return result;
        }
        /// <summary>
        /// 獲取登錄使用者的所有可訪問的組織資訊
        /// </summary>
        [HttpGet]
        public Response<List<Org>> GetOrgs()
        {
            var result = new Response<List<Org>>();
            try
            {
                result.Result = _authStrategyContext.Orgs;
            }
            catch (CommonException ex)
            {
                if (ex.Code == Define.INVALID_TOKEN)
                {
                    result.Code = ex.Code;
                    result.Message = ex.Message;
                }
                else
                {
                    result.Code = 500;
                    result.Message = ex.InnerException != null
                        ? "OpenAuth.WebAPI資料庫訪問失敗:" + ex.InnerException.Message
                        : "OpenAuth.WebAPI資料庫訪問失敗:" + ex.Message;
                }

            }

            return result;
        }

        /// <summary>
        /// 載入機構的全部下級機構
        /// </summary>
        /// <param name="orgId">機構ID</param>
        /// <returns></returns>
        [HttpGet]
        public TableData GetSubOrgs(string orgId)
        {
            string cascadeId = ".0.";
            if (!string.IsNullOrEmpty(orgId))
            {
                var org = _authStrategyContext.Orgs.SingleOrDefault(u => u.Id == orgId);
                if (org == null)
                {
                    return new TableData
                    {
                        msg = "未找到指定的節點",
                        code = 500,
                    };
                }
                cascadeId = org.CascadeId;
            }

            var query = _authStrategyContext.Orgs
                .Where(u => u.CascadeId.Contains(cascadeId))
                .OrderBy(u =>u.CascadeId);

            return new TableData
            {
                data = query.ToList(),
                count = query.Count(),
            };
        }

        /// <summary>
        /// 獲取登錄使用者的所有可訪問的模組及菜單，以列表形式返回結果
        /// </summary>
        [HttpGet]
        public Response<List<ModuleView>> GetModules()
        {
            var result = new Response<List<ModuleView>>();
            try
            {
                result.Result = _authStrategyContext.Modules;
            }
            catch (CommonException ex)
            {
                if (ex.Code == Define.INVALID_TOKEN)
                {
                    result.Code = ex.Code;
                    result.Message = ex.Message;
                }
                else
                {
                    result.Code = 500;
                    result.Message = ex.InnerException != null
                        ? "OpenAuth.WebAPI資料庫訪問失敗:" + ex.InnerException.Message
                        : "OpenAuth.WebAPI資料庫訪問失敗:" + ex.Message;
                }

            }

            return result;
        }

        /// <summary>
        /// 獲取登錄使用者的所有可訪問的模組及菜單，以樹狀結構返回
        /// </summary>
        [HttpGet]
        public Response<IEnumerable<TreeItem<ModuleView>>> GetModulesTree()
        {
            var result = new Response<IEnumerable<TreeItem<ModuleView>>>();
            try
            {
                result.Result = _authStrategyContext.Modules.GenerateTree(u => u.Id, u => u.ParentId);
            }
            catch (CommonException ex)
            {
                if (ex.Code == Define.INVALID_TOKEN)
                {
                    result.Code = ex.Code;
                    result.Message = ex.Message;
                }
                else
                {
                    result.Code = 500;
                    result.Message = ex.InnerException != null
                        ? "OpenAuth.WebAPI資料庫訪問失敗:" + ex.InnerException.Message
                        : "OpenAuth.WebAPI資料庫訪問失敗:" + ex.Message;
                }

            }

            return result;
        }

        /// <summary>
        /// 獲取登錄使用者的所有可訪問的資源
        /// </summary>
        [HttpGet]
        public Response<List<Resource>> GetResources()
        {
            var result = new Response<List<Resource>>();
            try
            {
                result.Result = _authStrategyContext.Resources;
            }
            catch (CommonException ex)
            {
                if (ex.Code == Define.INVALID_TOKEN)
                {
                    result.Code = ex.Code;
                    result.Message = ex.Message;
                }
                else
                {
                    result.Code = 500;
                    result.Message = ex.InnerException != null
                        ? "OpenAuth.WebAPI資料庫訪問失敗:" + ex.InnerException.Message
                        : "OpenAuth.WebAPI資料庫訪問失敗:" + ex.Message;
                }
               
            }

            return result;
        }

        /// <summary>
        /// 根據token獲取使用者名稱稱
        /// </summary>
        [HttpGet]
        public Response<string> GetUserName()
        {
            var result = new Response<string>();
            try
            {
                result.Result = _authStrategyContext.User.Account;
            }
            catch (CommonException ex)
            {
                if (ex.Code == Define.INVALID_TOKEN)
                {
                    result.Code = ex.Code;
                    result.Message = ex.Message;
                }
                else
                {
                    result.Code = 500;
                    result.Message = ex.InnerException != null
                        ?  ex.InnerException.Message :  ex.Message;
                }

            }

            return result;
        }
        
        /// <summary>
        /// 登錄接口
        /// </summary>
        /// <param name="request">登錄參數</param>
        /// <returns></returns>
        [HttpPost]
        [AllowAnonymous]
        public LoginResult Login([FromBody]PassportLoginRequest request)
        {
            var result = new LoginResult();
            try
            {
                result = _authUtil.Login(request.AppKey, request.Account, request.Password);
            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.Message;
            }

            return result;
        }

        /// <summary>
        /// 註銷登錄
        /// </summary>
        /// <param name="token"></param>
        /// <param name="requestid">備用參數.</param>
        [HttpPost]
        public Response<bool> Logout()
        {
            var resp = new Response<bool>();
            try
            {
                resp.Result = _authUtil.Logout();
            }
            catch (Exception e)
            {
                resp.Result = false;
                resp.Message = e.Message;
            }

            return resp;
        }
    }
}