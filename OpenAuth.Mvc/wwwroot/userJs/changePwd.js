layui.config({
    base: "/js/"
}).use(['form','vue', 'ztree', 'layer', 'jquery', 'table','droptree','openauth','utils'], function () {
    var form = layui.form,
        layer = layui.layer,
        $ = layui.jquery;
    var table = layui.table;
    var openauth = layui.openauth;
    var toplayer = (top == undefined || top.layer === undefined) ? layer : top.layer;  //頂層的LAYER

    var  vm = new Vue({
        el: "#formEdit",
        data() {
            return {
                tmp: {
                    Account: '',
                    Password: '',
                    ConfirmPassword: '',
                }  
            }
        },
        mounted() {
            var _this = this;
            $.get('/UserSession/GetUserName',
                function (data) {
                    _this.tmp.Account = data;
                });
            form.render();
        }
    });

    var url = "/UserManager/ChangePassword";
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