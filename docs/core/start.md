# 快速開始

## 下載程式碼

使用git工具下載程式碼，程式碼地址：https://gitee.com/yubaolee/OpenAuth.Core.git

## 安裝sdk

下載安裝微軟官方SDK，程式碼地址：https://dotnet.microsoft.com/download

## 初始化資料庫

使用資料庫指令碼`sql server 初始化指令碼`或`mysql初始化指令碼` 資料夾裡面的結構指令碼和數據指令碼初始化資料庫

## 打開專案

使用Visual Studio 2019或Rider打開 `OpenAuth.Core.sln`
::: tip 提示
v2.0及以後版本因使用.net core 3.1，必須使用visual Studio 2019及以上版本打開

v2.0以前的版本可以使用visual Studio 2017
:::


## 修改連線字串

* 修改OpenAuth.Mvc/appsettings.json連線字串，如下：
```json
 "OpenAuthDBContext": "Data Source=.;Initial Catalog=OpenAuthDB;User=sa;Password=000000"
 "DbType": "SqlServer" //資料庫型別：SqlServer、MySql
```

* 修改OpenAuth.WebApi/appsettings.json連線字串,如下：
```json
 "OpenAuthDBContext": "Data Source=.;Initial Catalog=OpenAuthDB;User=sa;Password=000000"
 "DbType": "SqlServer" //資料庫型別：SqlServer、MySql
```

## 編譯執行

使用visualstudio產生解決方案。
`註：首次啟動時，visual studio會啟動nuget還原第三方依賴包，請保持網路通暢，並等待一段時間`

啟動openauth.mvc專案。

![啟動](/startmvc.png "啟動")

啟動成功后使用瀏覽器打開[http://localhost:1802](http://localhost:1802) 即可訪問，如下圖所示：

![說明](/mvcmain.png "說明")


