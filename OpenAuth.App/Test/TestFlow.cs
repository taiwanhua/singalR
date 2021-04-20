using System.Net.Http;
using Infrastructure;
using Infrastructure.Cache;
using Microsoft.AspNetCore.Http;
using NUnit.Framework;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using OpenAuth.App.Request;
using OpenAuth.App.SSO;

namespace OpenAuth.App.Test
{
    [TestFixture]
    public class TestFlow :TestBase
    {
        //測試流程需要模擬登錄使用者
        public override ServiceCollection GetService()
        {
            var services = new ServiceCollection();

            var cachemock = new Mock<ICacheContext>();
            cachemock.Setup(x => x.Get<UserAuthSession>("tokentest")).Returns(new UserAuthSession { Account = "test3" });
            services.AddScoped(x => cachemock.Object);

            //模擬服務端httpContext
            var httpContextAccessorMock = new Mock<IHttpContextAccessor>();
            httpContextAccessorMock.Setup(x => x.HttpContext.Request.Query[Define.TOKEN_NAME]).Returns("tokentest");
            services.AddScoped(x => httpContextAccessorMock.Object);

            //模擬httpclientfactory
            var mockHttpFac = new Mock<IHttpClientFactory>();
            services.AddScoped(x => mockHttpFac.Object);

            return services;
        }


        [Test]
        public void Verificate()
        {
            var app = _autofacServiceProvider.GetService<FlowInstanceApp>();
            app.Verification(new VerificationReq
            {
                FlowInstanceId = "76c72db4-d6c8-4734-856e-b6ffee08314a",
                VerificationFinally = "1"
            });
        }
    }
}
