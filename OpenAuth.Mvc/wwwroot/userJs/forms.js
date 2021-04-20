layui.config({
    base: "/js/"
}).use(['form','vue', 'ztree', 'layer', 'jquery', 'table','droptree','openauth','utils'], function () {
    var form = layui.form,
        element = layui.element,
		layer = (top == undefined || top.layer === undefined )? layui.layer : top.layer,
        $ = layui.jquery;
    var table = layui.table;
    var openauth = layui.openauth;

    var thiswin = (top == undefined) ? window : top.window;


    layui.droptree("/UserSession/GetOrgs", "#Organizations", "#OrganizationIds");
    $("#menus").loadMenus("Form");
    //主列表載入，可反覆呼叫進行重新整理
    var config= {};  //table的參數，如搜索key，點選tree的id
    var mainList = function (options) {
        if (options != undefined) {
            $.extend(config, options);
        }
        table.reload('mainList', {
            url: '/Forms/Load',
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

    //新增（編輯）對話方塊
    var editDlg = function() {
        var update = false;  //是否為更新
        var show = function (data) {
            var title = update ? "編輯資訊" : "新增";

            layer.open({
                type: 2,
                area: ['800px', '700px'], //寬高
                maxmin: true, //開啟最大化最小化按鈕
                title: title,
                content: '/forms/edit?id=' + data.Id,
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
        return {
            add: function() { //彈出新增
                update = false;
                show({
                    Id: ''
                });
            },
            update: function(data) { //彈出編輯框
                update = true;
                show(data);
            }
        };
    }();
    
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
            openauth.del("/Forms/Delete",
                data.map(function (e) { return e.Id; }),
                mainList);
        }
        , btnAdd: function () {  //新增
            editDlg.add();
        }
         , btnEdit: function () {  //編輯
             var checkStatus = table.checkStatus('mainList')
               , data = checkStatus.data;
             if (data.length != 1) {
                 layer.msg("請選擇編輯的行，且同時只能編輯一行");
                 return;
             }
             editDlg.update(data[0]);
         }
        , btnPreview:function() {
            var checkStatus = table.checkStatus('mainList')
            , data = checkStatus.data;
            if (data.length != 1) {
                layer.msg("請選擇要預覽的行，且同時只能編輯一行");
                return;
            }
            
            layer.open({
                type: 2,
                area: ["800px", "700px"],
                content: '/forms/preview?id=' + data[0].Id
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