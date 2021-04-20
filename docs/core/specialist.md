# 開發規範

## 新增資料庫名稱規範

子系統名稱+業務名稱+表尾，其中表尾名稱規則如下：

- 基礎主數據以Mst結尾；

- 普通業務表以Tbl結尾；

- 業務明細表以Dtbl結尾；

比如：

- WMS系統客戶主數據表：WmsCustomerMst

- WMS系統入庫訂單頭表：WmsInboundOrderTbl

- WMS系統入庫訂單明細表：WmsInboundOrderDtbl



## 資料庫欄位型別

主鍵id統一使用Domain:PrimaryKey（針對SqlServer資料庫，非Sql Server根據需要定義）

狀態類,標識類的欄位，統一使用bit not null

表示分類的欄位，統一使用PrimaryKey。數值從Category中獲取。



