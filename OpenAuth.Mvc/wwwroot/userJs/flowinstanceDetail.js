layui.config({
    base: "/js/"
}).use(['form','table', 'vue', 'layer', 'utils', 'element', 'jquery', 'slimscroll', 'flow/gooflow', 'flowlayout'], function () {
    var form = layui.form, element = layui.element,
        table = layui.table,
		layer = (top == undefined || top.layer === undefined )? layui.layer : top.layer,
        $ = layui.jquery;
    var index = layer.getFrameIndex(window.name); //獲取視窗索引

    var id = $.getUrlParam("id");   //ID
    var flowDesignPanel;

    table.render({
        elem: '#mainList',
        page: false,
        url: '/FlowInstances/QueryHistories',
        cols: [[ //標題欄
            { field: 'Content', title: '流轉記錄' }
            , { field: 'CreateUserName', title: '操作人' }
            , { field: 'CreateDate', title: '流轉時間' }
        ]]
        , where: {
            FlowInstanceId:id
        }
        , parseData: function (res) { //res 即為原始返回的數據
            return {
                "code": res.Code, //解析接口狀態
                "data": res.Result //解析數據列表
            };
        }
        , response: {
            statusCode: 200 //規定成功的狀態碼，預設：0
        }
    });
   
    $.getJSON('/FlowInstances/get?id=' + id,
        function (data) {
            var obj = data.Result;
            var schemeContent = JSON.parse(obj.SchemeContent);
            flowDesignPanel = $('#flowPanel').flowdesign({
                haveTool: false
                , isprocessing: true
                , activityId: obj.ActivityId
                , nodeData: schemeContent.nodes
                , flowcontent:schemeContent
            });

            $(".GooFlow_work").slimScroll({
                height:'auto'
            });
            if (data.Result.FrmType == 0) {
	            $("#frmPreview").html(data.Result.FrmPreviewHtml);
            } else {
	            $("#frmPreview").html("複雜表單暫時只能在<a href='http://demo.openauth.me:1803'>企業版</a>檢視，開源版預計會在以後的開源版本中發布");
            }

            flowDesignPanel.reinitSize($(window).width() - 30, $(window).height() - 120);
        });

    $(window).resize(function() {
        flowDesignPanel.reinitSize($(window).width()-30, $(window).height()-120);
    });

    //讓層自適應iframe
     //layer.iframeAuto(index);
})