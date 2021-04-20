using System;
using System.Threading.Tasks;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using OpenAuth.App;
using OpenAuth.App.Request;
using OpenAuth.App.Response;

namespace OpenAuth.WebApi.Controllers
{
    /// <summary>
    /// 使用者操作
    /// </summary>
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManagerApp _app;

        [HttpGet]
        public Response<UserView> Get(string id)
        {
            var result = new Response<UserView>();
            try
            {
                result.Result = _app.Get(id);
            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return result;
        }
        
        /// <summary>
        /// 修改使用者資料
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        public Response ChangeProfile(ChangeProfileReq request)
        {
            var result = new Response();
            
            try
            {
                _app.ChangeProfile(request);
                result.Message = "修改成功，重新登錄生效";
            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return result;
        }

        /// <summary>
        /// 修改密碼
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        public Response ChangePassword(ChangePasswordReq request)
        {
            var result = new Response();
            try
            {
                _app.ChangePassword(request);
            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return result;
        }

        //新增或修改
       [HttpPost]
        public Response<string> AddOrUpdate(UpdateUserReq obj)
        {
            var result = new Response<string>();
            try
            {
                _app.AddOrUpdate(obj);
                result.Result = obj.Id;   //返回ID
            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return result;
        }


        /// <summary>
        /// 載入列表
        /// 獲取當前登錄使用者可訪問的一個部門及子部門全部使用者
        /// </summary>
        [HttpGet]
        public async Task<TableData> Load([FromQuery]QueryUserListReq request)
        {
            return await _app.Load(request);
        }

       [HttpPost]
        public Response Delete([FromBody]string[] ids)
        {
            var result = new Response();
            try
            {
                _app.Delete(ids);

            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.InnerException?.Message ?? ex.Message;
            }

            return result;
        }

        /// <summary>
        /// 載入指定角色的使用者
        /// </summary>
        [HttpGet]
        public async Task<TableData> LoadByRole([FromQuery]QueryUserListByRoleReq request)
        {
            return await _app.LoadByRole(request);
        }
        
        /// <summary>
        /// 載入指定部門的使用者
        /// 不包含下級部門的使用者
        /// </summary>
        [HttpGet]
        public async Task<TableData> LoadByOrg([FromQuery]QueryUserListByOrgReq request)
        {
            return await _app.LoadByOrg(request);
        }
        
        public UsersController(UserManagerApp app) 
        {
            _app = app;
        }
    }
}