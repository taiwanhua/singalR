
layui.define("jquery", function (exports) {
    var jQuery = layui.jquery,
        $ = layui.jquery;

    //獲取url的參數值
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }

    //把name/value的陣列轉為obj對像
    $.arrayToObj = function (array) {
        var result = {};
        for (var i = 0; i < array.length; i++) {
            var field = array[i];
            if (field.name in result) {
                result[field.name] += ',' + field.value;
            } else {
                result[field.name] = field.value;
            }
        }
        return result;
    }

    //載入菜單
    $.fn.extend({
        loadMenus: function (modulecode) {
            var dom = $(this);
            $.ajax("/ModuleManager/LoadAuthorizedMenus?modulecode=" + modulecode,
           {
               async: false
               , success: function (data) {
                   var obj = JSON.parse(data);
                   var sb = '';
                   $.each(obj,
                       function () {
                           var element = this;
                           sb += ("<button " + " data-type='" + element.DomId +
                               "' " + " class='layui-btn layui-btn-small " + element.Class +
                               "' " + element.Attr + ">");

                           if (element.Icon != null && element.Icon != '') {
                               sb += ("<i class='layui-icon "+element.Icon+"'></i>");
                           }
                           sb += (element.Name + "</button>");
                       });

                   dom.html(sb);
               }
           });
        }
    });


    exports('utils');
});