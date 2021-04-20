
# OAuth整合

OpenAuth.core支援兩種登錄認證方式：自定義認證和基於IdentityServer的OAuth認證。

這兩種方式通過配置webapi或mvc的appsettings.json可以自由切換:

```json
"IdentityServerUrl": "http://localhost:12796", //IdentityServer伺服器地址。如果為空，則不啟用OAuth認證
```

1. 當IdentityServerUrl為空時，採用普通的token認證，這時不需要OpenAuth.Identity啟動支援。

2. 當IdentityServerUrl配置了地址時，則採用Identity認證方式。這時系統啟動后界面如下：

  ![MVC啟用identity](/mvcidentity.png "mvcidentity")

  這時必須啟動OpenAuth.Identity專案。啟動後效果如下：

  ![](/identity.png)

具體在OpenAuth.Mvc/WebAPI中如何控制登錄訪問並進行許可權控制，請點選[這裡](http://openauth.me/question/detail.html?id=a2be2d61-7fcb-4df8-8be2-9f296c22a89c)