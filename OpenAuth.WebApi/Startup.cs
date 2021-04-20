using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Autofac;
using IdentityServer4.AccessTokenValidation;
using Infrastructure;
using Infrastructure.Extensions.AutofacManager;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using OpenAuth.App;
using OpenAuth.App.HostedService;
using OpenAuth.Repository;
using OpenAuth.WebApi.Model;
using Swashbuckle.AspNetCore.SwaggerUI;

namespace OpenAuth.WebApi
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

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
           services.Configure<ApiBehaviorOptions>(options =>
           {
               options.SuppressModelStateInvalidFilter = true;
           });
            
            services.AddSingleton(provider =>
            {
                var service = provider.GetRequiredService<ILogger<StartupLogger>>();
                return new StartupLogger(service);
            });
            var logger = services.BuildServiceProvider().GetRequiredService<StartupLogger>();
            
            var identityServer = ((ConfigurationSection)Configuration.GetSection("AppSetting:IdentityServerUrl")).Value;
            if (!string.IsNullOrEmpty(identityServer))
            {
                services.AddAuthorization();

                services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.Authority = identityServer;
                        options.RequireHttpsMetadata = false;  // 指定是否為HTTPS
                        options.Audience = "openauthapi";
                   });
            }
         

            services.AddSwaggerGen(option =>
            {
                option.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = " OpenAuth.WebApi",
                    Description = "by yubaolee"
                });
                
                logger.LogInformation($"api doc basepath:{AppContext.BaseDirectory}");
                foreach (var name in Directory.GetFiles(AppContext.BaseDirectory, "*.*",
                    SearchOption.AllDirectories).Where(f =>Path.GetExtension(f).ToLower() == ".xml"))
                {
                    option.IncludeXmlComments(name,includeControllerXmlComments:true);
                    // logger.LogInformation($"find api file{name}");
                }

                option.OperationFilter<GlobalHttpHeaderOperationFilter>(); // 新增httpHeader參數

                if (!string.IsNullOrEmpty(identityServer))
                {
                    //接入identityserver
                    option.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                    {
                        Type = SecuritySchemeType.OAuth2,
                        Description = "OAuth2登陸授權",
                        Flows = new OpenApiOAuthFlows
                        {
                            Implicit = new OpenApiOAuthFlow
                            {
                                AuthorizationUrl = new Uri($"{identityServer}/connect/authorize"),
                                Scopes = new Dictionary<string, string>
                                {
                                    { "openauthapi", "同意openauth.webapi 的訪問許可權" }//指定客戶端請求的api作用域。 如果為空，則客戶端無法訪問
                                }
                            }
                        }
                    });
                    option.OperationFilter<AuthResponsesOperationFilter>();
                }

                
            });
            services.Configure<AppSetting>(Configuration.GetSection("AppSetting"));
            services.AddControllers(option =>
            {
                option.Filters.Add< OpenAuthFilter>();
            }).AddNewtonsoftJson(options =>
            {
                //忽略循環引用
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                //不使用駝峰樣式的key
                //options.SerializerSettings.ContractResolver = new DefaultContractResolver();    
                options.SerializerSettings.DateFormatString = "yyyy-MM-dd HH:mm:ss";
            });
            services.AddMemoryCache();
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

            //在startup裡面只能通過這種方式獲取到appsettings裡面的值，不能用IOptions😰
            var dbType = ((ConfigurationSection)Configuration.GetSection("AppSetting:DbType")).Value;
            var connectionString = Configuration.GetConnectionString("OpenAuthDBContext");
            logger.LogInformation($"當前資料庫型別：{dbType}，連線字串：{connectionString}");
            services.AddDbContext<OpenAuthDBContext>();

            services.AddHttpClient();

            services.AddDataProtection().PersistKeysToFileSystem(new DirectoryInfo(Configuration["DataProtection"]));
            
            //設定定時啟動的任務
            services.AddHostedService<QuartzService>();
            
        }
        
        public void ConfigureContainer(ContainerBuilder builder)
        {
            AutofacExt.InitAutofac(builder);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddLog4Net();
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //可以訪問根目錄下面的靜態檔案
            var staticfile = new StaticFileOptions {FileProvider = new PhysicalFileProvider(AppContext.BaseDirectory) };
            app.UseStaticFiles(staticfile);
            

            //todo:測試可以允許任意跨域，正式環境要加許可權
            app.UseCors(builder => builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());
            
            app.UseRouting();
            app.UseAuthentication();
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            
            //配置ServiceProvider
            AutofacContainerModule.ConfigServiceProvider(app.ApplicationServices);

          app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), 
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "V1 Docs");
                c.DocExpansion(DocExpansion.None);
                c.OAuthClientId("OpenAuth.WebApi");  //oauth客戶端名稱
                c.OAuthAppName("開源版webapi認證"); // 描述
            });

        }
    }
}
