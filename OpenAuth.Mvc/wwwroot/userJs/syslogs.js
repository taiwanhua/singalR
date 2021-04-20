layui.config({
    base: "/js/"
}).use(['form', 'vue', 'ztree', 'layer', 'jquery', 'table', 'droptree', 'openauth', 'utils'], function () {
    var form = layui.form,
        layer = layui.layer,
        $ = layui.jquery;
    var table = layui.table;
    var openauth = layui.openauth;
    var toplayer = (top == undefined || top.layer === undefined) ? layer : top.layer;  //頂層的LAYER

    $("#menus").loadMenus("SysLog");


    //載入表頭
    $.getJSON('/SysLogs/Load',
	    { page: 1, limit: 1 },
	    function (data) {
		    table.render({
                elem: '#mainList'
			   , page: true,
                url: '/SysLogs/Load',
                cols: [[ //表頭
                     { field: 'Content', title: '內容' }
                    , { field: 'Href', title: '訪問地址' }
                    , { field: 'CreateName', title: '操作人' }
                    , { field: 'Application', title: '所屬應用' }
                    , { field: 'Result', title: '操作結果', templet: '#Result' }
                    , { field: 'CreateTime', title: '記錄時間' }
                ]]
			    , response: {
				    statusCode: 200 //規定成功的狀態碼，預設：0
			    }
		    });
        });


    //主列表載入，可反覆呼叫進行重新整理
    var config = {};  //table的參數，如搜索key，點選tree的id
    var mainList = function(options) {
        if (options != undefined) {
            $.extend(config, options);
        }
        table.reload('mainList',
            {
                url: '/SysLogs/Load',
                where: config
                , response: {
                    statusCode: 200 //規定成功的狀態碼，預設：0
                } 
            });
    };
    mainList();
 


    //監聽表格內部按鈕
    table.on('tool(list)', function (obj) {
        var data = obj.data;
        if (obj.event === 'detail') {      //檢視
            layer.msg('ID：' + data.Id + ' 的檢視操作');
        }
    });


    //監聽頁面主按鈕操作
    var active = {
        btnDel: function () {      //批量刪除
            var checkStatus = table.checkStatus('mainList')
                , data = checkStatus.data;
            openauth.del("/SysLogs/Delete",
                data.map(function (e) { return e.Id; }),
                mainList);
        }

        , search: function () {   //搜索
            mainList({ key: $('#key').val() });
        }
        , btnRefresh: function () {
            mainList();
        }
    };

    $('.toolList .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    //監聽頁面主按鈕操作 end
})
