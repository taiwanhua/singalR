![LOGO](/logocore.png "1.png")

OpenAuth.Core是基於 **.Net Core/.Net 5** 的開源許可權工作流快速開發框架。框架汲取Martin Fowler企業級應用開發思想及全新技術組合（IdentityServer、EF core、Quartz、AutoFac、WebAPI、Swagger、Mock、NUnit、VUE、Element-ui等），核心模組包括：組織機構、角色使用者、許可權授權、表單設計、工作流等。

## 技術棧

![](https://img.shields.io/badge/release-2.0-blue)
![](https://img.shields.io/badge/.net%20core-3.1.100-blue)
![](https://img.shields.io/badge/IdentityServer4-3.0.1-blue)
![](https://img.shields.io/badge/quartz-3.0.7-blue)
![](https://img.shields.io/badge/Autofac-5.1.2-blue)
![](https://img.shields.io/badge/NUnit-3.12-blue)
![](https://img.shields.io/badge/SwaggerUI-OAS%203.0-blue)
![](https://img.shields.io/badge/Moq-4.13-blue)
![](https://img.shields.io/badge/log4net-2.0.8-blue)

![](https://img.shields.io/badge/vue-2.6.10-brightgreen)
![](https://img.shields.io/badge/element--ui-2.10.1-brightgreen)
![](https://img.shields.io/badge/node-%3E%3D4.0-brightgreen)
![](https://img.shields.io/badge/npm-3.0.0-brightgreen)
![](https://img.shields.io/badge/layui-2.5.6-brightgreen)

## 核心看點

* 支援.net core sdk 3.1.100 及.Net 5（[一分鐘從.net core 3.1切換至.Net 5](https://www.cnblogs.com/yubaolee/p/Net3ToNet5.html)）

* 超強的自定義許可權控制功能，請參考：[通用許可權設計與實現](https://www.cnblogs.com/yubaolee/p/DataPrivilege.html)

* 完整的欄位許可權控制，可以控制欄位可見及API是否返回欄位值

* 可拖拽的表單設計  

* 視覺化流程設計  

* 基於Quartz.Net的定時任務控制,可隨時啟/停，視覺化配置Cron表達式功能

* 基於CodeSmith的程式碼產生功能，可快速產生帶有頭/明細結構的頁面

* 支援sqlserver、mysql資料庫，理論上支援所有資料庫

* 支援同時訪問多資料來源

* 整合IdentityServer4，實現基於OAuth2的登錄體系

* 建立三方對接規範，已有系統可以無縫對接流程引擎

* 前端採用 vue + layui + elementUI + ztree + gooflow + leipiformdesign

* 後端採用 .net core +EF core+ autofac + quartz +IdentityServer4 + nunit + swagger

* 設計工具 PowerDesigner + Enterprise Architect

## 開源版和企業版關係

企業版是一套全新的前端界面，基於vue-element-admin，採用VUE全家桶（VUE+VUEX+VUE-ROUTER）單頁面SPA開發。它使用開源版OpenAuth.Core的API接口（即：OpenAuth.WebApi）提供數據服務。二者的關係如下：

![](/architect.png)

## 開源版和企業版不同點

|    開源版    | 高級/企業版           |
| ------------- |:-------------:| 
| 單站點Asp.Net Core Mvc方式     | 前後端完全分離的Asp.Net Core WebAPI + vue方式 | 
| 基於最新版LayUI界面     | 基於最新版ElementUI界面  | 
| 基於Quartz的定時任務控制    | 基於Quartz的定時任務控制，`且支援視覺化CRON表達式設計`      |   
| 基於leipiformdesign的動態表單設計   | 在開源版的基礎上，`實現可拖拽的表單設計且獨立成vue元件`      |   
| 基於gooflow的流程設計   | 基於當今世界最流行的jsplumb開發的流程設計      |   
| 靈活的數據許可權控制   | 在開源版的基礎上，`實現視覺化的許可權控制配置`   |   
| 提供基於CodeSmith的程式碼產生功能   | 在開源的基礎上，`增加快速產生帶有頭/明細結構的頁面`   |   
| --   | 多租戶  |  
| --   | 附件管理  |  
| --   | 提供資料庫結構PowerDesigner設計檔案  |   






