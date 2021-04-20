layui.config({
    base: "/js/"
}).use(['form','vue', 'ztree', 'layer', 'jquery', 'table','droptree','openauth','utils'], function () {
    var form = layui.form,
        layer = layui.layer,
        $ = layui.jquery;
    var table = layui.table;
    var openauth = layui.openauth;
    var toplayer = (top == undefined || top.layer === undefined) ? layer : top.layer;  //頂層的LAYER
   
    $("#menus").loadMenus("Role");

    //主列表載入，角色後臺沒有分頁，直接前端分頁
    var config= {};  //table的參數，如搜索key，點選tree的id
    var mainList = function(options) {
        if (options != undefined) {
            $.extend(config, options);
        }

        $.getJSON('/RoleManager/Load',
            config,
            function(data) {
                table.render({
                    elem: '#mainList',
                    cols: [[
                        { checkbox: true, fixed: true },
                        { field: 'Name', title: '角色名稱' },
                        { field: 'Status', templet: '#Status', title:'角色狀態'},
                        { fixed: 'right', toolbar: '#userList', title:'使用者列表' }
                    ]],
                    data: data.Result,
                    height: 'full-80',
                    limits: [10, 20, 50], //顯示
                    limit: 20 //每頁預設顯示的數量
                })
            })
    }

    mainList();

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

                            }
                        });
                       }else{
                        vm.tmp = Object.assign({}, vm.tmp,data)
                       }
                },
                end: mainList
            });
            var url = "/RoleManager/Add";
            if (update) {
                url = "/RoleManager/Update"; 
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
        if (obj.event === 'userList') {      //檢視
            layer.msg('ID：' + data.Id + ' 的檢視操作');
        } 
    });


    //監聽頁面主按鈕操作
    var active = {
        btnDel: function () {      //批量刪除
            var checkStatus = table.checkStatus('mainList')
                , data = checkStatus.data;
            openauth.del("/RoleManager/Delete",
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
                layer.msg("請選擇要分配的角色");
                return;
            }

            var index = layer.open({
                title: "為角色【" + data[0].Name + "】分配模組/可見欄位",
                type: 2,
                area: ['750px', '600px'],
                content: "/ModuleManager/Assign?type=RoleModule&menuType=RoleElement&id=" + data[0].Id,
                success: function (layero, index) {

                }
            });
        }
        , btnAssignReource: function () {
            var checkStatus = table.checkStatus('mainList')
                , data = checkStatus.data;
            if (data.length != 1) {
                toplayer.msg("請選擇要分配的角色");
                return;
            }

            var index = toplayer.open({
                title: "為角色【" + data[0].Name + "】分配資源",
                type: 2,
                area: ['750px', '600px'],
                content: "/Resources/Assign?type=RoleResource&id=" + data[0].Id,
                success: function (layero, index) {

                }
            });
        }
        , btnRoleAccessUser: function () {
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