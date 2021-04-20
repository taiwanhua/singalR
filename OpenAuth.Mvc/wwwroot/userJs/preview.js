layui.config({
    base: "/js/"
}).use(['form','vue', 'layer', 'jquery', 'table','droptree','utils'], function () {
    var form = layui.form,
        element = layui.element,
		layer = (top == undefined || top.layer === undefined )? layui.layer : top.layer,
        $ = layui.jquery;
    var id = $.getUrlParam("id");
    $.getJSON("/forms/get?id=" + id, function (data) {
	    if (data.Result.FrmType == 0) {
		    $("#content").html(data.Result.Html);
	    } else {
            $("#content").html("複雜表單暫時只能在<a href='http://demo.openauth.me:1803'>企業版</a>檢視，開源版預計會在以後的開源版本中發布");
	    }
    });

})