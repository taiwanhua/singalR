# 資料庫實體

## 跟換主鍵名稱

系統預設的主鍵是以`Id`命名，如果資料庫主鍵是其他名稱，可以直接用註解進行更改：

```csharp
 [Column("CustomerId")]
 public string Id { get; set; }
```


## 新增非統一主鍵

系統預設的主鍵是以`Id`命名，如果資料庫表中存在其他型別或名稱的主鍵，可以通過繼承`BaseEntity`實現

```csharp
/// <summary>
/// 模擬一個實體IntEntity，主鍵名稱為IdName，型別為Int
/// </summary>
public class IntEntity : BaseEntity
{
    [Browsable(false)]
    public int IdName { get; set; }
    
    //其他欄位略
    
    /// <summary>
    /// 判斷主鍵是否為空，常用做判定操作是【新增】還是【編輯】
    /// </summary>
    /// <returns></returns>
    public override bool KeyIsNull()
    {
        return IdName == 0;
    }

    /// <summary>
    /// 建立預設的主鍵值
    /// </summary>
    public override void GenerateDefaultKeyVal()
    {
        Id = RandomInt();
    }
}
```

::: warning 注意
最新版才支援，以前的版本（2.0或以前的版本）可以參考BaseEntity進行改造

:::


