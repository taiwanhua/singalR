# 資料庫讀寫及事務處理

OpenAuth.Core使用Repository和Unitwork兩種方式訪問資料庫。

## 使用場景

Repository適用於單表操作，沒有事務需求的場景

Unitwork適用於多表操作（尤其是更新操作），有事務需求的場景


::: tip 什麼是UnitWork
在web應用中，由於每個使用者的請求都是屬於不同執行緒的，需要保持每次請求的所有數據操作都成功的情況下提交數據，只要有一個失敗的操作，則會對使用者的此次請求的所有操作進行回滾，以確保使用者操作的數據始終處於有效的狀態。其實就兩個字：**事務**
:::

## 單表操作Repository

假設資料庫有一個表名稱為Stock。則在OpenAuth.App中編寫業務程式碼。比如`StockApp`

```csharp

namespace OpenAuth.App
{
    public class StockApp : BaseApp<Stock,OpenAuthDBContext>
    {
        /// <summary>
        /// 載入列表
        /// </summary>
        public TableData Load(QueryStockListReq request)
        {
            var result = new TableData();
            var objs = Repository.Find(null);
            if (!string.IsNullOrEmpty(request.key))
            {
                objs = objs.Where(u => u.Id.Contains(request.key));
            }

            result.data = objs.OrderBy(u => u.Id)
                .Skip((request.page - 1) * request.limit)
                .Take(request.limit);
            result.count = objs.Count();
            return result;
        }

        public void Add(AddOrUpdateStockReq req)
        {
            var obj = req.MapTo<Stock>();
            //todo:補充或調整自己需要的欄位
            obj.CreateTime = DateTime.Now;
            Repository.Add(obj);
        }

        public void Update(AddOrUpdateStockReq obj)
        {
            Repository.Update(u => u.Id == obj.Id, u => new Stock
            {
                //todo:補充或調整自己需要的欄位
            });
        }

        public StockApp(IUnitWork<OpenAuthDBContext> unitWork, IRepository<Stock,OpenAuthDBContext> repository,IAuth auth) : base(unitWork, repository,auth)
        {
        }
    }
}
```

## 事務操作UnitWork

預設情況下，EF每執行一次SaveChanges()方法時就會新建一個事務，然後將context中的CUD操作都在這個事務中進行。使用方式如下：

```csharp
        public void Update(AddOrUpdateStockReq obj)
        {

            UnitWork.Add<SysLog>(new SysLog
            {
                //todo:模擬新增操作
            });

            var stock = UnitWork.FirstOrDefault<Stock>(u => u.Id == obj.Id);
            stock.Name = "xxxx";
            UnitWork.Update(stock);  //更新操作

            var other = UnitWork.FirstOrDefault<OtherTable>(u => u.Id == obj.Id);
            other.Name = "xxxx";
            UnitWork.Update(other);  //其他更新操作

            UnitWork.Save();  //只有一次Save()操作

        }

```

如果在一個事務裡面有多次`SaveChanges()`的情況，需要使用OpenAuth.Core提供的`ExecuteWithTransaction`處理。如下：

```csharp
        //程式碼詳見TestTransaction.cs/NormalSubmit()
        UnitWork.ExecuteWithTransaction(() =>
        {
            var account = "user_" + DateTime.Now.ToString("yyyy_MM_dd HH:mm:ss");
            var user = new User
            {
                Id = account,
                Account = account,
                Name = account,
            };

            unitWork.Add(user);
            unitWork.Save();  //第一次savechanges()

            user.Account = "Trans_" + user.Account;
            unitWork.Update(user);
            unitWork.Save();  //第二次savechanges()

            //Z.EntityFramework.Plus的Update內部自動呼叫了SaveChanges()，算第三次
            unitWork.Update<User>(u => u.Id == account, u => new User
            {
                Account = "Trans2_" + user.Account
            });
        });
```

發生這種情況，通常是因為在各個應用層邏輯內部已經呼叫了`UnitWrok.Save()`,比如：

```csharp
        //詳細程式碼請檢視UserManagerApp.cs,本例簡化真實邏輯，方便理解
        private RevelanceManagerApp _revelanceApp;
        public void AddOrUpdate(UpdateUserReq request)
        {
            UnitWork.ExecuteWithTransaction(() =>
            {
                User requser = request;
                requser.CreateTime = DateTime.Now;

                UnitWork.Add(requser);
                UnitWork.Save();

                string[] orgIds = request.OrganizationIds.Split(',').ToArray();
                //下面兩個方法各自內部都會呼叫UnitWork.Save()
                _revelanceApp.DeleteBy(Define.USERORG, requser.Id);
                _revelanceApp.Assign(Define.USERORG, orgIds.ToLookup(u => requser.Id));
            });
        }

```

## 多表查詢

簡單的多表查詢可以使用UnitWork完成。例如：

```csharp
        /// <summary>
        /// 載入使用者的部門
        /// </summary>
        public List<Org> LoadForUser(string userId)
        {
            var result = from userorg in UnitWork.Find<Relevance>(null)
                join org in UnitWork.Find<Org>(null) on userorg.SecondId equals org.Id
                where userorg.FirstId == userId && userorg.Key == Define.USERORG
                select org;
            return result.ToList();
        }
```

如果是複雜的SQL查詢，建議使用下面的SQL語句查詢，以獲得更高的效能。

## SQL 語句查詢

框架提供兩個SQL語句查詢的接口:
* FromSql: 返回資料庫表對應的實體，必需在在DbContext中增加對應的DbSset；

* Query: 返回資料庫中不存在的表實體，必需在在DbContext中增加對應的DbQuery；

### 返回資料庫表

```csharp
  //UserManagerApp.cs
   var users = UnitWork.FromSql<User>("select * from user");
```

### 返回非資料庫表

```csharp
  //OpenAuthDBContext中新增訪問
  public virtual DbQuery<UserResp> UserResps { get; set; }

  //使用
   var users = UnitWork.Query<UserResp>("select * from user");
```

