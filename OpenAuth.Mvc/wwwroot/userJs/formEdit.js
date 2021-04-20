layui.config({
    base: "/js/"
}).use(['form', 'vue', 'ztree', 'layer', 'utils', 'jquery', 'cookie','table', 'droptree', 'openauth', 'element'], function () {
    var form = layui.form,
        element = layui.element,
		layer =  layui.layer ,
        $ = layui.jquery;
    var table = layui.table;
    var openauth = layui.openauth;

    var index = layer.getFrameIndex(window.name); //獲取視窗索引
    var id = $.getUrlParam("id");   //ID
    var update = (id != null && id != '');
    //提交的URL
    var url = "/Forms/Add";

    $('input[name="DbName"]').focus(function () {
        layer.tips('如果為空，則不建立資料庫表', 'input[name="DbName"]',
        {
            tips: 1  //1 上方  3下方
        });
    });

      //表單設計器
    var ue = UE.getEditor('myFormDesign', {
        //allowDivTransToP: false,//阻止轉換div 為p
        toolleipi: true,//是否顯示，設計器的 toolbars
        textarea: 'design_content',
        //這裡可以選擇自己需要的工具按鈕名稱,此處僅選擇如下五個
        toolbars: [[
          'fullscreen', 'source'
          , '|', 'undo', 'redo'
          , '|', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'removeformat'
          , '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist'
          , '|', 'fontfamily', 'fontsize'
          , '|', 'indent'
          , '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify'
          , '|', 'link', 'unlink'
          , '|', 'horizontal', 'spechars', 'wordimage'
          , '|', 'inserttable', 'deletetable', 'mergecells', 'splittocells']],
        //關閉字數統計
        wordCount: false,
        //關閉elementPath
        elementPathEnabled: false,
        autoHeightEnabled: true
        //預設的編輯區域高度
        , initialFrameHeight: 430
        , iframeCssUrl: "/js/ueditor/formdesign/bootstrap/css/bootstrap.min.css" //引入自身 css使編輯器相容你網站css
        //更多其他參數，請參考ueditor.config.js中的配置項
    });

    leipiFormDesign = {
        /*執行控制元件*/
        exec: function (method) {
            ue.execCommand(method);
        },
        /*
            Javascript 解析表單
            template 表單設計器里的Html內容
            fields 欄位總數
        */
        parse_form: function (template, fields) {
            //正則  radios|checkboxs|select 匹配的邊界 |--|  因為當使用 {} 時js報錯
            var preg = /(\|-<span(((?!<span).)*leipiplugins=\"(radios|checkboxs|select)\".*?)>(.*?)<\/span>-\||<(img|input|textarea|select).*?(<\/select>|<\/textarea>|\/>))/gi, preg_attr = /(\w+)=\"(.?|.+?)\"/gi, preg_group = /<input.*?\/>/gi;
            if (!fields) fields = 0;

            var template_parse = template, template_data = new Array(), add_fields = new Object(), checkboxs = 0;

            var pno = 0;
            template.replace(preg, function (plugin, p1, p2, p3, p4, p5, p6) {
                var parse_attr = new Array(), attr_arr_all = new Object(), name = '', select_dot = '', is_new = false;
                var p0 = plugin;
                var tag = p6 ? p6 : p4;
                //alert(tag + " \n- t1 - "+p1 +" \n-2- " +p2+" \n-3- " +p3+" \n-4- " +p4+" \n-5- " +p5+" \n-6- " +p6);

                if (tag == 'radios' || tag == 'checkboxs') {
                    plugin = p2;
                } else if (tag == 'select') {
                    plugin = plugin.replace('|-', '');
                    plugin = plugin.replace('-|', '');
                }
                plugin.replace(preg_attr, function (str0, attr, val) {
                    if (attr == 'name') {
                        return;
                    }
                    if (attr == 'title') {  //如果是title，強制轉成name
                        if (!attr_arr_all['name']) attr_arr_all['name'] = val;
                        parse_attr.push({ name: val });
                        name = val;
                    }

                    if (tag == 'select' && attr == 'value') {
                        if (!attr_arr_all[attr]) attr_arr_all[attr] = '';
                        attr_arr_all[attr] += select_dot + val;
                        select_dot = ',';
                    } else {
                        attr_arr_all[attr] = val;
                    }
                    var oField = new Object();
                    oField[attr] = val;
                    parse_attr.push(oField);
                })
                /*alert(JSON.stringify(parse_attr));return;*/
                if (tag == 'checkboxs') /*複選組  多個欄位 */ {
                    plugin = p0;
                    plugin = plugin.replace('|-', '');
                    plugin = plugin.replace('-|', '');
                    var name = 'checkboxs_' + checkboxs;
                    attr_arr_all['parse_name'] = name;
                    attr_arr_all['name'] = '';
                    attr_arr_all['value'] = '';

                    attr_arr_all['content'] = '<span leipiplugins="checkboxs"  title="' + attr_arr_all['title'] + '">';
                    var dot_name = '', dot_value = '';
                    p5.replace(preg_group, function (parse_group) {
                        var is_new = false, option = new Object();
                        parse_group.replace(preg_attr, function (str0, k, val) {
                            if (k == 'name') {
                                if (val == 'leipiNewField') {
                                    is_new = true;
                                    fields++;
                                    val = 'data_' + fields;
                                }

                                attr_arr_all['name'] += dot_name + val;
                                dot_name = ',';

                            }
                            else if (k == 'value') {
                                attr_arr_all['value'] += dot_value + val;
                                dot_value = ',';

                            }
                            option[k] = val;
                        });

                        if (!attr_arr_all['options']) attr_arr_all['options'] = new Array();
                        attr_arr_all['options'].push(option);
                        //if(!option['checked']) option['checked'] = '';
                        var checked = option['checked'] != undefined ? 'checked="checked"' : '';
                        attr_arr_all['content'] += '<input type="checkbox" name="' + option['name'] + '" value="' + option['value'] + '"  ' + checked + '/>' + option['value'] + '&nbsp;';

                        if (is_new) {
                            var arr = new Object();
                            arr['name'] = option['name'];
                            arr['leipiplugins'] = attr_arr_all['leipiplugins'];
                            add_fields[option['name']] = arr;

                        }

                    });
                    attr_arr_all['content'] += '</span>';

                    //parse
                    template = template.replace(plugin, attr_arr_all['content']);
                    template_parse = template_parse.replace(plugin, '{' + name + '}');
                    template_parse = template_parse.replace('{|-', '');
                    template_parse = template_parse.replace('-|}', '');
                    template_data[pno] = attr_arr_all;
                    checkboxs++;

                } else if (name) {
                    if (tag == 'radios') /*單選組  一個欄位*/ {
                        plugin = p0;
                        plugin = plugin.replace('|-', '');
                        plugin = plugin.replace('-|', '');
                        attr_arr_all['value'] = '';
                        attr_arr_all['content'] = '<span leipiplugins="radios" name="' + attr_arr_all['name'] + '" title="' + attr_arr_all['title'] + '">';
                        var dot = '';
                        p5.replace(preg_group, function (parse_group) {
                            var option = new Object();
                            parse_group.replace(preg_attr, function (str0, k, val) {
                                if (k == 'value') {
                                    attr_arr_all['value'] += dot + val;
                                    dot = ',';
                                }
                                option[k] = val;
                            });
                            option['name'] = attr_arr_all['name'];
                            if (!attr_arr_all['options']) attr_arr_all['options'] = new Array();
                            attr_arr_all['options'].push(option);
                            //if(!option['checked']) option['checked'] = '';
                            var checked = option['checked'] != undefined ? 'checked="checked"' : '';
                            attr_arr_all['content'] += '<input type="radio" name="' + attr_arr_all['name'] + '" value="' + option['value'] + '"  ' + checked + '/>' + option['value'] + '&nbsp;';

                        });
                        attr_arr_all['content'] += '</span>';

                    } else {
                        attr_arr_all['content'] = is_new ? plugin.replace(/leipiNewField/, name) : plugin;
                    }
                    //attr_arr_all['itemid'] = fields;
                    //attr_arr_all['tag'] = tag;
                    template = template.replace(plugin, attr_arr_all['content']);
                    template_parse = template_parse.replace(plugin, '{' + name + '}');
                    template_parse = template_parse.replace('{|-', '');
                    template_parse = template_parse.replace('-|}', '');
                    if (is_new) {
                        var arr = new Object();
                        arr['name'] = name;
                        arr['leipiplugins'] = attr_arr_all['leipiplugins'];
                        add_fields[arr['name']] = arr;
                    }
                    template_data[pno] = attr_arr_all;


                }
                pno++;
            })
            var parse_form = new Object({
                'Fields': fields,//總欄位數
                'Content': template,//完整html
                'ContentParse': template_parse,//控制元件替換為{data_1}的html
                'ContentData': JSON.stringify(template_data),//控制元件屬性
                'add_fields': add_fields//新增控制元件
            });
            return parse_form;
        },
        /*type  =  save 儲存設計 versions 儲存版本  close關閉 */
        fnCheckForm: function (type) {
            if (ue.queryCommandState('source'))
                ue.execCommand('source');//切換到編輯模式才提交，否則有bug

            if (ue.hasContents()) {
                ue.sync();/*同步內容*/

                return false;

            } else {
                layer.msg('表單內容不能為空！');
                $('#submitbtn').button('reset');
                return false;
            }
        },
        /*預覽表單*/
        fnReview: function () {
            if (ue.queryCommandState('source'))
                ue.execCommand('source');/*切換到編輯模式才提交，否則部分瀏覽器有bug*/
            if (ue.hasContents()) {
                ue.sync();       /*同步內容*/
                //--------------以下僅參考-------------------------------------------------------------------  
                /*設計form的target 然後提交至一個新的視窗進行預覽*/
                var fields = $("#Fields").val(), formeditor = '';

                //獲取表單設計器里的內容  
                formeditor = ue.getContent();
                //解析表單設計器控制元件  
                var parse_form = this.parse_form(formeditor, fields);

                var forms1 = parse_form.Content;
                win_parse = window.open('', '', 'width=800,height=400,alwaysRaised=yes,top=100,left=200');
                var str = '<div style="width:500px;height:300px;border:1px solid grey">' + forms1 + '</div>';
                win_parse.document.write(forms1);
                win_parse.focus();
            } else {
                alert('表單內容不能為空！');
                return false;
            }
        }
    };

    if (update) {
        $.getJSON('/Forms/get?id=' + id,
            function (data) {
                var obj = data.Result;
                url = "/Forms/Update";
                new Vue({
                    el: "#formEdit",
                    data(){
                        return{
                            tmp:data.Result
                        }
                    }
                });

                //玄學：加個延遲ueditor才能正常
                setTimeout(function () {
                    if (obj.FrmType === 0) { 
	                    ue.setContent(obj.Content);
                    } else {
	                    ue.setContent("複雜表單暫時只能在<a href='http://demo.openauth.me:1803'>企業版</a>檢視，開源版預計會在以後的開源版本中發布");
                    }
                }, 500);
            });
    } else {
        new Vue({
            el: "#formEdit",
            data(){
                return{
                    tmp:{
                        Id: '',
                        SortCode:1
                    }
                }
            }
        });
    }


    //提交數據
    form.on('submit(formSubmit)',
        function (data) {

            //解析表單數據
            var fields = $("#Fields").val(), formeditor = '';
            //獲取表單設計器里的內容
            formeditor = ue.getContent();
            //解析表單設計器控制元件
            var parseForm = leipiFormDesign.parse_form(formeditor, fields);

            $.extend(data.field, parseForm);
            $.extend(data.field, {OrgId: $.cookie('defaultorgid')});

            $.post(url,
                data.field,
                function (data) {
                    layer.msg(data.Message);
                },
                "json");
            return false;
        });


    //該函式供給父視窗確定時呼叫
    submit = function () {
        //只能用隱藏的submit btn才行，用form.submit()時data.field里沒有數據
        $("#btnSubmit").click();
    }

    //讓層自適應iframe
    //layer.iframeAuto(index);

})