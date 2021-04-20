# 單元測試

為了方便專案除錯，框架的所有層均支援單元測試。程式碼基於NUnit框架編寫。測試內如大概如下：

* OpenAuth.Reposiroty: 直接測試資料庫是否可以正常讀寫，測試級別DbContext。在該專案的`TestBase.cs`中配置連線字串；

* OpenAuth.App: 測試所有業務邏輯，測試級別為各種xxxApp/xxxService等。可以模擬使用者登錄和前端Cookie提交的資訊。在該專案的`TestBase.cs`中配置連線字串；

* OpenAuth.Mvc: 測試MVC的訪問，可以模擬使用者登錄和前端Cookie提交的資訊。使用OpenAuth.App中的測試連線字串；

* OpenAuth.WebApi: 測試接口WebApi訪問，可以模擬使用者登錄和前端Cookie提交的資訊。使用OpenAuth.App中的測試連線字串；

所有的測試程式碼均在每個專案的`Test`資料夾中編寫。比如`OpenAuth.App\Test\TestAccessObjs.cs`：

```csharp
/// <summary>
/// 測試為部門分配使用者
/// </summary>
[Test]
public void AssignOrgUsers()
{
    var app = _autofacServiceProvider.GetService<RevelanceManagerApp>();
    var userApp = _autofacServiceProvider.GetService<UserManagerApp>();

    app.AssignOrgUsers(new AssignOrgUsers
    {
        OrgId = "8e31553c-cab8-4eb3-90b5-5f8ff1d21801",
        UserIds = new []{"96f63f9d-e8c8-4258-963e-3327ed7d6f56"}
    });

    //獲取機構的所有使用者
    var result = userApp.Load(new QueryUserListReq
    {
        orgId = "8e31553c-cab8-4eb3-90b5-5f8ff1d21801",
        page = 1,
        limit = 10
    });
    
    Console.WriteLine(JsonHelper.Instance.Serialize(result));
}
```

::: warning 注意

每個單元測試類都會繼承`TestBase`，該類有一個虛擬函式`GetService`，預設只注入了快取Cache，配置Option。如果在測試的過程中需要模擬登錄使用者，cookie等資訊，需要在測試類中重寫該方法。比如一個典型的重寫如下：

```csharp
public override ServiceCollection GetService()
{
    var services = new ServiceCollection();

    //模擬帳號test3記錄在快取中，並與tokentest關聯
    var cachemock = new Mock<ICacheContext>();
    cachemock.Setup(x => x.Get<UserAuthSession>("tokentest")).Returns(new UserAuthSession { Account = "test3" });
    services.AddScoped(x => cachemock.Object);

    //模擬客戶端請求的token值為`tokentest`
    var httpContextAccessorMock = new Mock<IHttpContextAccessor>();
    httpContextAccessorMock.Setup(x => x.HttpContext.Request.Query[Define.TOKEN_NAME]).Returns("tokentest");
    services.AddScoped(x => httpContextAccessorMock.Object);

    //模擬httpclientfactory
    var mockHttpFac = new Mock<IHttpClientFactory>();
    services.AddScoped(x => mockHttpFac.Object);

    return services;
}
```

:::


