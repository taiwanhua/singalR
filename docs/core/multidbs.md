# 配置多資料庫

框架支援同時訪問多個數據庫。具體操作如下：

## 新增新資料庫連線字串

在配置檔案appsettings.json中，新增新的連線字串`OpenAuthDBContext2`

```csharp
 "ConnectionStrings": {
    "OpenAuthDBContext": "Data Source=.;Initial Catalog=OpenAuthPro;User=sa;Password=000000",
    "OpenAuthDBContext2": "Data Source=.;Initial Catalog=OpenAuthDB;User=sa;Password=000000"
  }
```

## 新增新的數據上下文

在OpenAuth.Repository中新增新的資料庫上下文，比如`OpenAuthDBContext2`

```csharp
public class OpenAuthDBContext2 : DbContext
    {

        private ILoggerFactory _LoggerFactory;
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLoggerFactory (_LoggerFactory);
            base.OnConfiguring (optionsBuilder);
        }
        
        public OpenAuthDBContext2(DbContextOptions<OpenAuthDBContext2> options, ILoggerFactory loggerFactory)
            : base(options)
        {
            _LoggerFactory = loggerFactory;
        }

        ... //其他程式碼略
    }

```

## 注入新資料庫

在專案（OpenAuth.WebApi等）的啟動程式碼`Startup.cs`中，注入剛剛新增的資料庫

```csharp
 services.AddDbContext<OpenAuthDBContext2>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("OpenAuthDBContext2")));
```

## 編寫業務程式碼

我們以系統日誌模組為例，只需要調整以下程式碼，然後執行就可以發現，日誌已經全部記錄到新的資料庫中。

```csharp
  public class SysLogApp : BaseApp<SysLog,OpenAuthDBContext2>
    {
        public SysLogApp(IUnitWork<OpenAuthDBContext2> unitWork, IRepository<SysLog,OpenAuthDBContext2> repository) : base(unitWork, repository, null)
        {
        }

        ...//剩餘的程式碼和系統自帶的模組完全一致
    }
```
