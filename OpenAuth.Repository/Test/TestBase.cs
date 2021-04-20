using System.Reflection;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Moq;
using NUnit.Framework;
using OpenAuth.Repository.Interface;

namespace OpenAuth.Repository.Test
{
    /// <summary>
    /// Repository測試基類
    /// 測試用於測試DbContext、UnitWork、Repository，如果需要測試業務邏輯，請使用OpenAuth.App裡面的單元測試
    /// </summary>
    public class TestBase
    {
        protected AutofacServiceProvider _autofacServiceProvider;

        [SetUp]
        public void Init()
        {
            var serviceCollection = GetService();
            serviceCollection.AddMemoryCache();
            serviceCollection.AddOptions();
            serviceCollection.AddLogging();
            serviceCollection.AddScoped(typeof(IRepository<,>), typeof(BaseRepository<,>));
            serviceCollection.AddScoped(typeof(IUnitWork<>), typeof(UnitWork<>));

            //模擬配置檔案
            var optionMock = new Mock<IOptions<AppSetting>>();
            optionMock.Setup(x => x.Value).Returns(new AppSetting { DbType = Define.DBTYPE_MYSQL });
            serviceCollection.AddScoped(x => optionMock.Object);

            //模擬多租戶id
            var configMock = new Mock<IConfiguration>();
            configMock.Setup(x => x.GetSection("ConnectionStrings")[Define.TENANT_ID]).Returns("");
            serviceCollection.AddScoped(x => configMock.Object);

            var httpContextAccessorMock = new Mock<IHttpContextAccessor>();
            httpContextAccessorMock.Setup(x => x.HttpContext.Request.Query[Define.TOKEN_NAME]).Returns("tokentest");
            httpContextAccessorMock.Setup(x => x.HttpContext.Request.Query[Define.TENANT_ID]).Returns("OpenAuthDBContext");

            serviceCollection.AddScoped(x => httpContextAccessorMock.Object);

            serviceCollection.AddDbContext<OpenAuthDBContext>(options =>
                options.UseSqlServer("Data Source=.;Initial Catalog=OpenAuthDB;User=sa;Password=000000;Integrated Security=True"));

            var builder = new ContainerBuilder();

            //註冊repository層
            builder.RegisterAssemblyTypes(Assembly.GetExecutingAssembly());

            builder.Populate(serviceCollection);
          
            var _container = builder.Build();
            _autofacServiceProvider = new AutofacServiceProvider(_container);

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
