layui.config({
	base : "/js/"
}).use(['form','element','layer','jquery'],function(){
	var form = layui.form,
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		element = layui.element,
		$ = layui.jquery;

	$(".panel a").on("click",function(){
		window.parent.addTab($(this));
	})


	//使用者數
	$.getJSON("/UserManager/Load?limit=1&page=1",
		function(data){
			$(".userAll span").text(data.count);
		}
	)

    //機構
	$.getJSON("/UserSession/GetOrgs",
        function (data) {
            $(".orgs span").text(data.Result.length);
        }
    )

    //角色
    $.getJSON("/RoleManager/Load",
        function (data) {
            $(".roles span").text(data.Result.length);
        }
    )

    //我的流程
    $.getJSON("/Flowinstances/Load?limit=1&page=1",
        function (data) {
            $(".flows span").text(data.count);
        }
    )

    //流程模板
    $.getJSON("/flowschemes/Load?limit=1&page=1",
        function (data) {
            $(".flowschemes span").text(data.count);
        }
    )

    //表單
    $.getJSON("/Forms/Load?limit=1&page=1",
        function (data) {
            $(".forms span").text(data.count);
        }
    )

	//數字格式化
	$(".panel span").each(function(){
		$(this).html($(this).text()>9999 ? ($(this).text()/10000).toFixed(2) + "<em>萬</em>" : $(this).text());	
	})

	//系統基本參數
    $(".version").text("v2.0");      //當前版本
    $(".author").text("yubaolee");        //開發作者
    $(".homePage").text("/Home/Index");    //網站首頁
    $(".server").text("centos docker");        //伺服器環境
    $(".dataBase").text("mysql 5.7");    //資料庫版本
    $(".maxUpload").text("100M");    //最大上傳限制
    $(".userRights").text("管理員");//當前使用者許可權

})
