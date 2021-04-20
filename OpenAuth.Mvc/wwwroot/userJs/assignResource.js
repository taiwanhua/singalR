layui.config({
    base: "/js/"
}).use(['form','vue', 'ztree', 'layer', 'jquery', 'table','utils'], function () {
    var form = layui.form,
        layer = layui.layer,
        $ = layui.jquery;
    var table = layui.table;
    var id = $.getUrlParam("id");      //待分配的id
    var type = $.getUrlParam("type");      //待分配的id
   
   
    //主列表載入，可反覆呼叫進行重新整理
    var config= {};  //table的參數，如搜索key，點選tree的id
    var mainList = function(options) {
        if (options != undefined) {
            $.extend(config, options);
        }
        table.reload('mainList',
            {
                url: '/Resources/Load',
                response: {
                    statusCode: 200 //規定成功的狀態碼，預設：0
                } ,
                where: config,
                done: function(res, curr, count) {
                    //如果是非同步請求數據方式，res即為你接口返回的資訊。
                    //如果是直接賦值的方式，res即為：{data: [], count: 99} data為當前頁數據、count為數據總長度
                    var url = "/Resources/LoadForUser";
                    if (type.indexOf("Role") != -1) {
                        url = "/Resources/LoadForRole";
                    }

                    $.ajax(url,
                        {
                            async: false
                            , data: {
                                firstId: id
                                , appid: ""  //暫時不做左邊的應用列表樹
                            }
                            , dataType: 'json'
                            ,success: function(json) {
                                if (json.Code == 500) return;
                                var roles = json.Result;
                                //循環所有數據，找出對應關係，設定checkbox選中狀態
                                for (var i = 0; i < res.data.length; i++) {
                                    for (var j = 0; j < roles.length; j++) {
                                        if (res.data[i].Id != roles[j]) continue;

                                        //這裡才是真正的有效勾選
                                        res.data[i]["LAY_CHECKED"] = true;
                                        //找到對應數據改變勾選樣式，呈現出選中效果
                                        var index = res.data[i]['LAY_TABLE_INDEX'];
                                        $('.layui-table-fixed-l tr[data-index=' + index + '] input[type="checkbox"]')
                                            .prop('checked', true);
                                        $('.layui-table-fixed-l tr[data-index=' + index + '] input[type="checkbox"]')
                                            .next().addClass('layui-form-checked');
                                    }

                                }

                                //如果構成全選
                                var checkStatus = table.checkStatus('mainList');
                                if (checkStatus.isAll) {
                                    $('.layui-table-header th[data-field="0"] input[type="checkbox"]')
                                        .prop('checked', true);
                                    $('.layui-table-header th[data-field="0"] input[type="checkbox"]').next()
                                        .addClass('layui-form-checked');
                                }
                            }
                        });


                }
            });
    };

    mainList();
   
    //分配及取消分配
    table.on('checkbox(list)', function (obj) {
        console.log(obj.checked); //當前是否選中狀態
        console.log(obj.data); //選中行的相關數據
        console.log(obj.type); //如果觸發的是全選，則為：all，如果觸發的是單選，則為：one

        var url = "/AccessObjs/Assign";
        if (!obj.checked) {
            url = "/AccessObjs/UnAssign";
        }
        $.post(url, { type: type, firstId: id, secIds: [obj.data.Id] }
                       , function (data) {
                           layer.msg(data.Message);
                       }
                      , "json");
    });
    //監聽頁面主按鈕操作 end
})