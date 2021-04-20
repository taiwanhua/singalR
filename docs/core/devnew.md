# 新增新模組

## 前言

OpenAuth.Mvc新增新模組的方式非常簡單，完全可以參考系統已有的`資源管理`模組編寫相應的程式碼。參考的`資源管理`功能對應的程式碼如下：

![](http://pj.openauth.me/zentao/file-read-55.png)

如果我們想新加一個倉儲管理的模組，模組標識為`Stock`。那麼需要新增的檔案如下：


    ├─OpenAuth.Mvc
    │    ├─ Controllers
    │    │    └─ StocksController.cs
    │    ├─ Views
    │    │    └─ Stocks
    │    │        └─ index.cshtml
    │    ├─ wwwroot
    │    │    └─ userJs
    │    │        └─ stock.js
    ├─OpenAuth.App
    │    ├─ StockApp.cs
    │    ├─ Request
    │    │    └─ QueryStockReq.cs
    ├─ OpenAuth.Repository
    │    ├─ OpenAuthDBContext.cs
    │    ├─ Domain
    │         └─ Stock.cs

當然全部手擼這些程式碼還是會瘋的。使用者可以直接使用專案`CodeSmith`資料夾裡面的模板一鍵產生上述程式碼。而且CodeSmith模板本身也是全部原始碼，可以根據自己需求調整產生的內容。

## 工具準備

CodeSmith Generator Studio 8.0或以上

資料庫OpenAuthDB中新增倉儲表【Stock】，本文以該數據表為例

## 新增實體

如下圖，使用CodeSmith資料夾中的模板，右擊【ApiGenerate.cst】--【Execute】，選擇需要產生的表（本文以Stock為例）及相關的上下文名稱空間，點選【Generate】

![](http://pj.openauth.me/zentao/file-read-26.jpg)

產生成功后，在CodeSmith/Csharp資料夾下面會有Stock實體相關文件，如下圖：

![](http://pj.openauth.me/zentao/file-read-53.png)

把CSharp\OpenAuth.App覆蓋到自己專案對應目錄

把CSharp\OpenAuth.Repository\Domain覆蓋到自己專案對應目錄

**把CSharp\OpenAuth.Repository\OpenAuthDBContext.cs中的內容新增到自己專案的檔案中，千萬不要直接覆蓋檔案！！！**

**其他資料夾的內容為WebAPI專案使用，可以不管。**

## 新增界面

如下圖，使用CodeSmith資料夾中的模板，右擊【WebGenerate.cst】--【Execute】，選擇需要產生的表（本文以Stock為例）及相關的上下文名稱空間，點選【Generate】

![](http://pj.openauth.me/zentao/file-read-47.png)

產生成功后，在CodeSmith/Csharp資料夾下面會有相關的界面程式碼，如下圖：

![](http://pj.openauth.me/zentao/file-read-50.png)

Controllers、Views直接覆蓋到OpenAuth.Mvc專案中對應的資料夾即可

userJs直接覆蓋到OpenAuth.Mvc/wwwroot中

## 新增模組

編寫完上面程式碼后，執行系統，使用System賬號登錄系統，在【模組管理】中，新增`倉儲管理`模組，併為它新增菜單，這裡我只新增一個菜單【btnAdd】，如下圖：

![](http://pj.openauth.me/zentao/file-read-51.png)

重新登錄系統，即可看到新加的倉儲管理模組。

![](http://pj.openauth.me/zentao/file-read-52.png)

    