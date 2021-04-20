var $,tab,skyconsWeather;
layui.config({
	base : "/js/"
}).use(['bodyTab','form','element','layer','jquery','cookie'],function(){
	var form = layui.form,
		layer = layui.layer,
		element = layui.element;
		$ = layui.jquery;
		tab = layui.bodyTab({
			openTabNum : "50",  //最大可打開視窗數量
			url: "/UserSession/GetModulesTree" //獲取菜單json地址
    });

    $.get('/UserSession/GetUserName',
        function(data) {
            $("#username").html(data);
            $("#usernametop").html(data);
        });

    //todo:預設登錄后取第一個機構的id作為預設，可以在【個人中心】界面修改預設
	//在大型業務系統中，應該讓使用者登錄成功后彈出選擇框選擇操作的機構
	$.get('/UserSession/GetOrgs',
		function(data) {
		    var orgs = JSON.parse(data).Result;
			var defaultorgId = orgs[0].Id;
			$.cookie('defaultorgid', defaultorgId,{path: '/'});
		});


	//更換面板
	function skins(){
		var skin = window.sessionStorage.getItem("skin");
		if (skin) { //如果更換過面板
		    if (window.sessionStorage.getItem("skinValue") != "自定義") {
		        $("body").addClass(window.sessionStorage.getItem("skin"));
		    } else {
		        $(".layui-layout-admin .layui-header").css("background-color", skin.split(',')[0]);
		        $(".layui-bg-black").css("background-color", skin.split(',')[1]);
		        $(".hideMenu").css("background-color", skin.split(',')[2]);
		    }
		} else {
		    $("body").addClass("blue");
		}
	}
	skins();
	$(".changeSkin").click(function(){
		layer.open({
			title : "更換面板",
			area : ["310px","280px"],
			type : "1",
			content : '<div class="skins_box">'+
						'<form class="layui-form">'+
							'<div class="layui-form-item">'+
								'<input type="radio" name="skin" value="預設" title="預設" lay-filter="default" checked="">'+
								'<input type="radio" name="skin" value="藏青" title="藏青" lay-filter="cyan">'+
								'<input type="radio" name="skin" value="藍色" title="藍色" lay-filter="blue">'+
								'<input type="radio" name="skin" value="自定義" title="自定義" lay-filter="custom">'+
								'<div class="skinCustom">'+
									'<input type="text" class="layui-input topColor" name="topSkin" placeholder="頂部顏色" />'+
									'<input type="text" class="layui-input leftColor" name="leftSkin" placeholder="左側顏色" />'+
									'<input type="text" class="layui-input menuColor" name="btnSkin" placeholder="頂部菜單按鈕" />'+
								'</div>'+
							'</div>'+
							'<div class="layui-form-item skinBtn">'+
								'<a href="javascript:;" class="layui-btn layui-btn-small layui-btn-normal" lay-submit="" lay-filter="changeSkin">確定更換</a>'+
								'<a href="javascript:;" class="layui-btn layui-btn-small layui-btn-primary" lay-submit="" lay-filter="noChangeSkin">我再想想</a>'+
							'</div>'+
						'</form>'+
					'</div>',
			success : function(index, layero){
				var skin = window.sessionStorage.getItem("skin");
				if(window.sessionStorage.getItem("skinValue")){
					$(".skins_box input[value="+window.sessionStorage.getItem("skinValue")+"]").attr("checked","checked");
				};
				if($(".skins_box input[value=自定義]").attr("checked")){
					$(".skinCustom").css("visibility","inherit");
					$(".topColor").val(skin.split(',')[0]);
					$(".leftColor").val(skin.split(',')[1]);
					$(".menuColor").val(skin.split(',')[2]);
				};
				form.render();
				$(".skins_box").removeClass("layui-hide");
				$(".skins_box .layui-form-radio").on("click",function(){
					var skinColor;
					if($(this).find("span").text() == "藏青"){
						skinColor = "cyan";
					}else if($(this).find("span").text() == "藍色"){
						skinColor = "blue";
					}else if($(this).find("span").text() == "預設"){
						skinColor = "";
					}
					if($(this).find("span").text() != "自定義"){
						$(".topColor,.leftColor,.menuColor").val('');
						$("body").removeAttr("class").addClass("main_body "+skinColor+"");
						$(".skinCustom").removeAttr("style");
						$(".layui-bg-black,.hideMenu,.layui-layout-admin .layui-header").removeAttr("style");
					}else{
						$(".skinCustom").css("visibility","inherit");
					}
				})
				var skinStr,skinColor;
				$(".topColor").blur(function(){
					$(".layui-layout-admin .layui-header").css("background-color",$(this).val());
				})
				$(".leftColor").blur(function(){
					$(".layui-bg-black").css("background-color",$(this).val());
				})
				$(".menuColor").blur(function(){
					$(".hideMenu").css("background-color",$(this).val());
				})

				form.on("submit(changeSkin)",function(data){
					if(data.field.skin != "自定義"){
						if(data.field.skin == "藏青"){
							skinColor = "cyan";
						}else if(data.field.skin == "藍色"){
							skinColor = "blue";
						}else if(data.field.skin == "預設"){
							skinColor = "";
						}
						window.sessionStorage.setItem("skin",skinColor);
					}else{
						skinStr = $(".topColor").val()+','+$(".leftColor").val()+','+$(".menuColor").val();
						window.sessionStorage.setItem("skin",skinStr);
						$("body").removeAttr("class").addClass("main_body");
					}
					window.sessionStorage.setItem("skinValue",data.field.skin);
					layer.closeAll("page");
				});
				form.on("submit(noChangeSkin)",function(){
					$("body").removeAttr("class").addClass("main_body "+window.sessionStorage.getItem("skin")+"");
					$(".layui-bg-black,.hideMenu,.layui-layout-admin .layui-header").removeAttr("style");
					skins();
					layer.closeAll("page");
				});
			},
			cancel : function(){
				$("body").removeAttr("class").addClass("main_body "+window.sessionStorage.getItem("skin")+"");
				$(".layui-bg-black,.hideMenu,.layui-layout-admin .layui-header").removeAttr("style");
				skins();
			}
		})
	})

	//退出
	$(".signOut").click(function(){
		window.sessionStorage.removeItem("menu");
		menu = [];
		window.sessionStorage.removeItem("curmenu");
	})

	//隱藏左側導航
	$(".hideMenu").click(function(){
		$(".layui-layout-admin").toggleClass("showMenu");
		//渲染頂部視窗
		tab.tabMove();
	})

	//渲染左側菜單
	tab.render();

	//鎖屏
	function lockPage(){
		layer.open({
			title : false,
			type : 1,
			content : '	<div class="admin-header-lock" id="lock-box">'+
							'<div class="admin-header-lock-img"><img src="/images/face.jpg"/></div>'+
							'<div class="admin-header-lock-name" id="lockUserName">admin</div>'+
							'<div class="input_btn">'+
								'<input type="password" class="admin-header-lock-input layui-input" autocomplete="off" placeholder="請輸入密碼解鎖.." name="lockPwd" id="lockPwd" />'+
								'<button class="layui-btn" id="unlock">解鎖</button>'+
							'</div>'+
							'<p>請輸入「123456」，否則不會解鎖成功哦！！！</p>'+
						'</div>',
			closeBtn : 0,
			shade : 0.9
		})
		$(".admin-header-lock-input").focus();
	}
	$(".lockcms").on("click",function(){
		window.sessionStorage.setItem("lockcms",true);
		lockPage();
	})
	// 判斷是否顯示鎖屏
	if(window.sessionStorage.getItem("lockcms") == "true"){
		lockPage();
	}
	// 解鎖
	$("body").on("click","#unlock",function(){
		if($(this).siblings(".admin-header-lock-input").val() == ''){
			layer.msg("請輸入解鎖密碼！");
			$(this).siblings(".admin-header-lock-input").focus();
		}else{
			if($(this).siblings(".admin-header-lock-input").val() == "123456"){
				window.sessionStorage.setItem("lockcms",false);
				$(this).siblings(".admin-header-lock-input").val('');
				layer.closeAll("page");
			}else{
				layer.msg("密碼錯誤，請重新輸入！");
				$(this).siblings(".admin-header-lock-input").val('').focus();
			}
		}
	});

	//手機裝置的簡單適配
	var treeMobile = $('.site-tree-mobile'),
		shadeMobile = $('.site-mobile-shade')

	treeMobile.on('click', function(){
		$('body').addClass('site-mobile');
	});

	shadeMobile.on('click', function(){
		$('body').removeClass('site-mobile');
	});

	// 新增新視窗
	$("body").on("click",".layui-nav .layui-nav-item a",function(){
		//如果不存在子級
		if($(this).siblings().length == 0){
			addTab($(this));
			$('body').removeClass('site-mobile');  //移動端點選菜單關閉菜單層
		}
		$(this).parent("li").siblings().removeClass("layui-nav-itemed");
	})

	//公告層
	function showNotice(){
		layer.open({
	        type: 1,
	        title: "系統公告",
	        closeBtn: false,
	        area: '310px',
	        shade: 0.8,
	        id: 'LAY_layuipro',
	        btn: ['火速圍觀'],
	        moveType: 1,
	        content: '<div style="padding:15px 20px; text-align:justify; line-height: 22px; text-indent:2em;border-bottom:1px solid #e2e2e2;">' +
                '<p>鄭重提示：OpenAuth.Core 2.0新版上線，如以前訪問過本站點請清空快取后訪問</p>' +
	            '<p>喜歡的，快快star吧！</p></div>',
	        success: function(layero){
				var btn = layero.find('.layui-layer-btn');
				btn.css('text-align', 'center');
				btn.on("click",function(){
					window.sessionStorage.setItem("showNotice","true");
				})
				if($(window).width() > 432){  //如果頁面寬度不足以顯示頂部「系統公告」按鈕，則不提示
					btn.on("click",function(){
						layer.tips('系統公告躲在了這裡', '#showNotice', {
							tips: 3
						});
					})
				}
	        }
	    });
	}
	//判斷是否處於鎖屏狀態(如果關閉以後則未關閉瀏覽器之前不再顯示)
	if(window.sessionStorage.getItem("lockcms") != "true" && window.sessionStorage.getItem("showNotice") != "true"){
		showNotice();
	}
	$(".showNotice").on("click",function(){
		showNotice();
	})

	//重新整理后還原打開的視窗
	if(window.sessionStorage.getItem("menu") != null){
		menu = JSON.parse(window.sessionStorage.getItem("menu"));
		curmenu = window.sessionStorage.getItem("curmenu");
		var openTitle = '';
		for(var i=0;i<menu.length;i++){
			openTitle = '';
			if(menu[i].icon){
				if(menu[i].icon.split("-")[0] == 'icon'){
					openTitle += '<i class="iconfont '+menu[i].icon+'"></i>';
				}else{
					openTitle += '<i class="layui-icon">'+menu[i].icon+'</i>';
				}
			}
			openTitle += '<cite>'+menu[i].title+'</cite>';
			openTitle += '<i class="layui-icon layui-unselect layui-tab-close" data-id="'+menu[i].layId+'">&#x1006;</i>';
			element.tabAdd("bodyTab",{
				title : openTitle,
		        content :"<iframe src='"+menu[i].href+"' data-id='"+menu[i].layId+"'></frame>",
		        id : menu[i].layId
			})
			//定位到重新整理前的視窗
			if(curmenu != "undefined"){
				if(curmenu == '' || curmenu == "null"){  //定位到後臺首頁
					element.tabChange("bodyTab",'');
				}else if(JSON.parse(curmenu).title == menu[i].title){  //定位到重新整理前的頁面
					element.tabChange("bodyTab",menu[i].layId);
				}
			}else{
				element.tabChange("bodyTab",menu[menu.length-1].layId);
			}
		}
		//渲染頂部視窗
		tab.tabMove();
	}

	//重新整理當前
	$(".refresh").on("click",function(){  //此處新增禁止連續點選重新整理一是為了降低伺服器壓力，另外一個就是為了防止超快點選造成chrome本身的一些js檔案的報錯(不過貌似這個問題還是存在，不過概率小了很多)
		if($(this).hasClass("refreshThis")){
			$(this).removeClass("refreshThis");
			$(".clildFrame .layui-tab-item.layui-show").find("iframe")[0].contentWindow.location.reload(true);
		}else{
			layer.msg("您點選的速度超過了伺服器的響應速度，還是等兩秒再重新整理吧！");
			setTimeout(function(){
				$(".refresh").addClass("refreshThis");
			},2000)
		}
	})

	//關閉其他
	$(".closePageOther").on("click",function(){
		if($("#top_tabs li").length>2 && $("#top_tabs li.layui-this cite").text()!="後臺首頁"){
			var menu = JSON.parse(window.sessionStorage.getItem("menu"));
			$("#top_tabs li").each(function(){
				if($(this).attr("lay-id") != '' && !$(this).hasClass("layui-this")){
					element.tabDelete("bodyTab",$(this).attr("lay-id")).init();
					//此處將當前視窗重新獲取放入session，避免一個個刪除來回循環造成的不必要工作量
					for(var i=0;i<menu.length;i++){
						if($("#top_tabs li.layui-this cite").text() == menu[i].title){
							menu.splice(0,menu.length,menu[i]);
							window.sessionStorage.setItem("menu",JSON.stringify(menu));
						}
					}
				}
			})
		}else if($("#top_tabs li.layui-this cite").text()=="後臺首頁" && $("#top_tabs li").length>1){
			$("#top_tabs li").each(function(){
				if($(this).attr("lay-id") != '' && !$(this).hasClass("layui-this")){
					element.tabDelete("bodyTab",$(this).attr("lay-id")).init();
					window.sessionStorage.removeItem("menu");
					menu = [];
					window.sessionStorage.removeItem("curmenu");
				}
			})
		}else{
			layer.msg("沒有可以關閉的視窗了@_@");
		}
		//渲染頂部視窗
		tab.tabMove();
	})
	//關閉全部
	$(".closePageAll").on("click",function(){
		if($("#top_tabs li").length > 1){
			$("#top_tabs li").each(function(){
				if($(this).attr("lay-id") != ''){
					element.tabDelete("bodyTab",$(this).attr("lay-id")).init();
					window.sessionStorage.removeItem("menu");
					menu = [];
					window.sessionStorage.removeItem("curmenu");
				}
			})
		}else{
			layer.msg("沒有可以關閉的視窗了@_@");
		}
		//渲染頂部視窗
		tab.tabMove();
	})
})

//打開新視窗
function addTab(_this){
	tab.tabAdd(_this);
}

//捐贈彈窗
function donation(){
	layer.tab({
		area : ['260px', '367px'],
		tab : [{
			title : "微信",
			content : "<div style='padding:30px;overflow:hidden;background:#d2d0d0;'><img src='/images/wechat.jpg'></div>"
		},{
			title : "支付寶",
			content : "<div style='padding:30px;overflow:hidden;background:#d2d0d0;'><img src='/images/alipay.jpg'></div>"
		}]
	})
}

