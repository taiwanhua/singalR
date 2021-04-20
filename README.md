![LOGO](https://images.gitee.com/uploads/images/2020/0420/002145_bdea42ff_362401.png "logo.png")

**logo圖示含義** OpenAuth中OA字母的結合體；整體像魚，授人以漁；你非說像鹹魚，那也是積極向上的鹹魚；中心是個笑臉，微笑面對生活(✿◡‿◡)。

本專案基於.Net Core 3.1.100的跨平臺版本，如果使用傳統.Net Framework 4.5及最新 **.Net 5** 的同學請移步：https://gitee.com/yubaolee/OpenAuth.Net

**官方網站** http://www.openauth.me

**官方文件**  http://doc.openauth.me 

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



## 關於OpenAuth.Net企業版的說明：

目前OpenAuth.Core以全部開源的方式向大眾開放,對於有經驗的開發者，官方文件足以滿足日常開發。為了能讓專案走的更遠，特推出基於vue + element UI 的單頁面應用程式，即企業版OpenAuth.Pro

**該版本後端基於OpenAuth.Core的API接口，前端基於vue-element-admin，採用VUE全家桶（VUE+VUEX+VUE-ROUTER）單頁面SPA開發**

版本附贈VIP服務，提供VIP專屬QQ群，企業發票、專屬內部文件、技術諮詢服務等。[如何獲取請檢視這裡](http://openauth.me/question/detail.html?id=a2be2d61-7fcb-4df8-8be2-9f296c22a89c)，快加入VIP大家庭 **與有理想的.NET開發者一起成長**

效果如下：
![](https://images.gitee.com/uploads/images/2021/0128/224913_6bda2388_362401.png "form.png")
![](https://images.gitee.com/uploads/images/2021/0128/225024_57595ce9_362401.png "flow.png")
![openauth.pro](http://demo.openauth.me:8887/upload_files/200420211433125.gif "企業版效果圖")

## 官方QQ交流群  

1. ***618473076*** **社區VIP專屬QQ群，第一時間提供開發進度、使用手冊、技術諮詢服務等，[如何加入VIP請移步這裡](http://openauth.me/question/detail.html?id=a2be2d61-7fcb-4df8-8be2-9f296c22a89c)**

1. 484498493【已滿】

1. 626433139【已滿】

1. 566344079【2K大群】[![快速加群](https://img.shields.io/badge/qq%E7%BE%A4-566344079-blue.svg)](http://shang.qq.com/wpa/qunwpa?idkey=aa850ac69f1f43ab4be39ecddd6030a937e9236d95966a707fcb667491049fdc)


## 演示直達

* 企業版演示地址： http://demo.openauth.me:1803

* 開源版演示地址： http://demo.openauth.me:1802

## 核心看點

* 支援.net core sdk 3.1.100 及.Net 5（[一分鐘從.net core 3.1切換至.Net 5](https://www.cnblogs.com/yubaolee/p/Net3ToNet5.html)）

* 超強的自定義許可權控制功能，可靈活配置使用者、角色可訪問的數據許可權。請參考：[通用許可權設計與實現](https://www.cnblogs.com/yubaolee/p/DataPrivilege.html)

* 完整的欄位許可權控制，可以控制欄位可見及API是否返回欄位值

* 可拖拽的表單設計  

* 視覺化流程設計  

* 基於Quartz.Net的定時任務控制,可隨時啟/停，視覺化配置Cron表達式功能

* 基於CodeSmith的程式碼產生功能，可快速產生帶有頭/明細結構的頁面

* 支援sqlserver、mysql資料庫，理論上支援所有資料庫

* 整合IdentityServer4，實現基於OAuth2的登錄體系

* 建立三方對接規範，已有系統可以無縫對接流程引擎

* 前端採用 vue + layui + elementUI + ztree + gooflow + leipiformdesign

* 後端採用 .net core +EF core+ autofac + quartz +IdentityServer4 + nunit + swagger

* 設計工具 PowerDesigner + Enterprise Architect

## 秀外

![輸入圖片說明](http://demo.openauth.me:8887/upload_files/200414221432025.png "表單設計")
![輸入圖片說明](https://gitee.com/uploads/images/2018/0328/173337_6e017075_362401.png "表單設計")
![輸入圖片說明](https://gitee.com/uploads/images/2018/0328/150758_26ef9d61_362401.png "流程設計")

## 慧中

教科書級的分層思想，哪怕苛刻的你閱讀的是大神級精典大作（如：《企業應用架構模式》《重構與模式》《ASP.NET設計模式》等），你也可以參考本專案。不信？有圖為證，Resharper自動產生的專案引用關係，毫無PS痕跡！

![輸入圖片說明](https://gitee.com/uploads/images/2015/1113/233705_271ecb3a_362401.jpeg "在這裡輸入圖片標題")

## 許可權資源

符合國情的RBAC（基於角色的訪問控制），可以直接應用到你的系統。具體說明請檢視：[通用許可權設計與實現](https://www.cnblogs.com/yubaolee/p/DataPrivilege.html)

1. 菜單許可權  經理和業務員登陸系統擁有的功能菜單是不一樣的
2. 按鈕許可權  經理能夠審批，而業務員不可以
3. 數據許可權  A業務員看不到B業務員的單據
4. 欄位許可權  某些人查詢客戶資訊時看不到客戶的手機號或其它欄位

**使用者**應用系統的具體操作者，我這裡設計使用者是可以直接給使用者分配菜單/按鈕，也可以通過角色分配許可權。

**角色**為了對許多擁有相似許可權的使用者進行分類管理，定義了角色的概念，以上所有的許可權資源都可以分配給角色，角色和使用者N:N的關係。

**機構**樹形的公司部門結構，國內公司用的比較多，它實際上就是一個使用者組，機構和使用者設計成N:N的關係，也就是說有時候一個使用者可以從屬於兩個部門，這種情況在我們客戶需求中的確都出現過。

## 系統工程結構：
1. Infrastructure 通用工具集合
1. OpenAuth.Repository 系統倉儲層，用於資料庫操作
1. OpenAuth.App 應用層，為界面提供接口
1. OpenAuth.Mvc Web站點
1. OpenAuth.WebApi 為企業版或其他三方系統提供接口服務
1. OpenAuth.Identity 基於IdentityServer4的單點登錄服務

## 使用
管理員可直接在登錄界面用System登錄；

普通應用賬號使用使用者列表的使用者登錄，初始密碼與使用者名稱相同；

## 後續
生命不息，更新不止


