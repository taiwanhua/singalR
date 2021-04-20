// <copyright file="UserSessionControllerTest.cs" company="OpenAuth.Mvc">
//     Copyright (c) http://www.openauth.me. All rights reserved.
// </copyright>
// <summary>
// 測試載入使用者菜單
// </summary>
// ***********************************************************************

using System;
using System.Diagnostics;
using Infrastructure;
using Infrastructure.Cache;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using NUnit.Framework;
using OpenAuth.App;
using OpenAuth.App.SSO;
using OpenAuth.App.Test;
using OpenAuth.WebApi.Controllers;

namespace OpenAuth.WebApi.Test
{
    public class CheckControllerTest : TestBase
    {

        //如果要測試controller，則要重寫
        public override ServiceCollection GetService()
        {
            var services = new ServiceCollection();

            var cachemock = new Mock<ICacheContext>();
            cachemock.Setup(x => x.Get<UserAuthSession>("tokentest")).Returns(new UserAuthSession{Account = "admin"});
            services.AddScoped(x => cachemock.Object);

            services.AddMvc().AddControllersAsServices();
            services.AddScoped<CheckController>();

            //讀取配置檔案
            IConfigurationBuilder configurationBuilder = new ConfigurationBuilder();
            // Duplicate here any configuration sources you use.
            configurationBuilder.AddJsonFile("AppSettings.json");
            IConfiguration configuration = configurationBuilder.Build();
            services.Configure<AppSetting>(configuration.GetSection("AppSetting"));

            services.AddLogging();

            return services;
        }


        [Test]
        public void GetModulesTree()
        {
            Stopwatch watch = Stopwatch.StartNew();
            var controller = _autofacServiceProvider.GetService<CheckController>();

            var result =  controller.GetModulesTree();
            Console.WriteLine(JsonHelper.Instance.Serialize(result));
            watch.Stop();
            Console.WriteLine($"總耗時:{watch.ElapsedMilliseconds}");
        }
    }
}
