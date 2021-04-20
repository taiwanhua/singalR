layui.config({
    base: "/js/"
}).use(['form','vue', 'ztree', 'layer', 'jquery', 'table','droptree','openauth','utils'], function () {
    var form = layui.form,
        layer = layui.layer,
        $ = layui.jquery;
    var table = layui.table;
    var openauth = layui.openauth;
    var toplayer = (top == undefined || top.layer === undefined) ? layer : top.layer;  //頂層的LAYER
   
    $("#menus").loadMenus("User");

    //主列表載入，可反覆呼叫進行重新整理
    var config= {};  //table的參數，如搜索key，點選tree的id
    var mainList = function (options) {
        if (options != undefined) {
            $.extend(config, options);
        }
        table.reload('mainList', {
            url: '/UserManager/Load',
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
                    rootPId: ""
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
                var newNode = { Name: "根節點", Id: null,ParentId:"" };
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

    $("#tree").height( $("div.layui-table-view").height());

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
                                        //layui.droptree("/UserSession/GetOrgs", "#Organizations", "#OrganizationIds");
                                   })
                                }
                            },
                            mounted(){
                                form.render();
                                var _this = this;
                                layui.droptree("/UserSession/GetOrgs", "#Organizations", "#OrganizationIds", true,function (ids, names) {
                                    _this.tmp.OrganizationIds = ids;
                                    _this.tmp.Organizations = names;
                                });
                            }
                        });
                       }else{
                        vm.tmp = Object.assign({}, vm.tmp,data)
                       }
                },
                end: mainList
            });
            var url = "/UserManager/AddOrUpdate";
            if (update) {
                url = "/UserManager/AddOrUpdate"; //暫時和新增一個地址
            }
            //提交數據
            form.on('submit(formSubmit)',
                function(data) {
                    $.post(url,
                        data.field,
                        function(data) {
                            layer.msg(data.Message);
                        },
                        "json");
                    return false;
                });

            //重置
            $("#reset").click(function(){
                vm.tmp = {
                    OrganizationIds:'',
                    Organizations:''
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
            openauth.del("/UserManager/Delete",
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

        , search: function () {   //搜索
            mainList({ key: $('#key').val() });
        }
        , btnRefresh: function() {
            mainList();
        }
        , btnAccessModule: function () {
            var checkStatus = table.checkStatus('mainList')
               , data = checkStatus.data;
            if (data.length != 1) {
                toplayer.msg("請選擇要分配的使用者");
                return;
            }

            var index = toplayer.open({
                title: "為使用者【" + data[0].Name + "】分配模組/可見欄位",
                type: 2,
                area: ['750px', '600px'],
                content: "/ModuleManager/Assign?type=UserModule&menuType=UserElement&id=" + data[0].Id,
                success: function(layero, index) {
                    
                }
            });
        }
        , btnAccessRole: function () {
            var checkStatus = table.checkStatus('mainList')
               , data = checkStatus.data;
            if (data.length != 1) {
                toplayer.msg("請選擇要分配的使用者");
                return;
            }

            var index = toplayer.open({
                title: "為使用者【"+ data[0].Name + "】分配角色",
                type: 2,
                area: ['750px', '600px'],
                content: "/RoleManager/Assign?type=UserRole&id=" + data[0].Id,
                success: function (layero, index) {

                }
            });
        }
        , btnAssignReource: function () {
            var checkStatus = table.checkStatus('mainList')
                , data = checkStatus.data;
            if (data.length != 1) {
                toplayer.msg("請選擇要分配的使用者");
                return;
            }

            var index = toplayer.open({
                title: "為使用者【" + data[0].Name + "】分配資源",
                type: 2,
                area: ['750px', '600px'],
                content: "/Resources/Assign?type=UserResource&id=" + data[0].Id,
                success: function (layero, index) {

                }
            });
        }
    };

    $('.toolList .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    //監聽頁面主按鈕操作 end
})