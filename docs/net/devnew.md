# 新增新模組

本章節以專案自帶的資料庫OpenAuthDB中Stock表為基礎介紹如何新增一個新模組，並對新模組進行授權等操作。

暫且為該模組命名為`倉庫管理`,現在開始：

## 編寫程式碼
 
 * 使用CodeSmith產生資料庫實體訪問程式碼，用於運算元據庫

    * 使用CodeSmith Generator Studio 打開Openauth.Net專案中CodeSmith資料夾。

    ![](http://119.84.146.233:8887/upload_files/190110171420673.png " ")
    
    * 右建Entity.cst，選擇Execute。彈出資料庫的相關配置。
    
    * 配置連線字串SourceDatabase、Class名稱空間的及Output輸出資料夾。

    * 點選`Generate`產生程式碼，產生後代碼在`X:\~~\OpenAuth.Net\CodeSmith\CSharp`資料夾中。

    * 將產生的程式碼按上圖紅色箭頭的指示覆制到專案中。可以只複製`Entities\Stock.cs`、`Mapping\StockMap.cs`、`OpenAuthDBContext.cs`

 * 使用CodeSmith產生界面及邏輯程式碼

    * 右建WebGenerate.cst，選擇Execute。彈出資料庫的相關配置。
    
    * 選擇資料庫中Stock表，其他配置不變。

    ![](http://119.84.146.233:8887/upload_files/190110171420676.png "")

    * 點選`Generate`產生程式碼，產生後代碼在`X:\~~\OpenAuth.Net\CodeSmith\CSharp`資料夾中。

    ![](http://119.84.146.233:8887/upload_files/190110171757977.png "")

    * 產生的程式碼嚴格按照應用層APP、控制器controllers、用戶界面views、用戶界面指令碼userJs劃分。將產生的程式碼複製到專案對應的資料夾中。

 * 在visual studio中根據自己的業務做簡單的調整，然後編譯產生。即完成了一個新模組的開發。

 `注意` 使用程式碼產生器適用於大批量簡單邏輯的程式碼產生，複雜邏輯可以基於現有程式碼直接手動修改。

## 建立模組

 * 新增模組

 ![](http://119.84.146.233:8887/upload_files/190110172049261.png)

 `注意` 模組標識必須和模組的controller一致，否則模組不能正常載入

 * 新增菜單

 ![](http://www.openauth.me/upload/180523111946327.png)

 預設的domId有`btnAdd`、`btnEdit`、`btnDel`可以參考`userJs\stocks.js`中的程式碼定義

 * 授權

 模組新增成功后，如果用的是System賬號，退出重新登陸即可看到新加的模組。如果為其他角色分配模組，按照下面的方式：

![](http://119.84.146.233:8887/upload_files/190110172339544.png)

 以上就是一個普通模組開發的全過程，是不是so easy🙂，快下載程式碼體驗吧！