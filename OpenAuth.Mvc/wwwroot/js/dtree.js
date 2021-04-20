/**

 @Name：dtree 樹形元件
 @Author：智慧的小西瓜
 @Site：http://www.wisdomelon.com/DTreeHelper/
 @License：LAYUI
    
 */
layui.define(['jquery','layer','form'], function(exports) {
	var $ = layui.$,
		layer = layui.layer,
		form = layui.form;

	// 樹的公共定義樣式彙總
	var LI_NAV_CHILD = "dtree-nav-ul-sid", LI_NAV_ITEM = "dtree-nav-item",
		LI_DIV_ITEM = "dtree-nav-div", DTREEFONT = "dtreefont", DTREEFONTSPECIAL="dtreefont-special",
		LI_DIV_MENUBAR = "dtree-menubar",LI_DIV_MENUBAR_DOWN = "dtree-icon-move-down", LI_DIV_MENUBAR_UP = "dtree-icon-move-up", LI_DIV_MENUBAR_REFRESH = "dtree-icon-refresh", LI_DIV_MENUBAR_DELETE = "dtree-icon-delete1", LI_DIV_MENUBAR_SEARCH = "dtree-icon-search_list_light",
		LI_DIV_TOOLBAR = "dtree-toolbar", TOOLBAR_TOOL = "dtree-toolbar-tool", LI_DIV_TOOLBAR_ADD = "dtree-icon-roundadd", LI_DIV_TOOLBAR_EDIT = "dtree-icon-bianji", LI_DIV_TOOLBAR_DEL = "dtree-icon-roundclose",
		LI_DIV_SPREAD_LAST = "dtree-icon-dian",
		LI_DIV_CHECKBAR = "dtree-nav-checkbox-div", LI_DIV_CHECKBAR_ON = "dtree-icon-fuxuankuangxuanzhong", LI_DIV_CHECKBAR_OUT = "dtree-icon-fuxuankuang", LI_DIV_CHECKBAR_NOALL = "dtree-icon-fuxuankuang-banxuan",
		LI_CLICK_CHECKBAR = "d-click-checkbar",		//繫結點選覈取方塊時需要用到
		LI_DIV_TEXT_CLASS = "t-click", UL_ROOT="dtree";

	// 樹的自定義樣式
	var DTREE = "dtree-",			//自定義樣式字首
		ITEMTHIS = "-item-this",	//自定義樣式當前行選中後綴
		ITEM = "-item",				//自定義樣式當前行後綴
		DFONT = "-dtreefont",		//自定義樣式圖示樣式後綴
		FICON = "-ficon",			//自定義樣式一級圖示樣式後綴
		ICON = "-icon",				//自定義樣式二級圖示樣式後綴
		CBOX = "-checkbox",			//自定義樣式覈取方塊樣式後綴
		CHS = "-choose";			//自定義樣式覈取方塊選中樣式後綴

	// 樹的公共指定
	var NAV_THIS = "dtree-nav-this",	//當前節點
		NAV_SHOW = "dtree-nav-show",	//顯示子節點
		ICON_HIDE = "dtree-icon-hide", //隱藏dot圖示
		$BODY = $("body"),		//body選擇器
		MOD_NAME = "dtree",		//模組名稱
		VERSION = "v2.4.5_finally_beta",		//版本	
		DTrees = {};			//當前被實例化的樹的集合

	// 樹的一級節點圖示集合
	var firstIconArray = {
		"-1": {"open": "dtree-icon-null-open", "close": "dtree-icon-null-close"},			//未指定
		"0" : {"open": "dtree-icon-jian", "close": "dtree-icon-jia"},
		"1" : {"open": "dtree-icon-xiangxia1", "close": "dtree-icon-xiangyou"}
	};

	// 樹的二級節點圖示集合
	var nodeIconArray = {
		"-1": {"open": "dtree-icon-null-open", "close": "dtree-icon-null-close"},			//未指定
		"0" : {"open": "dtree-icon-wenjianjiazhankai", "close": "dtree-icon-weibiaoti5"}
	};

	var leafIconArray = {
		"-1": "dtree-icon-null",			//未指定
		"0" : "dtree-icon-weibiaoti5", 		//資料夾
		"1" : "dtree-icon-yonghu",			//人員
		"2" : "dtree-icon-fenzhijigou",		//機構
		"3" : "dtree-icon-fenguangbaobiao",	//報表
		"4" : "dtree-icon-xinxipilu",			//資訊
		"5" : "dtree-icon-shuye1",				//葉子
		"6" : "dtree-icon-caidan_xunzhang",	//勳章
		"7" : "dtree-icon-normal-file"		//檔案
	};

	// 樹自定義操作事件名稱集合	繫結dtree-click的事件
	var eventName = {
		checkNodeClick: "checkNodeClick",				//點選覈取方塊
		itemNodeClick: "itemNodeClick"					//點選子節點div
	};


	// 樹預設toolbar提供的功能集合	繫結dtree-tool的事件
	var defaultTool = {
		addToolbar: "addToolbar",						//點選toolbar新增
		editToolbar: "editToolbar",						//點選toolbar編輯
		delToolbar: "delToolbar"						//點選toolbar刪除
	};

	// 樹預設menubar提供的功能集合	繫結dtree-menu的事件
	var defaultMenu = {
		moveDown: "moveDown",							//menubar展開節點
		moveUp: "moveUp",								//menubar收縮節點
		refresh: "refresh",								//menubar重新整理樹
		remove: "remove",								//menubar刪除選中節點
		searchNode: "searchNode"						//menubar查詢節點	
	};

	// 樹的公共事件
	var event = {
		getElemId: function(options){	// 根據傳入的參數獲取ID
			var elem = options.elem || "";
			var obj = options.obj || $(elem);

			if (obj.length == 0) {	//頁面中未找到繫結id
				return "";
			} else {
				return $(obj)[0].id;
			}
		},
		escape: function(html){
			if(typeof html !== 'string') return '';
			return html.replace(entityReg.escape, function(match){return entityMap.escape[match];});
		},
		unescape: function(str){
			if(typeof str !== 'string') return '';
			return str.replace(entityReg.unescape, function(match){return entityMap.unescape[match];});
		},
		cloneObj: function (obj, filter) {  //深複製對像方法    
		    var newObj = {};  
		    if (obj instanceof Array) {  
		        newObj = [];  
		    }  
		    var str = "";
		    if(typeof filter !== 'undefined') {str = filter.join(",");} 
		    for (var key in obj) {  
		    	if(str.indexOf(key) == -1){
	    			var val = obj[key]; 
			        newObj[key] = typeof val === 'object' ? event.cloneObj(val, typeof filter !== undefined ? filter : []): val;  
	    		}

		    }  
		    return newObj;  
		}
	};

	// 特殊符號轉義
	var keys = Object.keys || function(obj) {
			obj = Object(obj);
			var arr = [];
			for(var a in obj) arr.push(a);
			return arr;
		};
	var invert = function(obj){
		obj = Object(obj);
		var result = {};
		for(var a in obj) result[obj[a]] = a;
		return result;
	};
	var entityMap = {
		escape: {
			"&" : "&amp;",
			"<" : "&lt;",
			">" : "&gt;",
			"'" : "&quo;"
		}
	};
	entityMap.unescape = invert(entityMap.escape);
	var entityReg = {
		escape: RegExp('[' + keys(entityMap.escape).join('') + ']', 'g'),
		unescape: RegExp('(' + keys(entityMap.unescape).join('|') + ')', 'g')
	};

	//非同步載入接口
	var AjaxHelper = {
		request : function(config) {
			var data = config.data ? config.data : {};
			var async = (typeof (config.async) === "boolean") ? config.async : true;
			$.ajax({
				type : config.type ? config.type : "POST",
				headers : config.headers,
				url : config.url,
				dataType : config.dataType ? config.dataType : "json",
				data : data,
				async : async,
				success : config.success,
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					if (typeof (config.error) === "function") {
						config.error();
					} else {
						layer.msg('系統異常導致操作失敗, 請聯繫管理員。',{icon:5, shift:6});
					}
				},
				statusCode : {
					404 : function() {
						layer.msg('未找到指定請求，請檢查訪問路徑！',{icon:5, shift:6});
					},
					500 : function() {
						layer.msg('系統錯誤，請聯繫管理員。',{icon:5, shift:6});
					}
				},
				complete : function(XMLHttpRequest, textStatus) {
					if (typeof (config.complete) === "function") {
						config.complete(XMLHttpRequest, textStatus);
					}
				}
			});
		},
		serialize: function(param){	//json序列化   key=value&key1=value1
			var p = "?";
			for (var key in param) {
				p += key + "=" + param[key] + "&";
			}
			p = p.substring(0, p.length-1);
			return p;
		}
	};

	// 樹類
	var DTree = function(options){

		/** 預設賦值**/
		this.response = {  // 樹返回的json格式
			statusName: "code",		//返回標識
			statusCode: 200,		//返回碼
			message: "message",		//返回資訊
			rootName: "data",		//根節點名稱
			treeId: "id",			//節點ID
			parentId: "parentId",	//父節點ID
			title: "title",			//節點名稱
			iconClass: "iconClass",		//自定義圖示
			childName: "children",	//子節點名稱
			isLast: "isLast",		//是否最後一級節點
//			level: "level",			//層級
			spread: "spread",		//展開
			disabled: "disabled",	//禁用
			checkArr: "checkArr",	//覈取方塊列表
			isChecked: "isChecked", //是否選中
			type: "type",			//覈取方塊標記
			basicData: "basicData"	//表示使用者自定義需要儲存在樹節點中的數據
		};
		this.defaultRequest = {  // 樹的預設發起請求參數格式，最後會將value作為參數名稱傳遞
			nodeId: "nodeId",		//節點ID
			parentId: "parentId",	//父節點ID
			context: "context",	//節點內容
			isLeaf: "isLeaf",		//是否葉子節點
			level: "level",		//層級
			spread: "spread",		//節點展開狀態
			dataType: "dataType",	//節點標記
			ischecked: "ischecked",	//節點覈取方塊選中狀態
			initchecked: "initchecked",	//節點覈取方塊初始狀態
			basicData: "basicData",		//使用者自定義的記錄節點數據
			recordData: "recordData",		//當前data數據（排除basicData和children欄位）
		};
		this.toolbarFun = {
			addTreeNode: function(param, $div) {	//新增樹節點后呼叫的函式，用於使用者自定義，如未指定則樹不會發生變化
				return ;
			},
			editTreeNode: function(param, $div) {	//編輯樹節點后呼叫的函式，用於使用者自定義，如未指定則樹不會發生變化
				return ;
			},
			editTreeLoad: function(param){	// 編輯樹的數據回顯，用於打開編輯時，回填數據
				return ;
			},
			delTreeNode: function(param, $div){	//刪除樹后呼叫的函式，用於使用者自定義，如未指定則樹不會發生變化
				return ;
			},
			loadToolbarBefore: function(buttons, param, $div){  // 右鍵菜單載入前的函式
				return buttons;
			}
		};
		this.toolbarStyle = {
			title: "節點",
			area: ["60%","80%"]
		};
		this.menubarFun = {
			remove: function(checkbarNodes){			//刪除覈取方塊選中節點，需要使用者自定義，如未指定則樹只是頁面上做了修改
				return true;
			}
		};
		this.menubarTips = {
			toolbar: [],
			group: [defaultMenu.moveDown, defaultMenu.moveUp, defaultMenu.refresh, defaultMenu.remove, defaultMenu.searchNode],
			freedom: []
		};
		this.checkbarFun = {
			chooseBefore: function($i, node){	// 覈取方塊點選前回調
				return true;
			},
			chooseDone: function(checkbarNodesParam) {	//覈取方塊點選事件完畢后，返回該樹關於覈取方塊操作的全部資訊，用於使用者自定義，如未指定則樹只是頁面上做了修改
				return ;
			}
		};
		this.iframe = {  // 樹點選節點時，打開iframe頁面參數配置
			iframeElem: "",		//iframe的ID
			iframeUrl: "",		//樹關聯的frame地址
			iframeLoad: "leaf",	//點選哪一層載入frame： node：所有節點， leaf：預設，最後一級
			iframeDefaultRequest: {  //iframe的預設參數,目的是與載入樹的參數不一樣
				nodeId: "nodeId",		//節點ID
				parentId: "parentId",	//父節點ID
				context: "context",	//節點內容
				isLeaf: "isLeaf",		//是否葉子節點
				level: "level",		//層級
				spread: "spread",		//節點展開狀態
				dataType: "dataType",	//節點標記
				ischecked: "ischecked",	//節點覈取方塊選中狀態
				initchecked: "initchecked",	//節點覈取方塊初始狀態
				basicData: "basicData",		//使用者自定義的記錄節點數據
				recordData: "recordData",		//當前data數據（排除basicData和children欄位）
			},  
			iframeRequest: {}	//iframe的自定義參數
		};
		this.iframeFun = {
			iframeDone: function(iframeParam){	//iframe載入完畢后，用於使用者自定義事件
				return ;
			}
		};
		this.style = {
			item: "",
			itemThis: "",
			dfont: "",
			icon: "",
			cbox: "",
			chs: ""
		};

		/** 數據繫結**/
		this.node = {		// 樹節點選中時，包含當前節點的全部資訊
			nodeId: "",		//節點ID
			parentId: "",	//父節點ID
			context: "",	//節點內容
			isLeaf: "",		//是否葉子節點
			level: "",		//層級
			spread: "",		//節點展開狀態
			dataType: "",	//節點標記
			ischecked: "",	//節點覈取方塊選中狀態
			initchecked: "",	//節點覈取方塊初始狀態
			basicData: "",		//使用者自定義的記錄節點數據
			recordData: "",		//當前data數據（排除basicData和children欄位）
		};
		this.toolbarMenu = {};	// 工具欄右鍵菜單繫結的所有元素
		this.checkbarNode = [];	// 覈取方塊標記的全部節點數據
		this.checkArrLen = 0;	//新增節點的時判斷覈取方塊個數
		this.temp = [];	// 臨時變數

		this.setting(options);
	};

	/******************** 初始參數載入 ********************/
		// 設定值
	DTree.prototype.setting = function(options) {
		this.options = options || {};

		/** 繫結元素參數（必填，2個參數項必填一個）**/
		this.elem = this.options.elem || "";			//樹繫結的元素ID：#elem
		this.obj = this.options.obj || $(this.elem);	//樹繫結的jquery元素，用於當元素是延遲載入出來的話，可以用這個找到

		/** 基本參數**/
		this.initLevel = this.options.initLevel || 2;	//預設展開節點  2節    
		this.type = this.options.type || "load";	// 樹的載入方式  all，全量樹，  load，增量樹，預設load
		this.cache = (typeof (this.options.cache) === "boolean") ? this.options.cache : true;		//開啟數據快取
		this.record = (typeof (this.options.record) === "boolean") ? this.options.record : false;		//開啟數據記錄模式
		this.load = (typeof (this.options.load) === "boolean") ? this.options.load : true;		//開啟載入動畫

		/** 樣式相關參數**/
		this.firstIconArray = $.extend(firstIconArray, this.options.firstIconArray) || firstIconArray;	//使用者自定義一級圖示集合，node
		this.nodeIconArray = $.extend(nodeIconArray, this.options.nodeIconArray) || nodeIconArray;	//使用者自定義二級圖示集合，node
		this.leafIconArray = $.extend(leafIconArray, this.options.leafIconArray) || leafIconArray;	//使用者自定義二級圖示集合，leaf
		this.skin = this.options.skin || "theme";	// 自定義樣式 
		if(this.skin == "layui"){ // layui主題
			this.ficon = this.options.ficon || "1";		// 一級圖示樣式，0：+，-
			this.dot = (typeof (this.options.dot) === "boolean") ? this.options.dot : false;		//是否顯示一級圖示的小圓點，預設不顯示
			this.icon = this.options.icon || "7";	//二級圖示樣式，0：資料夾，1：人員，2：機構，3：報表，4：資訊，5：葉子，6：勳章, -1：不顯示二級圖示。預設'1'
			this.nodeIcon = (typeof this.icon === 'string' || typeof this.icon === 'number') ? (this.icon == "-1" ? "-1" : "-1") : this.icon[0];		// 二級圖示中的node節點圖示
		} else { // 預設主題  或者自定義主題
			this.ficon = this.options.ficon || "0";		// 一級圖示樣式，0：+，-
			this.dot = (typeof (this.options.dot) === "boolean") ? this.options.dot : true;		//是否顯示一級圖示的小圓點，預設顯示
			this.icon = this.options.icon || "5";	//二級圖示樣式，0：資料夾，1：人員，2：機構，3：報表，4：資訊，5：葉子，6：勳章, -1：不顯示二級圖示。預設'5'
			this.nodeIcon = (typeof this.icon === 'string' || typeof this.icon === 'number') ? (this.icon == "-1" ? "-1" : "0") : this.icon[0];		// 二級圖示中的node節點圖示
		}

		/** 內建樣式屬性*/
		this.ficonOpen =  this.firstIconArray[this.ficon]["open"]; // 一級圖示中的node節點open圖示
		this.ficonClose = this.firstIconArray[this.ficon]["close"]; // 一級圖示中的node節點close圖示
		this.nodeIconOpen =  this.nodeIconArray[this.nodeIcon]["open"];  // 二級圖示中的node節點open圖示
		this.nodeIconClose =  this.nodeIconArray[this.nodeIcon]["close"]; // 二級圖示中的node節點close圖示
		this.leafIcon = (typeof this.icon === 'string' || typeof this.icon === 'number') ? this.icon : this.icon[1];	// 二級圖示中的leaf節點圖示
		this.leafIconShow =  this.leafIconArray[this.leafIcon]; // 二級圖示中的leaf節點圖示

		this.style.item = DTREE + this.skin + ITEM;
		this.style.itemThis = DTREE + this.skin + ITEMTHIS;
		this.style.dfont = DTREE + this.skin + DFONT;
		this.style.ficon = DTREE + this.skin + FICON;
		this.style.icon = DTREE + this.skin + ICON;
		this.style.cbox = DTREE + this.skin + CBOX;
		this.style.chs = DTREE + this.skin + CHS;

		/** 數據載入參數**/
		this.url = this.options.url || "";		//請求地址
		this.async = (typeof (this.options.async) === "boolean") ? this.options.async : true;	//非同步同步載入,預設非同步載入
		this.headers = this.options.headers || {};		// ajax header屬性
		this.method = this.options.method || "post";	//請求型別
		this.dataType = this.options.dataType || "json";	//參數型別
		this.defaultRequest = $.extend(this.defaultRequest, this.options.defaultRequest) || this.defaultRequest;	//預設請求參數
		this.filterRequest = this.options.filterRequest || [];	//過濾請求參數
		this.request = this.options.request || {};		//使用者自定義請求參數
		this.response = $.extend(this.response, this.options.response) || this.response;	//返回json格式
		this.data = this.options.data || null;		//初始化指定該參數，則不會訪問非同步接口
		this.dataFormat = this.options.dataFormat || "levelRelationship";  //用於使用者配置的data數據格式，list：列表，  levelRelationship：層級關係，預設
		this.dataStyle = this.options.dataStyle || "defaultStyle";  //用於使用者配置layui通用的json數據風格,layuiStyle:layui風格，defaultStyle：預設風格
		this.success = this.options.success || function(data, obj){};		//樹載入完畢后執行解析樹之前的回撥（僅限非同步載入）
		this.done = this.options.done || function(data, obj){};		//樹載入完畢后的回撥（僅限非同步載入）

		/** 工具欄參數**/
		this.toolbar = this.options.toolbar || false;	//是否開啟可編輯模式
		this.toolbarStyle = $.extend(this.toolbarStyle, this.options.toolbarStyle) || this.toolbarStyle;	//toolbar的自定義風格，標題，彈框大小
		this.toolbarScroll = this.options.toolbarScroll || this.elem;	//樹的上級div容器，讓樹可以顯示滾動條的div容器
		this.toolbarLoad = this.options.toolbarLoad || "node";	//toolbar作用範圍：node:所有節點，noleaf:非最後一級節點，leaf:最後一級
		this.toolbarShow = this.options.toolbarShow || ["add","edit","delete"];		// toolbar三個按鈕自定義載入
		this.toolbarBtn = this.options.toolbarBtn || null;		// toolbar增刪改中內容的自定義載入
		this.toolbarExt = this.options.toolbarExt || [];		// toolbar按鈕擴充套件
		this.toolbarFun = $.extend(this.toolbarFun, this.options.toolbarFun) || this.toolbarFun;		// toolbar事件載入

		/** 菜單欄參數**/
		this.menubar = this.options.menubar || false;	//是否打開菜單欄
		this.menubarTips = $.extend(this.menubarTips, this.options.menubarTips) || this.menubarTips; // 菜單欄吸附， toolbar：依附在工具欄，group：依附在按鈕組，freedom，自由
		this.menubarFun = $.extend(this.menubarFun, this.options.menubarFun) || this.menubarFun;	//menubar事件載入

		/** 覈取方塊參數**/
		this.checkbar = this.options.checkbar || false;	//是否開啟覈取方塊模式
		this.checkbarLoad = this.options.checkbarLoad || "node";  // 覈取方塊作用範圍，node：所有節點， leaf：最後一級；預設所有節點
		this.checkbarType = this.options.checkbarType || "all" ;	//覈取方塊選中形式	all：子集選中父級也選中，  no-all：子集選中父級半選中，子集全選父級選中，p-casc：父級選中子集全選，子集無法改變父級選中狀態， self：沒有任何級聯關係，only：只能選中一個覈取方塊。   預設all
		this.checkbarData = this.options.checkbarData || "choose" ;	//覈取方塊記錄數據型別形式，  change表示記錄變更數據，choose表示記錄選中數據，all，記錄全部數據，預設choose
		this.checkbarFun =  $.extend(this.checkbarFun, this.options.checkbarFun) || this.checkbarFun;	// checkbar事件載入

		/** iframe模式參數**/
		this.useIframe = this.options.useIframe || false;	// 是否載入iframe 預設false，
		this.iframe = $.extend(this.iframe, this.options.iframe) || this.iframe;	//iframe配置
		this.iframeFun = $.extend(this.iframeFun, this.options.iframeFun) || this.iframeFun;	//iframe事件載入

	};

	// 設定值
	DTree.prototype.reloadSetting = function(options) {
		this.options = $.extend(this.options, options) || this.options;

		/** 繫結元素參數**/
		this.elem = this.options.elem || this.elem;			//樹繫結的元素ID：#elem
		if(typeof this.options.obj === 'undefined'){
			if(this.elem) {
				if($(this.elem).length > 0) {
					this.obj = $(this.elem);
				}
			}
		} else {
			this.obj = this.options.obj || this.obj; //樹繫結的jquery元素，用於當元素是延遲載入出來的話，可以用這個找到
		}

		/** 基本參數**/
		this.initLevel = this.options.initLevel || this.initLevel;	//預設展開節點  2節    
		this.type = this.options.type || this.type;		// 樹的載入方式  all，全量樹，  load，增量樹，預設load
		this.cache = (typeof (this.options.cache) === "boolean") ? this.options.cache : this.cache;		//開啟數據快取
		this.record = (typeof (this.options.record) === "boolean") ? this.options.record : this.record;		//開啟數據記錄模式
		this.load = (typeof (this.options.load) === "boolean") ? this.options.load : this.load;		//開啟載入動畫
		
		/** 樣式相關參數**/
		this.firstIconArray = $.extend(firstIconArray, this.options.firstIconArray) || this.firstIconArray;	//使用者自定義一級圖示集合，node
		this.nodeIconArray = $.extend(nodeIconArray, this.options.nodeIconArray) || this.nodeIconArray;	//使用者自定義二級圖示集合，node
		this.leafIconArray = $.extend(leafIconArray, this.options.leafIconArray) || this.leafIconArray;	//使用者自定義二級圖示集合，leaf
		this.skin = this.options.skin || this.skin;	// 自定義樣式 
		if(this.skin == "layui"){ // layui主題
			this.ficon = this.options.ficon || this.ficon;		// 一級圖示樣式，0：+，-
			this.dot = (typeof (this.options.dot) === "boolean") ? this.options.dot : false;		//是否顯示一級圖示的小圓點，預設不顯示
			this.icon = this.options.icon || this.icon;	//二級圖示樣式，0：資料夾，1：人員，2：機構，3：報表，4：資訊，5：葉子，6：勳章, -1：不顯示二級圖示。預設'1'
			this.nodeIcon = (typeof this.icon === 'string' || typeof this.icon === 'number') ? (this.icon == "-1" ? "-1" : "-1") : this.icon[0];		// 二級圖示中的node節點圖示
		} else { // 預設主題  或者自定義主題
			this.ficon = this.options.ficon || this.ficon;		// 一級圖示樣式，0：+，-
			this.dot = (typeof (this.options.dot) === "boolean") ? this.options.dot : 	true;		//是否顯示一級圖示的小圓點，預設顯示
			this.icon = this.options.icon || this.icon;	//二級圖示樣式，0：資料夾，1：人員，2：機構，3：報表，4：資訊，5：葉子，6：勳章, -1：不顯示二級圖示。預設'5'
			this.nodeIcon = (typeof this.icon === 'string' || typeof this.icon === 'number') ? (this.icon == "-1" ? "-1" : "0") : this.icon[0];		// 二級圖示中的node節點圖示
		}

		/** 內建樣式屬性*/
		this.ficonOpen =  this.firstIconArray[this.ficon]["open"]; // 一級圖示中的node節點open圖示
		this.ficonClose = this.firstIconArray[this.ficon]["close"]; // 一級圖示中的node節點close圖示
		this.nodeIconOpen =  this.nodeIconArray[this.nodeIcon]["open"];  // 二級圖示中的node節點open圖示
		this.nodeIconClose =  this.nodeIconArray[this.nodeIcon]["close"]; // 二級圖示中的node節點close圖示
		this.leafIcon = (typeof this.icon === 'string' || typeof this.icon === 'number') ? this.icon : this.icon[1];	// 二級圖示中的leaf節點圖示
		this.leafIconShow =  this.leafIconArray[this.leafIcon]; // 二級圖示中的leaf節點圖示

		this.style.item = DTREE + this.skin + ITEM;
		this.style.itemThis = DTREE + this.skin + ITEMTHIS;
		this.style.dfont = DTREE + this.skin + DFONT;
		this.style.ficon = DTREE + this.skin + FICON;
		this.style.icon = DTREE + this.skin + ICON;
		this.style.cbox = DTREE + this.skin + CBOX;
		this.style.chs = DTREE + this.skin + CHS;

		/** 數據載入參數**/
		this.url = this.options.url || this.url;		//請求地址
		this.async = (typeof (this.options.async) === "boolean") ? this.options.async : this.async;	//非同步同步載入,預設非同步載入
		this.headers = this.options.headers || this.headers;		// ajax header屬性
		this.method = this.options.method || this.method;	//請求型別
		this.dataType = this.options.dataType || this.dataType;	//參數型別
		this.defaultRequest = $.extend(this.defaultRequest, this.options.defaultRequest) || this.defaultRequest;	//預設請求參數
		this.filterRequest = this.options.filterRequest || this.filterRequest;	//過濾請求參數
		this.request = this.options.request || this.request;		//使用者自定義請求參數
		this.response = $.extend(this.response, this.options.response) || this.response;	//返回json格式
		this.data = this.options.data || this.data;		//初始化指定該參數，則不會訪問非同步接口
		this.dataFormat = this.options.dataFormat || this.dataFormat;  //用於使用者配置的data數據格式，list：列表，  levelRelationship：層級關係，預設
		this.dataStyle = this.options.dataStyle || this.dataStyle;  //用於使用者配置layui通用的json數據風格,layuiStyle:layui風格，defaultStyle：預設風格
		this.success = this.options.success || this.success;		//樹載入完畢后執行解析樹之前的回撥（僅限非同步載入）
		this.done = this.options.done || this.done;		//樹載入完畢后的回撥（僅限非同步載入）

		/** 可編輯模式參數**/
		this.toolbar = this.options.toolbar || this.toolbar;	//是否開啟可編輯模式
		this.toolbarStyle = $.extend(this.toolbarStyle, this.options.toolbarStyle) || this.toolbarStyle;	//toolbar的自定義風格，標題，彈框大小
		this.toolbarScroll = this.options.toolbarScroll || this.toolbarScroll;	//樹的上級div容器，讓樹可以顯示滾動條的div容器
		this.toolbarLoad = this.options.toolbarLoad || this.toolbarLoad;	//toolbar作用範圍：node:所有節點，noleaf:非最後一級節點，leaf:最後一級
		this.toolbarShow = this.options.toolbarShow || this.toolbarShow;		// toolbar三個按鈕
		this.toolbarBtn = this.options.toolbarBtn || this.toolbarBtn;		// toolbar增刪改中內容的自定義載入
		this.toolbarExt = this.options.toolbarExt || this.toolbarExt;		// toolbar按鈕擴充套件
		this.toolbarFun = $.extend(this.toolbarFun, this.options.toolbarFun) || this.toolbarFun;		// toolbar事件載入

		/** 菜單欄參數**/
		this.menubar = this.options.menubar || this.menubar;	//是否打開菜單欄
		this.menubarTips = $.extend(this.menubarTips, this.options.menubarTips) || this.menubarTips; // 菜單欄吸附， toolbar：依附在工具欄，group：依附在按鈕組，freedom，自由
		this.menubarFun = $.extend(this.menubarFun, this.options.menubarFun) || this.menubarFun;	//menubar事件載入

		/** 覈取方塊參數**/
		this.checkbar = this.options.checkbar || this.checkbar;	//是否開啟覈取方塊模式
		this.checkbarLoad = this.options.checkbarLoad || this.checkbarLoad;  // 覈取方塊作用範圍，node：所有節點， leaf：最後一級；預設所有節點
		this.checkbarType = this.options.checkbarType || this.checkbarType ;	//覈取方塊選中形式	all：子集選中父級也選中，  no-all：子集選中父級半選中，子集全選父級選中，p-casc：父級選中子集全選，子集無法改變父級選中狀態， self：沒有任何級聯關係，only：只能選中一個覈取方塊。   預設all
		this.checkbarData = this.options.checkbarData || this.checkbarData ;	//覈取方塊記錄數據型別形式，  change表示記錄變更數據，choose表示記錄選中數據，all，記錄全部數據，預設choose
		this.checkbarFun =  $.extend(this.checkbarFun, this.options.checkbarFun)|| this.checkbarFun ;	// checkbar事件載入

		/** iframe模式參數**/
		this.useIframe = this.options.useIframe || this.useIframe;	// 是否載入iframe 預設false，
		this.iframe = $.extend(this.iframe, this.options.iframe) || this.iframe;	//iframe配置
		this.iframeFun = $.extend(this.iframeFun, this.options.iframeFun) || this.iframeFun;	//iframe事件載入

	};

	/******************** 初始化數據區域 ********************/
		// 過載樹
	DTree.prototype.reload = function(options){
		var _this = this;
		_this.reloadSetting(options);
		_this.init();
	};

	// 初始化樹
	DTree.prototype.init = function(){
		var _this = this;
		if (typeof _this !== "object") {
			layer.msg("樹元件未成功載入，請檢查配置", {icon:5});
			return ;
		}

		if(_this.data) {
			if(typeof _this.data.length === 'undefined'){
				layer.msg("數據解析異常，data數據格式不正確", {icon:5});
				return ;
			}
			
			//先將ul中的元素清空
			_this.obj.html("");

			// 載入完畢后執行樹解析前的回撥
			_this.success(_this.data, _this.obj);
			
			// 第一次解析樹
			if (_this.dataFormat == 'list'){
				//1.識別根節點ul中的data-id標籤，判斷頂級父節點
				var pid = _this.obj.attr("data-id");
				//2.構建一個存放節點的樹組
				var rootListData = _this.queryListTreeByPid(pid, _this.data);
				_this.loadListTree(rootListData, _this.data, 1);
			} else {
				_this.loadTree(_this.data, 1);
			}
			
			// 載入完畢后的回撥
			_this.done(_this.data, _this.obj);

		} else {
			if (!_this.url) {
				layer.msg("數據請求異常，url參數未指定", {icon:5});
				return ;
			}

			//先將ul中的元素清空
			_this.obj.html("");

			var index = _this.load ? layer.load(1) : "";
			
			AjaxHelper.request({
				async: _this.async,
				headers: _this.headers,
				type: _this.method,
				url: _this.url,
				dataType: _this.dataType,
				data: _this.getFilterRequestParam(_this.getRequestParam()),
				success: function(result) {
					if (typeof result === 'string') {
						result = $.parseJSON(result);
					}
					var code = "";
					if (_this.dataStyle == 'layuiStyle'){
						code = result[_this.response.statusName];
					} else {
						code = result.status[_this.response.statusName];
					}

					if (code == _this.response.statusCode) {
						// 載入完畢后執行樹解析前的回撥
						_this.success(result, _this.obj);
						
						// 第一次解析樹
						if (_this.dataFormat == 'list'){
							//1.識別根節點ul中的data-id標籤，判斷頂級父節點
							var pid = _this.obj.attr("data-id");
							//2.構建一個存放節點的樹組
							var rootListData = _this.queryListTreeByPid(pid, result[_this.response.rootName]);
							_this.loadListTree(rootListData, result[_this.response.rootName], 1);
						} else {
							_this.loadTree(result[_this.response.rootName], 1);
						}

						// 載入完畢后的回撥
						_this.done(result, _this.obj);
					} else {
						if (_this.dataStyle == 'layuiStyle'){
							layer.msg(result[_this.response.message], {icon:2});
						} else {
							layer.msg(result.status[_this.response.message], {icon:2});
						}
					}
				},
				complete: function(){if(_this.load){layer.close(index);}}
			});
		}
	};

	// 載入子節點
	DTree.prototype.getChild = function($div, data) {
		var _this = this,
			$ul = $div.next("ul");
		
		_this.setNodeParam($div);

		if(typeof data !== 'undefined') {
			if(typeof data.length === 'undefined'){
				layer.msg("數據解析異常，data數據格式不正確", {icon:5});
				return ;
			}

			//先將ul中的元素清空
			$ul.html("");

			// 解析樹
			if (_this.dataFormat == 'list'){
				var pid = _this.node.nodeId;
				var level = parseInt(_this.node.level)+1;

				var listData = _this.queryListTreeByPid(pid, data);
				_this.loadListTree(listData, _this.data, level);
			} else {
				_this.loadTree(data, level);
			}

		} else {
			if (!_this.url) {
				layer.msg("數據請求異常，url參數未指定", {icon:5});
				return ;
			}

			$ul.html("");
			var index = _this.load ? layer.load(1) : "";
			AjaxHelper.request({
				async: _this.async,
				headers: _this.headers,
				type: _this.method,
				url: _this.url,
				dataType: _this.dataType,
				data:  _this.getFilterRequestParam(_this.getRequestParam()),
				success: function(result) {
					if (typeof result === 'string') {
						result = $.parseJSON(result);
					}
					var code = "";
					if (_this.dataStyle == 'layuiStyle'){
						code = result[_this.response.statusName];
					} else {
						code = result.status[_this.response.statusName];
					}

					if (code == _this.response.statusCode) {
						// 解析樹
						var pid = _this.node.nodeId;
						var level = parseInt(_this.node.level)+1;
						if (_this.dataFormat == 'list'){
							var pListData = _this.queryListTreeByPid(pid, result[_this.response.rootName]);
							_this.loadListTree(pListData, result[_this.response.rootName], level, $ul);
						} else {
							_this.loadTree(result[_this.response.rootName], level, $ul);
						}

						$ul.addClass(NAV_SHOW);
					} else {
						if (_this.dataStyle == 'layuiStyle'){
							layer.msg(result[_this.response.message], {icon:2});
						} else {
							layer.msg(result.status[_this.response.message], {icon:2});
						}
					}
				},
				complete: function(){if(_this.load){layer.close(index);}}
			});
		}
	};

	// 初始化樹或者拼接樹
	DTree.prototype.loadListTree = function(pListData, listData, level, $ul){
		var _this = this;
		$ul = $ul || _this.getNowNodeUl();	//當前選中的節點或根節點
		if (pListData.length > 0){
			for (var i = 0; i < pListData.length; i++) {
				// 1.獲取已知節點的全部數據
				var data = pListData[i];
				if(typeof data !== "object") continue;
				var parseData = _this.parseData(data);
				var childListData = _this.queryListTreeByPid(parseData.treeId(), listData); // 根據已知數據的id判斷該條數據是否還有子數據

				// 3. 頁面元素載入數據
				$ul.append(_this.getLiItemDom(parseData.treeId(), parseData.parentId(), parseData.title(), parseData.isLast(childListData.length), parseData.iconClass(), parseData.checkArr(), level, parseData.spread(level), parseData.disabled(), parseData.basicData(), parseData.recordData(), ($ul.hasClass(UL_ROOT) ? "root" : "item")));
				// 4.有子數據的元素載入子節點
				if(childListData.length > 0){
					var cLevel = parseInt(level)+1;
					_this.loadListTree(childListData, listData, cLevel, _this.obj.find("ul[data-id='"+parseData.treeId()+"']"));
				}
			}
		}
	};

	// 根據父ID查詢list數據中匹配的元素
	DTree.prototype.queryListTreeByPid = function(pid, listData){
		var _this = this;
		var rootListData = [];
		if (listData) {
			for (var i = 0; i < listData.length; i++) {
				var data = listData[i];
				if(typeof data !== "object") continue;
				if(pid == "null" || pid == null){
					if(data[_this.response.parentId] == null) {
						rootListData.push(data);
					}
				} else {
					if (data[_this.response.parentId] == pid){
						rootListData.push(data);
					}
				}
			}
		}
		return rootListData;
	};

	// 初始化樹或者拼接樹
	DTree.prototype.loadTree = function(root, level, $ul){
		var _this = this;
		if (root) {
			$ul = $ul || _this.getNowNodeUl();	//當前選中的節點或根節點
			for (var i = 0; i < root.length; i++) {	// 遍歷跟節點或追加的跟節點
				var data = root[i];
				if(typeof data !== "object") continue;
				var parseData = _this.parseData(data);
				var children = parseData.children();
				$ul.append(_this.getLiItemDom(parseData.treeId(), parseData.parentId(), parseData.title(), parseData.isLast(children.length), parseData.iconClass(), parseData.checkArr(), level, parseData.spread(level), parseData.disabled(), parseData.basicData(), parseData.recordData(), ($ul.hasClass(UL_ROOT) ? "root" : "item")));
				if (children.length != 0) {
					var cLevel = parseInt(level)+1;
					_this.loadTree(children, cLevel, _this.obj.find("ul[data-id='"+parseData.treeId()+"']"));
				}
			}
		}
	};

	// 解析data數據
	DTree.prototype.parseData = function(data) {
		var _this = this;

		return {
			treeId: function(){
				return data[_this.response.treeId];
			},
			parentId: function(){
				return data[_this.response.parentId];
			},
			title: function(){
				return data[_this.response.title] || "";
			},
			level: function(){
				return data[_this.response.level] || "";
			},
			iconClass: function(){
				return data[_this.response.iconClass] || "";
			},
			isLast: function(len){
				return ((len == 0) ? 
						((typeof (data[_this.response.isLast]) === "boolean") ? data[_this.response.isLast] : true) : 
							((typeof (data[_this.response.isLast]) === "boolean") ? data[_this.response.isLast] : false));
			},
			spread: function(level){
				return ((level < _this.initLevel) ? 
						((typeof (data[_this.response.spread]) === "boolean") ? data[_this.response.spread] : true) : 
							((typeof (data[_this.response.spread]) === "boolean") ? data[_this.response.spread] : false));
			},
			disabled: function(){
				return (typeof (data[_this.response.disabled]) === "boolean") ? data[_this.response.disabled] : false;
			},
			checkArr: function(){
				var checkArr = [];
				var checkArrData = data[_this.response.checkArr];
				if(typeof checkArrData === 'string'){
					if(checkArrData.indexOf("{") > -1 && checkArrData.indexOf("}") > -1){
						checkArrData = JSON.parse(checkArrData);
					} else {
						checkArrData = {"type":"0","isChecked":checkArrData};
					}
				}
				if(typeof checkArrData === 'object'){
					if(typeof checkArrData.length === 'undefined'){
						checkArr.push(checkArrData);
					} else {
						checkArr = checkArrData;
					}
				}
				
				if(checkArr.length > 0 && checkArr.length > _this.checkArrLen){
					_this.checkArrLen = checkArr.length;		// 獲取覈取方塊個數
				}
				return checkArr;

			},
			children: function(){
				return data[_this.response.childName] || [];
			},
			basicData: function(){
				return event.escape(JSON.stringify(data[_this.response.basicData])) || JSON.stringify({});
			},
			recordData: function(){
				var recordData = _this.record ? event.cloneObj(data, [_this.response.basicData, _this.response.childName]) : {};
				return event.escape(JSON.stringify(recordData));
			},
			data: function(){
				return event.escape(JSON.stringify(data));
			}
		}

	};

	//新增節點的dom值
	DTree.prototype.getDom = function(treeId, parentId, title, isLast, iconClass, checkArr, level, spread, disabled) {
		var _this = this,
			rootId = _this.obj[0].id,
			toolbar = _this.toolbar,
			checkbar = _this.checkbar;
		return {
			fnode: function() {	// + - 圖示
				// 獲取圖示的變數
				var ficon = _this.ficon,
					ficonOpen =  _this.ficonOpen,
					ficonClose = _this.ficonClose,
					dot = _this.dot;

				if(ficon != "-1" && dot){	// 都載入
					return isLast ? "<i class='"+DTREEFONT+" "+LI_DIV_SPREAD_LAST+" "+_this.style.dfont+" "+_this.style.ficon+"' data-spread='last' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" :
						(spread ? "<i class='"+DTREEFONT+" "+ficonOpen+" "+_this.style.dfont+" "+_this.style.ficon+"' data-spread='open' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" : "<i class='"+DTREEFONT+" "+ficonClose+" "+_this.style.dfont+" "+_this.style.ficon+"' data-spread='close' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>");
				}

				if(ficon != "-1" && !dot){	// 載入node 隱藏leaf
					return isLast ? "<i class='"+DTREEFONT+" "+LI_DIV_SPREAD_LAST+" "+ICON_HIDE+" "+_this.style.dfont+" "+_this.style.ficon+"' data-spread='last' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" :
						(spread ? "<i class='"+DTREEFONT+" "+ficonOpen+" "+_this.style.dfont+" "+_this.style.ficon+"' data-spread='open' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" : "<i class='"+DTREEFONT+" "+ficonClose+" "+_this.style.dfont+" "+_this.style.ficon+"' data-spread='close' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>");
				}

				if(ficon == "-1" && dot){	// 隱藏node 載入leaf
					return isLast ? "<i class='"+DTREEFONT+" "+LI_DIV_SPREAD_LAST+" "+_this.style.dfont+" "+_this.style.ficon+"' data-spread='last' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" :
						(spread ? "<i class='"+DTREEFONT+" "+ficonOpen+" "+_this.style.dfont+" "+_this.style.ficon+"' data-spread='open' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" : "<i class='"+DTREEFONT+" "+ficonClose+" "+_this.style.dfont+" "+_this.style.ficon+"' data-spread='close' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>");
				}

				if(ficon == "-1" && !dot){	// 都隱藏
					return isLast ? "<i class='"+DTREEFONT+" "+LI_DIV_SPREAD_LAST+" "+ICON_HIDE+" "+_this.style.dfont+" "+_this.style.ficon+"' data-spread='last' data-id='"+treeId+"' dtree-id='"+rootId+"' style='display:none;'></i>" :
						(spread ? "<i class='"+DTREEFONT+" "+ficonOpen+" "+_this.style.dfont+" "+_this.style.ficon+"' data-spread='open' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" : "<i class='"+DTREEFONT+" "+ficonClose+" "+_this.style.dfont+" "+_this.style.ficon+"' data-spread='close' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>");
				}
			},
			node: function() {	// 二級圖示樣式
				// 獲取圖示的變數
				var nodeIcon = _this.nodeIcon,
					leafIcon = _this.leafIcon;

				var leafIconShow = _this.leafIconShow,
					nodeIconOpen =  _this.nodeIconOpen,
					nodeIconClose =  _this.nodeIconClose;
				if(iconClass){
					leafIconShow = iconClass;
					nodeIconOpen = iconClass;
					nodeIconClose = iconClass;
				}

				if(nodeIcon != "-1" && leafIcon != "-1"){	// 都載入
					return isLast ? "<i class='"+DTREEFONT+" "+leafIconShow+" "+DTREEFONTSPECIAL+" "+_this.style.dfont+" "+_this.style.icon+"' data-spread='last' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" :
						(spread ? "<i class='"+DTREEFONT+" "+nodeIconOpen+" "+DTREEFONTSPECIAL+" "+_this.style.dfont+" "+_this.style.icon+"' data-spread='open' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" : "<i class='"+DTREEFONT+" "+nodeIconClose+" "+DTREEFONTSPECIAL+" "+_this.style.dfont+" "+_this.style.icon+"' data-spread='close' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>");
				}

				if(nodeIcon != "-1" && leafIcon == "-1"){	// 載入node 隱藏leaf
					return isLast ? "<i class='"+DTREEFONT+" "+leafIconShow+" "+DTREEFONTSPECIAL+" "+_this.style.dfont+" "+_this.style.icon+"' data-spread='last' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" :
						(spread ? "<i class='"+DTREEFONT+" "+nodeIconOpen+" "+DTREEFONTSPECIAL+" "+_this.style.dfont+" "+_this.style.icon+"' data-spread='open' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" : "<i class='"+DTREEFONT+" "+nodeIconClose+" "+DTREEFONTSPECIAL+" "+_this.style.dfont+" "+_this.style.icon+"' data-spread='close' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>");
				}

				if(nodeIcon == "-1" && leafIcon != "-1"){	// 隱藏node 載入leaf
					return isLast ? "<i class='"+DTREEFONT+" "+leafIconShow+" "+DTREEFONTSPECIAL+" "+_this.style.dfont+" "+_this.style.icon+"' data-spread='last' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" :
						(spread ? "<i class='"+DTREEFONT+" "+nodeIconOpen+" "+DTREEFONTSPECIAL+" "+_this.style.dfont+" "+_this.style.icon+"' data-spread='open' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" : "<i class='"+DTREEFONT+" "+nodeIconClose+" "+DTREEFONTSPECIAL+" "+_this.style.dfont+" "+_this.style.icon+"' data-spread='close' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>");
				}

				if(nodeIcon == "-1" && leafIcon == "-1"){	// 都隱藏
					return isLast ? "<i class='"+DTREEFONT+" "+leafIconShow+" "+DTREEFONTSPECIAL+" "+_this.style.dfont+" "+_this.style.icon+"' data-spread='last' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" :
						(spread ? "<i class='"+DTREEFONT+" "+nodeIconOpen+" "+DTREEFONTSPECIAL+" "+_this.style.dfont+" "+_this.style.icon+"' data-spread='open' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" : "<i class='"+DTREEFONT+" "+nodeIconClose+" "+DTREEFONTSPECIAL+" "+_this.style.dfont+" "+_this.style.icon+"' data-spread='close' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>");
				}
			},
			checkbox: function() {	// 覈取方塊
				var flag = false;
				if(_this.checkbarLoad == "node"){if (checkbar) {flag = true;}} else {if (isLast) {if (checkbar) {flag = true;}}}

				if(flag){
					var result = "<div class='"+LI_DIV_CHECKBAR+"' data-id='"+treeId+"' dtree-id='"+rootId+"'>";
					if(checkArr && checkArr.length > 0){
						for (var i = 0; i < checkArr.length; i++) {
							var checkData = checkArr[i];
							var isChecked = checkData.isChecked;
							var CHOOSE_CLASS = LI_DIV_CHECKBAR_OUT;
							if (isChecked == "2") {	//半選擇
								CHOOSE_CLASS = LI_DIV_CHECKBAR_NOALL + " " + _this.style.chs;
							} else if (isChecked == "1") {	//選擇
								CHOOSE_CLASS = LI_DIV_CHECKBAR_ON + " " + _this.style.chs;
							} else {	//未選擇或者無值
								CHOOSE_CLASS = LI_DIV_CHECKBAR_OUT;
							}
							result += "<i class='"+DTREEFONT+" "+_this.style.dfont+" "+_this.style.cbox+" "+CHOOSE_CLASS+"' data-id='"+treeId+"' dtree-id='"+rootId+"' data-checked='"+checkData.isChecked+"' data-initchecked='"+checkData.isChecked+"' data-type='"+checkData.type+"' dtree-click='"+eventName.checkNodeClick+"' data-par='."+LI_CLICK_CHECKBAR+"'></i>";
						}
					}
					result += "</div>";
					return result;
				}

				return "";
			},
			text: function() {	// 文字顯示
				return "<cite class='"+LI_DIV_TEXT_CLASS+"' data-id='"+treeId+"' data-leaf='"+(isLast ? "leaf" : "node")+"'>"+title+"</cite>";
			},
			ul: function() {	//子節點ul
				return isLast ? "<ul class='"+LI_NAV_CHILD+"' data-id='"+treeId+"' dtree-id='"+rootId+"'></ul>" :
					(spread ? "<ul class='"+LI_NAV_CHILD+" "+NAV_SHOW+"' data-id='"+treeId+"' dtree-id='"+rootId+"'></ul>" : "<ul class='"+LI_NAV_CHILD+"' data-id='"+treeId+"' dtree-id='"+rootId+"'></ul>");
			}
		};

	};

	// 獲取拼接好的li
	DTree.prototype.getLiItemDom =  function(treeId, parentId, title, isLast, iconClass, checkArr, level, spread, disabled, basicData, recordData, flag) {
		var _this = this,
			rootId = _this.obj[0].id;

		var dom = _this.getDom(treeId, parentId, title, isLast, iconClass, checkArr, level, spread, disabled);
		basicData = (basicData == "{}") ? "" : basicData;
		recordData = (recordData == "{}") ? "" : recordData;
		var div = "<div class='"+LI_DIV_ITEM+" "+_this.style.item+"' data-id='"+treeId+"' dtree-id='"+rootId+"' dtree-click='"+eventName.itemNodeClick+"' data-basic='"+basicData+"' data-record='"+recordData+"' ";
		if(_this.toolbar){
			if(_this.toolbarLoad == "node") { div += " d-contextmenu='true'>"; }
			if(_this.toolbarLoad == "noleaf") { if(!isLast){ div += " d-contextmenu='true'>"; } else { div += " d-contextmenu='false'>";} }
			if(_this.toolbarLoad == "leaf") { if(isLast){ div += " d-contextmenu='true'>"; } else { div += " d-contextmenu='false'>";} }
		} else { div += " d-contextmenu='false'>"; }

		var li = ["<li " + "class='"+LI_CLICK_CHECKBAR+" "+ LI_NAV_ITEM +"'" + "data-id='"+treeId+"'" + "data-pid='"+(flag == "root" ? (parentId ? parentId : "-1") : parentId)+"'" + "dtree-id='"+rootId+"'" + "data-index='"+level+"'" + ">" +
		          	div ,
					dom.fnode(),
					dom.node(),
					dom.checkbox(),
					dom.text(),
					"</div>", dom.ul(), "</li>"].join("");
		return li;
	};

	// 初始化節點，用於數據回顯
	DTree.prototype.dataInit = function(chooseId){
		var _this = this;
		var $div = _this.obj.find("div[data-id='"+chooseId+"']");
		$div.parent().find("."+NAV_THIS).removeClass(NAV_THIS);
		$div.parent().find("."+_this.style.itemThis).removeClass(_this.style.itemThis);
		$div.addClass(NAV_THIS);
		$div.addClass(_this.style.itemThis);
		_this.setNodeParam($div);
		// 將該節點的父節點全部展開
		var $li_parents = $div.parents("."+LI_NAV_ITEM);
		$li_parents.children("ul").addClass(NAV_SHOW);
		$li_parents.children("."+LI_DIV_ITEM).children("i[data-spread]."+_this.ficonClose).addClass(_this.ficonOpen);
		$li_parents.children("."+LI_DIV_ITEM).children("i[data-spread]."+_this.ficonClose).removeClass(_this.ficonClose);
		$li_parents.children("."+LI_DIV_ITEM).children("i[data-spread]."+_this.nodeIconClose).addClass(_this.nodeIconOpen);
		$li_parents.children("."+LI_DIV_ITEM).children("i[data-spread]."+_this.nodeIconClose).removeClass(_this.nodeIconClose);
		return _this.getNowParam();
	};

	/******************** 基礎事件區域 ********************/
	// 展開或隱藏節點  作用點： div
	DTree.prototype.clickSpread = function($div) {
		var $i_spread = $div.find("i[data-spread]").eq(0),
			$i_node = $div.find("i[data-spread]").eq(1),
			i_node_class = $i_node.attr("class"),
			$cite = $div.find("cite[data-leaf]").eq(0),
			spread = $i_spread.attr("data-spread"),
			$ul = $div.next("ul");
		var _this = this;

		if ($ul.length > 0) {
			if (spread == "close") {
				if (_this.type=="load") {	//增加載入
					if (_this.cache) {	//開啟快取
						if ($ul.html()) {
							$ul.addClass(NAV_SHOW);
						} else {	//載入節點
							_this.getChild($div);
						}
					}else {	//每次取新的數據
						$ul.html("");
						_this.getChild($div);
					}
				} else {	// 全量載入
					$ul.addClass(NAV_SHOW);
				}
				$div.find("i[data-spread]").attr("data-spread","open");
				$i_spread.removeClass(_this.ficonClose);
				$i_spread.addClass(_this.ficonOpen);

				var node_class = _this.nodeIconClose;
				if(i_node_class.indexOf(node_class) > 0){
					$i_node.removeClass(_this.nodeIconClose);
					$i_node.addClass(_this.nodeIconOpen);
				}

			} else if (spread == "open") {
				$ul.removeClass(NAV_SHOW);
				$div.find("i[data-spread]").attr("data-spread","close");
				$i_spread.removeClass(_this.ficonOpen);
				$i_spread.addClass(_this.ficonClose);

				var node_class = _this.nodeIconOpen;
				if(i_node_class.indexOf(node_class) > 0){
					$i_node.removeClass(_this.nodeIconOpen);
					$i_node.addClass(_this.nodeIconClose);
				}
			}
		}
	};

	// 數據格式化
	DTree.prototype.escape = function(html){
		return event.escape(html);
	};

	// 格式化數據轉回正常數據
	DTree.prototype.unescape = function(str){
		return event.unescape(str);
	};

	/******************** 工具欄及菜單欄區域 ********************/


		// 初始化菜單欄和工具欄的div
	DTree.prototype.initTreePlus = function(){
		var _this = this;
		// 初始化菜單欄和工具欄的div
		_this.obj.prevAll('div#dtree_menubar_'+_this.obj[0].id).remove();
		_this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id).remove();
		_this.toolbarMenu = {};
		if(_this.menubar && _this.menubarTips.group && _this.menubarTips.group.length > 0) _this.obj.before("<div class='"+LI_DIV_MENUBAR+"' id='dtree_menubar_"+_this.obj[0].id+"'><div class='layui-btn-group'></div></div>");
		if(_this.toolbar) _this.obj.before("<div class='"+LI_DIV_TOOLBAR+" layui-nav' id='dtree_toolbar_"+_this.obj[0].id+"'><div class='layui-nav-item'><dl class='layui-nav-child layui-anim'></dl></div></div>");

	};

	// 開啟工具欄和菜單欄
	DTree.prototype.openTreePlus = function(){
		var _this = this;
		// 先對工具欄做處理，因為菜單欄可能會與工具欄產生關聯。
		var ggMenu = [];
		if(_this.toolbar) _this.getToolbarDom();

		if(_this.menubar) {
			var menubarTips = _this.menubarTips,
				mtbar = menubarTips.toolbar,
				group = menubarTips.group,
				freedom = menubarTips.freedom;
			if(mtbar && mtbar.length > 0){
				// 菜單欄吸附工具欄上
				for(var i=0; i<mtbar.length; i++){
					var mt = mtbar[i];
					if(typeof mt === 'string'){
						_this.getMenubarToolDom(mt);
					}
					if(typeof mt === 'object'){
						_this.getExtMenubarToolDom(mt);
					}
				}
			}
			if(group && group.length > 0){
				// 菜單欄吸附在上方的按鈕組div中
				for(var i=0; i<group.length; i++){
					var gg = group[i];
					if(typeof gg === 'string'){
						ggMenu.push(_this.getMenubarDom(gg));
					}
					if(typeof gg === 'object'){
						ggMenu.push(_this.getExtMenubarDom(gg));
					}
				}
				_this.obj.prevAll('div#dtree_menubar_'+_this.obj[0].id).children('div.layui-btn-group').append(ggMenu.join(""));

			}
		}

	};


	/******************** 菜單欄區域 ********************/

	// 獲取菜單欄
	DTree.prototype.getMenubarDom = function(menu){
		var _this = this;
		var rootId = _this.obj[0].id;
		var gg = "";
		switch (menu) {
			case defaultMenu.moveDown:
				gg = "<button class='layui-btn layui-btn-sm layui-btn-primary' dtree-id='"+rootId+"' d-menu='"+defaultMenu.moveDown+"' title='展開節點'><i class='"+DTREEFONT+" "+LI_DIV_MENUBAR_DOWN+"'></i></button>";
				break;
			case defaultMenu.moveUp:
				gg = "<button class='layui-btn layui-btn-sm layui-btn-primary' dtree-id='"+rootId+"' d-menu='"+defaultMenu.moveUp+"' title='收縮節點'><i class='"+DTREEFONT+" "+LI_DIV_MENUBAR_UP+"'></i></button>";
				break;
			case defaultMenu.refresh:
				gg = "<button class='layui-btn layui-btn-sm layui-btn-primary' dtree-id='"+rootId+"' d-menu='"+defaultMenu.refresh+"' title='重新整理'><i class='"+DTREEFONT+" "+LI_DIV_MENUBAR_REFRESH+"'></i></button>";
				break;
			case defaultMenu.remove:
				gg = (_this.checkbar) ? "<button class='layui-btn layui-btn-sm layui-btn-primary' dtree-id='"+rootId+"' d-menu='"+defaultMenu.remove+"' title='刪除選中節點'><i class='"+DTREEFONT+" "+LI_DIV_MENUBAR_DELETE+"'></i></button>" : "";
				break;
			case defaultMenu.searchNode:
				gg = "<button class='layui-btn layui-btn-sm layui-btn-primary' dtree-id='"+rootId+"' d-menu='"+defaultMenu.searchNode+"' title='查詢節點'><i class='"+DTREEFONT+" "+LI_DIV_MENUBAR_SEARCH+"'></i></button>";
				break;
		}
		return gg;
	};

	// 獲取擴充套件菜單欄
	DTree.prototype.getExtMenubarDom = function(menu){
		var _this = this;
		return "<button class='layui-btn layui-btn-sm layui-btn-primary' dtree-id='"+_this.obj[0].id+"' d-menu='"+menu.menubarId+"' title='"+menu.title+"'><i class='"+DTREEFONT+" "+menu.icon+"'></i></button>";
	};

	// 獲取依附在工具欄的菜單欄
	DTree.prototype.getMenubarToolDom = function(menu){
		var _this = this;
		var rootId = _this.obj[0].id;
		switch (menu) {
			case defaultMenu.moveDown:
				_this.toolbarMenu[defaultMenu.moveDown] = "<dd><a dtree-id='"+rootId+"' d-menu='"+defaultMenu.moveDown+"'><i class='"+DTREEFONT+" "+LI_DIV_MENUBAR_DOWN+"'></i>&nbsp;展開"+_this.toolbarStyle.title+"</a></dd>";
				break;
			case defaultMenu.moveUp:
				_this.toolbarMenu[defaultMenu.moveUp] = "<dd><a dtree-id='"+rootId+"' d-menu='"+defaultMenu.moveUp+"'><i class='"+DTREEFONT+" "+LI_DIV_MENUBAR_UP+"'></i>&nbsp;收縮"+_this.toolbarStyle.title+"</a></dd>";
				break;
			case defaultMenu.refresh:
				_this.toolbarMenu[defaultMenu.refresh] = "<dd><a dtree-id='"+rootId+"' d-menu='"+defaultMenu.refresh+"'><i class='"+DTREEFONT+" "+LI_DIV_MENUBAR_REFRESH+"'></i>&nbsp;重新整理</a></dd>";
				break;
			case defaultMenu.remove:
				if(_this.checkbar)
					_this.toolbarMenu[defaultMenu.remove] = "<dd><a dtree-id='"+rootId+"' d-menu='"+defaultMenu.remove+"'><i class='"+DTREEFONT+" "+LI_DIV_MENUBAR_DELETE+"'></i>&nbsp;刪除選中"+_this.toolbarStyle.title+"</a></dd>";
				break;
			case defaultMenu.searchNode:
				_this.toolbarMenu[defaultMenu.searchNode] = "<dd><a dtree-id='"+rootId+"' d-menu='"+defaultMenu.searchNode+"'><i class='"+DTREEFONT+" "+LI_DIV_MENUBAR_SEARCH+"'></i>&nbsp;查詢"+_this.toolbarStyle.title+"</a></dd>";
				break;
		}
	};

	// 獲取依附在工具欄的擴充套件菜單欄
	DTree.prototype.getExtMenubarToolDom = function(menu){
		var _this = this;
		_this.toolbarMenu[menu.menubarId] = "<dd><a dtree-id='"+_this.obj[0].id+"' d-menu='"+menu.menubarId+"'><i class='"+DTREEFONT+" "+menu.icon+"'></i>&nbsp;"+menu.title+"</a></dd>";
	};


	// menubar內建方法
	DTree.prototype.menubarMethod = function(){
		var _this = this;
		return {
			openAllNode: function(obj){  // 展開所有節點
				var $ulNode = obj || _this.obj.children("li").children("ul");
				// 遍歷所有ul子節點
				for (var i = 0; i < $ulNode.length; i++) {
					// 獲取當前節點的資訊
					var $ul = $($ulNode[i]),
						$div = $ul.prev("div"),
						$i_spread = $div.find("i[data-spread]").eq(0),
						$i_node = $div.find("i[data-spread]").eq(1),
						i_node_class = $i_node.attr("class"),
						$cite = $div.find("cite[data-leaf]").eq(0),
						spread = $i_spread.attr("data-spread"),
						leaf = $cite.attr("data-leaf");

					if (leaf == "leaf") { continue;	}	// 說明是葉子了，則繼續循環下一個

					if (spread == "open") {
						// 說明該節點已經展開了，則進行子節點循環
					} else {
						if (_this.type=="load") {	//是否全量載入
							if (_this.cache) {	//是否開啟快取
								if ($ul.html()) {
									$ul.addClass(NAV_SHOW);
								} else {	//載入節點
									_this.getChild($div);
								}
							}else {	//每次取新的數據
								$ul.html("");
								_this.getChild($div);
							}
						} else {	// 全量載入
							$ul.addClass(NAV_SHOW);
						}
						$div.find("i[data-spread]").attr("data-spread","open");
						$i_spread.removeClass(_this.ficonClose);
						$i_spread.addClass(_this.ficonOpen);

						var node_class = _this.nodeIconClose;
						if(i_node_class.indexOf(node_class) > 0){
							$i_node.removeClass(_this.nodeIconClose);
							$i_node.addClass(_this.nodeIconOpen);
						}
					}
					var $childUl = $ul.children("li").children("ul");
					_this.menubarMethod().openAllNode($childUl);
				}
			},
			closeAllNode: function(){ //收縮所有節點
				_this.obj.find("."+LI_NAV_CHILD).each(function(){
					// 獲取當前節點的資訊
					var $ul = $(this),
						$div = $ul.prev("div"),
						$i_spread = $div.find("i[data-spread]").eq(0),
						$i_node = $div.find("i[data-spread]").eq(1),
						i_node_class = $i_node.attr("class"),
						$cite = $div.find("cite[data-leaf]").eq(0),
						spread = $i_spread.attr("data-spread"),
						leaf = $cite.attr("data-leaf");

					$ul.removeClass(NAV_SHOW);
					$div.find("i[data-spread]").attr("data-spread","close");
					$i_spread.removeClass(_this.ficonOpen);
					$i_spread.addClass(_this.ficonClose);

					var node_class = _this.nodeIconOpen;
					if(i_node_class.indexOf(node_class) > 0){
						$i_node.removeClass(_this.nodeIconOpen);
						$i_node.addClass(_this.nodeIconClose);
					}
				});
			},
			refreshTree: function(){// 重新整理樹
				_this.obj.html("");	// 清空樹結構
				_this.initNodeParam(); // 清空參數
				_this.init(); //執行初始化方法
			},
			remove: function(){// 刪除選中節點
				var len = _this.obj.find("i[data-par][data-checked='1']").length;
				if(len == 0){
					layer.msg("請至少選中一個節點",{icon:2});
				}else{
					//操作前先清空
					_this.checkbarNode = [];
					// 選擇所有覈取方塊節點
					var i_node = {};
					_this.obj.find("i[data-par][data-checked='1']").each(function(){
						var $i = $(this), $div = $i.closest("."+LI_DIV_ITEM);

						_this.checkbarNode.push(_this.getRequestParam(_this.getCheckbarNodeParam($div, $i)));
					});

					layer.confirm('確定要刪除選中節點？', {icon: 3, title:'刪除選中節點'}, function(index1){
						var flag = _this.menubarFun.remove(_this.checkbarNode);
						if(flag){
							_this.obj.find("i[data-par][data-checked='1']").closest("."+LI_DIV_ITEM).next("ul").remove();
							_this.obj.find("i[data-par][data-checked='1']").closest("."+LI_DIV_ITEM).remove();
							_this.checkbarNode=[];
						}

						layer.close(index1);
					});
				}
			},
			searchNode: function(){//模糊查詢該值，展開該值節點
				layer.prompt({
					formType: 0,
					value: "",
					title: '查詢節點'
				}, function(value, index1, elem){
					if (value) {
						var flag = _this.searchNode(value);
						if (!flag) {
							layer.msg("該名稱節點不存在！", {icon:5});
						}
					} else {
						layer.msg("未指定查詢節點名稱", {icon:5});
					}
					layer.close(index1);
				});
			},
			extMethod: function(menuId, $div, flag){
				if(_this.menubar && _this.menubarTips.group && _this.menubarTips.group.length > 0 && flag == "group"){
					for(var i=0; i<_this.menubarTips.group.length; i++){
						var ext = _this.menubarTips.group[i];
						if (menuId == ext.menubarId){
							ext.handler(_this.getRequestParam(_this.getNodeParam($div), $div));
							break;
						}
					}
				}
				if(_this.menubar && _this.menubarTips.toolbar && _this.menubarTips.toolbar.length > 0 && flag == "toolbar"){
					for(var i=0; i<_this.menubarTips.toolbar.length; i++){
						var ext = _this.menubarTips.toolbar[i];
						if (menuId == ext.menubarId){
							ext.handler(_this.getRequestParam(_this.getNodeParam($div), $div));
							break;
						}
					}
				}
				if(_this.menubar && _this.menubarTips.freedom && _this.menubarTips.freedom.length > 0 && flag == "freedom"){
					for(var i=0; i<_this.menubarTips.freedom.length; i++){
						var ext = _this.menubarTips.freedom[i];
						if (menuId == ext.menubarId){
							ext.handler(_this.getRequestParam(_this.getNodeParam($div), $div));
							break;
						}
					}
				}
			}
		};
	};
	
	// menubar監聽方法
	DTree.prototype.menubarListener = function(menuId, flag){
		var _this = this;
		var $div = _this.getNowNode();
		switch (menuId) {
			case defaultMenu.moveDown:	// 展開節點
				_this.menubarMethod().openAllNode();
				break;
			case defaultMenu.moveUp:	// 收縮節點
				_this.menubarMethod().closeAllNode();
				break;
			case defaultMenu.refresh:
				_this.menubarMethod().refreshTree(); // 重新整理樹
				break;
			case defaultMenu.remove:
				_this.menubarMethod().remove();
				break;
			case defaultMenu.searchNode:
				_this.menubarMethod().searchNode();
				break;
			default:
				_this.menubarMethod().extMethod(menuId, $div, flag);
				break;
		}
	};

	//模糊查詢該值，展開該值節點
	DTree.prototype.searchNode = function(value){
		var _this = this;
		var b = false;
		var $lis = [];
		_this.obj.find("cite[data-leaf]").each(function(){
			var $nthis = $(this);
			var html = $nthis.html();
			if(html.indexOf(value) > -1){
				if($nthis.attr("data-leaf") == "leaf") {
					// 葉子節點提供包含父節點的所有資訊
					var title = "";
					$nthis.parents("li").each(function(){
						title = "-" + $(this).find("cite[data-leaf]").html() + title;
					});
					title = title.substring(1, title.length);
					$nthis.attr("title", title);
				}
				// 儲存當前cite所在的li及父li中包含該值，則只保留父的
				var i = 0;
				$nthis.parents("li").each(function(){
					var html2 = $(this).find("cite[data-leaf]").html();
					if(html2.indexOf(value) > -1){
						i++;
					}
					if(i >= 2){
						return true;
					}
				});
				if (i < 2){
					$lis.push($nthis.closest("li").prop("outerHTML"));
				}
			}
		});
		if($lis.length > 0) {
			b = true;
			// 1.將樹節點清空
			_this.obj.html("");
			// 2.遍歷所有cite節點，展開當前cite節點
			for(var i=0; i<$lis.length; i++){
				_this.obj.append($lis[i]);
			}
		}
		return b;
	};


	/******************** 工具欄區域 ********************/

	// 獲取工具欄
	DTree.prototype.getToolbarDom = function(){
		var _this = this;
		var toolbarShow = _this.toolbarShow;
		var toolbarExt = _this.toolbarExt;
		
		if(toolbarShow.length > 0){
			for(var i=0; i<toolbarShow.length; i++){
				var show = toolbarShow[i];
				if(show == "add"){
					_this.toolbarMenu[defaultTool.addToolbar] = "<dd><a dtree-tool='"+defaultTool.addToolbar+"'><i class='"+DTREEFONT+" "+LI_DIV_TOOLBAR_ADD+"'></i>&nbsp;新增"+_this.toolbarStyle.title+"</a></dd>";
				}
				if(show == "edit"){
					_this.toolbarMenu[defaultTool.editToolbar] = "<dd><a dtree-tool='"+defaultTool.editToolbar+"'><i class='"+DTREEFONT+" "+LI_DIV_TOOLBAR_EDIT+"'></i>&nbsp;編輯"+_this.toolbarStyle.title+"</a></dd>";
				}
				if(show == "delete"){
					_this.toolbarMenu[defaultTool.delToolbar] = "<dd><a dtree-tool='"+defaultTool.delToolbar+"'><i class='"+DTREEFONT+" "+LI_DIV_TOOLBAR_DEL+"'></i>&nbsp;刪除"+_this.toolbarStyle.title+"</a></dd>";
				}
			}
		}
		if(toolbarExt.length > 0){
			for(var i=0; i<toolbarExt.length; i++){
				var ext = toolbarExt[i];
				_this.toolbarMenu[ext.toolbarId] = "<dd><a dtree-tool='"+ext.toolbarId+"'><i class='"+DTREEFONT+" "+ext.icon+"'></i>&nbsp;"+ext.title+"</a></dd>";
			}
		}
	};
	
	
	// 設定工具欄按鈕
	DTree.prototype.setToolbarDom = function(toolbarMenu){
		var _this = this;
		if(toolbarMenu){
			_this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id).find('div.layui-nav-item>dl.layui-nav-child').html("");
			for(var key in toolbarMenu){
				_this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id).find('div.layui-nav-item>dl.layui-nav-child').append(toolbarMenu[key]);
			}
		}
	}
	

	// 載入toolBar中的內容
	DTree.prototype.loadToolBar = function(title, name){
		var _this = this;
		var toolbarShow = _this.toolbarShow;
		var nodeBarContents = _this.toolbarBtn;
		var html = "";
		switch (name) {
			case defaultTool.addToolbar:

				//1. 必須載入的節點內容
				var nowNode = ['<div class="layui-form-item">',
					'<label class="layui-form-label">當前選中：</label>',
					'<div class="layui-input-block f-input-par">',
					'<input type="text" name="nodeTitle" class="layui-input f-input" value="'+title+'" readonly/>',
					'</div>',
					'</div>'].join('');

				var addNodeName = ['<div class="layui-form-item">',
					'<label class="layui-form-label">新增'+_this.toolbarStyle.title+'：</label>',
					'<div class="layui-input-block f-input-par">',
					'<input type="text" name="addNodeName" class="layui-input f-input" value="" lay-verify="required"/>',
					'</div>',
					'</div>'].join('');

				var addNodeBtn = ['<div class="layui-form-item">',
					'<div class="layui-input-block" style="margin-left:0px;text-align:center;">',
					'<button type="button" class="layui-btn layui-btn-normal btn-w100" lay-submit lay-filter="dtree_addNode_form">確認新增</button>',
					'</div>',
					'</div>'].join('');
				//2. 使用者自定義的節點內容
				var addNodeBar = ['<div class="'+TOOLBAR_TOOL+'"><form class="layui-form layui-form-pane" lay-filter="dtree_addNode_form">', nowNode, addNodeName];
				if(nodeBarContents != null && nodeBarContents.length > 0){
					if(nodeBarContents[0] != null && nodeBarContents[0] != undefined && nodeBarContents[0].length > 0){
						var addNodeBarContents = nodeBarContents[0];

						for(var j=0; j<addNodeBarContents.length; j++){
							var type = addNodeBarContents[j].type;
							if(!type){type = "text";}
							switch (type) {
								case "text":
									addNodeBar.push(_this.loadToolBarDetail().text(addNodeBarContents[j]));
									break;
								case "textarea":
									addNodeBar.push(_this.loadToolBarDetail().textarea(addNodeBarContents[j]));
									break;
								case "select":
									addNodeBar.push(_this.loadToolBarDetail().select(addNodeBarContents[j]));
									break;
								case "hidden":
									addNodeBar.push(_this.loadToolBarDetail().hidden(addNodeBarContents[j]));
									break;

							}
						}
					}
				}
				addNodeBar.push(addNodeBtn);
				addNodeBar.push('</form></div>');
				html = addNodeBar.join('');
				break;

			case defaultTool.editToolbar:

				//1. 必須載入的節點內容
				var nowNode = ['<div class="layui-form-item">',
					'<label class="layui-form-label">當前選中：</label>',
					'<div class="layui-input-block f-input-par">',
					'<input type="text" name="nodeTitle" class="layui-input f-input" value="'+title+'" readonly/>',
					'</div>',
					'</div>'].join('');

				var editNodeName = ['<div class="layui-form-item">',
					'<label class="layui-form-label">編輯'+_this.toolbarStyle.title+'：</label>',
					'<div class="layui-input-block f-input-par">',
					'<input type="text" name="editNodeName" class="layui-input f-input" value="'+title+'" lay-verify="required"/>',
					'</div>',
					'</div>'].join('');


				var editNodeBtn = ['<div class="layui-form-item">',
					'<div class="layui-input-block" style="margin-left:0px;text-align:center;">',
					'<button type="button" class="layui-btn layui-btn-normal btn-w100" lay-submit lay-filter="dtree_editNode_form">確認編輯</button>',
					'</div>',
					'</div>'].join('');

				var editNodeBar = ['<div class="'+TOOLBAR_TOOL+'"><form class="layui-form layui-form-pane" lay-filter="dtree_editNode_form">', nowNode, editNodeName];
				//2. 使用者自定義的節點內容
				if(nodeBarContents != null && nodeBarContents.length > 0){

					if(nodeBarContents[1] != null && nodeBarContents[1] != undefined && nodeBarContents[1].length > 0){
						var editNodeBarContents = nodeBarContents[1];

						for(var j=0; j<editNodeBarContents.length; j++){
							var type = editNodeBarContents[j].type;
							if(!type){type = "text";}
							switch (type) {
								case "text":
									editNodeBar.push(_this.loadToolBarDetail().text(editNodeBarContents[j]));
									break;
								case "textarea":
									editNodeBar.push(_this.loadToolBarDetail().textarea(editNodeBarContents[j]));
									break;
								case "select":
									editNodeBar.push(_this.loadToolBarDetail().select(editNodeBarContents[j]));
									break;
								case "hidden":
									editNodeBar.push(_this.loadToolBarDetail().hidden(editNodeBarContents[j]));
									break;
							}
						}
					}
				}

				editNodeBar.push(editNodeBtn);
				editNodeBar.push('</form></div>');
				html = editNodeBar.join('');
				break;
		}
		return html;
	};

	// 獲取toolbar詳細的標籤資訊
	DTree.prototype.loadToolBarDetail = function(){
		var _this = this;
		return{
			text: function(nodeBarContents){
				return ['<div class="layui-form-item">',
					'<label class="layui-form-label" title="'+nodeBarContents.label+'">'+nodeBarContents.label+'：</label>',
					'<div class="layui-input-block f-input-par">',
					'<input type="text" name="'+nodeBarContents.name+'" class="layui-input f-input" value="'+(nodeBarContents.value ? nodeBarContents.value : "")+'"/>',
					'</div>',
					'</div>'].join('');
			},
			textarea: function(nodeBarContents){
				return ['<div class="layui-form-item layui-form-text">',
					'<label class="layui-form-label">'+nodeBarContents.label+'：</label>',
					'<div class="layui-input-block f-input-par">',
					'<textarea name="'+nodeBarContents.name+'" class="layui-textarea f-input">'+(nodeBarContents.value ? nodeBarContents.value : "")+'</textarea>',
					'</div>',
					'</div>'].join('');
			},
			hidden: function(nodeBarContents){
				return ['<input type="hidden" name="'+nodeBarContents.name+'" class="layui-input f-input" value="'+(nodeBarContents.value ? nodeBarContents.value : "")+'"/>'].join('');
			},
			select: function(nodeBarContents){
				var optionsData = nodeBarContents.optionsData;
				var options = "";
				var defaultValue = nodeBarContents.value ? nodeBarContents.value : "";
				for(var key in optionsData){
					if(defaultValue == optionsData[key]){
						options += "<option value='"+key+"' selected>"+optionsData[key]+"</option>";
					} else {
						options += "<option value='"+key+"'>"+optionsData[key]+"</option>";
					}
				}
				return ['<div class="layui-form-item">',
					'<label class="layui-form-label" title="'+nodeBarContents.label+'">'+nodeBarContents.label+'：</label>',
					'<div class="layui-input-block f-input-par">',
					'<select name="'+nodeBarContents.name+'">',
					options,
					'</select>',
					'</div>',
					'</div>'].join('');
			}
		}
	};

	// 新增節點后改變節點內容
	DTree.prototype.changeTreeNodeAdd = function(returnID){
		var _this = this;
		var temp = _this.temp;
		var id = temp[0], $ul = temp[1], $div = temp[2], level = temp[3];
		if(returnID){
			var $thisDiv = _this.obj.find("[data-id='"+id+"']");
			if(typeof returnID === "object"){
				// 如果是JSON格式數據，則將當前DIV刪除，重新建造DIV
				$thisDiv.remove();
				var parseData = _this.parseData(returnID);

				if(parseData.treeId()){
					$ul.append(_this.getLiItemDom(parseData.treeId(), parseData.parentId(), parseData.title(), parseData.isLast(0), parseData.iconClass(), parseData.checkArr(), level, parseData.spread(), parseData.disabled(), parseData.basicData(), parseData.recordData(), "item"));

					// 建造完畢后，選中該DIV
					var $addDiv = $ul.find("div[data-id='"+returnID.id+"']");
					_this.setNodeParam($addDiv)
				} else {
					layer.msg("新增失敗,節點ID為undefined！",{icon:5});
					// 將li節點刪除
					$ul.find("li[data-id='"+id+"']").remove();
					// 重新賦值
					_this.setNodeParam($div);
					// 臨時變數制空
					_this.temp = [];
					return ;
				}
			}else if(typeof returnID === "string" || typeof this.icon === 'number'){
				$thisDiv.attr("data-id", returnID);
				// 將li節點展示
				$ul.find("li[data-id='"+returnID+"']").show();
				var $addDiv = $ul.find("div[data-id='"+returnID+"']");
				_this.setNodeParam($addDiv)
			}

			// 判斷當前點選的節點是否是最後一級節點，如果是，則需要修改節點的樣式
			var $icon_i = $div.find("i[data-spread]");
			if ($icon_i.eq(0).attr("data-spread") == "last") {
				$icon_i.attr("data-spread","open");
				$icon_i.eq(0).removeClass(LI_DIV_SPREAD_LAST);
				$icon_i.eq(0).removeClass(ICON_HIDE);
				$icon_i.eq(0).addClass(_this.ficonOpen);
				$icon_i.eq(1).removeClass(leafIconArray[_this.leafIcon]);
				$icon_i.eq(1).addClass(_this.nodeIconOpen);
			} else {	//如果不是，也要修改節點樣式
				$icon_i.attr("data-spread","open");
				$icon_i.eq(0).removeClass(_this.ficonClose);
				$icon_i.eq(0).addClass(_this.ficonOpen);
				$icon_i.eq(1).removeClass(_this.nodeIconClose);
				$icon_i.eq(1).addClass(_this.nodeIconOpen);
				
		//		_this.clickSpread($div);
			}
			$ul.addClass(NAV_SHOW);	//展開UL
		} else {
			// 將li節點刪除
			$ul.find("li[data-id='"+id+"']").remove();
			// 重新賦值
			_this.setNodeParam($div);
		}

		_this.temp = []; // 臨時變數制空

	};

	// 修改節點后改變節點內容
	DTree.prototype.changeTreeNodeEdit = function(flag){
		var _this = this;
		var temp = _this.temp;
		var $cite = temp[0],
			$div = temp[1];

		if(!flag){
			$cite.html(title);
			node = _this.getNodeParam($div);
		}

		_this.temp = []; // 臨時變數制空
	};

	// 編輯頁打開后顯示編輯頁內容
	DTree.prototype.changeTreeNodeDone = function(param){
		var _this = this;
		form.val('dtree_editNode_form', param);
		form.render();
	};

	// 刪除節點后改變節點內容
	DTree.prototype.changeTreeNodeDel = function(flag){
		var _this = this;
		var temp = _this.temp;
		var $p_li = temp[0],
			$p_ul = $p_li.parent("ul"),
			$p_div = temp[1];

		if(flag){
			$p_li.remove();
			// 判斷父級ul中是否還存在li,如果不存在，則需要修改節點的樣式
			if($p_ul.children("li").length == 0){
				var $icon_i = $p_div.find("i[data-spread]");
				$icon_i.attr("data-spread","last");
				$icon_i.eq(0).removeClass(_this.ficonOpen);
				$icon_i.eq(0).removeClass(_this.ficonClose);
				if(!_this.dot){$icon_i.eq(0).addClass(ICON_HIDE);}
				$icon_i.eq(0).addClass(LI_DIV_SPREAD_LAST);

				$icon_i.eq(1).removeClass(_this.nodeIconOpen);
				$icon_i.eq(1).removeClass(_this.nodeIconClose);
				$icon_i.eq(1).addClass(leafIconArray[_this.leafIcon]);
			}
			_this.initNodeParam();
		}

		_this.temp = []; // 臨時變數制空
	};


	/******************** 覈取方塊區域 ********************/
		// 初始化覈取方塊的值
	DTree.prototype.chooseDataInit = function(chooseIds){
		var _this = this;
		var chooseId = chooseIds.split(",");
		for (var i=0; i<chooseId.length; i++) {
			_this.obj.find("i[dtree-click='"+eventName.checkNodeClick+"']").each(function(){
				if ($(this).attr("data-id") == chooseId[i]) {
					_this.checkStatus($(this)).check();
				}
			});
		}
		// 展開選中節點的父節點
		var $li_parents = _this.obj.find("i[dtree-click='"+eventName.checkNodeClick+"'][data-checked='1']").parents("."+LI_NAV_ITEM);
		$li_parents.children("ul").addClass(NAV_SHOW);
		$li_parents.children("."+LI_DIV_ITEM).children("i[data-spread]."+_this.ficonClose).addClass(_this.ficonOpen);
		$li_parents.children("."+LI_DIV_ITEM).children("i[data-spread]."+_this.ficonClose).removeClass(_this.ficonClose);
		$li_parents.children("."+LI_DIV_ITEM).children("i[data-spread]."+_this.nodeIconClose).addClass(_this.nodeIconOpen);
		$li_parents.children("."+LI_DIV_ITEM).children("i[data-spread]."+_this.nodeIconClose).removeClass(_this.nodeIconClose);
		return _this.getCheckbarNodesParam();
	};

	//實現覈取方塊點選，子集選中父級也選中
	DTree.prototype.checkAllOrNot =  function($i) {
		var _this = this;
		//$i 當前點選的checkbox
		var dataPar = $i.attr("data-par"),
			dataType = $i.attr("data-type"),
			$li = $i.closest(dataPar),		//當前checkbox的上級li節點
			$parent_li = $i.parents(dataPar),		//當前checkbox的所有父級li節點
			$child_li = $li.find(dataPar);	//當前checkbox的上級li節點下的所有子級li節點

		if ($i.attr("data-checked") == "1") {
			// 處理當前節點的選中狀態
			_this.checkStatus($i).noCheck();

			// 處理子級節點的選中狀態
			var $child_li_i = $child_li.find(">."+LI_DIV_ITEM+">."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"']");
			_this.checkStatus($child_li_i).noCheck();

			// 處理父級節點的選中狀態
			for (var i = 1, item = $parent_li; i < item.length; i++) {
				var flag = item.eq(i).find(">."+LI_NAV_CHILD+" ."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"'][data-checked='1']").length;
				if (flag == 0) {
					//把父級去掉選中
					var $item_i = item.eq(i).find(">."+LI_DIV_ITEM+">."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"']");
					_this.checkStatus($item_i).noCheck();
				}
			}
		} else {
			// 處理當前節點的選中狀態
			_this.checkStatus($i).check();

			// 處理子級節點的選中狀態
			var $child_li_i = $child_li.find(">."+LI_DIV_ITEM+">."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"']");
			_this.checkStatus($child_li_i).check();

			// 處理父級節點的選中狀態
			for (var i = 1, item = $parent_li; i < item.length; i++) {
				var $item_i = item.eq(i).find(">."+LI_DIV_ITEM+">."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"']");
				//把父級選中
				_this.checkStatus($item_i).check();
			}
		}
	};

	//實現覈取方塊點選， no-all 子集選中父級半選中，子集全選父級選中
	DTree.prototype.checkAllOrNoallOrNot =  function($i) {
		var _this = this;
		//$i 當前點選的checkbox
		var $div = $i.closest("."+LI_DIV_ITEM),
			dataPar = $i.attr("data-par"),
			dataType = $i.attr("data-type"),
			$li = $i.closest(dataPar),		//當前checkbox的上級li節點
			$parent_li = $i.parents(dataPar),		//當前checkbox的所有父級li節點
			$child_li = $li.find(dataPar);	//當前checkbox的上級li節點下的所有子級li節點

		if ($i.attr("data-checked") == "1") {	//當前覈取方塊為選中狀態，點選后變為未選中狀態
			// 處理當前節點的選中狀態
			_this.checkStatus($i).noCheck();

			// 處理子級節點的選中狀態
			var $child_li_i = $child_li.find(">."+LI_DIV_ITEM+">."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"']");
			_this.checkStatus($child_li_i).noCheck();

			// 處理父級節點的選中狀態
			for (var i = 1, item = $parent_li; i < item.length; i++) {
				var flag = item.eq(i).find(">."+LI_NAV_CHILD+" ."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"'][data-checked='1']").length;
				var $item_i = item.eq(i).find(">."+LI_DIV_ITEM+">."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"']");
				if (flag == 0) {
					//把父級去掉選中
					_this.checkStatus($item_i).noCheck();
				} else {
					//把父級半選
					_this.checkStatus($item_i).noallCheck();
				}
			}
		} else {		//當前覈取方塊為未選中狀態，點選后變為選中狀態
			// 處理當前節點的選中狀態
			_this.checkStatus($i).check();

			// 處理子級節點的選中狀態
			var $child_li_i = $child_li.find(">."+LI_DIV_ITEM+">."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"']");
			_this.checkStatus($child_li_i).check();

			// 處理父級節點的選中狀態
			for (var i = 1, item = $parent_li; i < item.length; i++) {
				var flag1 = item.eq(i).find(">."+LI_NAV_CHILD+" ."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"'][data-checked='1']").length;
				var flag2 = item.eq(i).find(">."+LI_NAV_CHILD+" ."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"']").length;
				var $item_i = item.eq(i).find(">."+LI_DIV_ITEM+">."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"']");
				if (flag1 != flag2) {
					// 父級覈取方塊半選
					_this.checkStatus($item_i).noallCheck();
				} else {
					// 父級覈取方塊全選
					_this.checkStatus($item_i).check();
				}
			}
		}
	};

	//實現覈取方塊點選，p-casc：父級選中子集全選，子集無法改變父級選中狀態
	DTree.prototype.checkAllOrPcascOrNot = function($i) {
		var _this = this;
		//$i 當前點選的checkbox
		var $div = $i.closest("."+LI_DIV_ITEM),
			dataPar = $i.attr("data-par"),
			dataType = $i.attr("data-type"),
			$li = $i.closest(dataPar),		//當前checkbox的上級li節點
			$parent_li = $i.parents(dataPar),		//當前checkbox的所有父級li節點
			$child_li = $li.find(dataPar);	//當前checkbox的上級li節點下的所有子級li節點

		if ($i.attr("data-checked") == "1") {	//當前覈取方塊為選中狀態，點選后變為未選中狀態
			// 處理當前節點的選中狀態
			_this.checkStatus($i).noCheck();

			// 處理子級節點的選中狀態
			var $child_li_i = $child_li.find(">."+LI_DIV_ITEM+">."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"']");
			_this.checkStatus($child_li_i).noCheck();

		} else {		//當前覈取方塊為未選中狀態，點選后變為選中狀態
			// 處理當前節點的選中狀態
			_this.checkStatus($i).check();

			// 處理子級節點的選中狀態
			var $child_li_i = $child_li.find(">."+LI_DIV_ITEM+">."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"']");
			_this.checkStatus($child_li_i).check();
		}
	};
	
	//實現覈取方塊點選，self：各自選中互不影響
	DTree.prototype.checkOrNot = function($i) {
		var _this = this;
		//$i 當前點選的checkbox
		var $div = $i.closest("."+LI_DIV_ITEM),
			dataPar = $i.attr("data-par"),
			dataType = $i.attr("data-type"),
			$li = $i.closest(dataPar),		//當前checkbox的上級li節點
			$parent_li = $i.parents(dataPar),		//當前checkbox的所有父級li節點
			$child_li = $li.find(dataPar);	//當前checkbox的上級li節點下的所有子級li節點
		
		if ($i.attr("data-checked") == "1") {	//當前覈取方塊為選中狀態，點選后變為未選中狀態
			// 處理當前節點的選中狀態
			_this.checkStatus($i).noCheck();
		} else {		//當前覈取方塊為未選中狀態，點選后變為選中狀態
			// 處理當前節點的選中狀態
			_this.checkStatus($i).check();
		}
	};

	//實現覈取方塊點選，only：只能選中1個覈取方塊
	DTree.prototype.checkOnly = function($i) {
		var _this = this;
		//$i 當前點選的checkbox
		var $div = $i.closest("."+LI_DIV_ITEM),
			dataPar = $i.attr("data-par"),
			dataType = $i.attr("data-type"),
			$li = $i.closest(dataPar),		//當前checkbox的上級li節點
			$parent_li = $i.parents(dataPar),		//當前checkbox的所有父級li節點
			$child_li = $li.find(dataPar);	//當前checkbox的上級li節點下的所有子級li節點
	
		var checked = $i.attr("data-checked");
		// 將全部節點全部設為未選中狀態
		var $all_i = _this.obj.find("i[data-checked]");
		_this.checkStatus($all_i).noCheck();
		
		if (checked != "1") {	//當前覈取方塊為未選中狀態，點選后變為選中狀態
			// 處理當前節點的選中狀態
			_this.checkStatus($i).check();
		}
		
		
	};
	
	//實現覈取方塊點選
	DTree.prototype.changeCheck = function() {
		var _this = this;
		var temp = _this.temp;
		var $i = temp[0];
		// 覈取方塊選中事件
		if (_this.checkbarType == "all") {
			_this.checkAllOrNot($i);
		} else if(_this.checkbarType == "no-all") {
			_this.checkAllOrNoallOrNot($i);
		} else if(_this.checkbarType == "p-casc") {
			_this.checkAllOrPcascOrNot($i);
		} else if(_this.checkbarType == "self") {
			_this.checkOrNot($i);
		} else if(_this.checkbarType == "only") {
			_this.checkOnly($i);
		} else {
			_this.checkAllOrNot($i);
		}

		// 獲取覈取方塊選中節點的內容
		var checkbarNodes = _this.setAndGetCheckbarNodesParam();

		// 使用者自定義想做的事情
		_this.checkbarFun.chooseDone(checkbarNodes);
		layui.event.call(this, MOD_NAME, "chooseDone("+$(_this.obj)[0].id+")", {"checkbarParams": checkbarNodes});
		_this.temp = [];
	};

	//覈取方塊半選狀態初始化設定
	DTree.prototype.initNoAllCheck = function(){
		var _this = this;
		//1.獲取所有選中節點
		var $is = _this.obj.find("i[data-checked='1']");
		if($is.length > 0){
			for ( var key = 0; key < $is.length; key++) {
				var $i = $($is[key]),
					dataPar = $i.attr("data-par"),
					dataType = $i.attr("data-type"),
					$li = $i.closest(dataPar),		//當前checkbox的上級li節點
					$parent_li = $i.parents(dataPar),		//當前checkbox的所有父級li節點
					$child_li = $li.find(dataPar);	//當前checkbox的上級li節點下的所有子級li節點

				// 處理父級節點的選中狀態
				for (var i = 1, item = $parent_li; i < item.length; i++) {
					var flag1 = item.eq(i).find(">."+LI_NAV_CHILD+" ."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"'][data-checked='1']").length;
					var flag2 = item.eq(i).find(">."+LI_NAV_CHILD+" ."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"']").length;
					var $item_i = item.eq(i).find(">."+LI_DIV_ITEM+">."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"']");
					if (flag1 != flag2) {
						// 父級覈取方塊半選
						_this.checkStatus($item_i).noallCheck();
					} else {
						// 父級覈取方塊全選
						_this.checkStatus($item_i).check();
					}
				}
			}
		}
	};

	//覈取方塊選中狀態初始化設定
	DTree.prototype.initAllCheck = function(){
		var _this = this;
		//1.獲取所有選中節點
		var $is = _this.obj.find("i[data-checked='1']");
		if($is.length > 0){
			for ( var key = 0; key < $is.length; key++) {
				var $i = $($is[key]),
					dataPar = $i.attr("data-par"),
					dataType = $i.attr("data-type"),
					$li = $i.closest(dataPar),		//當前checkbox的上級li節點
					$parent_li = $i.parents(dataPar),		//當前checkbox的所有父級li節點
					$child_li = $li.find(dataPar);	//當前checkbox的上級li節點下的所有子級li節點

				// 處理父級節點的選中狀態
				for (var i = 1, item = $parent_li; i < item.length; i++) {
					var $item_i = item.eq(i).find(">."+LI_DIV_ITEM+">."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"']");
					// 父級覈取方塊全選
					_this.checkStatus($item_i).check();
				}
			}
		}
	};

	// 設定覈取方塊選中/未選中/半選  _this.checkStatus($i).check();  _this.checkStatus($i).noCheck();   _this.checkStatus($i).noallCheck();
	DTree.prototype.checkStatus = function($i) {
		var _this = this;
		return {
			check: function(){
				$i.removeClass(LI_DIV_CHECKBAR_OUT);
				$i.removeClass(LI_DIV_CHECKBAR_NOALL);
				$i.addClass(LI_DIV_CHECKBAR_ON);
				$i.addClass(_this.style.chs);
				$i.attr("data-checked","1");
			},
			noCheck: function(){
				$i.removeClass(LI_DIV_CHECKBAR_NOALL);
				$i.removeClass(LI_DIV_CHECKBAR_ON);
				$i.removeClass(_this.style.chs);
				$i.addClass(LI_DIV_CHECKBAR_OUT);
				$i.attr("data-checked","0");
			},
			noallCheck: function(){
				$i.removeClass(LI_DIV_CHECKBAR_OUT);
				$i.removeClass(LI_DIV_CHECKBAR_ON);
				$i.addClass(LI_DIV_CHECKBAR_NOALL);
				$i.addClass(_this.style.chs);
				$i.attr("data-checked","2");
			}
		}
	};

	// 設定樹的覈取方塊操作值的全部參數,並獲取
	DTree.prototype.setAndGetCheckbarNodesParam = function() {
		var _this = this;
		//操作前先清空
		_this.checkbarNode = [];
		// 選擇所有覈取方塊節點
		if (_this.checkbarData == "change"){	//記錄變更數據
			_this.obj.find("i[data-par]").each(function(){
				var $i = $(this), $div = $i.closest("."+LI_DIV_ITEM);

				if ($i.attr("data-checked") != $i.attr("data-initchecked")) {
					_this.checkbarNode.push(_this.getRequestParam(_this.getCheckbarNodeParam($div, $i)));
				}
			});
		} else if (_this.checkbarData == "all"){	//記錄全部數據
			_this.obj.find("i[data-par][data-checked]").each(function(){
				var $i = $(this), $div = $i.closest("."+LI_DIV_ITEM);
				_this.checkbarNode.push(_this.getRequestParam(_this.getCheckbarNodeParam($div, $i)));

			});
		} else {	//記錄選中數據
			_this.obj.find("i[data-par][data-checked='1']").each(function(){
				var $i = $(this), $div = $i.closest("."+LI_DIV_ITEM);
				_this.checkbarNode.push(_this.getRequestParam(_this.getCheckbarNodeParam($div, $i)));

			});
		}
		return _this.checkbarNode;
	};

	// 獲取樹的覈取方塊操作值的全部參數
	DTree.prototype.getCheckbarNodesParam = function() {
		var _this = this;
		return _this.setAndGetCheckbarNodesParam();
	};

	// 獲取樹的一個覈取方塊的參數
	DTree.prototype.getCheckbarNodeParam = function($div, $i){
		var _this = this;
		var temp_node = {};
		temp_node.nodeId = $div.attr("data-id");
		temp_node.parentId = $div.parent().attr("data-pid");
		temp_node.context = $div.find("cite[data-leaf]").eq(0).text();
		temp_node.isLeaf = $div.find("cite[data-leaf]").eq(0).attr("data-leaf") == "leaf" ? true : false;
		temp_node.level = $div.parent().attr("data-index");
		temp_node.spread = $div.find("i[data-spread]").eq(0).attr("data-spread") == "open" ? true : false;
		temp_node.basicData = $div.attr("data-basic");
		temp_node.recordData = $div.attr("data-record");
		temp_node.dataType = $i.attr("data-type");
		temp_node.ischecked = $i.attr("data-checked");
		temp_node.initchecked = $i.attr("data-initchecked");
		return temp_node;
	};

	//判斷覈取方塊是否發生變更
	DTree.prototype.changeCheckbarNodes = function(){
		var flag = false;
		var _this = this;
		_this.obj.find("i[data-par]").each(function(){
			var $i = $(this);
			$div = $i.closest("."+LI_DIV_ITEM);

			if ($i.attr("data-checked") != $i.attr("data-initchecked")) {
				flag = true;
				return true;
			}
		});
		return flag;
	};


	/******************** iframe區域 ********************/
		// 載入iframe
	DTree.prototype.loadIframe = function($div, iframeParam) {
		var _this = this;
		var $cite = $div.find("cite[data-leaf]").eq(0);
		if (!_this.useIframe) {		// 啟用iframe
			return false;
		}
		var iframeElem = _this.iframe.iframeElem,
			iframeUrl = _this.iframe.iframeUrl,
			iframeLoad = _this.iframe.iframeLoad;

		var flag = iframeLoad == "leaf" ? (($cite.attr("data-leaf") == "leaf") ? true : false) : true;

		if (flag) {
			if ($(iframeElem).length > 0) {		//iframe存在
				if (!iframeUrl) {
					layer.msg("數據請求異常，iframeUrl參數未指定", {icon:5});
					return false;
				}
				var param = AjaxHelper.serialize(iframeParam);
				if(iframeUrl.indexOf("?")> -1){
					param = "&"+param.substring(1, param.length);
				}
				var url = iframeUrl + param;
				$(iframeElem).attr("src", url);
			} else {
				layer.msg("iframe繫結異常，請確認頁面中是否有iframe頁對應的容器", {icon:5});
				return false;
			}
		}
		return flag;
	};

	// 獲取傳遞出去的參數，根據iframe.iframeDefaultRequest、iframe.iframeRequest和node拼出發出請求的參數
	DTree.prototype.getIframeRequestParam = function(nodes){
		var _this = this;
		var request = _this.iframe.iframeRequest,
			defaultRequestNames = _this.iframe.iframeDefaultRequest,
			node = nodes || _this.node,
			requestParam = {};

		// 先拼使用者自定義的，在拼樹產生的，這樣的話使用者可以自定義當樹未產生時的節點的初始值
		for ( var key in request) {
			requestParam[key] = request[key];
		}
		for ( var key in defaultRequestNames) {
			var paramName = defaultRequestNames[key];
			var paramValue = node[key];
			if(typeof paramValue === "boolean"){
				requestParam[paramName] = paramValue;
			}else {
				if(paramValue){
					requestParam[paramName] = paramValue;
				}
			}
		}

		// 解決傳遞中文的亂碼問題
		var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;	//正則匹配中文
		for(var key in requestParam){
			if(reg.test(requestParam[key])) {
				var str = requestParam[key];
				requestParam[key] = encodeURI(encodeURI(str));
			}
		}

		return requestParam;
	};

	/******************** 數據回撥區域 ********************/
		// 獲取當前選中節點下一個UL 或根節點。為了將新節點放入ul下
	DTree.prototype.getNowNodeUl =  function() {
		var _this = this;
		return (_this.obj.find("div[data-id]").parent().find("."+NAV_THIS).length == 0) ? _this.obj : _this.obj.find("div[data-id]").parent().find("."+NAV_THIS).next("ul");
	};

	// 獲取當前選中節點 或根節點。
	DTree.prototype.getNowNode =  function() {
		var _this = this;
		return (_this.obj.find("div[data-id]").parent().find("."+NAV_THIS).length == 0) ? _this.obj.children("li").eq(0).children("div").eq(0) : _this.obj.find("div[data-id]").parent().find("."+NAV_THIS);
	};

	// 設定當前選中節點的全部參數
	DTree.prototype.setNodeParam = function($div) {
		var _this = this;
		_this.node.nodeId = $div.attr("data-id");
		_this.node.parentId = $div.parent().attr("data-pid");
		_this.node.context = $div.find("cite[data-leaf]").eq(0).text();
		_this.node.isLeaf = $div.find("cite[data-leaf]").eq(0).attr("data-leaf") == "leaf" ? true : false;
		_this.node.level = $div.parent().attr("data-index");
		_this.node.spread = $div.find("i[data-spread]").eq(0).attr("data-spread") == "open" ? true : false;
		_this.node.basicData = $div.attr("data-basic");
		_this.node.recordData = $div.attr("data-record");
		if ($div.find("i[data-par]")) {
			var dataTypes = "", ischeckeds = "", initcheckeds = "";
			$div.find("i[data-par]").each(function(){
				dataTypes += $(this).attr("data-type") + ",";
				ischeckeds += $(this).attr("data-checked") + ",";
				initcheckeds += $(this).attr("data-initchecked") + ",";
			});
			dataTypes = dataTypes.substring(0, dataTypes.length-1);
			ischeckeds = ischeckeds.substring(0, ischeckeds.length-1);
			initcheckeds = initcheckeds.substring(0, initcheckeds.length-1);

			_this.node.dataType = dataTypes;
			_this.node.ischecked = ischeckeds;
			_this.node.initchecked = initcheckeds;
		}
	};

	// 獲取當前選中節點的全部參數
	DTree.prototype.getNodeParam = function($div) {
		var _this = this;
		if ($div) {
			_this.setNodeParam($div);
		} else {
			if(_this.obj.find("div[data-id]").parent().find("."+NAV_THIS).length == 0){
				_this.initNodeParam();
			}
		}
		return this.node;
	};

	// 獲取一個臨時的node參數
	DTree.prototype.getTempNodeParam = function($div) {
		var _this = this;
		var temp_node = {};
		temp_node.nodeId = $div.attr("data-id");
		temp_node.parentId = $div.parent().attr("data-pid");
		temp_node.context = $div.find("cite[data-leaf]").eq(0).text();
		temp_node.isLeaf = $div.find("cite[data-leaf]").eq(0).attr("data-leaf") == "leaf" ? true : false;
		temp_node.level = $div.parent().attr("data-index");
		temp_node.spread = $div.find("i[data-spread]").eq(0).attr("data-spread") == "open" ? true : false;
		temp_node.basicData = $div.attr("data-basic");
		temp_node.recordData = $div.attr("data-record");
		if ($div.find("i[data-par]")) {
			var dataTypes = "", ischeckeds = "", initcheckeds = "";
			$div.find("i[data-par]").each(function(){
				dataTypes += $(this).attr("data-type") + ",";
				ischeckeds += $(this).attr("data-checked") + ",";
				initcheckeds += $(this).attr("data-initchecked") + ",";
			});
			dataTypes = dataTypes.substring(0, dataTypes.length-1);
			ischeckeds = ischeckeds.substring(0, ischeckeds.length-1);
			initcheckeds = initcheckeds.substring(0, initcheckeds.length-1);

			temp_node.dataType = dataTypes;
			temp_node.ischecked = ischeckeds;
			temp_node.initchecked = initcheckeds;
		}
		return temp_node;
	};

	// 重置參數
	DTree.prototype.initNodeParam = function(){
		var _this = this;
			_this.node.nodeId = "";
			_this.node.parentId = "";
			_this.node.context = "";
			_this.node.isLeaf = "";
			_this.node.level = "";
			_this.node.spread = "";
			_this.node.dataType = "";
			_this.node.ischecked = "";
			_this.node.initchecked = "";
			_this.node.basicData = "";
	};

	// 獲取傳遞出去的參數，根據defaultRequest、request和node拼出發出請求的參數
	DTree.prototype.getRequestParam = function(nodes){
		var _this = this;
		var request = _this.request,
			defaultRequestNames = _this.defaultRequest,
			node = nodes || _this.node,
			requestParam = {};

		// 先拼使用者自定義的，在拼樹產生的，這樣的話使用者可以自定義當樹未產生時的節點的初始值
		for ( var key in request) {
			requestParam[key] = request[key];
		}
		for ( var key in defaultRequestNames) {
			var paramName = defaultRequestNames[key];
			var paramValue = node[key];
			if(typeof paramValue === "boolean"){
				requestParam[paramName] = paramValue;
			}else {
				if(paramValue){
					requestParam[paramName] = paramValue;
				}
			}

		}
		return requestParam;
	};
	
	// 獲取filterParam過濾后的requestParam
	DTree.prototype.getFilterRequestParam = function(requestParam){
		var _this = this;
		var filterRequest = _this.filterRequest;
		return event.cloneObj(requestParam, filterRequest);
	};

	// 獲取當前選中值
	DTree.prototype.getNowParam = function(){
		var _this = this;
		
		return _this.getRequestParam(_this.getNodeParam());
	};

	// 獲取參數的上級節點
	DTree.prototype.getParentParam = function(id){
		var _this = this;
		var $div = _this.obj.find("div[data-id='"+id+"']");
		if($div.length > 0){ return _this.callbackData().parentNode($div); } else { return {}; }
	};

	// 獲取參數的下級節點
	DTree.prototype.getChildParam = function(id){
		var _this = this;
		var $div = _this.obj.find("div[data-id='"+id+"']");
		if($div.length > 0){ return _this.callbackData().childNode($div); } else { return []; }
	};

	// 獲取回撥數據
	DTree.prototype.callbackData = function(){
		var _this = this;
		return {
			dom: function($dom){  // 獲取dom
				return $dom;
			},
			node: function(node){	// 獲取當前節點值
				return _this.getRequestParam(node);
			},
			childNode: function($div){	// 獲取下級節點值
				var $childDivs = $div.next("ul").find("li."+LI_NAV_ITEM+" div."+LI_DIV_ITEM);
				var childNode = [];
				if($childDivs && $childDivs.length > 0){
					$childDivs.each(function(){
						var $cDiv = $(this);
						childNode.push(_this.getRequestParam(_this.getTempNodeParam($cDiv)));
					});
				}
				return childNode;
			},
			parentNode: function($div){	// 獲取上級節點值
				var pId = $div.parent().attr("data-pid");
				var $pdiv = _this.obj.find("div[data-id='"+pId+"']");
				if($pdiv.length > 0) {return _this.getRequestParam(_this.getTempNodeParam($pdiv));} else {return {};}

			}
		}
	};

	/******************** 事件回撥區域 ********************/
		// 繫結瀏覽器事件
	DTree.prototype.bindBrowserEvent = function(){
		var _this = this;

		// 繫結資料夾展開/收縮的圖示的點選事件，點選時給當前節點的div新增選中class
		_this.obj.on("click", "i[data-spread]", function(event) {
			event.stopPropagation();
			var $i = $(this),
				$div = $i.parent("div"),
				$cite = $div.find("cite"),
				node = _this.getNodeParam($div),
				$ul = $div.next("ul"),
				$p_li = $div.parent("li[data-index]"),	//當前選中節點的頂級li節點
				$p_ul = $p_li.parent("ul");
			var $toolBarDiv = _this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id);
			$toolBarDiv.find(".layui-nav-child").removeClass('layui-anim-fadein layui-show');

			_this.obj.find("div[data-id]").parent().find("."+NAV_THIS).removeClass(NAV_THIS);
			_this.obj.find("div[data-id]").parent().find("."+_this.style.itemThis).removeClass(_this.style.itemThis);
			$div.addClass(NAV_THIS);
			$div.addClass(_this.style.itemThis);

			_this.clickSpread($div);	// 展開或隱藏節點

			// 樹狀態改變后，使用者自定義想做的事情
			layui.event.call(this, MOD_NAME, "changeTree("+$(_this.obj)[0].id+")",  {param: _this.callbackData().node(node), dom: _this.callbackData().dom($i), show: _this.callbackData().dom($i).attr("data-spread") == "open" ? true : false});
		});

		// 繫結所有子節點div的單擊事件，點選時觸發載入iframe或使用者自定義想做的事情
		_this.obj.on("click", "div[dtree-click='"+eventName.itemNodeClick+"']", function(event) {
			event.stopPropagation();
			var $div = $(this),
				$cite = $div.find("cite"),
				node = _this.getNodeParam($div),
				$ul = $div.next("ul"),
				$p_li = $div.parent("li[data-index]"),	//當前選中節點的頂級li節點
				$p_ul = $p_li.parent("ul");
			var $toolBarDiv = _this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id);
			$toolBarDiv.find(".layui-nav-child").removeClass('layui-anim-fadein layui-show');

			_this.obj.find("div[data-id]").parent().find("."+NAV_THIS).removeClass(NAV_THIS);
			_this.obj.find("div[data-id]").parent().find("."+_this.style.itemThis).removeClass(_this.style.itemThis);
			$div.addClass(NAV_THIS);
			$div.addClass(_this.style.itemThis);

			if (_this.useIframe) {
				var iframeParam = _this.getFilterRequestParam(_this.getIframeRequestParam(node));
				var flag = _this.loadIframe($div, iframeParam);	// 載入iframe
				if (flag) {
					// iframe載入完畢后，使用者自定義想做的事情
					_this.iframeFun.iframeDone(iframeParam);

					layui.event.call(this, MOD_NAME, "iframeDone("+$(_this.obj)[0].id+")",  {"iframeParam": iframeParam, dom: _this.callbackData().dom($div)});
				}
			} else {
				// 單擊事件執行完畢后，使用者自定義想做的事情
				layui.event.call(this, MOD_NAME, "node("+$(_this.obj)[0].id+")", {param: _this.callbackData().node(node), childParams: _this.callbackData().childNode($div), parentParam: _this.callbackData().parentNode($div), dom: _this.callbackData().dom($div)});
			}
		});

		// 繫結所有子節點div的雙擊事件，暴露on給使用者自定義
		_this.obj.on("dblclick", "div[dtree-click='"+eventName.itemNodeClick+"']", function(event) {
			event.stopPropagation();
			var $div = $(this),
				$cite = $div.find("cite"),
				node = _this.getNodeParam($div),
				$ul = $div.next("ul"),
				$p_li = $div.parent("li[data-index]"),	//當前選中節點的頂級li節點
				$p_ul = $p_li.parent("ul");
			var $toolBarDiv = _this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id);
			$toolBarDiv.find(".layui-nav-child").removeClass('layui-anim-fadein layui-show');

			_this.obj.find("div[data-id]").parent().find("."+NAV_THIS).removeClass(NAV_THIS);
			_this.obj.find("div[data-id]").parent().find("."+_this.style.itemThis).removeClass(_this.style.itemThis);
			$div.addClass(NAV_THIS);
			$div.addClass(_this.style.itemThis);
			// 雙擊事件執行完畢后，使用者自定義想做的事情
			layui.event.call(this, MOD_NAME, "nodedblclick("+$(_this.obj)[0].id+")",  {param: _this.callbackData().node(node), childParams: _this.callbackData().childNode($div), parentParam: _this.callbackData().parentNode($div), dom: _this.callbackData().dom($div)});
		});

		//繫結所有子節點div的右鍵點選事件，用於顯示toolbar
		_this.obj.on("contextmenu", "div[dtree-click='"+eventName.itemNodeClick+"'][d-contextmenu]", function(e){
			var $div = $(this),
				node = _this.getNodeParam($div),
				contextmenu = $div.attr("d-contextmenu");
			if(_this.toolbar){
				var $toolBarDiv = _this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id);
				$toolBarDiv.find(".layui-nav-child").removeClass('layui-anim-fadein layui-show');
				
				// toolbar載入前執行的方法，執行完畢之後建立按鈕			
				_this.setToolbarDom(_this.toolbarFun.loadToolbarBefore(event.cloneObj(_this.toolbarMenu), _this.getRequestParam(node), $div));
				
				var e = e || window.event,
					mx = e.pageX - $div.offset().left +45 ,
					my = $div.offset().top - _this.obj.closest(_this.toolbarScroll).offset().top +15;
				if(contextmenu == "true"){
					_this.obj.find("div[data-id]").parent().find("."+NAV_THIS).removeClass(NAV_THIS);
					_this.obj.find("div[data-id]").parent().find("."+_this.style.itemThis).removeClass(_this.style.itemThis);
					$div.addClass(NAV_THIS);
					$div.addClass(_this.style.itemThis);
					$toolBarDiv.find(".layui-nav-child").addClass('layui-anim-fadein layui-show');
					$toolBarDiv.css({'left':mx+'px','top':my+'px'});
				}
			}
			e.stopPropagation();
			return false;
		});

		// 繫結裝載樹的上層出現滾動條的容器，讓toolbar隱藏
		_this.obj.closest(_this.toolbarScroll).scroll(function() {
			var $toolBarDiv = _this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id);
			$toolBarDiv.find(".layui-nav-child").removeClass('layui-anim-fadein layui-show');
		});
		
		// 繫結toolbar的點選事件
		_this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id).on("click", "a[dtree-tool]", function(event) {
			event.stopPropagation();
			var $div = _this.getNowNode(),
				node = _this.getNodeParam($div),
				$ul = $div.next("ul"),
				$p_li = $div.parent("li[data-index]"),	//當前選中節點的頂級li節點
				$p_ul = $p_li.parent("ul"),	//當前選中節點的頂級li節點的父級ul
				$p_div = $p_ul.prev("div"), //當前選中節點的頂級li節點的父級ul的前一個div
				$cite = $div.children("cite"),	//當前選中節點的text
				title = $cite.html();
			var $toolBarDiv = _this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id);
			$toolBarDiv.find(".layui-nav-child").removeClass('layui-anim-fadein layui-show');
			var tool = $(this).attr("dtree-tool");
			switch (tool) {
				case defaultTool.addToolbar:
					var content = _this.loadToolBar(title, defaultTool.addToolbar);

					layer.open({
						title: "新增"+_this.toolbarStyle.title,
						type: 1,
						area: _this.toolbarStyle.area,
						content: content,
						success: function(layero, index){
							form.render();
							form.on("submit(dtree_addNode_form)",function(data){
								var data = data.field;
								var parentId = $div.attr("data-id"),
									id = $div.attr("data-id")+"_node_"+$ul[0].childNodes.length,
									isLeaf = true,
									isChecked = "0",
									level = parseInt($p_li.attr("data-index"))+1;

								// 建立子節點的DOM，新增子節點
								var checkArr = [];
								if (_this.checkArrLen > 0) {
									for (var i = 0; i < _this.checkArrLen; i++) {
										checkArr.push({"type":i,"isChecked":"0"});
									}
								}
								
								$ul.append(_this.getLiItemDom(id, parentId, data.addNodeName, true, "", checkArr, level, false, false, "", "", "item"));
								// 先將li節點隱藏
								$ul.find("li[data-id='"+id+"']").hide();
								// 重新賦值
								var $addDiv = $ul.find("div[data-id='"+id+"']");
								node = _this.getNodeParam($addDiv);

								//獲取組裝后的requestNode,組合參數
								var requestNode = _this.getRequestParam(node);
								requestNode = $.extend(requestNode, data);

								_this.temp = [id, $ul, $div, level];
								// 使用者自定義想做的事情
								_this.toolbarFun.addTreeNode(requestNode, $div);

								layer.close(index);
								return false;
							});
						}
					});
					break;
				case defaultTool.editToolbar:
					var content = _this.loadToolBar(title, defaultTool.editToolbar);

					layer.open({
						title: "編輯"+_this.toolbarStyle.title,
						type: 1,
						area: _this.toolbarStyle.area,
						content: content,
						success: function(layero, index){
							_this.toolbarFun.editTreeLoad(_this.getRequestParam(node));
							form.render();
							form.on("submit(dtree_editNode_form)",function(data){
								var data = data.field;
								$cite.html(data.editNodeName);
								node = _this.getNodeParam($div);
								var requestNode = _this.getRequestParam(node);
								requestNode = $.extend(requestNode, data);
								_this.temp = [$cite, $div];
								_this.toolbarFun.editTreeNode(requestNode, $div);

								layer.close(index);
							});
						}
					});
					break;
				case defaultTool.delToolbar:
					layer.confirm('確定要刪除該'+_this.toolbarStyle.title+'？', {icon: 3, title:'刪除'+_this.toolbarStyle.title}, function(index){
						var node = _this.getNodeParam($div);
						_this.temp = [$p_li, $p_div];
						_this.toolbarFun.delTreeNode(_this.getRequestParam(node), $div);

						layer.close(index);
					});
					break;
				default:
					var toolbarId = $(this).attr("dtree-tool");
					if(_this.toolbarExt.length > 0){
						for(var i=0; i<_this.toolbarExt.length; i++){
							var ext = _this.toolbarExt[i];
							if (toolbarId == ext.toolbarId){
								ext.handler(_this.getRequestParam(_this.getNodeParam($div), $div));
								break;
							}
						}
					}
					break;
			}
		});
		
		// 繫結menubar的點選事件
		_this.obj.prevAll('div#dtree_menubar_'+_this.obj[0].id).on("click", "button[d-menu]", function(event) {
			event.stopPropagation();
			var $toolBarDiv = _this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id);
			$toolBarDiv.find(".layui-nav-child").removeClass('layui-anim-fadein layui-show');
			_this.menubarListener($(this).attr("d-menu"), "group");
		});
		
		// 繫結menubar的點選事件
		_this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id).on("click", "a[d-menu]", function(event) {
			event.stopPropagation();
			var $toolBarDiv = _this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id);
			$toolBarDiv.find(".layui-nav-child").removeClass('layui-anim-fadein layui-show');
			_this.menubarListener($(this).attr("d-menu"), "toolbar");
		});
		
		// 繫結menubar的點選按鈕事件
		_this.obj.closest('body').find("*[dtree-id='"+_this.obj[0].id+"'][dtree-menu]").on("click", function(event) {
			event.stopPropagation();
			var $toolBarDiv = _this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id);
			$toolBarDiv.find(".layui-nav-child").removeClass('layui-anim-fadein layui-show');
			_this.menubarListener($(this).attr("dtree-menu"), "freedom");
		});

		// 繫結cheboxbar的節點覈取方塊
		_this.obj.on("click", "i[dtree-click='"+eventName.checkNodeClick+"']", function(event) {
			var $toolBarDiv = _this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id);
			$toolBarDiv.find(".layui-nav-child").removeClass('layui-anim-fadein layui-show');
			var $i = $(this),
				$div = $i.closest("div[dtree-click='"+eventName.itemNodeClick+"']"),
				node = _this.getNodeParam($div);
			// 覈取方塊選中前的回撥
			var flag = _this.checkbarFun.chooseBefore($i, _this.getRequestParam(node));
			_this.temp = [$i];
			if(flag){_this.changeCheck();}
			event.stopPropagation();
		});
	};

	// 繫結body的單擊，讓本頁面所有的toolbar隱藏
	$BODY.on("click", function(event){
		$("div."+LI_DIV_TOOLBAR).find(".layui-show").removeClass('layui-anim-fadein layui-show');
	});

	// 解綁瀏覽器事件
	DTree.prototype.unbindBrowserEvent = function(){
		var _this = this;

		// 本身事件解綁
		_this.obj.unbind();
		// 菜單欄解綁
		if(_this.menubar){
			_this.obj.prevAll('div#dtree_menubar_'+_this.obj[0].id).unbind();
			if(_this.obj.closest('body').find("*[dtree-id='"+_this.obj[0].id+"'][dtree-menu]").length > 0){
				_this.obj.closest('body').find("*[dtree-id='"+_this.obj[0].id+"'][dtree-menu]").unbind();
			}
		}

		// 工具欄解綁
		if(_this.toolbar){
			_this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id).unbind();
			if(_this.obj.closest(_this.toolbarScroll).length > 0){
				_this.obj.closest(_this.toolbarScroll).unbind();
			}
		}
	};


	/** 外部訪問 **/
	var dtree = {
		render: function(options){	// 初始化樹
			var dTree = null;
			var id = event.getElemId(options);
			if(id == "") {
				layer.msg("頁面中未找到繫結id", {icon:5});
			} else {
				dTree = DTrees[id];
				if(typeof dTree === 'object'){
					dTree.reloadSetting(options);
					dTree.initTreePlus();
					dTree.openTreePlus();
					dTree.init();
					dTree.unbindBrowserEvent();
					dTree.bindBrowserEvent();
				} else {
					// 建立樹
					dTree = new DTree(options);
					// 新增到樹陣列中去
					DTrees[id] = dTree;
					dTree.initTreePlus();
					dTree.openTreePlus();
					dTree.init();
					dTree.bindBrowserEvent();
				}
			}

			return dTree;
		},
		reload: function(dTree, options){
			if(typeof dTree === "string"){
				dTree = DTrees[dTree];
			}
			if(typeof dTree === "undefined"){
				layer.msg("方法獲取失敗，請檢查ID或對像傳遞是否正確",{icon:2});
				return ;
			}
			dTree.reloadSetting(options);
			dTree.initTreePlus();
			dTree.openTreePlus();
			dTree.init();
			dTree.unbindBrowserEvent();
			dTree.bindBrowserEvent();
		},
		on: function(events, callback) {	// 繫結事件
			if(events.indexOf("'") > 0){
				events = events.replace(/'/g,"");
			}
			if(events.indexOf('"') > 0) {
				events = events.replace(/"/g,"");
			}
			return layui.onevent.call(this, MOD_NAME, events, callback);
		},
		getNowParam: function(dTree){
			if(typeof dTree === "string"){
				dTree = DTrees[dTree];
			}
			if(typeof dTree === "undefined"){
				layer.msg("方法獲取失敗，請檢查ID或對像傳遞是否正確",{icon:2});
				return ;
			}
			return dTree.getNowParam();	// 獲取當前選中值
		},
		getParentParam: function(dTree, id){		// 獲取參數的上級節點
			if(typeof dTree === "string"){
				dTree = DTrees[dTree];
			}
			if(typeof dTree === "undefined"){
				layer.msg("方法獲取失敗，請檢查ID或對像傳遞是否正確",{icon:2});
				return ;
			}
			return dTree.getParentParam(id);
		},
		getChildParam: function(dTree, id){		// 獲取參數的全部下級節點
			if(typeof dTree === "string"){
				dTree = DTrees[dTree];
			}
			if(typeof dTree === "undefined"){
				layer.msg("方法獲取失敗，請檢查ID或對像傳遞是否正確",{icon:2});
				return ;
			}
			return dTree.getChildParam(id);
		},
		getCheckbarNodesParam: function(dTree){
			if(typeof dTree === "string"){
				dTree = DTrees[dTree];
			}
			if(typeof dTree === "undefined"){
				layer.msg("方法獲取失敗，請檢查ID或對像傳遞是否正確",{icon:2});
				return {};
			}
			return dTree.getCheckbarNodesParam();	// 獲取覈取方塊選中值
		},
		dataInit: function(dTree, chooseId){	// 初始化選中樹，針對數據返選
			if(typeof dTree === "string"){
				dTree = DTrees[dTree];
			}
			if(typeof dTree === "undefined"){
				layer.msg("方法獲取失敗，請檢查ID或對像傳遞是否正確",{icon:2});
				return ;
			}
			if(chooseId){
				return dTree.dataInit(chooseId);
			}
		},
		chooseDataInit: function(dTree, chooseIds){	// 初始化覈取方塊的值
			if(typeof dTree === "string"){
				dTree = DTrees[dTree];
			}
			if(typeof dTree === "undefined"){
				layer.msg("方法獲取失敗，請檢查ID或對像傳遞是否正確",{icon:2});
				return ;
			}
			if(chooseIds){
				return dTree.chooseDataInit(chooseIds);
			}
		},
		changeCheckbarNodes: function(dTree){	//判斷覈取方塊是否發生變更
			if(typeof dTree === "string"){
				dTree = DTrees[dTree];
			}
			if(typeof dTree === "undefined"){
				layer.msg("方法獲取失敗，請檢查ID或對像傳遞是否正確",{icon:2});
				return ;
			}
			return dTree.changeCheckbarNodes();
		},
		refreshTree: function(dTree){ //重新整理樹，並具有數據回顯的功能，自動識別覈取方塊or單選（未完成）
			if(typeof dTree === "string"){
				dTree = DTrees[dTree];
			}
			if(typeof dTree === "undefined"){
				layer.msg("方法獲取失敗，請檢查ID或對像傳遞是否正確",{icon:2});
				return ;
			}
		},
		escape: function(html){
			return event.escape(html);
		},
		unescape: function(str){
			return event.unescape(str);
		},
		version: function(){
			return VERSION;
		}
	};

	exports('dtree', dtree);
});