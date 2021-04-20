layui.config({
    base: "/js/"
}).use(['form', 'vue', 'ztree', 'layer', 'utils', 'element', 'jquery', 'slimscroll',  'flow/gooflow', 'flowlayout'], function () {
    var form = layui.form, element = layui.element,
        layer = layui.layer,
        $ = layui.jquery;

    var index = layer.getFrameIndex(window.name); //獲取視窗索引
    var id = $.getUrlParam("id");   //ID
    
    /*=========流程設計（begin）======================*/
    var flowDesignPanel = $('#flowPanel').flowdesign({
        height: 300,
        widht: 300,
        haveTool: false,
        OpenNode: function (object) {
            FlowDesignObject = object;  //為NodeInfo視窗提供呼叫

            if (object.type == 'start round mix' || object.type == 'end round') {
                layer.msg("開始節點與結束節點不能設定");
                return false;
            }

            layer.open({
                type: 2,
                area: ['550px', '450px'], //寬高
                maxmin: true, //開啟最大化最小化按鈕
                title: '節點設定【' + object.name + '】',
                content: '/flowschemes/nodeInfo',
                btn: ['確定', '取消'],
                yes: function (index, layero) {
                    var body = layer.getChildFrame('body', index);
                    var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe頁的視窗對象，執行iframe頁的方法：iframeWin.method();
                    var nodedata = iframeWin.getVal();
                    flowDesignPanel.SetNodeEx(object.id, nodedata);
                    layer.close(index);
                },
                cancel: function (index) {
                    layer.close(index);
                }
            });
        },
        OpenLine: function (id, object) {
            lay.msg("暫不能設定分支條件");
            return;
        }
    });
    /*=========流程設計（end）=====================*/


    $.getJSON('/flowschemes/get?id=' + id,
        function (data) {
            var obj = data.Result;
            
            flowDesignPanel.loadData(JSON.parse(obj.SchemeContent));

            $.getJSON("/forms/get?id=" + obj.FrmId, function (data) {
                if (data.Result.FrmType == 0) {
                    $("#frmPreview").html(data.Result.Html);
                } else {
                    $("#frmPreview").html("複雜表單暫時只能在<a href='http://demo.openauth.me:1803'>企業版</a>檢視，開源版預計會在以後的開源版本中發布");
                }
            });
        });


    flowDesignPanel.reinitSize($(window).width() - 30, $(window).height() - 100);
    $(window).resize(function () {
        flowDesignPanel.reinitSize($(window).width() - 30, $(window).height() - 100);
    });

    //讓層自適應iframe
    layer.iframeAuto(index);

    $(".GooFlow_work").slimScroll({
        height: 'auto'
    });
})