using System;
using System.Threading;
using System.Threading.Tasks;
using Infrastructure;
using Infrastructure.Cache;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using NUnit.Framework;
using OpenAuth.App.Request;
using OpenAuth.App.SSO;
using OpenAuth.Repository;
using OpenAuth.Repository.Domain;
using OpenAuth.Repository.Interface;

namespace OpenAuth.App.Test
{
    public class TestDynamic : TestBase
    {
        public override ServiceCollection GetService()
        {
            var services = new ServiceCollection();

            var cachemock = new Mock<ICacheContext>();
            cachemock.Setup(x => x.Get<UserAuthSession>("tokentest"))
                .Returns(new UserAuthSession { Account = Define.SYSTEM_USERNAME });
            services.AddScoped(x => cachemock.Object);

            var httpContextAccessorMock = new Mock<IHttpContextAccessor>();
            httpContextAccessorMock.Setup(x => x.HttpContext.Request.Query[Define.TOKEN_NAME])
                .Returns("tokentest");

            services.AddScoped(x => httpContextAccessorMock.Object);

            return services;
        }

        [Test]
        public void Async()
        {
            Console.WriteLine($"開始非同步測試");
            
            AddOrUpdate();

            Console.WriteLine("非同步測試結束");

            //延長主執行緒，防止程式退出
            Thread.Sleep(3000);
        }

        private async Task AddOrUpdate()
        {
            var repository = _autofacServiceProvider.GetService<IRepository<User,OpenAuthDBContext>>();

            var account = "user_" + DateTime.Now.ToString("yyyy_MM_dd HH:mm:ss");

            var user = new User
            {
                Account = account,
                Name = account
            };
            await repository.AddAsync(user);

            user.Account = "new_" + user.Account;

            await repository.UpdateAsync(user);
            Console.WriteLine($"更新完成");
        }
    }
}
