layui.config({
    base: "/js/"
}).use(['form','vue', 'ztree', 'layer', 'jquery', 'table','droptree','openauth','utils'], function () {
    var form = layui.form,
		layer = (top == undefined || top.layer === undefined )? layui.layer : top.layer,
        $ = layui.jquery;
    var table = layui.table;
    var openauth = layui.openauth;
    var thiswin = (top == undefined) ? window : top.window;
    layui.droptree("/UserSession/GetOrgs", "#Organizations", "#OrganizationIds");

    $("#menus").loadMenus("FlowInstanceWait");
   
    //主列表載入，可反覆呼叫進行重新整理
    var config= {
        type:'wait'
    };  //table的參數，如搜索key，點選tree的id
    var mainList = function (options) {
        if (options != undefined) {
            $.extend(config, options);
        }
        table.reload('mainList', {
            url: '/FlowInstances/Load',
            where: config
            , response: {
                statusCode: 200 //規定成功的狀態碼，預設：0
            } 
        });
    }
    //左邊樹狀機構列表
    var ztree = function () {
        var url = '/UserSession/GetOrgs';
        var zTreeObj;
        var setting = {
            view: { selectedMulti: false },
            data: {
                key: {
                    name: 'Name',
                    title: 'Name'
                },
                simpleData: {
                    enable: true,
                    idKey: 'Id',
                    pIdKey: 'ParentId',
                    rootPId: 'null'
                }
            },
            callback: {
                onClick: function (event, treeId, treeNode) {
                    mainList({ orgId: treeNode.Id });
                }
            }
        };
        var load = function () {
            $.getJSON(url, function (json) {
                zTreeObj = $.fn.zTree.init($("#tree"), setting);
                var newNode = { Name: "根節點", Id: null, ParentId: "" };
                json.Result.push(newNode);
                zTreeObj.addNodes(null, json.Result);
                mainList({ orgId: "" });
                zTreeObj.expandAll(true);
            });
        };
        load();
        return {
            reload: load
        }
    }();
    $("#tree").height($("div.layui-table-view").height());

   
    //監聽表格內部按鈕
    table.on('tool(list)', function (obj) {
        var data = obj.data;
        if (obj.event === 'detail') {      //檢視
            layer.msg('ID：' + data.Id + ' 的檢視操作');
        } 
    });

    //監聽頁面主按鈕操作
    var active = {
       btnVerification: function () {  //處理
            var checkStatus = table.checkStatus('mainList')
                , data = checkStatus.data;
            if (data.length != 1) {
                layer.msg("請選擇要處理的流程，且同時只能選擇一條");
                return;
            }

            layer.open({
                type: 2,
                area: ['800px', '600px'], //寬高
                maxmin: true, //開啟最大化最小化按鈕
                title: '處理流程',
                content: ['/flowInstances/Verification?id=' + data[0].Id,'no'],
                btn: ['儲存', '關閉'],
                yes: function (index, layero) {
                    var iframeWin = thiswin[layero.find('iframe')[0]['name']]; //得到iframe頁的視窗對象，執行iframe頁的方法：iframeWin.method();
                    iframeWin.submit();
                },
                btn2: function (index) {
                    layer.close(index);
                    mainList();
                },
                cancel: function (index) {
                    layer.close(index);
                    mainList();
                }
            });
        }

       , btnDetail: function () {  //處理
           var checkStatus = table.checkStatus('mainList')
               , data = checkStatus.data;
           if (data.length != 1) {
               layer.msg("請選擇要處理的流程，且同時只能選擇一條");
               return;
           }

           layer.open({
               type: 2,
               area: ['800px', '600px'], //寬高
               maxmin: true, //開啟最大化最小化按鈕
               title: '進度詳情',
               content: ['/flowInstances/detail?id=' + data[0].Id, 'no'],
               btn: ['關閉'],
               yes: function (index) {
                   layer.close(index);
                   mainList();
               },
               cancel: function (index) {
                   layer.close(index);
                   mainList();
               }
           });
       }
        , search: function () {   //搜索
            mainList({ key: $('#key').val() });
        }
        , btnRefresh: function() {
            mainList();
        }
    };

    $('.toolList .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    //監聽頁面主按鈕操作 end
})