# 多租戶

目前市面上主流的多租戶方案有三種：

1. **獨立資料庫** 即為不同的租戶提供獨立的資料庫。

1. **共享資料庫，獨立Schema** 即多個或所有租戶共享一個資料庫實例，但是每個租戶一個Schema（也可叫做一個user）。底層庫比如是：DB2、ORACLE等，一個資料庫下可以有多個SCHEMA。

1. **共享資料庫，共享Schema，共享數據表** 即租戶共享同一個資料庫實例、同一個Schema，但在表中增加TenantID多租戶的數據欄位，在程式邏輯上進行區分。

為了相容以前的版本，OpenAuth採用的是第一種方式，即為每個租戶建一個新的資料庫，然後通過客戶端請求的租戶Id（tenantId）來分離數據。


## 如何增加一個新租戶？

#### 後端新增

後端新增新租戶連線字串即可：

```javascript
  "ConnectionStrings": {
    "new_tenantid": "server=127.0.0.1;user id=root;database=openauthpro;password=000000" //新租戶id對應的連線字串
  },
```

::: warning 注意
這裡為了方便理解，租戶id用的是`new_tenantid`,真實環境里，最好用類似UUID風格的無意義id
:::

#### 前端新增

比如在vue element-ui中,在登錄時增加選擇租戶列表：

```html

  <el-select v-model="tenant" placeholder="請選擇" @change="tenantChange">
    <el-option
        v-for="item in tenants"
        :key="item.value"
        :label="item.label"
        :value="item.value">
    </el-option>
 </el-select>


export default {
    name: 'login',
    data() {
        return {
        tenant: this.tenantid || 'OpenAuthDBContext',  //當前選擇的租戶
        tenants:[{
          value: 'OpenAuthDBContext',
          label: '預設租戶'
        },{   //新增的新租戶
          value: 'new_tenantid',
          label: '新租戶'
        }]
        }
    }
}
```

前端在所有http請求的時候，在請求頭中增加`tenantId`資訊,保證每次請求帶上租戶資訊。比如用axios請求時：

```javascript

// 建立axios實例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 50000 // 請求超時時間
})

// request攔截器
service.interceptors.request.use(config => {
  config.headers['tenantId'] = store.getters.tenantid
  //其他程式碼略...
})

```

