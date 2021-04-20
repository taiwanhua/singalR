using System;
using System.IO;
using Autofac.Extensions.DependencyInjection;
using Infrastructure;
using Infrastructure.Extensions.AutofacManager;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using OpenAuth.Repository;

namespace OpenAuth.App.Test
{
    public class TestBase
    {
        protected AutofacServiceProvider _autofacServiceProvider;

        [SetUp]
        public void Init()
        {
            var serviceCollection = GetService();
            serviceCollection.AddMemoryCache();
            serviceCollection.AddOptions();
            //讀取OpenAuth.WebApi的配置檔案用於單元測試
            var path = AppContext.BaseDirectory;
            int pos = path.IndexOf("OpenAuth.App");
            var basepath = Path.Combine(path.Substring(0,pos) ,"OpenAuth.WebApi");
            IConfiguration config = new ConfigurationBuilder()
                .SetBasePath(basepath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile("appsettings.Development.json", optional: true)
                .AddEnvironmentVariables()
                .Build();
            Console.WriteLine($"單元測試資料庫資訊:{config.GetSection("AppSetting")["DbType"]}/{config.GetSection("ConnectionStrings")["OpenAuthDBContext"]}");

            //新增log4net
            serviceCollection.AddLogging(builder =>
            {
                builder.ClearProviders(); //去掉預設的日誌
                builder.AddConfiguration(config.GetSection("Logging"));  //讀取配置檔案中的Logging配置
                builder.AddLog4Net();
            });
            //注入OpenAuth.WebApi配置檔案
            serviceCollection.AddScoped(x => config);

            //模擬HTTP請求
            var httpContextAccessorMock = new Mock<IHttpContextAccessor>();
            httpContextAccessorMock.Setup(x => x.HttpContext.Request.Query[Define.TOKEN_NAME]).Returns("tokentest");
            httpContextAccessorMock.Setup(x => x.HttpContext.Request.Query[Define.TENANT_ID]).Returns("OpenAuthDBContext");
            serviceCollection.AddScoped(x => httpContextAccessorMock.Object);
            
            serviceCollection.AddDbContext<OpenAuthDBContext>();
            
            var container = AutofacExt.InitForTest(serviceCollection);
            _autofacServiceProvider = new AutofacServiceProvider(container);
            AutofacContainerModule.ConfigServiceProvider(_autofacServiceProvider);
        }

        /// <summary>
        /// 測試框架預設只注入了快取Cache，配置Option；
        /// 如果在測試的過程中需要模擬登錄使用者，cookie等資訊，需要重寫該方法，可以參考TestFlow的寫法
        /// </summary>
        public virtual ServiceCollection GetService()
        {
            return  new ServiceCollection();
        }
    }
}
