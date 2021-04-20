layui.config({
    base: "/js/"
}).use(['form','vue', 'ztree', 'layer', 'jquery', 'table', 'droptree', 'openauth', 'iconPicker', 'utils'], function () {
    var form = layui.form,
        layer = layui.layer,
        $ = layui.jquery;
    var iconPicker = layui.iconPicker;
    var btnIconPicker = layui.iconPicker;
    var vmMenu = new Vue({
            el: "#mfromEdit",
            data(){
                return {
                    tmp: {}  
                }
            },
            watch:{
                tmp(val){
                    this.$nextTick(function () {
                        form.render();  //重新整理select等
                        btnIconPicker.checkIcon('btnIconPicker', this.tmp.Icon);
                    })
                }
            },
            mounted(){
                form.render();
            }
        });
    var  vmModule = new Vue({
            el: "#formEdit",
            data(){
                return {
                    tmp: {}  //使用一個tmp封裝一下，後面可以直接用vm.tmp賦值
                }
            },
            watch:{
                tmp(val){
                    this.$nextTick(function () {
                        form.render();  //重新整理select等
                        layui.droptree("/UserSession/GetModules", "#ParentName", "#ParentId", false);
    
                        iconPicker.checkIcon('iconPicker', this.tmp.IconName);
                    })
                }
            },
            mounted(){
                form.render();
                layui.droptree("/UserSession/GetModules", "#ParentName", "#ParentId", false);
            }
        });
    iconPicker.render({
        // 選擇器，推薦使用input
        elem: '#IconName',
        type: 'fontClass',
        // 每個圖示格子的寬度：'43px'或'20%'
        cellWidth: '43px',
        // 點選回撥
        click: function (data) {
            vmModule.tmp.IconName = data.icon;
        }
    });
    btnIconPicker.render({   //按鈕的圖示
        // 選擇器，推薦使用input
        elem: '#Icon',
        type: 'fontClass',
        // 每個圖示格子的寬度：'43px'或'20%'
        cellWidth: '43px',
        // 點選回撥
        click: function (data) {
            vmMenu.tmp.Icon = data.icon;
        }
    });

    var table = layui.table;
    var openauth = layui.openauth;
   
    $("#menus").loadMenus("Module");

    //主列表載入，可反覆呼叫進行重新整理
    var config= {};  //table的參數，如搜索key，點選tree的id
    var mainList = function (options) {
        if (options != undefined) {
            $.extend(config, options);
        }
        table.reload('mainList', {
            url: '/UserSession/GetModulesTable',
            where: config
            , response: {
                statusCode: 200 //規定成功的狀態碼，預設：0
            } 
        });
    }

    //菜單列表
    var menucon = {};  //table的參數，如搜索key，點選tree的id
    var menuList = function (options) {
        if (options != undefined) {
            $.extend(menucon, options);
        }
        table.reload('menuList', {
            url: '/ModuleManager/LoadMenus',
            where: menucon
            , response: {
                statusCode: 200 //規定成功的狀態碼，預設：0
            } 
        });
    }

    //左邊樹狀機構列表
    var ztree = function () {
        var url = '/UserSession/GetModules';
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
                    mainList({ pId: treeNode.Id });
                }
            }
        };
        var load = function () {
            $.getJSON(url, function (json) {
                zTreeObj = $.fn.zTree.init($("#tree"), setting);
                var newNode = { Name: "根節點", Id: null, ParentId: "" };
                json.Result.push(newNode);
                zTreeObj.addNodes(null, json.Result);
                mainList({ pId: "" });
                zTreeObj.expandAll(true);
            });
        };
        load();
        return {
            reload: load
        }
    }();
    $("#tree").height($("div.layui-table-view").height());
    //新增（編輯）模組對話方塊
    var editDlg = function() {
        var update = false;  //是否為更新
        var show = function (data) {
            var title = update ? "編輯資訊" : "新增";
            layer.open({
                title: title,
                area: ["500px", "480px"],
                type: 1,
                content: $('#divEdit'),
                success: function() {
                    if(data.Id ==''){
                        for(var key in vmModule.tmp){
                            delete vmModule.tmp[key];
                        }
                    }
                        vmModule.tmp = Object.assign({}, vmModule.tmp,data)
                },
                end: mainList
            });
            var url = "/moduleManager/Add";
            if (update) {
                url = "/moduleManager/Update"; 
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
                    Id: "",
                    SortNo: 1,
                    IconName:'layui-icon-app'
                });
            },
            update: function(data) { //彈出編輯框
                update = true;
                show(data);
            }
        };
    }();

    //新增菜單對話方塊
    var meditDlg = function () {
        var update = false;  //是否為更新
        var show = function (data) {
            var title = update ? "編輯資訊" : "新增";
            layer.open({
                title: title,
                area: ["500px", "450px"],
                type: 1,
                content: $('#divMenuEdit'),
                success: function () {
                    if(data.Id ==''){
                        for(var key in vmMenu.tmp){
                            delete vmMenu.tmp[key];
                        }
                    }
                    vmMenu.tmp = Object.assign({}, vmMenu.tmp,data)
                },
                end: menuList
            });
            var url = "/moduleManager/AddMenu";
            if (update) {
                url = "/moduleManager/UpdateMenu";
            }
            //提交數據
            form.on('submit(mformSubmit)',
                function (data) {
                    $.post(url,
                        data.field,
                        function (data) {
                            layer.msg(data.Message);
                        },
                        "json");
                    return false;
                });
        }
        return {
            add: function (moduleId) { //彈出新增
                update = false;
                show({
                    Id: "",
                    ModuleId:moduleId,
                    Sort: 1,
                    Icon:'layui-icon-app'
                });
            },
            update: function (data) { //彈出編輯框
                update = true;
                show(data);
            }
        };
    }();

    //監聽行單擊事件
    table.on('row(list)', function(obj){
        menuList({moduleId:obj.data.Id});
    });

    //監聽頁面主按鈕操作
    var active = {
        btnDel: function () {      //刪除模組
            var checkStatus = table.checkStatus('mainList')
                , data = checkStatus.data;
            openauth.del("/moduleManager/Delete",
                data.map(function (e) { return e.Id; }),
                function () {
                    mainList();
                    ztree.reload();
                });
        }
        , btnDelMenu: function () {      //刪除菜單
            var checkStatus = table.checkStatus('menuList')
                , data = checkStatus.data;
            openauth.del("/moduleManager/DelMenu",
                data.map(function (e) { return e.Id; }),
                menuList);
        }
        , btnAdd: function () {  //新增模組
            editDlg.add();
        }
        , btnAddMenu: function () {  //新增菜單
            var checkStatus = table.checkStatus('mainList')
                , data = checkStatus.data;
            if (data.length != 1) {
                layer.msg("請選擇一個要新增菜單的模組");
                return;
            }
            meditDlg.add(data[0].Id);
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

        , btnEditMenu: function () {  //編輯菜單
            var checkStatus = table.checkStatus('menuList')
                , data = checkStatus.data;
            if (data.length != 1) {
                layer.msg("請選擇編輯的菜單");
                return;
            }
            meditDlg.update(data[0]);
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