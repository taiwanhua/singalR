# 登錄資訊

框架在應用層任意業務邏輯中，均可以通過`IAuth`接口判斷是否登錄和獲取登錄資訊。所有繼承BaseApp的業務邏輯可以直接使用`_auth`成員變數直接獲取登錄使用者資訊。


```csharp

public class RoleApp : BaseApp<Role,OpenAuthDBContext>
    {
        /// <summary>
        /// 載入當前登錄使用者可訪問的全部角色
        /// </summary>
        public List<Role> Load(QueryRoleListReq request)
        {
            var loginUser = _auth.GetCurrentUser();
             if (loginUser == null)
            {
                throw new CommonException("登錄已過期", Define.INVALID_TOKEN);
            }
           
            //其他程式碼略
        }

        public RoleApp(IUnitWork<OpenAuthDBContext> unitWork, IRepository<Role,OpenAuthDBContext> repository,IAuth auth) : base(unitWork, repository, auth)
        {
        }
    }
```

