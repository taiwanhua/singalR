using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityModel;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using IdentityServer4.Test;
using Infrastructure;
using Microsoft.Extensions.Logging;
using OpenAuth.App;
using OpenAuth.Repository.Domain;

namespace OpenAuth.IdentityServer
{
    public class CustomProfileService : IProfileService
    {
        /// <summary>
        /// The logger
        /// </summary>
        protected readonly ILogger Logger;

        protected UserManagerApp UserManager;

        /// <summary>
        /// Initializes a new instance of the <see cref="TestUserProfileService"/> class.
        /// </summary>
        /// <param name="users">The users.</param>
        /// <param name="logger">The logger.</param>
        public CustomProfileService( ILogger<TestUserProfileService> logger, UserManagerApp userManager)
        {
            Logger = logger;
            UserManager = userManager;
        }

        /// <summary>
        /// 只要有關使用者的身份資訊單元被請求（例如在令牌建立期間或通過使用者資訊終點），就會呼叫此方法
        /// </summary>
        /// <param name="context">The context.</param>
        /// <returns></returns>
        public virtual Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            context.LogProfileRequest(Logger);

            //判斷是否有請求Claim資訊
            if (context.RequestedClaimTypes.Any())
            {
                var user = GetUserById(context.Subject.GetSubjectId());
                if (user != null)
                {
                    //呼叫此方法以後內部會進行過濾，只將使用者請求的Claim加入到 context.IssuedClaims 集合中 這樣我們的請求方便能正常獲取到所需Claim
                    var claims = new[]
                    {
                        new Claim(ClaimTypes.Name, user.Account),  //請求使用者的賬號，這個可以保證User.Identity.Name有值
                        new Claim(JwtClaimTypes.Name, user.Name),  //請求使用者的姓名
                    };
                    //返回apiresource中定義的claims   
                    context.AddRequestedClaims(claims);
                }
            }

            context.LogIssuedClaims(Logger);

            return Task.CompletedTask;
        }

        /// <summary>
        /// 驗證使用者是否有效 例如：token建立或者驗證
        /// </summary>
        /// <param name="context">The context.</param>
        /// <returns></returns>
        public virtual Task IsActiveAsync(IsActiveContext context)
        {
            Logger.LogDebug("IsActive called from: {caller}", context.Caller);

              var user = GetUserById(context.Subject.GetSubjectId());
            context.IsActive = user?.Status == 0;
            return Task.CompletedTask;
        }

        private User GetUserById(string id)
        {
            User user;
            if (id == Define.SYSTEM_USERNAME)
            {
                user = new User
                {
                    Account = Define.SYSTEM_USERNAME,
                    Id = Define.SYSTEM_USERNAME,
                    Name = Define.SYSTEM_USERNAME
                };
            }
            else
            {
                user = UserManager.Get(id);
            }

            return user;
        }
    }
}
