layui.config({
    base: "/js/"
}).use(['form','vue', 'ztree', 'layer', 'jquery','utils','table'], function () {
    var layer = (top == undefined || top.layer === undefined )? layui.layer : top.layer,
        $ = layui.jquery;
    var table = layui.table;
    var id = $.getUrlParam("id");      //待分配的id
    var type = $.getUrlParam("type");  //待分配的型別
    var menuType = $.getUrlParam("menuType");  //待分配菜單的型別
    var currentNode;
  
    //菜單列表
    var menucon = {};  //table的參數，如搜索key，點選tree的id

    var mainList = function (options) {
        if (options != undefined) {
            $.extend(menucon, options);
        }
        table.reload('mainList', {
            url: '/ModuleManager/LoadMenus',
            where: menucon
            , response: {
                statusCode: 200 //規定成功的狀態碼，預設：0
            } 
            , done: function (res, curr, count) {
                //如果是非同步請求數據方式，res即為你接口返回的資訊。
                //如果是直接賦值的方式，res即為：{data: [], count: 99} data為當前頁數據、count為數據總長度
                var url = "/ModuleManager/LoadMenusForUser";
                if (type.indexOf("Role") != -1) {
                    url = "/ModuleManager/LoadMenusForRole";
                }

                $.ajax(url, {
                    async: false
                    , data: {
                        firstId: id
                        , moduleId: options.moduleId
                    }
                    ,dataType:"json"
                    , success: function (roles) {
                       
                        //循環所有數據，找出對應關係，設定checkbox選中狀態
                        for (var i = 0; i < res.data.length; i++) {
                            for (var j = 0; j < roles.length; j++) {
                                if (res.data[i].Id != roles[j].Id) continue;

                                //這裡才是真正的有效勾選
                                res.data[i]["LAY_CHECKED"] = true;
                                //找到對應數據改變勾選樣式，呈現出選中效果
                                var index = res.data[i]['LAY_TABLE_INDEX'];
                                $('div[lay-id="mainList"] .layui-table-fixed-l tr[data-index=' + index + '] input[type="checkbox"]').prop('checked', true);
                                $('div[lay-id="mainList"] .layui-table-fixed-l tr[data-index=' + index + '] input[type="checkbox"]').next().addClass('layui-form-checked');
                            }

                        }

                        //如果構成全選
                        var checkStatus = table.checkStatus('mainList');
                        if (checkStatus.isAll) {
                            $('div[lay-id="mainList"] .layui-table-header th[data-field="0"] input[type="checkbox"]').prop('checked', true);
                            $('div[lay-id="mainList"] .layui-table-header th[data-field="0"] input[type="checkbox"]').next().addClass('layui-form-checked');
                        }
                    }
                });




            }
        });
    }

    //使用者自定義模組分配可見欄位
    var propList = function (node) {
        table.reload('propList', {
            url: '/UserSession/GetProperties',
            where: {
                moduleCode:node.Code
            }
            , response: {
                statusCode: 200 //規定成功的狀態碼，預設：0
            } 
            , done: function (res, curr, count) {
                if(res.data == null) return;
                //如果是非同步請求數據方式，res即為你接口返回的資訊。
                //如果是直接賦值的方式，res即為：{data: [], count: 99} data為當前頁數據、count為數據總長度
                var url = "/ModuleManager/LoadPropertiesForRole";
                if (type.indexOf("Role") != -1) {
                    url = "/ModuleManager/LoadPropertiesForRole";
                }

                $.ajax(url, {
                    async: false
                    , data: {
                        roleId: id
                        , moduleCode: node.Code
                    }
                    ,dataType:"json"
                    , success: function (props) {                       
                        //循環所有數據，找出對應關係，設定checkbox選中狀態
                        for (var i = 0; i < res.data.length; i++) {
                            for (var j = 0; j < props.Result.length; j++) {
                                if (res.data[i].Key != props.Result[j]) continue;

                                //這裡才是真正的有效勾選
                                res.data[i]["LAY_CHECKED"] = true;
                                //找到對應數據改變勾選樣式，呈現出選中效果
                                var index = res.data[i]['LAY_TABLE_INDEX'];
                                $('div[lay-id="propList"] .layui-table-fixed-l tr[data-index=' + index + '] input[type="checkbox"]').prop('checked', true);
                                $('div[lay-id="propList"] .layui-table-fixed-l tr[data-index=' + index + '] input[type="checkbox"]').next().addClass('layui-form-checked');
                            }

                        }

                        //如果構成全選
                        var checkStatus = table.checkStatus('propList');
                        if (checkStatus.isAll) {
                            $('div[lay-id="propList"] .layui-table-header th[data-field="0"] input[type="checkbox"]').prop('checked', true);
                            $('div[lay-id="propList"] .layui-table-header th[data-field="0"] input[type="checkbox"]').next().addClass('layui-form-checked');
                        }
                    }
                });




            }
        });
    }

    //模組列表
    var ztree = function () {
        var url = '/UserSession/GetModules';
        var zTreeObj;
        var setting = {
            view: { selectedMulti: true },
            check: {
                enable: true,
                chkStyle: "checkbox",
                chkboxType: { "Y": "", "N": "" } //去掉勾選時級聯
            },
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
                    currentNode = treeNode;
                    mainList({ moduleId: treeNode.Id });
                    propList(treeNode);
                },
                onCheck: function (event, treeId, treeNode) {
                    var url = "/AccessObjs/Assign";
                    if (!treeNode.checked) {
                        url = "/AccessObjs/UnAssign";
                    }

                    $.post(url, { type: type, firstId: id, secIds: [treeNode.Id] }
                        , function (data) {
                            layer.msg(data.Message);
                        }
                       , "json");
                }
            }
        };
        var load = function () {
            $.getJSON(url, function (json) {
                $.each(json.Result,
                    function(i) {
                        var that = this;
                        if(!that.IsSys){
                            that.Name = that.Name +'[自定義]'
                        }
                    });

                zTreeObj = $.fn.zTree.init($("#tree"), setting);
                zTreeObj.addNodes(null, json.Result);
                //如果該使用者已經分配模組了，則設定相應的狀態
                var url = "/ModuleManager/LoadForUser";
                if (type.indexOf("Role") != -1) {
                    url = "/ModuleManager/LoadForRole";
                }
                $.getJSON(url, { firstId: id }
                    , function (data) {
                        $.each(data,
                            function(i) {
                                var that = this;
                                var node = zTreeObj.getNodeByParam("Id", that.Id, null);
                                zTreeObj.checkNode(node, true, false);
                            });
                    });
             
                zTreeObj.expandAll(true);
            });
        };
        load();
        return {
            reload: load
        }
    }();
    

    $("#tree").height($(document).height()-10);


    //分配及取消分配
    table.on('checkbox(mainList)', function (obj) {
        console.log(obj.checked); //當前是否選中狀態
        console.log(obj.data); //選中行的相關數據
        console.log(obj.type); //如果觸發的是全選，則為：all，如果觸發的是單選，則為：one
        
        var ids=[];
        if(obj.type=="all"){
            ids = layui.table.checkStatus('mainList').data.map(function (m) { return m.Id; });
        }else{
            ids =[obj.data.Id]
        }

        var url = "/AccessObjs/Assign";
        if (!obj.checked) {
            url = "/AccessObjs/UnAssign";
        }
        $.post(url, { type: menuType, firstId: id, secIds: ids}
                       , function (data) {
                           layer.msg(data.Message);
                       }
                      , "json");
    });
    //監聽頁面主按鈕操作 end

    //監聽欄位可見分配
    table.on('checkbox(propList)', function (obj) {
        console.log(obj.checked); //當前是否選中狀態
        console.log(obj.data); //選中行的相關數據
        console.log(obj.type); //如果觸發的是全選，則為：all，如果觸發的是單選，則為：one
        var ids=[];
        if(obj.type=="all"){
            ids = layui.table.checkStatus('propList').data.map(function (m) { return m.Key; });
        }else{
            ids =[obj.data.Key]
        }

        var url = "/AccessObjs/AssignDataProperty";
        if (!obj.checked) {
            url = "/AccessObjs/UnAssignDataProperty";
        }
        $.post(url,{ moduleCode: currentNode.Code, roleId: id, 'properties': ids } 
                        , function (data) {
                            layer.msg(data.Message);
                        }
                        , "json");
    });

})