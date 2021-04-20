layui.config({
    base: "/js/"
}).use(['form', 'vue', 'ztree', 'layer', 'utils', 'element', 'slimscroll', 'jquery', 'droptree', 'openauth', 'flow/gooflow', 'flowlayout'], function () {
    var form = layui.form, element = layui.element,
		layer = (top == undefined || top.layer === undefined )? layui.layer : top.layer,
        $ = layui.jquery;
    var openauth = layui.openauth;
    var index = layer.getFrameIndex(window.name); //獲取視窗索引

   var id = $.getUrlParam("id");   //ID
    $("#FlowInstanceId").val(id);

   
    $.getJSON('/FlowInstances/get?id=' + id,
        function (data) {
            var obj = data.Result;
            var schemeContent = JSON.parse(obj.SchemeContent);
            var flowDesignPanel = $('#flowPanel').flowdesign({
                haveTool: false
                , isprocessing: true
                , activityId: obj.ActivityId
                , nodeData: schemeContent.nodes
                , flowcontent:schemeContent
            });

            if (data.Result.FrmType == 0) {
                $("#frmPreview").html(data.Result.FrmPreviewHtml);
            } else {
	            $("#frmPreview").html("複雜表單暫時只能在<a href='http://demo.openauth.me:1803'>企業版</a>檢視，開源版預計會在以後的開源版本中發布");
            }

            //讓層自適應iframe
            layer.iframeAuto(index);

            $(".GooFlow_work").slimScroll({
                height: 'auto'
            });
        });

    //提交數據
    form.on('submit(formSubmit)',
        function (data) {
            $.post("/FlowInstances/Verification",
                data.field,
                function (result) {
                    layer.msg(result.Message);
                },
                "json");

            return false; //阻止表單跳轉。
        });

    //$(window).resize(function() {
    //    flowDesignPanel.reinitSize($(window).width()-30, $(window).height()-100);
    //});

    //該函式供給父視窗確定時呼叫
    submit = function () {
        //只能用隱藏的submit btn才行，用form.submit()時data.field里沒有數據
        $("#btnSubmit").click();
    }
})