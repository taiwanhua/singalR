# 發布部署

直接使用Visual Studio的發布功能，發布到對應的資料夾

* OpenAuth.Mvc發布

![](/dotnetdeploy.png)

* OpenAuth.WebApi發布

![](/dotnetapideploy.png)



然後把對應的發布檔案部署到IIS下。成功后直接訪問：

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
