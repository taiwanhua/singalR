new Vue({
    el: "#formEdit",
    data() {
        return {
            tmp: {
                Id: '',
                SchemeCode: new Date().getTime(),
                SortCode: '1',
                FrmId:''
            },
            forms: [],
            frmPreview: ''
        }
    },
    updated() {  //如果layui有重新整理失敗的可以在這裡面處理
        //layui.form.render(null,'formChangeFilter'); //只能 class="layui-form" 所在元素的 lay-filter="" 的值???
        layui.form.render();
    },
    mounted() {
        var _this = this
        layui.config({
            base: "/js/"
        }).use(['form', 'ztree', 'layer', 'utils', 'element', 'jquery', 'cookie','table', 'droptree', 'openauth', 'flow/gooflow', 'flowlayout'], function () {
            var form = layui.form,
                element = layui.element,
                layer = layui.layer,
                $ = layui.jquery;
            var table = layui.table;
            var openauth = layui.openauth;

            var index = layer.getFrameIndex(window.name); //獲取視窗索引
            var id = $.getUrlParam("id"); //ID
            var update = (id != null && id != '');
            //提交的URL
            var url = "/FlowSchemes/Add";
            if (update) {
                 url = "/FlowSchemes/Update";
            }

            $.getJSON('/forms/load', function (json) { //載入所有表單
                _this.forms = json.data
            })

            var changeForm = function (id) { //切換表單
                _this.tmp.FrmId = id;
                $.getJSON("/forms/get?id=" + id, function (data) {
                    if (data.Result.FrmType == 0) {
                        _this.frmPreview = data.Result.Html
                    } else {
                        _this.frmPreview = '複雜表單暫時只能在<a href="http://demo.openauth.me:1803">企業版</a>檢視，開源版預計會在以後的開源版本中發布'
                    }
                });
            }


            /*=========流程設計（begin）======================*/
            var flowDesignPanel = $('#flowPanel').flowdesign({
                height: 300,
                widht: 300,
                OpenNode: function (object) {
                    FlowDesignObject = object; //為NodeInfo視窗提供呼叫

                    if (object.type == 'start round mix' || object.type == 'end round') {
                        layer.msg("開始節點與結束節點不能設定");
                        return false;
                    }

                    layer.open({
                        type: 2,
                        area: ['550px', '450px'], //寬高
                        maxmin: true, //開啟最大化最小化按鈕
                        title: '節點設定【' + object.name + '】',
                        content: '/flowschemes/nodeInfo',
                        btn: ['確定', '取消'],
                        yes: function (index, layero) {
                            var body = layer.getChildFrame('body', index);
                            var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe頁的視窗對象，執行iframe頁的方法：iframeWin.method();
                            var nodedata = iframeWin.getVal();
                            flowDesignPanel.SetNodeEx(object.id, nodedata);
                            layer.close(index);
                        },
                        cancel: function (index) {
                            layer.close(index);
                        }
                    });
                },
                OpenLine: function (id, object) {
                    layer.msg("分支條件暫時只對企業版開放");
                    return;
                }
            });

            if (update) {
                $.getJSON('/flowschemes/get?id=' + id, function (obj) {
                    _this.tmp = $.extend({}, obj.Result)
                    changeForm(obj.Result.FrmId)
                    flowDesignPanel.loadData(JSON.parse(obj.Result.SchemeContent));
                })
            }
            /*=========流程設計（end）=====================*/

            //提交數據
            form.on('submit(formSubmit)',
                function (data) {
                    var content = flowDesignPanel.exportDataEx();
                    if (content == -1) {
                        return false; //阻止表單跳轉。
                    }
                    var schemecontent = {
                        SchemeContent: JSON.stringify(content)
                    }

                    $.extend(data.field, schemecontent);
                    $.extend(data.field, {OrgId: $.cookie('defaultorgid')});
                    $.post(url,
                        data.field,
                        function (result) {
                            layer.msg(result.Message);
                        },
                        "json");

                    return false; //阻止表單跳轉。
                });

            form.on('select(formChangeFilter)', function (obj) {
                changeForm(obj.value)
            });

            flowDesignPanel.reinitSize($(window).width() - 30, $(window).height() - 100);
            $(window).resize(function () {
                flowDesignPanel.reinitSize($(window).width() - 30, $(window).height() - 100);
            });

            //該函式供給父視窗確定時呼叫
            submit = function () {
                //只能用隱藏的submit btn才行，用form.submit()時data.field里沒有數據
                $("#btnSubmit").click();
            }

            //讓層自適應iframe
            layer.iframeAuto(index);
        })
    }
});