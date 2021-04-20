# WebApi請求驗證

框架提供靈活的實體模型驗證功能。可以方便地對實體進行驗證。只需兩步即可：

## 增加註解

在請求參數中新增驗證註解

```csharp
namespace OpenAuth.App.Request
{
    public  class UpdateUserReq
    {
        /// <summary>
        /// </summary>
        /// <returns></returns>
        [Required(ErrorMessage = "賬號肯定不能為空啊~~")]
        public string Account { get; set; }

        /// <summary>
        /// 使用者姓名
        /// </summary>
        /// <returns></returns>
        [Required(ErrorMessage="姓名不能為空")]
        public string Name { get; set; }


        /// <summary>
        /// 所屬組織Id，多個可用，分隔
        /// </summary>
        /// <value>The organizations.</value>
        [Required(ErrorMessage = "請為使用者分配機構")]
        public string OrganizationIds { get; set; }

        ...
    }
}
```

## 業務程式碼中驗證

在OpenAuth.App中呼叫驗證

```csharp
namespace OpenAuth.App
{
    public class UserManagerApp : BaseApp<User,OpenAuthDBContext>
    {
        public void AddOrUpdate(UpdateUserReq request)
        {
            //驗證Account/Name/OrganizationIds
            request.ValidationEntity(u => new {u.Account,u.Name, u.OrganizationIds});

            ...//其他程式碼略
        }
    }
}
```
