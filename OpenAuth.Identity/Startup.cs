// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using Autofac;
using Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OpenAuth.App;
using OpenAuth.Repository;

namespace OpenAuth.IdentityServer
{
    public class Startup
    {
        public IHostEnvironment Environment { get; }
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration, IHostEnvironment environment)
        {
            Configuration = configuration;
            Environment = environment;
        }
        
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            var builder = services.AddIdentityServer()
                .AddInMemoryIdentityResources(Config.GetIdentityResources())
                .AddInMemoryApiResources(Config.GetApis())
                .AddInMemoryClients(Config.GetClients(Environment.IsProduction()))
                .AddProfileService<CustomProfileService>();
            
            services.ConfigureNonBreakingSameSiteCookies();
            
            services.AddCors();
//          todo:如果正式 環境請用下面的方式限制隨意訪問跨域
//            var origins = new []
//            {
//                "http://localhost:1803",
//                "http://localhost:52789"
//            };
//            if (Environment.IsProduction())
//            {
//                origins = new []
//                {
//                    "http://demo.openauth.me:1803",
//                    "http://demo.openauth.me:52789"
//                };
//            }
//            services.AddCors(option=>option.AddPolicy("cors", policy =>
//                policy.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins(origins)));

            //全部用測試環境，正式環境請參考https://www.cnblogs.com/guolianyu/p/9872661.html
            //if (Environment.IsDevelopment())
            //{
            builder.AddDeveloperSigningCredential();
            //}
            //else
            //{
            //    throw new Exception("need to configure key material");
            //}

            services.AddAuthentication();
            
            //對映配置檔案
            services.Configure<AppSetting>(Configuration.GetSection("AppSetting"));

            //在startup裡面只能通過這種方式獲取到appsettings裡面的值，不能用IOptions😰
            var dbType = ((ConfigurationSection) Configuration.GetSection("AppSetting:DbType")).Value;
            if (dbType == Define.DBTYPE_SQLSERVER)
            {
                services.AddDbContext<OpenAuthDBContext>(options =>
                    options.UseSqlServer(Configuration.GetConnectionString("OpenAuthDBContext")));
            }
            else  //mysql
            {
                services.AddDbContext<OpenAuthDBContext>(options =>
                    options.UseMySql(Configuration.GetConnectionString("OpenAuthDBContext")));
            }

        }
        
        public void ConfigureContainer(ContainerBuilder builder)
        {
            AutofacExt.InitAutofac(builder);
        }

        public void Configure(IApplicationBuilder app, IHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            
            app.UseCookiePolicy();
            
            //todo:測試可以允許任意跨域，正式環境要加許可權
            app.UseCors(builder => builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseStaticFiles();
            app.UseRouting();

            app.UseIdentityServer();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
            });
        }
    }
}