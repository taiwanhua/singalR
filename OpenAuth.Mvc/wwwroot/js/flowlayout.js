layui.define(["jquery", "layer", "bootstrap"],
    function (exports) {
        var $ = layui.jquery;
        var layer = layui.layer;
        //初始化設計流程器
        $.fn.flowdesign = function (options) {
            var $frmpreview = $(this);
            if (!$frmpreview.attr('id')) {
                return false;
            }
            $frmpreview.html("");

            var defaultcnf = {
                width: 500,
                height: 400,

                haveHead: false,
                haveTool: true,
                headLabel: true,
                toolBtns: ["start round mix", "end round", "node", "join", "fork"],
                haveGroup: true,
                useOperStack: true
            };
            if (options != undefined) {
                $.extend(defaultcnf, options);
            }

            var flowPanel = $.createGooFlow($(this), defaultcnf);
            flowPanel.setNodeRemarks({
                cursor: "選擇指針",
                direct: "轉換連線",
                dashed: "關聯虛線",
                start: "開始結點",
                end: "結束結點",
                task: "任務結點",
                node: "任務結點",
                chat: "決策結點",
                state: "狀態結點",
                plug: "附加外掛",
                fork: "分支結點",
                join: "聯合結點",
                complex: "複合結點",
                group: "組織劃分框編輯開"
            });
            if (options != undefined
                && options.flowcontent != undefined
                && options.flowcontent != null) {  //載入內容
                flowPanel.loadData(options.flowcontent);
            }

            //導出數據擴充套件方法
            //所有節點必須有進出線段
            //必須有開始結束節點（且只能為一個）
            //分流合流節點必須成對出現
            //分流合流節點必須一一對應且中間必須有且只能有一個普通節點
            //分流節點與合流節點之前的審核節點必須有且只能有一條出去和進來節點
            flowPanel.exportDataEx = function () {
                var data = flowPanel.exportData();
                var fromlines = {},
                    tolines = {},
                    nodes = {},
                    fnodes = [],   //會簽分流節點
                    hnodes = [],  //會簽合流節點
                    startroundFlag = 0,   //開始節點標識
                    endroundFlag = 0;   //結束節點標識
                for (var i in data.lines) {
                    if (fromlines[data.lines[i].from] == undefined) {
                        fromlines[data.lines[i].from] = [];
                    }
                    fromlines[data.lines[i].from].push(data.lines[i].to);

                    if (tolines[data.lines[i].to] == undefined) {
                        tolines[data.lines[i].to] = [];
                    }
                    tolines[data.lines[i].to].push(data.lines[i].from);
                }
                for (var j in data.nodes) {
                    var _node = data.nodes[j];
                    var _flag = false;
                    switch (_node.type) {
                        case "start round mix":
                            startroundFlag++;
                            if (fromlines[_node.id] == undefined) {
                                layer.msg("開始節點無法流轉到下一個節點");
                                return -1;
                            }
                            break;
                        case "end round":
                            endroundFlag++;
                            if (tolines[_node.id] == undefined) {
                                layer.msg("無法流轉到結束節點");
                                return -1;
                            }
                            break;
                        case "node":
                            if (_node.setInfo == null) {
                                layer.msg("請設定節點【"+_node.name+"】操作人員");
                                return -1;
                            }
                            _flag = true;
                            break;
                        case "fork":
                            _flag = true;
                            fnodes.push(_node.id);
                            break;
                        case "join":
                            hnodes.push(_node.id);
                            _flag = true;
                            break;
                        default:
                            layer.msg("節點數據異常！");
                            return -1;
                            break;
                    }
                    nodes[_node.id] = _node;
                }
                if (startroundFlag == 0) {
                    layer.msg("必須有開始節點");
                    return -1;
                }

                if (endroundFlag == 0) {
                    layer.msg("必須有結束節點");
                    return -1;
                }

                if (fnodes.length != hnodes.length) {
                    layer.msg("分流節點必須等於合流節點");
                    return -1;
                }
                return data;
            }

            flowPanel.SetNodeEx = function (id, data) {
                flowPanel.setName(id, data.NodeName, "node", data);
            }
            flowPanel.SetLineEx = function (id, data) {
                flowPanel.setName(id, data.LineName, "line", data);
            }
            flowPanel.onItemDbClick = function (id, type) {
                var obj = flowPanel.getItemInfo(id, type);
                switch (type) {
                    case "node":
                        options.OpenNode(obj);
                        break;
                    case "line":
                        options.OpenLine(obj);
                        break;
                }
                return false;
            }
            if (options.isprocessing) //如果是顯示程序狀態
            {
                var tipHtml =
                    '<div style="position:absolute;left:10px;margin-top: 10px;padding:10px;border-radius:5px;background:rgba(0,0,0,0.05);z-index:1000;display:inline-block;">';
                tipHtml +=
                    '<div style="display: inline-block;"><i style="padding-right:5px;color:#5cb85c;" class="layui-icon">&#xe612;</i><span>已處理</span></div>';
                tipHtml +=
                    '<div style="display: inline-block;margin-left: 10px;"><i style="padding-right:5px;color:#5bc0de;" class="layui-icon">&#xe612;</i><span>正在處理</span></div>';
                tipHtml +=
                    '<div style="display: inline-block;margin-left: 10px;"><i style="padding-right:5px;color:#d9534f;" class="layui-icon">&#xe612;</i><span>不通過</span></div>';
                tipHtml +=
                    '<div style="display: inline-block;margin-left: 10px;"><i style="padding-right:5px;color:#f0ad4e;" class="layui-icon">&#xe612;</i><span>駁回</span></div>';
                tipHtml +=
                    '<div style="display: inline-block;margin-left: 10px;"><i style="padding-right:5px;color:#999;" class="layui-icon">&#xe612;</i><span>未處理</span></div></div>';

                $('.GooFlow_work .GooFlow_work_inner').css('background-image', 'none');
                $('td').css('color', '#fff');
                $frmpreview.css('background', '#fff');
                $('.ico').remove();
                $('.GooFlow_item').css('border', '0px');
                $frmpreview.append(tipHtml);
                $.each(options.nodeData,
                    function (i, item) {
                        $("#" + item.id).css("background", "#999");
                        if (item.type == "start round mix") {
                            $("#" + item.id).css("background", "#5cb85c");
                        } else {
                            if (item.id == options.activityId) {
                                $("#" + item.id).css("background", "#5bc0de"); //正在處理
                            }
                            if (item.setInfo != undefined && item.setInfo.Taged != undefined) {
                                if (item.setInfo.Taged == 2) {
                                    $("#" + item.id).css("background", "#d9534f"); //不通過
                                } else if (item.setInfo.Taged == 1) {
                                    $("#" + item.id).css("background", "#5cb85c"); //通過
                                } else {
                                    $("#" + item.id).css("background", "#f0ad4e"); //駁回
                                }
                            }
                        }
                        if (item.setInfo != undefined && item.setInfo.Taged != undefined) {
                            var tips = '<div style="text-align:left">';
                            var tagname = { "1": "通過", "2": "不通過",  "3": "駁回" };
                            tips += "<p>處理人：" + item.setInfo.UserName + "</p>";
                            tips += "<p>結果：" + tagname[item.setInfo.Taged] + "</p>";
                            tips += "<p>處理時間：" + item.setInfo.TagedTime + "</p>";
                            tips += "<p>備註：" + item.setInfo.Description + "</p></div>";

                            $('#' + item.id).hover(function () {
                                layer.tips(tips, '#' + item.id);
                            });
                        } else {
                            $('#' + item.id).hover(function () {
                                layer.tips('暫無處理資訊', '#' + item.id);
                            });
                        }
                    });
            }
            if (options.preview == 1) {
                preview();
            }

            //預覽
            function preview() {
                var _frmitems = {};
                for (var i in options.frmData) {
                    var _frmitem = options.frmData[i];
                    _frmitems[_frmitem.control_field] = _frmitem.control_label;
                }
                var DataBaseLinkData = {};


                var _NodeRejectType = { "0": "前一步", "1": "第一步", "2": "某一步", "3": "使用者指定", "4": "不處理" };
                var _NodeIsOver = { "0": "不允許", "1": "允許" };
                var _NodeDesignate = {
                    "NodeDesignateType1": "所有成員",
                    "NodeDesignateType2": "指定成員",
                    "NodeDesignateType3": "發起者領導",
                    "NodeDesignateType4": "前一步驟領導",
                    "NodeDesignateType5": "發起者部門領導",
                    "NodeDesignateType6": "發起者公司領導"
                };
                var _NodeConfluenceType = { "all": "所有步驟通過", "one": "一個步驟通過即可", "2": "按百分比計算" };
                if (options.flowcontent == undefined) return;
                $.each(options.flowcontent.nodes,
                    function (i, item) {
                        if (item.setInfo != undefined) {
                            var _popoverhtml = "";
                            _popoverhtml +=
                                '<div class="flow-portal-panel-title"><i class="fa fa-navicon"></i>&nbsp;&nbsp;基本資訊</div>';
                            _popoverhtml += '<ul>';
                            _popoverhtml += '<li>節點標識:' + item.setInfo.NodeCode + '</li>';
                            _popoverhtml += '<li>駁回型別:' + _NodeRejectType[item.setInfo.NodeRejectType] + '</li>';
                            _popoverhtml += '<li>終止流程:' + _NodeIsOver[item.setInfo.NodeIsOver] + '</li>';
                            if (item.setInfo.Description != "") {
                                _popoverhtml += '<li>備註:' + item.setInfo.Description + '</li>';
                            }
                            if (item.setInfo.NodeConfluenceType != "") {
                                _popoverhtml += '<li>會簽策略:' +
                                    _NodeConfluenceType[item.setInfo.NodeConfluenceType] +
                                    '</li>';
                                if (item.setInfo.NodeConfluenceType == 2) {
                                    _popoverhtml += '<li>會簽比例:' + item.setInfo.NodeConfluenceRate + '</li>';
                                }
                            }
                            if (item.setInfo.NodeDataBase != "") {
                                _popoverhtml += '<li>繫結資料庫:' + DataBaseLinkData[item.setInfo.NodeDataBase] + '</li>';
                            }
                            if (item.setInfo.NodeTable != "") {
                                _popoverhtml += '<li>繫結表名:' + item.setInfo.NodeTable + '</li>';
                            }
                            if (item.setInfo.NodePram != "") {
                                _popoverhtml += '<li>繫結欄位:' + item.setInfo.NodePram + '</li>';
                            }
                            _popoverhtml += '</ul>';

                            _popoverhtml +=
                                '<div class="flow-portal-panel-title"><i class="fa fa-navicon"></i>&nbsp;&nbsp;審核者</div>';
                            _popoverhtml += '<ul>';
                            _popoverhtml += '<li>型別:' + _NodeDesignate[item.setInfo.NodeDesignate] + '</li>';
                            if (item.setInfo.NodeDesignateData != undefined) {
                                var _rowstr = "";
                                for (var i in item.setInfo.NodeDesignateData.roles) {
                                    var _postitem = item.setInfo.NodeDesignateData.roles[i];
                                    var _one = top.clientroleData[_postitem];
                                    _rowstr += ' <span class="label label-success">' +
                                        (_one == undefined ? _postitem : _one.FullName) +
                                        '</span>';
                                    if (i == item.setInfo.NodeDesignateData.roles.length - 1) {
                                        _popoverhtml += '<li>角色:' + _rowstr + '</li>';
                                    }
                                }

                                _rowstr = "";
                                for (var i in item.setInfo.NodeDesignateData.users) {
                                    var _postitem = item.setInfo.NodeDesignateData.users[i];
                                    var _one = clientuserData[_postitem];
                                    _rowstr += ' <span class="label label-danger">' +
                                        (_one == undefined ? _postitem : _one.RealName) +
                                        '</span>';
                                    if (i == item.setInfo.NodeDesignateData.users.length - 1) {
                                        _popoverhtml += '<li>使用者:' + _rowstr + '</li>';
                                    }
                                }
                            }
                            _popoverhtml += '</ul>';

                            var _row = "";
                            for (var i in item.setInfo.frmPermissionInfo) {
                                var _item = item.setInfo.frmPermissionInfo[i];
                                var _downtext = "";
                                if (_item.down) {
                                    _downtext = ' | 可下載';
                                } else if (_item.down != undefined) {
                                    _downtext = ' | 不可下載';
                                }
                                _row += '<li>' +
                                    _frmitems[_item.fieldid] +
                                    ': ' +
                                    (_item.look ? '可檢視' : '不可檢視') +
                                    _downtext +
                                    '</li>';
                                if (i == item.setInfo.frmPermissionInfo.length - 1) {
                                    _popoverhtml +=
                                        '<div class="flow-portal-panel-title"><i class="fa fa-navicon"></i>&nbsp;&nbsp;許可權分配</div>';
                                    _popoverhtml += '<ul>';
                                    _popoverhtml += _row;
                                    _popoverhtml += '</ul>';
                                }
                            }

                            if (item.setInfo.NodeDataBaseToSQL != "" || item.setInfo.NodeSQL != "") {
                                _popoverhtml +=
                                    '<div class="flow-portal-panel-title"><i class="fa fa-navicon"></i>&nbsp;&nbsp;執行SQL</div>';
                                _popoverhtml += '<ul>';
                                _popoverhtml += '<li>資料庫:' + DataBaseLinkData[item.setInfo.NodeDataBaseToSQL] + '</li>';
                                _popoverhtml += '<li>SQL語句:' + item.setInfo.NodeSQL + '</li>';
                                _popoverhtml += '</ul>';
                            }

                            $('#' + item.id).attr('title', item.name);
                            $('#' + item.id).attr('data-toggle', 'popover');
                            $('#' + item.id).attr('data-placement', 'bottom');
                            $('#' + item.id).attr('data-content', _popoverhtml);
                        } else {
                            $('#' + item.id).attr('title', item.name);
                            $('#' + item.id).attr('data-toggle', 'popover');
                            $('#' + item.id).attr('data-placement', 'bottom');
                            $('#' + item.id).attr('data-content', "該節點未被設定");
                        }
                    });
                //$('.GooFlow_item').popover({ html: true });
            }

           return flowPanel;
        }

        exports('flowlayout');
    });





