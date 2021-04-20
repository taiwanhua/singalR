/**
 * Openauth通用工具庫
 * yubaolee @ 2017
 * www.cnblogs.com/yubaolee
 */
layui.define(['jquery', 'layer'], function (exports) {
    var $ = layui.jquery;
    var layer = layui.layer;
    //字串常量
    var MOD_NAME = 'openauth',
        THIS = 'layui-this',
        SHOW = 'layui-show',
        HIDE = 'layui-hide',
        DISABLED = 'layui-disabled';

    //外部接口
    var openauth = {
        config: {} //全域性配置項

        //設定全域性項
        , set: function (options) {
            var that = this;
            that.config = $.extend({}, that.config, options);
            return that;
        }
        //事件監聽
        , on: function (events, callback) {
            return layui.onevent.call(this, MOD_NAME, events, callback);
        }

        //刪除
        , del: function (url, dataids, callback) {
            if (dataids == undefined || dataids == "" || dataids.length == 0) {
                layer.msg("至少選擇一條記錄");
                return;
            }
            layer.confirm('真的刪除么', function (index) {
                $.post(url, { ids: dataids },
                    function (data) {
                        if (data.Code == 200) {
                            if (callback != undefined) callback();
                        } else {
                            layer.msg(data.Message);
                        }
                    }, "json");
                layer.close(index);
            });
        }
    }

    exports(MOD_NAME, openauth);
});