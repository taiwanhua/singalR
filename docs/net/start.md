# 快速開始

## 下載程式碼

使用git工具下載程式碼，程式碼地址：https://gitee.com/yubaolee/OpenAuth.Net.git

## 修改連線字串

* 修改OpenAuth.Mvc/Web.config連線字串，如下：
```xml
 <add name="OpenAuthDBContext" connectionString="Data Source=.;Initial Catalog=OpenAuthDB;Persist Security Info=True;User ID=sa;Password=000000;MultipleActiveResultSets=True" providerName="System.Data.SqlClient" />
```

* 修改OpenAuth.WebApi/Web.config連線字串,如下：
```xml
 <add name="OpenAuthDBContext" connectionString="Data Source=.;Initial Catalog=OpenAuthDB;Persist Security Info=True;User ID=sa;Password=000000;MultipleActiveResultSets=True" providerName="System.Data.SqlClient" />
```

## 設定啟動項

在vs解決方案檢視中，右鍵解決方案「OpenAuth」屬性，調整啟動項，如下：
![設定啟動項](/dotnetstart.png "設定啟動項")

::: warning 提別提醒

很多人啟動的時候會遇到下面這個異常

![](/starterror.png)

99.9999%的人是因為沒有啟動OpenAuth.WebApi專案造成的。務必按上面進行啟動項設定🙂
:::

## 編譯執行

使用Visual Studio菜單欄中的【啟動】按鈕或快捷鍵F5，啟動執行。
`註：首次啟動時，visual studio會啟動nuget還原第三方依賴包，請保持網路通暢，並等待一段時間`

啟動成功后，可以在瀏覽器訪問兩個網址：

* [http://localhost:56813](http://localhost:56813) 為專案的主界面，對應OpenAuth.Mvc專案。如下圖所示：
![說明](https://gitee.com/uploads/images/2018/0328/150659_6900820e_362401.png "說明")

* [http://localhost:52789/Swagger/ui/index](http://localhost:52789/Swagger/ui/index)  為專案WebApi接口部分，對應OpenAuth.WebApi專案，主要為其他專案提供資料連接埠及為OpenAuth.Mvc提供單點登錄SSO功能。這是一個純WebAPI專案，本身是沒有界面的（所以3.0以前的版本會報找不到頁面的錯誤），為了美觀，增加了swagger的支援！
![](/donetswagger.png)


::: warning 提別提醒

如果WebApi不是使用的52789埠，需要在OpenAuth.Mvc的Web.config中修改下面配置：

```xml
<add key="SSOPassport" value="http://localhost:你的埠號" />
```
:::



## 更多文件

如需更多文件請點選[這裡](http://openauth.me/question/detail.html?id=a2be2d61-7fcb-4df8-8be2-9f296c22a89c)

![更多文件](http://demo.openauth.me:8887/upload_files/200415002234330.png "更多文件")