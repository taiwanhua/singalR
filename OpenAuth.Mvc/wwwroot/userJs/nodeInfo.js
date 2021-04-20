layui.config({
    base: "/js/"
}).use(['form', 'vue', 'ztree','transfer', 'layer', 'element', 'jquery', 'utils'], function () {
    var layer = layui.layer,
        transfer = layui.transfer,
        $ = layui.jquery;
    var form = layui.form;
    var users = []; //節點的執行人
    var roles = []; //節點執行角色

    var index = layer.getFrameIndex(window.name); //獲取視窗索引
    //從flowschemes.js進入的節點資訊
    var node = parent.FlowDesignObject;
    console.log(JSON.stringify(node));

    var vm = new Vue({
        el: "#formEdit",
        data() {
            return {
                tmp: {
                    NodeName: node.name,
                    NodeCode: node.name,//預設的code
                    NodeRejectType: "0",
                    NodeDesignate: "ALL_USER",
                    NodeConfluenceType: "all",
                    ThirdPartyUrl:""
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
        mounted(){
             form.render();
        },
        methods: {
            isFork: function () {
                return node.type === 'fork';
            }
        }
    });

    //初始化節點設定資訊
    if (node.setInfo != null) {
        vm.tmp = Object.assign({}, vm.tmp, node.setInfo)
        users = node.setInfo.NodeDesignateData.users;
        roles = node.setInfo.NodeDesignateData.roles;
    }
    // form.render(); //重新渲染，防止radio/select等失效

    form.on('select(NodeRejectType)',
        function (data) {
            vm.tmp.NodeRejectType = data.value;
        });

    form.on('select(NodeConfluenceType)',
        function (data) {
            vm.tmp.NodeConfluenceType = data.value;
        });

    //菜單列表
    var menucon = {}; //table的參數，如搜索key，點選tree的id
    //使用者列表，等lay table沒問題了，可以換成table
    var userstree = function () {
        var url = '/UserManager/Load';
        var menuTree;
        var setting = {
            view: {
                selectedMulti: true
            },
            check: {
                enable: true,
                chkStyle: "checkbox",
                chkboxType: {
                    "Y": "",
                    "N": ""
                } //去掉勾選時級聯
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
                onCheck: function (event, treeId, treeNode) {
                    users.push(treeNode.Id);
                }
            }
        };
        var load = function (options) {
            if (options != undefined) {
                $.extend(menucon, options);
            }

            $.getJSON(url, menucon, function (json) {
                menuTree = $.fn.zTree.init($("#userstree"), setting);
                menuTree.addNodes(null, json.data);
                //如果已經分配了使用者，則設定相應的狀態

                $.each(users,
                    function (i) {
                        var that = this;
                        var node = menuTree.getNodeByParam("Id", that, null);
                        menuTree.checkNode(node, true, false);
                    });
                menuTree.expandAll(true);
            });
        };
        return {
            load: load
        }
    }();

    var rolestransfer = function () {
        var url = '/RoleManager/Load';
        var load = function (options) {
            if (options != undefined) {
                $.extend(menucon, options);
            }

            $.getJSON(url, menucon, function (json) {
                transfer.render({
                    elem: '#roles'
                    , parseData: function (res) {
                        return {
                            "value": res.Id //數據值
                            , "title": res.Name //數據標題
                        }
                    }
                    , onchange: function (data, index) {
                      //  console.log(data); //得到當前被穿梭的數據
                      //  console.log(index); //如果數據來自左邊，index 為 0，否則為 1
                        if (index === 0) {
                            roles = roles.concat(data.map(u =>u.value));
                        } else {
                            roles = roles.filter(el => !(data.map(u =>u.value).includes(el))); 
                        }
                        console.log(roles);
                    }
                    ,title: ['系統角色', '已分配角色']
                    ,data: json.Result
                    ,value: roles
                });
            });
        };
        return {
            load: load
        }
    }();

    //左邊樹狀機構列表
    var ztree = function () {
        var url = '/UserSession/GetOrgs';
        var zTreeObj;
        var setting = {
            view: {
                selectedMulti: false
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
                    if (vm.tmp.NodeDesignate === "SPECIAL_USER") {
                        userstree.load({
                            orgId: treeNode.Id
                        });
                    } 
                }
            }
        };
        var load = function () {
            $.getJSON(url, function (json) {
                if (vm.tmp.NodeDesignate === "ALL_USER") return;
                zTreeObj = $.fn.zTree.init($("#tree"), setting);
                var newNode = {
                    Name: "全部",
                    Id: null,
                    ParentId: ""
                };
                json.Result.push(newNode);
                zTreeObj.addNodes(null, json.Result);
                if (vm.tmp.NodeDesignate === "SPECIAL_USER") {
                    userstree.load({
                        orgId: ''
                    });
                } else if (vm.tmp.NodeDesignate === "SPECIAL_ROLE") {
                    rolestransfer.load();
                }
                zTreeObj.expandAll(true);
            });
        };
        load();
        return {
            reload: load
        }
    }();


    form.on('radio(NodeDesignate)',
        function (data) {
            vm.tmp.NodeDesignate = data.value;
            if (data.value === "SPECIAL_USER") {
                roles = [];
                userstree.load();
                ztree.reload();
            } else if (data.value === "SPECIAL_ROLE") {
                users = [];
                rolestransfer.load();
            }
        });

    //提供給上父頁面呼叫
    getVal = function () {
        var result = {
            NodeDesignateData: { //節點指定操作人
                users: users,
                roles: roles,
                orgs: []
            }
        };
      //  $.extend(result, vm.tmp);
       result =  $.extend(vm.tmp, result);
        return result;
    }

    //讓層自適應iframe
    layer.iframeAuto(index);
})