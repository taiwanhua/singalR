::: danger 鄭重提示 

本文件是針對[OpenAuth.Net 4.0分支](https://gitee.com/yubaolee/OpenAuth.Net/tree/4.0/)（基於.Net 4.5開發環境），如果你是用.Net Core 3.1/.Net 5或以後版本開發環境，請移步 [.net core版本](/core)文件。

:::

![LOGO](https://gitee.com/uploads/images/2018/0425/163228_7077c3fd_362401.png "1.png")

OpenAuth.Net 4.0分支是基於 **.Net Framework 4.5** 的開源許可權工作流快速開發框架（主分支已經更新為.Net 5跨平臺開發環境）。框架基於Martin Fowler企業級應用開發思想及全新技術組合（Asp.Net MVC、EF、AutoFac、WebAPI、Swagger、Json.Net等），核心模組包括：組織機構、角色使用者、許可權授權、表單設計、工作流等。它的架構精良易於擴充套件，是中小企業的首選。

## 特性

採用經典DDD架構,每一行程式碼都經過深思熟慮，符合SOLID規則！

符合國情的RBAC（基於角色的訪問控制），可以直接應用到你的系統。

1. 菜單許可權  經理和業務員登陸系統擁有的功能菜單是不一樣的
1. 按鈕許可權  經理能夠審批，而業務員不可以
1. 數據許可權  A業務員看不到B業務員的單據
1. 欄位許可權  某些人查詢客戶資訊時看不到客戶的手機號或其它欄位

**使用者**應用系統的具體操作者，我這裡設計使用者是可以直接給使用者分配菜單/按鈕，也可以通過角色分配許可權。

**角色**為了對許多擁有相似許可權的使用者進行分類管理，定義了角色的概念，以上所有的許可權資源都可以分配給角色，角色和使用者N:N的關係。

**機構**樹形的公司部門結構，國內公司用的比較多，它實際上就是一個使用者組，機構和使用者設計成N:N的關係，也就是說有時候一個使用者可以從屬於兩個部門，這種情況在我們客戶需求中的確都出現過。

## 技術棧
* 前端 vue + layui + ztree + gooflow + leipiformdesign
* 後端 asp.net mvc + Web API + EF + autofac + swagger + json.net
* 程式碼產生工具 CodeSmith
* 設計工具 PowerDesigner + Enterprise Architect

## 系統工程結構：
1. OpenAuth.Repository 系統倉儲層，用於資料庫操作
1. OpenAuth.App 應用層，為界面提供接口
1. OpenAuth.Mvc Web站點
1. OpenAuth.UnitTest 單元測試
1. Infrastructure 通用工具集合
1. OpenAuth.WebApi SSO服務及為第三方提供接口服務


