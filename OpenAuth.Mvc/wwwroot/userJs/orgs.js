    layui.config({
    base: "/js/"
}).use(['form','vue', 'ztree', 'layer', 'jquery', 'table','droptree','openauth','utils'], function () {
    var form = layui.form,
        layer = layui.layer,
        $ = layui.jquery;
    var table = layui.table;
    var openauth = layui.openauth;

    $("#menus").loadMenus("Org");
   
    //主列表載入，可反覆呼叫進行重新整理
    var config= {};  //table的參數，如搜索key，點選tree的id
    var mainList = function (options) {
        if (options != undefined) {
            $.extend(config, options);
        }
        table.reload('mainList', {
            url: '/UserSession/GetSubOrgs',
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
        var vm;
        var update = false;  //是否為更新
        var show = function (data) {
            var title = update ? "編輯資訊" : "新增";
            layer.open({
                title: title,
                area: ["500px", "400px"],
                type: 1,
                content: $('#divEdit'),
                success: function() {
                    if(vm == undefined){
                        vm = new Vue({
                            el: "#formEdit",
                            data(){
                                return {
                                    tmp:data  //使用一個tmp封裝一下，後面可以直接用vm.tmp賦值
                                }
                            },
                            watch:{
                                tmp(val){
                                    this.$nextTick(function () {
                                       form.render();  //重新整理select等
                                   })
                                }
                            },
                            mounted(){
                                form.render();
                                var _this = this;
                                layui.droptree("/UserSession/GetOrgs", "#ParentName", "#ParentId", false,function (ids, names) {
                                    _this.tmp.ParentId = ids;
                                    _this.tmp.ParentName = names;
                                });

                            }
                        });
                    } else {
                        vm.tmp = Object.assign({}, vm.tmp,data)
                       }
                },
                end: mainList
            });
            var url = "/OrgManager/Add";
            if (update) {
                url = "/OrgManager/Update"; //暫時和新增一個地址
            }
            //提交數據
            form.on('submit(formSubmit)',
                function(data) {
                    $.post(url,
                        data.field,
                        function(data) {
                            layer.msg(data.Message);
                            if ((!update) && data.Code == 200) {  //新增成功要重新整理左邊的樹
                                ztree.reload();
                            }
                        },
                        "json");
                    return false;
                });
        }
        return {
            add: function() { //彈出新增
                update = false;
                show({
                    Id: '',
                    SortNo:1
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
            openauth.del("/OrgManager/Delete",
                data.map(function (e) { return e.Id; }),
                function() {
                    mainList();
                    ztree.reload();
                });
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

        , search: function () {   //搜索
            mainList({ key: $('#key').val() });
        }
        , btnRefresh: function() {
            mainList();
        }
        , btnAccessModule: function () {
            var index = layer.open({
                title: "為使用者分配模組/可見欄位",
                type: 2,
                content: "newsAdd.html",
                success: function(layero, index) {
                    
                }
            });
        }
        , btnAssignOrgUser: function () {
            var checkStatus = table.checkStatus('mainList')
                , data = checkStatus.data;
            if (data.length != 1) {
                toplayer.msg("請選擇要分配的角色");
                return;
            }
            layer.msg("開發中...   ");
        }
    };

    $('.toolList .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    //監聽頁面主按鈕操作 end
})