new Vue({
    el: "#formEdit",
    data() {
        return {
            tmp: {
                Id: '',
                Code: new Date().getTime(),
                SchemeCode:'',
                SchemeId: '',
                FrmData:''
            }
        }
    },
    mounted() {
        let _this = this;
        layui.config({
            base: "/js/"
        }).use(['form', 'dtree', 'layer', 'utils', 'element', 'jquery', 'cookie','table', 'slimscroll', 'openauth', 'flow/gooflow', 'flowlayout'], function () {
            var form = layui.form,
                element = layui.element,
                layer = layui.layer,
                dtree = layui.dtree,
                $ = layui.jquery;
            var index = layer.getFrameIndex(window.name); //獲取視窗索引
            var id = $.getUrlParam("id"); //ID
            var update = (id != null && id != '');
            //提交的URL
            var url = "/FlowInstances/Add";

            /*=========流程設計（begin）======================*/
            var flowDesignPanel = $('#flowPanel').flowdesign({
                height: 300,
                widht: $(window).width() - 250,
                haveTool: false,
                preview: 1,
                OpenNode: function (object) {
                    FlowDesignObject = object; //為NodeInfo視窗提供呼叫

                    if (object.type == 'start round mix' || object.type == 'end round') {
                        return false;
                    }

                    layer.open({
                        type: 2,
                        area: ['550px', '450px'], //寬高
                        maxmin: true, //開啟最大化最小化按鈕
                        title: '節點設定【' + object.name + '】',
                        content: '/flowschemes/nodeInfo',
                        btn: ['關閉'],
                        cancel: function (index) {
                            layer.close(index);
                        }
                    });
                },
                OpenLine: function (id, object) {
                    lay.msg("暫不能設定分支條件");
                    return;
                }
            });
            /*=========流程設計（end）=====================*/

            //流程模板選擇列表
            function initTree(option) {
                var treeObj = dtree.render({
                    elem: "#tree",
                    url: '/flowschemes/load',
                    method: 'GET',
                    dataFormat: 'list',
                    dataStyle: 'layuiStyle',
                    initLevel: "4",
                    record: true, //記錄節點數據
                    response: {
                        statusName: "code", //返回標識（必填）
                        statusCode: 200, //返回碼（必填）
                        message: "msg", //返回資訊（必填）
                        rootName: "data", //根節點名稱（必填）
                        treeId: "Id", //節點ID（必填）
                        parentId: "ParentId", //父節點ID（必填）
                        title: "SchemeName", //節點名稱（必填）
                    },
                    done: function (data, obj) { //使用非同步載入回撥
                        if (option) {
                            dtree.dataInit("tree", option); // 初始化覈取方塊的值
                        }
                    }
                });
                dtree.on("node('tree')", function (obj) { //節點點選事件
                    var record = JSON.parse(obj.param.recordData);  //從記錄中取節點數據
                    _this.tmp.SchemeId = record.Id;
                    _this.tmp.SchemeCode = record.SchemeCode;

                    //取表單的結構數據
                    $.getJSON("/forms/get?id=" + record.FrmId, function (data) {
                        if (data.Code != 500) {
                            if (data.Result.FrmType == 0) {
                                $("#frmPreview").html(data.Result.Html);
                            } else {
                                $("#frmPreview").html('複雜表單暫時只能在<a href="http://demo.openauth.me:1803">企業版</a>檢視，開源版預計會在以後的開源版本中發布');
                            }
                        }
                    });

                    //預覽流程
                    flowDesignPanel.loadData(JSON.parse(record.SchemeContent));

                });

            }

            if (update) {
                $.getJSON('/FlowInstances/get?id=' + id,
                    function (data) {
                        var obj = data.Result;
                        url = "/FlowInstances/Update";

                        _this.tmp = $.extend({}, obj)
                        flowDesignPanel.loadData(JSON.parse(obj.SchemeContent));
                        initTree(obj.SchemeId);
                    });
            } else {
                initTree();
            }

            //提交數據
            form.on('submit(formSubmit)',
                function (data) {
                    var content = flowDesignPanel.exportData();
                    if (content == -1) {
                        return false; //阻止表單跳轉。
                    }

                    delete data.field.CustomName;
                    delete data.field.Code;
                    delete data.field.Description;
                    _this.tmp.OrgId = $.cookie('defaultorgid');

                    _this.tmp.FrmData = JSON.stringify(data.field);
                    $.post(url,
                        _this.tmp,
                        function (result) {
                            layer.msg(result.Message);
                        },
                        "json");

                    return false; //阻止表單跳轉。
                });

            $(window).resize(function () {
                flowDesignPanel.reinitSize($(window).width() - 250, $(window).height() - 100);
            });

            //該函式供給父視窗確定時呼叫
            submit = function () {
                //只能用隱藏的submit btn才行，用form.submit()時data.field里沒有數據
                $("#btnSubmit").click();
            }

            $(".GooFlow_work").slimScroll({
                height: 'auto'
            });

        })

    }
});