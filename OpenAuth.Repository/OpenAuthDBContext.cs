using System;
using Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using OpenAuth.Repository.Domain;
using OpenAuth.Repository.QueryObj;

namespace OpenAuth.Repository
{
    
    public partial class OpenAuthDBContext : DbContext
    {

        private ILoggerFactory _LoggerFactory;
        private IHttpContextAccessor _httpContextAccessor;
        private IConfiguration _configuration;
        private IOptions<AppSetting> _appConfiguration;

        public OpenAuthDBContext(DbContextOptions<OpenAuthDBContext> options, ILoggerFactory loggerFactory, 
            IHttpContextAccessor httpContextAccessor, IConfiguration configuration, IOptions<AppSetting> appConfiguration)
            : base(options)
        {
            _LoggerFactory = loggerFactory;
            _httpContextAccessor = httpContextAccessor;
            _configuration = configuration;
            _appConfiguration = appConfiguration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging(true);  //允許列印參數
            optionsBuilder.UseLoggerFactory(_LoggerFactory);
            InitTenant(optionsBuilder);
            base.OnConfiguring(optionsBuilder);
        }

        //初始化多租戶資訊，根據租戶id調整資料庫
        private void InitTenant(DbContextOptionsBuilder optionsBuilder)
        {
            if (_httpContextAccessor == null || _httpContextAccessor.HttpContext == null)
            {
                return;
            }

            //讀取多租戶ID
            string tenantId = _httpContextAccessor.HttpContext.Request.Query[Define.TENANT_ID];
            if (string.IsNullOrEmpty(tenantId))
            {
                tenantId = _httpContextAccessor.HttpContext.Request.Headers[Define.TENANT_ID];
            }

            //如果沒有租戶id，或租戶用的是預設的OpenAuthDBContext,則不做任何調整
            if (string.IsNullOrEmpty(tenantId))
            {
                tenantId = "OpenAuthDBContext";
            }

            string connect = _configuration.GetConnectionString(tenantId);
            if (string.IsNullOrEmpty(connect))
            {
                throw new Exception($"未能找到租戶{tenantId}對應的連線字串資訊");
            }

            //這個地方如果用IOption，在單元測試的時候會獲取不到AppSetting的值😅
           var dbType = _configuration.GetSection("AppSetting")["DbType"];
           if (dbType == Define.DBTYPE_SQLSERVER)
           {
               optionsBuilder.UseSqlServer(connect);
            }
            else  //mysql
           {
               optionsBuilder.UseMySql(connect);
           }

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DataPrivilegeRule>()
                .HasKey(c => new { c.Id });
        }

        public virtual DbSet<Application> Applications { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<CategoryType> CategoryTypes { get; set; }
        public virtual DbSet<FlowInstance> FlowInstances { get; set; }
        public virtual DbSet<FlowInstanceOperationHistory> FlowInstanceOperationHistorys { get; set; }
        public virtual DbSet<FlowInstanceTransitionHistory> FlowInstanceTransitionHistorys { get; set; }
        public virtual DbSet<FlowScheme> FlowSchemes { get; set; }
        public virtual DbSet<Form> Forms { get; set; }
        public virtual DbSet<Module> Modules { get; set; }
        public virtual DbSet<ModuleElement> ModuleElements { get; set; }
        public virtual DbSet<Org> Orgs { get; set; }
        public virtual DbSet<Relevance> Relevances { get; set; }
        public virtual DbSet<Resource> Resources { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UploadFile> UploadFiles { get; set; }

        public virtual DbSet<FrmLeaveReq> FrmLeaveReqs { get; set; }

        public virtual DbSet<SysLog> SysLogs { get; set; }

        public virtual DbSet<SysMessage> SysMessages { get; set; }
        
        public virtual DbSet<DataPrivilegeRule> DataPrivilegeRules { get; set; }
        
        public virtual DbSet<WmsInboundOrderDtbl> WmsInboundOrderDtbls { get; set; }
        public virtual DbSet<WmsInboundOrderTbl> WmsInboundOrderTbls { get; set; }
        public virtual DbSet<OpenJob> OpenJobs { get; set; }
        public virtual DbSet<BuilderTable> BuilderTables { get; set; }
        public virtual DbSet<BuilderTableColumn> BuilderTableColumns { get; set; }
        
        //非資料庫表格
        public virtual DbQuery<SysTableColumn> SysTableColumns { get; set; }

    }
}
