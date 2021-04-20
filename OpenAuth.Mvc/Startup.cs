using System.IO;
using Autofac;
using Infrastructure;
using Infrastructure.Extensions.AutofacManager;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using OpenAuth.App;
using OpenAuth.App.HostedService;
using OpenAuth.Mvc.Models;
using OpenAuth.Repository;

namespace OpenAuth.Mvc
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton(provider =>
            {
                var service = provider.GetRequiredService<ILogger<StartupLogger>>();
                return new StartupLogger(service);
            });
            var logger = services.BuildServiceProvider().GetRequiredService<StartupLogger>();
            var identityServer = ((ConfigurationSection)Configuration.GetSection("AppSetting:IdentityServerUrl")).Value;
            if (!string.IsNullOrEmpty(identityServer))
            {
             System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

             services.AddAuthentication(options =>
                 {
                     options.DefaultScheme = "Cookies";
                     options.DefaultChallengeScheme = "oidc";
                 })
                 .AddCookie("Cookies")
                    .AddOpenIdConnect("oidc", options =>
                    {
                        options.Authority = identityServer;
                        options.RequireHttpsMetadata = false;

                        options.ClientId = "OpenAuth.Mvc";
                        options.SaveTokens = true;
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            NameClaimType = "name",
                            RoleClaimType = "role",
                        };
                        
                        options.NonceCookie.SameSite = SameSiteMode.Unspecified;
                        options.CorrelationCookie.SameSite = SameSiteMode.Unspecified;
                    });
            }

            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                //關閉GDPR規範
                options.CheckConsentNeeded = context => false;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            
            services.AddControllersWithViews(option =>
            {
                option.Filters.Add< OpenAuthFilter>();
                option.ModelBinderProviders.Insert(0, new JsonBinderProvider());
            });

            services.AddMemoryCache();
            services.AddOptions();

            services.AddRouting(options => options.LowercaseUrls = false);

            //對映配置檔案
            services.Configure<AppSetting>(Configuration.GetSection("AppSetting"));

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
        public void Configure(IApplicationBuilder app, IHostEnvironment env)
        {
            app.UseAuthentication();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseStaticFiles();
            
            //配置ServiceProvider
            AutofacContainerModule.ConfigServiceProvider(app.ApplicationServices);

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
            
        }
    }
}
