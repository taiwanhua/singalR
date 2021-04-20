# 日誌操作

## 普通日誌

框架預設使用Log4Net作為記錄日誌的方式，可以在Program.cs中配置日誌參數或調整為其他日誌。日誌預設按日期產生日誌檔案，並存放在`log\`目錄下。簡單用法如下：

```csharp
    //具體程式碼參考OpenAuth.App/OpenJobApp.cs，此處簡化真實邏輯，方便理解
    public void RecordRun(string jobId)
    {
        //其他程式碼略
        _logger.LogInformation($"執行了自動任務：{job.JobName}");
    }

    public OpenJobApp(IUnitWork unitWork, IRepository<OpenJob> repository,
        IAuth auth,  ILogger<OpenJobApp> logger) : base(unitWork, repository, auth)
    {
        _logger = logger;
    }
```

## 資料庫日誌

如果想使用資料庫記錄業務日誌（如系統預設的使用者操作日誌等），可以使用`SysLogApp`模組功能。日誌可以在站點【訊息日誌】->【系統日誌】中檢視到記錄的日誌資訊。簡單用法如下：

```csharp
    //具體程式碼參考OpenAuth.App/OpenJobApp.cs，此處簡化真實邏輯，方便理解
    public void RecordRun(string jobId)
    {
        //其他程式碼略
        _sysLogApp.Add(new SysLog
            {
                CreateName = "Quartz",
                CreateId = "Quartz",
                TypeName = "定時任務",
                TypeId = "AUTOJOB",
                Content = $"執行了自動任務：{job.JobName}"
            });
    }

     public OpenJobApp(IUnitWork<OpenAuthDBContext> unitWork, IRepository<OpenJob,OpenAuthDBContext> repository,
            IAuth auth, SysLogApp sysLogApp) : base(unitWork, repository, auth)
        {
            _sysLogApp = sysLogApp;
        }
```

## EF列印Sql日誌

在除錯資料庫時，需要列印真正執行的SQL資訊。最簡單的方式是使用下面方法輸出到控制檯：

```csharp
    public partial class OpenAuthDBContext : DbContext
    {

        public static readonly ILoggerFactory MyLoggerFactory
            = LoggerFactory.Create(builder => { builder.AddConsole(); });
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging (true);  //允許列印參數
            optionsBuilder.UseLoggerFactory (MyLoggerFactory);

            base.OnConfiguring (optionsBuilder);
        }
    }
```

## EF輸出Sql到log4net

框架目前直接配置`appsettings.Development.json`即可完成輸出sql語句到log4net對應的日誌檔案中。如下：

```
  "Logging": {
    "LogLevel": {
      "Microsoft.EntityFrameworkCore.Database.Command": "Information"  //EF輸出SQL語句
    }
  }
```

正式發布環境下，如無特殊需求，建議在`appsettings.Production.json`配置中關閉該輸出
