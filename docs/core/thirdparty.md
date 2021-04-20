# 三方對接

* 在OpenAuth中設計表單，注意表單中的控制元件名稱，在步驟3呼叫OpenAuth建立流程實例接口時，frmData參數中的屬性必須嚴格按該命名提交。

![](/formthirdparty.png "表單設計說明")


* 在OpenAuth中設計流程，制定相關的工作流程，並在每個流程節點配置回撥URL路徑，如下：

![](/flowthirdparty.png "三方URL設定")

* 三方已有系統界面，提交表單時，呼叫建立流程實例接口：http://localhost:52789/api/FlowInstances/Add，在OpenAuth中建立一條新的流程實例； 接口參數如下：

```javascript
    {
        schemeId:'cdd8191e-6a99-4d66-aac0-fae52c0f2232', //流程模板中已存在的模板ID
        schemeCode:'', //與流程模板ID二者選一個即可
        frmData:'{\"TOOLS\":\"電腦\",\"NUMBERS\":\"1\"}', //嚴格按照第一步中表單規則
        code:'1563811467051',
        customName:'三方建立的新物品領用',
    }
```

* 使用者正常在OpenAuth中執行流程，如果當前節點設定了回撥URL的節點，OpenAuth會採用WebAPI POST方式回撥，回撥時具體參數如下：
```javascript
{
    flowInstanceId:"0ceff0f8-f848-440c-bc26-d8605ac858cd",  //流程實例ID
    nodeName: "admin審批",      //節點名稱
    nodeId: "15333321",         //節點ID
    userId: "0ceff0f8-f848-440c-bc26-d8605ac858cd",
    userName: "admin",          //審核人賬號
    result: 1,                  //審核結果 1：通過;2：不通過；3駁回
    description: "做的不錯",     //審核描述
    execTime: "2019-07-07 12:00:00",   //審核時間
    isFinish: true                     //是否結束
}
```