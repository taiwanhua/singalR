layui.config({
    base: "/js/"
}).use(['form','vue', 'ztree', 'layer', 'jquery', 'table','droptree','openauth','utils','cookie'], function () {
    var form = layui.form,
        layer = layui.layer,
        $ = layui.jquery;
    var table = layui.table;
    var openauth = layui.openauth;
    var toplayer = (top == undefined || top.layer === undefined) ? layer : top.layer;  //頂層的LAYER

    //左邊樹狀機構列表
    var ztree = function () {
        var url = '/UserSession/GetOrgs';
        var zTreeObj;
        var setting = {
            view: { 
                selectedMulti: false ,
                nameIsHTML: true
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
                    rootPId: ""
                }
            },
            callback: {
                onClick: function (event, treeId, treeNode) {
                    $.cookie('defaultorgid', treeNode.Id, {path: '/'});
                    load();
                }
            }
        };
        var load = function () {
            $.getJSON(url, function (json) {
                zTreeObj = $.fn.zTree.init($("#tree"), setting);
                var defaultorgid = $.cookie('defaultorgid');
                if(defaultorgid != undefined) {
                    $.each(json.Result, function () {
                        var element = this;
                        if (element.Id == defaultorgid) {
                            element.Name = "<font color='red'>"+element.Name + "(當前預設)"+"</font>"
                        }
                    });
                }
                zTreeObj.addNodes(null, json.Result);
                zTreeObj.expandAll(true);
            });
        };
        load();
        return {
            reload: load
        }
    }();

    $("#tree").height( $("div.layui-table-view").height());


    //模組列表
    var ztreeModule = function () {
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
                    rootPId: ""
                }
            },
            callback: {
                onClick: function (event, treeId, treeNode) {
                    //mainList({ orgId: treeNode.Id });
                }
            }
        };
        var load = function () {
            $.getJSON(url, function (json) {
                zTreeObj = $.fn.zTree.init($("#treeModule"), setting);
                zTreeObj.addNodes(null, json.Result);
                zTreeObj.expandAll(true);
            });
        };
        load();
        return {
            reload: load
        }
    }();

    var  vm = new Vue({
        el: "#formEdit",
        data() {
            return {
                tmp: {
                    Account: '',
                    Name: '',
                    Sex: '',
                }  
            }
        },
        watch:{
            tmp(val){
                this.$nextTick(function () {
                    form.render();  //重新整理select等
                })
            }
        },
        mounted() {
            var _this = this;
            $.get('/UserSession/GetUserProfile',
                function (data) {
                    var obj = JSON.parse(data);
                    _this.tmp = obj.Result;
                });
        }
    });

    var url = "/UserManager/ChangeProfile";
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
    //監聽頁面主按鈕操作 end
})