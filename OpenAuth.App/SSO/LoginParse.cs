/*
 * 登錄解析
 * 處理登錄邏輯，驗證客戶段提交的賬號密碼，儲存登錄資訊
 */
using System;
using Infrastructure;
using Infrastructure.Cache;
using OpenAuth.Repository;
using OpenAuth.Repository.Domain;
using OpenAuth.Repository.Interface;


namespace OpenAuth.App.SSO
{
    public class LoginParse
    {

        //這個地方使用IRepository<User> 而不使用UserManagerApp是防止循環依賴
        public IRepository<User,OpenAuthDBContext> _app;
        private ICacheContext _cacheContext;
        private AppInfoService _appInfoService;

        public LoginParse( AppInfoService infoService, ICacheContext cacheContext, IRepository<User,OpenAuthDBContext> userApp)
        {
            _appInfoService = infoService;
            _cacheContext = cacheContext;
            _app = userApp;
        }

        public  LoginResult Do(PassportLoginRequest model)
        {
            var result = new LoginResult();
            try
            {
                model.Trim();
                //獲取應用資訊
                var appInfo = _appInfoService.Get(model.AppKey);
                if (appInfo == null)
                {
                    throw  new Exception("應用不存在");
                }
                //獲取使用者資訊
                User userInfo = null;
                if (model.Account == Define.SYSTEM_USERNAME)
                {
                    userInfo = new User
                    {
                        Id = Guid.Empty.ToString(), 
                        Account = Define.SYSTEM_USERNAME,
                        Name ="超級管理員",
                        Password = Define.SYSTEM_USERPWD
                    };
                }
                else
                {
                    userInfo = _app.FirstOrDefault(u =>u.Account == model.Account);
                }
               
                if (userInfo == null)
                {
                    throw new Exception("使用者不存在");
                }
                if (userInfo.Password != model.Password)
                {
                    throw new Exception("密碼錯誤");
                }

                if (userInfo.Status != 0)
                {
                    throw new Exception("賬號狀態異常，可能已停用");
                }

                var currentSession = new UserAuthSession
                {
                    Account = model.Account,
                    Name = userInfo.Name,
                    Token = Guid.NewGuid().ToString().GetHashCode().ToString("x"),
                    AppKey = model.AppKey,
                    CreateTime = DateTime.Now
               //    , IpAddress = HttpContext.Current.Request.UserHostAddress
                };

                //建立Session
                _cacheContext.Set(currentSession.Token, currentSession, DateTime.Now.AddDays(10));

                result.Code = 200;
                result.ReturnUrl = appInfo.ReturnUrl;
                result.Token = currentSession.Token;
            }
            catch (Exception ex)
            {
                result.Code = 500;
                result.Message = ex.Message;
            }

            return result;
        }
    }
}