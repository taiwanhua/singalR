# 常見問題處理

## 專案顯示不可用

![](/notavailable.png)

這種情況一般是開發工具或SDK的版本號不對。嚴格按照下面的提示打開專案：

* v2.0及以後版本因使用.net core 3.1，必須使用visual Studio 2019及以上版本打開

* v2.0以前的版本可以使用visual Studio 2017  及.net core 2.1.4

## 系統使用Sql Server 2008資料庫的問題

在使用Sql Server 2008時，會提示下面錯誤：

> System.Data.SqlClient.SqlException:「'OFFSET' 附近有語法錯誤。在 FETCH 語句中選項 NEXT 的用法無效。

因為SQL SERVER 2008 不支援FETCH分頁方式，所以需要在startup.cs中修改配置：

```csharp
optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=OpenAuthDB;User=sa;Password=123456;Integrated Security=True;", 
b => b.UseRowNumberForPaging());
```

即使用rownumber的分頁方式。 當然最好的解決方式是升級SQL SERVER到2012或以上版本。

::: warning 注意
OpenAuth.Core 2.0及以後版本因為使用了.net core 3.1，該SDK已經放棄了這種方式，因此只能通過升級Sql Server的方式解決該問題
:::


## 使用mysql時，提示無法找到openauthdb.Org

在linux下面，mysql是區分資料庫大小寫的，但OpenAuth.Core使用EF對映資料庫表是按照首字母大寫來處理的。在mysql配置中裡面加上：

```shell
lower_case_table_names=1
```
從而不區分大小寫，即可解決該問題

## WebApi里增加一個控制器,Swagger不顯示

需要在控制器上面新增註釋，如：
```caharp
    /// <summary>  檔案上傳</summary>
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FilesController :ControllerBase
```

