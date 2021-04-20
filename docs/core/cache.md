# 快取機制

## 伺服器快取

在OpenAuth中，快取通過`ICacheContext`接口實現的。系統有兩個實現方式：

* 基於.net自帶的`MemoryCache`實現的`CacheContext`

* 基於`Enyim Memcache`實現的`EnyimMemcachedContext`

可以根據自己需要，擴充套件Redis等快取。OpenAuth.Mvc和OpenAuth.Api預設使用的是CacheContext。可以在`AutofacExt.cs`跟換自己喜歡的快取：
```csharp
public static void InitAutofac(ContainerBuilder builder)
{
    ...
    //更換快取
    builder.RegisterType(typeof(CacheContext)).As(typeof(ICacheContext));
    
}
```


## 伺服器快取有效時間


伺服器預設快取時間為10天，在`LoginParse.cs`中設定
```csharp
_cacheContext.Set(currentSession.Token, currentSession, DateTime.Now.AddDays(10));
```

::: warning 注意
預設使用的是.net的記憶體Cache，在用IIS發布后，由於IIS本身存在自動回收的機制，會導致系統快取20分鐘就會失效。

:::


