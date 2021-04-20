layui.config({
    base: "/js/"
}).use(['form', 'vue', 'ztree', 'layer', 'jquery', 'table', 'droptree', 'openauth', 'utils'], function () {
    var form = layui.form,
        layer = layui.layer,
        $ = layui.jquery;
    var table = layui.table;
    var openauth = layui.openauth;
    var toplayer = (top == undefined || top.layer === undefined) ? layer : top.layer;  //頂層的LAYER

    $("#menus").loadMenus("DataPrivilegeRule");


    //載入表頭
    $.getJSON('/DataPrivilegeRules/Load',
	    { page: 1, limit: 1 },
	    function (data) {
		    var columns = data.columnHeaders.filter(u =>u.Browsable ===true).map(function (e) {
			    return {
				    field: e.Key,
				    title: e.Description
			    };
		    });
		    columns.unshift({
			    type: 'checkbox',
			    fixed: 'left'
		    });
		    table.render({
			    elem: '#mainList',
			    page: true,
                url: '/DataPrivilegeRules/Load',
			    cols: [columns]
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
                url: '/DataPrivilegeRules/Load',
                where: config
                , response: {
                    statusCode: 200 //規定成功的狀態碼，預設：0
                } 
            });
    };
    mainList();
 
    //新增（編輯）對話方塊
    var editDlg = function () {
        var vm;
        var update = false;  //是否為更新
        var show = function (data) {
            var title = update ? "編輯資訊" : "新增";
            layer.open({
                title: title,
                area: ["500px", "400px"],
                type: 1,
                content: $('#divEdit'),
                success: function () {
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
                                        layui.droptree("/Applications/GetList", "#AppName", "#AppId", false);

                                   })
                                }
                            },
                            mounted(){
                                form.render();
                                layui.droptree("/Applications/GetList", "#AppName", "#AppId", false);

                            }
                        });
                       }else{
                        vm.tmp = Object.assign({}, vm.tmp,data)
                       }
                },
                end: mainList
            });
            var url = "/DataPrivilegeRules/Add";
            if (update) {
                url = "/DataPrivilegeRules/Update";
            }
            //提交數據
            form.on('submit(formSubmit)',
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
            add: function () { //彈出新增
                update = false;
                show({
                    Id: ''
                });
            },
            update: function (data) { //彈出編輯框
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
            openauth.del("/DataPrivilegeRules/Delete",
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
