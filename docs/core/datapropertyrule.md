# 欄位許可權

::: warning 注意
欄位許可權只針對【非系統模組】有效，即在新增新模組的時候，需要設定模組屬性「是否系統」為false。
:::

## 使用場景

欄位許可權控制分為兩種：

1. 直接不返回欄位的值。用於敏感數據不像客戶端反饋。

1. 返回欄位的值，但界面不顯示。常常用於數據需要和後端互動，但不想在界面顯示，比如各種Id。這種直接在返回實體增加`[Browsable(false)]`註解即可。

## 如何做？

### 後端程式碼處理

在做返回處理的時候，需要做以下特殊處理（本文以Resource表為例）

```csharp
var properties = loginContext.GetProperties("Resource");
var propertyStr = string.Join(',', properties.Select(u => u.Key));
result.columnHeaders = properties;
result.data = objs.OrderBy(u => u.Id)
        .Skip((request.page - 1) * request.limit)
        .Take(request.limit).Select($"new ({propertyStr})");
result.count = objs.Count();
return result;
```

### 前端程式碼處理

在做表格的時候需要使用動態列。以`Views/Resources/index.cshtml`為例，如下：

```HTML
 <table class="layui-table" id="mainList"
           lay-data="{height: 'full-80', page:true, id:'mainList'}"
           lay-filter="list" lay-size="sm">
    </table>
```

在使用者自定義的指令碼`wwwroot/userJs/resources.js`中，動態載入列：

```javascript
    //載入表頭
    $.getJSON('/Resources/Load',
	    { page: 1, limit: 1 },
	    function (data) {
		    var columns = data.columnHeaders.filter(u =>u.Browsable ===true).map(function (e) {
			    return {
				    field: e.Key,
				    title: e.Description
			    };
		    });
		    columns.unshift({
			    type: 'checkbox',
			    fixed: 'left'
		    });
		    table.render({
			    elem: '#mainList',
			    page: true,
                url: '/Resources/Load',
			    cols: [columns]
			    , response: {
				    statusCode: 200 //規定成功的狀態碼，預設：0
			    }
		    });
        });
```
### 執行界面配置

完成程式碼編寫后，在【基礎配置】--【角色管理】--【為角色分配模組】最後為角色分配【可見欄位】中分配許可權

![](/roleassignproperty.png)


