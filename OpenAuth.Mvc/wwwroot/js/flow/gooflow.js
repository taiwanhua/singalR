/**
 * Gooflow線上流程圖設計器
 * Version: 1.3.2
 * Copyright: foolegg126(sdlddr)
 */

layui.define("jquery",
    function(exports) {

        var jQuery = layui.jquery;
        var $ = layui.jquery;

	//預先定義幾個公用方法
	//獲取一個DIV的絕對座標的功能函式,即使是非絕對定位,一樣能獲取到
	function _elCsys(dom) {
		var t = dom.offsetTop;
		var l = dom.offsetLeft;
		dom=dom.offsetParent;
		while (dom) {
			t += dom.offsetTop;
			l += dom.offsetLeft;
			dom=dom.offsetParent;
		}
		return { top: t, left: l };
	}
	//相容各種瀏覽器的,獲取滑鼠真實位置
	function _mouseP(ev){
		if(!ev) ev=window.event;
		if(ev.pageX || ev.pageY){
			return {x:ev.pageX, y:ev.pageY};
		}
		return {
			x:ev.clientX + document.documentElement.scrollLeft - document.body.clientLeft,
			y:ev.clientY + document.documentElement.scrollTop  - document.body.clientTop
		};
	}
	//計算兩個結點間要連折線的話，連線的所有座標
	function calcPolyPoints(n1,n2,type,M,scale){
		if(!scale)	scale=1.0;
		var N1={left:n1.left*scale, top:n1.top*scale, width:n1.width*scale, height:n1.height*scale};
		var N2={left:n2.left*scale, top:n2.top*scale, width:n2.width*scale, height:n2.height*scale};
		M=M*scale;
		//開始/結束兩個結點的中心
		var SP={x:N1.left+N1.width/2,y:N1.top+N1.height/2};
		var EP={x:N2.left+N2.width/2,y:N2.top+N2.height/2};
		var m1=[],m2=[],sp,ep;
		//如果是允許中段可左右移動的折線,則參數M為可移動中段線的X座標
		//粗略計算起始點
		sp=[SP.x,SP.y];
		ep=[EP.x,EP.y];
		if(type==="lr"){
			//粗略計算2箇中點
			m1=[M,SP.y];
			m2=[M,EP.y];
			//再具體分析修改開始點和中點1
			if(m1[0]>N1.left&&m1[0]<N1.left+N1.width){
				m1[1]=(SP.y>EP.y? N1.top:N1.top+N1.height);
				sp[0]=m1[0];sp[1]=m1[1];
			}
			else{
				sp[0]=(m1[0]<N1.left? N1.left:N1.left+N1.width)
			}
			//再具體分析中點2和結束點
			if(m2[0]>N2.left&&m2[0]<N2.left+N2.width){
				m2[1]=(SP.y>EP.y? N2.top+N2.height:N2.top);
				ep[0]=m2[0];ep[1]=m2[1];
			}
			else{
				ep[0]=(m2[0]<N2.left? N2.left:N2.left+N2.width)
			}
		}
		//如果是允許中段可上下移動的折線,則參數M為可移動中段線的Y座標
		else if(type==="tb"){
			//粗略計算2箇中點
			m1=[SP.x,M];
			m2=[EP.x,M];
			//再具體分析修改開始點和中點1
			if(m1[1]>N1.top&&m1[1]<N1.top+N1.height){
				m1[0]=(SP.x>EP.x? N1.left:N1.left+N1.width);
				sp[0]=m1[0];sp[1]=m1[1];
			}
			else{
				sp[1]=(m1[1]<N1.top? N1.top:N1.top+N1.height)
			}
			//再具體分析中點2和結束點
			if(m2[1]>N2.top&&m2[1]<N2.top+N2.height){
				m2[0]=(SP.x>EP.x? N2.left+N2.width:N2.left);
				ep[0]=m2[0];ep[1]=m2[1];
			}
			else{
				ep[1]=(m2[1]<N2.top? N2.top:N2.top+N2.height);
			}
		}
		return {start:sp,m1:m1,m2:m2,end:ep};
	}
	//計算兩個結點間要連直線的話，連線的開始座標和結束座標
	function calcStartEnd(n1,n2,scale){
		if(!scale)	scale=1.0;
		var X_1,Y_1,X_2,Y_2;
		//X判斷：
		var x11=n1.left*scale ,x12=n1.left*scale +n1.width*scale ,x21=n2.left*scale ,x22=n2.left*scale +n2.width*scale ;
		//結點2在結點1左邊
		if(x11>=x22){
			X_1=x11;X_2=x22;
		}
		//結點2在結點1右邊
		else if(x12<=x21){
			X_1=x12;X_2=x21;
		}
		//結點2在結點1水平部分重合
		else if(x11<=x21&&x12>=x21&&x12<=x22){
			X_1=(x12+x21)/2;X_2=X_1;
		}
		else if(x11>=x21&&x12<=x22){
			X_1=(x11+x12)/2;X_2=X_1;
		}
		else if(x21>=x11&&x22<=x12){
			X_1=(x21+x22)/2;X_2=X_1;
		}
		else if(x11<=x22&&x12>=x22){
			X_1=(x11+x22)/2;X_2=X_1;
		}

		//Y判斷：
		var y11=n1.top*scale ,y12=n1.top*scale +n1.height*scale ,y21=n2.top*scale ,y22=n2.top*scale +n2.height*scale ;
		//結點2在結點1上邊
		if(y11>=y22){
			Y_1=y11;Y_2=y22;
		}
		//結點2在結點1下邊
		else if(y12<=y21){
			Y_1=y12;Y_2=y21;
		}
		//結點2在結點1垂直部分重合
		else if(y11<=y21&&y12>=y21&&y12<=y22){
			Y_1=(y12+y21)/2;Y_2=Y_1;
		}
		else if(y11>=y21&&y12<=y22){
			Y_1=(y11+y12)/2;Y_2=Y_1;
		}
		else if(y21>=y11&&y22<=y12){
			Y_1=(y21+y22)/2;Y_2=Y_1;
		}
		else if(y11<=y22&&y12>=y22){
			Y_1=(y11+y22)/2;Y_2=Y_1;
		}
		return {"start":[X_1,Y_1],"end":[X_2,Y_2]};
	}
	//初始化折線中段的X/Y座標,mType='rb'時為X座標,mType='tb'時為Y座標
	function getMValue(n1,n2,mType,scale){
		if(!scale)	scale=1.0;
		if(mType==="lr"){
			return (n1.left*scale + n1.width*scale/2 + n2.left*scale + n2.width*scale/2 )/2;
		}
		else if(mType==="tb"){
			return (n1.top*scale + n1.height*scale/2 + n2.top*scale + n2.height*scale/2 )/2;
		}
	}
//構造類：
var GooFlow = function(selector,property){
	console.log('Your browser\'s navigator.userAgent is:',navigator.userAgent);
	if (navigator.userAgent.indexOf("MSIE 8.0")>0||navigator.userAgent.indexOf("MSIE 7.0")>0||navigator.userAgent.indexOf("MSIE 6.0")>0)
		GooFlow.prototype.useSVG="";
	else	GooFlow.prototype.useSVG="1";
//初始化區域圖的對象
	this.$bgDiv=$(selector);//最父框架的DIV
	this.$bgDiv.addClass("GooFlow");
	this.$id=this.$bgDiv.attr("id")||'GooFlow_'+new Date().getTime();
	if(property.colors && typeof property.colors ==='object'){
		$.extend(GooFlow.color, property.colors);
	}
	this.$bgDiv.css("color",GooFlow.color.font);
	if(GooFlow.color.main){
		this.$bgDiv.append('<style>.GooFlow_tool_btndown{background-color:'+GooFlow.color.main+'}</style>');
	}
	var width=(property.width||this.$bgDiv.width());
	var height=(property.height||this.$bgDiv.height());
	this.$bgDiv.css({width:width+"px",height:height+"px"});
	this.$tool=null;//左側工具欄對像
	this.$head=null;//頂部標籤及工具欄按鈕
	this.$title="newFlow_1";//流程圖的名稱
	this.$nowType="cursor";//當前要繪製的對象型別
	this.$lineData={};
	this.$lineCount=0;
	this.$nodeData={};
	this.$nodeCount=0;
	this.$areaData={};
	this.$areaCount=0;
	this.$lineDom={};
	this.$nodeDom={};
	this.$areaDom={};
	this.$max=property.initNum||1;//計算預設ID值的起始SEQUENCE
	this.$focus="";//當前被選定的結點/轉換線ID,如果沒選中或者工作區被清空,則為""
	//this.$cursor="default";//滑鼠指針在工作區內的樣式
	this.$editable=false;//工作區是否可編輯
	this.$deletedItem={};//在流程圖的編輯操作中被刪除掉的元素ID集合,元素ID為KEY,元素型別(node,line.area)為VALUE
	this.$workExtendStep=200;//在自動/手動擴充套件可編輯區時，一次擴充套件后寬/高增加多少畫素
	this.$scale=1.00;//工作區內容的縮放比例，從0.1至無窮大，初始預設為1
	var headHeight=0;
	var tmp="",titleText;
	if(property.haveHead){
		tmp="<div class='GooFlow_head' "+(GooFlow.color.main? "style='border-bottom-color:"+GooFlow.color.main+"'" : "") +">";
		if(property.headLabel){
      		tmp+="<label title='"+(property.initLabelText||"newFlow_1")+"' "
        		+(GooFlow.color.main? "style='background:"+GooFlow.color.main+"'" : "")+">"
				+(property.initLabelText||"newFlow_1")+"</label>";
		}
		if(property.headBtns)
		for(var x=0;x<property.headBtns.length;++x){
			if(!property.useOperStack&&(property.headBtns[x]==='undo'||property.headBtns[x]==='redo'))	continue;
			titleText=GooFlow.remarks.headBtns[property.headBtns[x]]? " title='"+GooFlow.remarks.headBtns[property.headBtns[x]]+"'":"";
			tmp+="<a href='javascript:void(0)' class='GooFlow_head_btn'"+titleText+"><i class='ico_"+property.headBtns[x]+"'></i></a>"
		}
		tmp+="</div>";
		this.$head=$(tmp);
		this.$bgDiv.append(this.$head);
		if(property.headBtns){
			this.$head.find(".ico_undo").parent().addClass("a_disabled");
			this.$head.find(".ico_redo").parent().addClass("a_disabled");
			//以下是當工具欄按鈕被點選時觸發的事件自定義(虛擬函式),格式為function(),因為可直接用THIS操作對像本身,不用傳參；使用者可自行重定義:
			this.onBtnNewClick=null;//新建流程圖按鈕被點中
			this.onBtnOpenClick=null;//打開流程圖按鈕定義
			this.onBtnSaveClick=null;//儲存流程圖按鈕定義
			this.onFreshClick=null;//過載流程圖按鈕定義
			this.onPrintClick=null;//列印流程圖按鈕定義
			this.$headBtnEvents=property.headBtnEvents;//使用者對頭部欄另行自定義型別按鈕的事件繫結json集合,key為按鈕型別名，value為方法定義
			this.$head.on("click",{inthis:this},function(e){
				if(!e)e=window.event;
				var tar=e.target;
				if(tar.tagName==="DIV"||tar.tagName==="SPAN")	return;
				else if(tar.tagName==="A")	tar=tar.childNodes[0];
				var This=e.data.inthis, Class=$(tar).attr("class");
				//定義頂部操作欄按鈕的事件
				switch(Class){
					case "ico_new":		if(This.onBtnNewClick!==null)	This.onBtnNewClick();break;
					case "ico_open":	if(This.onBtnOpenClick!==null)	This.onBtnOpenClick();break;
					case "ico_save":	if(This.onBtnSaveClick!==null)	This.onBtnSaveClick();break;
					case "ico_undo":	This.undo();break;
					case "ico_redo":	This.redo();break;
					case "ico_reload":  if(This.onFreshClick!==null)	This.onFreshClick();break;
					case "ico_print":   if(This.onPrintClick!==null)	This.onPrintClick();break;
					default:
						if(typeof This.$headBtnEvents!=='undefined' && typeof This.$headBtnEvents[Class]==='function'){
							This.$headBtnEvents[Class]();
						}
				}
			});
		}
		headHeight=28;
	}
	var toolWidth=0;
	if(property.haveTool){
		this.$bgDiv.append("<div class='GooFlow_tool'"+(property.haveHead? "":" style='margin-top:3px'")+"><div style='height:"+(height-headHeight-(property.haveHead? 5:8))+"px' class='GooFlow_tool_div'></div></div>");
		this.$tool=this.$bgDiv.find(".GooFlow_tool div");
		//未加程式碼：加入繪圖工具按鈕
		var titleCursor=GooFlow.remarks.toolBtns["cursor"]? " title='"+GooFlow.remarks.toolBtns["cursor"]+"'":"";
        var titleDirect=GooFlow.remarks.toolBtns["direct"]? " title='"+GooFlow.remarks.toolBtns["direct"]+"'":"";
        var titleDashed=GooFlow.remarks.toolBtns["dashed"]? " title='"+GooFlow.remarks.toolBtns["dashed"]+"'":"";
		this.$tool.append("<div style='margin-bottom:4px'><span/><span/><span/></div>"
	  		+"<a href='javascript:void(0)'"+titleCursor+" type='cursor' class='GooFlow_tool_btndown' id='"+this.$id+"_btn_cursor'><i class='ico_cursor'/></a>"
     		+"<a href='javascript:void(0)'"+titleDirect+" type='direct' class='GooFlow_tool_btn' id='"+this.$id+"_btn_direct'><i class='ico_direct'/></a>"
			+(property.haveDashed? "<a href='javascript:void(0)'"+titleDashed+" type='dashed' class='GooFlow_tool_btn' id='"+this.$id+"_btn_dashed'><i class='ico_dashed'/></a>":"")
    	);
		if(property.toolBtns&&property.toolBtns.length>0){
			tmp="<span/>";
			for(var i=0;i<property.toolBtns.length;++i){
                var tmpType=property.toolBtns[i].split(" ")[0];
                titleText=GooFlow.remarks.toolBtns[tmpType]? " title='"+GooFlow.remarks.toolBtns[tmpType]+"'":'';
				tmp+="<a href='javascript:void(0)'"+titleText+" type='"+property.toolBtns[i]+"' id='"+this.$id+"_btn_"+tmpType+"' class='GooFlow_tool_btn'><i class='ico_"+property.toolBtns[i]+"'/></a>";//加入自定義按鈕
			}
			this.$tool.append(tmp);
		}
		//加入區域劃分框工具開關按鈕
		if(property.haveGroup){
            var titleGroup=GooFlow.remarks.toolBtns["group"]? " title='"+GooFlow.remarks.toolBtns["group"]+"'":"";
            this.$tool.append("<span/><a href='javascript:void(0)'"+titleGroup+" type='group' class='GooFlow_tool_btn' id='"+this.$id+"_btn_group'><i class='ico_group'/></a>");
		}
		toolWidth=31;
		this.$nowType="cursor";
		//繫結各個按鈕的點選事件
		this.$tool.on("click",{inthis:this},function(e){
			if(!e)e=window.event;
			var tar;
			switch(e.target.tagName){
				case "SPAN":return false;
				case "DIV":return false;
				case "I":	tar=e.target.parentNode;break;
				case "A":	tar=e.target;
			}
			var type=$(tar).attr("type");
			e.data.inthis.switchToolBtn(type);
			return false;
		});
		this.$editable=true;//只有具有工具欄時可編輯
	}

	//確定工作區在設計器中的位置、寬高
	width=width-toolWidth-9;
	height=height-headHeight-(property.haveHead? 5:8);
	this.$bgDiv.append("<div class='GooFlow_work' style='"+(property.haveHead? "top:28px;":"")+(property.haveTool? "left:34px":"")+"'></div>");
	this.$workArea=$("<div class='GooFlow_work_inner' style='width:"+width+"px;height:"+height+"px'></div>")
		.attr({"unselectable":"on","onselectstart":'return false',"onselect":'document.selection.empty()'});
	this.$bgDiv.children(".GooFlow_work").append(this.$workArea);
	//計算工作區相對GooFlow父框架的絕對定位運算值，並儲存
	this.t={top:property.haveHead? 28:3,left:property.haveTool?34:3};

    //繫結工作區事件
    this.$workArea.on("click",{inthis:this},function(e){
        if(!e)e=window.event;
        var This=e.data.inthis;
        var type=This.$nowType;
        if(type==="cursor"){
            var tar=$(e.target);
            var n=tar.prop("tagName");
            if(n==="svg"||(n==="DIV"&&tar.prop("class").indexOf("GooFlow_work")>-1)||n==="LABEL"){
            	console.log(n);
                if(This.$lineOper && This.$lineOper.data("tid")){
                    This.focusItem(This.$lineOper.data("tid"),false);
                }
                else{This.blurItem();}
            }
            return;
        }
        else if(type==="direct"||type==="dashed"||type==="group")return;
        if(!This.$editable)return;
        var X,Y;
        var ev=_mouseP(e),t=_elCsys(this);
        X=ev.x-t.left+this.parentNode.scrollLeft;
        Y=ev.y-t.top+this.parentNode.scrollTop;
        This.addNode(new Date().getTime().toString(),{name:"node_"+This.$max,left:X,top:Y,type:This.$nowType});
        This.$max++;
    });

	this.$draw=null;//畫向量線條的容器
	this._initDraw("draw_"+this.$id,width,height);
	this.$group=null;//畫區域塊（泳道）的容器
	if(property.haveGroup)
		this._initGroup(width,height);
	//為了節點而增加的一些集體繫結
	this._initWorkForNode();

	//一些基本的元素事件，這些事件可直接通過this訪問對像本身
	//當操作某個單元（結點/線）被由不選中變成選中時，觸發的方法，返回FALSE可阻止選中事件的發生
	//格式function(id,type)：id是單元的唯一標識ID,type是單元的種類,有"node","line"兩種取值,"area"不支援被選中
	this.onItemFocus=null;
	//當操作某個單元（結點/線）被由選中變成不選中時，觸發的方法，返回FALSE可阻止取消選中事件的發生
	//格式function(id，type)：id是單元的唯一標識ID,type是單元的種類,有"node","line"兩種取值,"area"不支援被取消選中
	this.onItemBlur=null;
	//當用重色標註某個結點/轉換線時觸發的方法，返回FALSE可阻止重定大小/造型事件的發生
	//格式function(id，type，mark)：id是單元的唯一標識ID,type是單元型別（"node"結點,"line"轉換線），mark為布林值,表示是要標註TRUE還是取消標註FALSE
	this.onItemMark=null;
	//當操作某個單元（結點/線/區域塊）被雙擊時，觸發的方法，返回FALSE可阻止取消原來雙擊事件（雙擊后直接編輯）的發生
	//格式function(id，type)：id是單元的唯一標識ID,type是單元的種類,有"node","line","area"三種取值
	this.onItemDbClick=null;
	//當操作某個單元（結點/線/區域塊）被右鍵點選時，觸發的方法，返回FALSE可阻止取消原來右擊事件（一般是瀏覽器預設的右鍵菜單）的發生
	//格式function(id，type)：id是單元的唯一標識ID,type是單元的種類,有"node","line","area"三種取值
	this.onItemRightClick=null;

	if(this.$editable){
		//繫結當結點/線/分組塊的一些操作事件,這些事件可直接通過this訪問對像本身
		//當操作某個單元（結點/線/分組塊）被新增時，觸發的方法，返回FALSE可阻止新增事件的發生
		//格式function(id，type,json)：id是單元的唯一標識ID,type是單元的種類,有"node","line","area"三種取值,json即addNode,addLine或addArea方法的第二個傳參json.
		this.onItemAdd=null;
		//當操作某個單元（結點/線/分組塊）被刪除時，觸發的方法，返回FALSE可阻止刪除事件的發生
		//格式function(id，type)：id是單元的唯一標識ID,type是單元的種類,有"node","line","area"三種取值
		this.onItemDel=null;
		//當操作某個單元（結點/分組塊）被移動時，觸發的方法，返回FALSE可阻止移動事件的發生
		//格式function(id，type,left,top)：id是單元的唯一標識ID,type是單元的種類,有"node","area"兩種取值，線line不支援移動,left是新的左邊距座標，top是新的頂邊距座標
		this.onItemMove=null;
		//當操作某個單元（結點/線/分組塊）被重新命名時，觸發的方法，返回FALSE可阻止重新命名事件的發生
		//格式function(id,name,type)：id是單元的唯一標識ID,type是單元的種類,有"node","line","area"三種取值,name是新的名稱
		this.onItemRename=null;
		//當操作某個單元（結點/分組塊）被重定義大小或造型時，觸發的方法，返回FALSE可阻止重定大小/造型事件的發生
		//格式function(id，type,width,height)：id是單元的唯一標識ID,type是單元的種類,有"node","line","area"三種取值;width是新的寬度,height是新的高度
		this.onItemResize=null;
		//當移動某條折線中段的位置，觸發的方法，返回FALSE可阻止重定大小/造型事件的發生
		//格式function(id，M)：id是單元的唯一標識ID,M是中段的新X(或Y)的座標
		this.onLineMove=null;
		//當變換某條連線線的型別，觸發的方法，返回FALSE可阻止重定大小/造型事件的發生
		//格式function(id，type)：id是單元的唯一標識ID,type是連線線的新型別,"sl":直線,"lr":中段可左右移動的折線,"tb":中段可上下移動的折線
		this.onLineSetType=null;
		//當變換某條連線線的端點變更連線的結點時，觸發的方法，返回FALSE可阻止重定大小/造型事件的發生
		//格式function(id，newStart,newEnd)：id是連線單元的唯一標識ID,newStart,newEnd分別是起始結點的ID和到達結點的ID
		this.onLinePointMove=null;
		this._initExpendFunc();//初始化手動擴充套件工作區寬高的功能
		//對節點、區域塊進行移動或者RESIZE時用來顯示的遮罩層
		this.$ghost=$("<div class='rs_ghost'></div>").attr({"unselectable":"on","onselectstart":'return false',"onselect":'document.selection.empty()'});
		this.$bgDiv.append(this.$ghost);
		this._initEditFunc(property.useOperStack);
	}
};

GooFlow.prototype={
	useSVG:"", //瀏覽器是否能用SVG？
	_getSvgMarker:function(id,color){
		var m=document.createElementNS("http://www.w3.org/2000/svg","marker");
		m.setAttribute("id",id);
		m.setAttribute("viewBox","0 0 6 6");
		m.setAttribute("refX",'5');
		m.setAttribute("refY",'3');
		m.setAttribute("markerUnits","strokeWidth");
		m.setAttribute("markerWidth",'6');
		m.setAttribute("markerHeight",'6');
		m.setAttribute("orient","auto");
		var path=document.createElementNS("http://www.w3.org/2000/svg","path");
		path.setAttribute("d","M 0 0 L 6 3 L 0 6 z");
		path.setAttribute("fill",color);
		path.setAttribute("stroke-width",'0');
		m.appendChild(path);
		return m;
	},
	//初始化連線層
	_initDraw:function(id,width,height){
		if(GooFlow.prototype.useSVG!==""){
			this.$draw=document.createElementNS("http://www.w3.org/2000/svg","svg");//可建立帶有指定名稱空間的元素節點
			this.$workArea.prepend(this.$draw);
			var defs=document.createElementNS("http://www.w3.org/2000/svg","defs");
			this.$draw.appendChild(defs);
			defs.appendChild(GooFlow.prototype._getSvgMarker("arrow1",GooFlow.color.line));
			defs.appendChild(GooFlow.prototype._getSvgMarker("arrow2",GooFlow.color.mark));
			defs.appendChild(GooFlow.prototype._getSvgMarker("arrow3",GooFlow.color.mark));
		}
		else{
			this.$draw = document.createElement("v:group");
			this.$draw.coordsize = width+","+height;
			this.$workArea.prepend("<div class='GooFlow_work_vml' style='position:relative;width:"+width+"px;height:"+height+"px'></div>");
			this.$workArea.children("div")[0].insertBefore(this.$draw,null);
		}
		this.$draw.id = id;
		this.$draw.style.width = width + "px";
		this.$draw.style.height = height + "px";
	
		//繫結連線的點選選中以及雙擊編輯事件
		var tmpClk=null;
		if(GooFlow.prototype.useSVG!=="")  tmpClk="g";
		else  tmpClk="PolyLine";
		//繫結選中事件
		$(this.$draw).on("click",tmpClk,{inthis:this},function(e){
			e.data.inthis.focusItem(this.id,true);
		});
		if(!this.$editable)	return;

        //繫結右鍵事件
        $(this.$draw).on("contextmenu",tmpClk,{inthis:this},function(e){
        	var This=e.data.inthis;
            if(typeof This.onItemRightClick==='function' && This.onItemRightClick(this.id,"line")===false){
                window.event? window.event.returnValue=false : e.preventDefault();
                return false;
            }
        });
		$(this.$draw).on("dblclick",tmpClk,{inthis:this},function(e){
			var This=e.data.inthis;
            if(typeof This.onItemDbClick==='function' && This.onItemDbClick(this.id,"line")===false)	return;
			var oldTxt,x,y,from,to;
			if(GooFlow.prototype.useSVG!==""){
				oldTxt=this.childNodes[2].textContent;
				from=this.getAttribute("from").split(",");
				to=this.getAttribute("to").split(",");
			}else{
				oldTxt=this.childNodes[1].innerHTML;
				var n=this.getAttribute("fromTo").split(",");
				from=[n[0],n[1]];
				to=[n[2],n[3]];
			}
			if(This.$lineData[this.id].type==="lr"){
				from[0]=This.$lineData[this.id].M*This.$scale;
				to[0]=from[0];
			}
			else if(This.$lineData[this.id].type==="tb"){
				from[1]=This.$lineData[this.id].M*This.$scale;
				to[1]=from[1];
			}
			x=(parseInt(from[0],10)+parseInt(to[0],10))/2-64;
			y=(parseInt(from[1],10)+parseInt(to[1],10))/2-18;
			var t=This.t;//t=_elCsys(This.$workArea[0]);
			This.$textArea.val(oldTxt).css({display:"block",width:130,height:26,
				left:t.left+x-This.$workArea[0].parentNode.scrollLeft,
				top:t.top+y-This.$workArea[0].parentNode.scrollTop}).data("id",This.$focus).focus();
			This.$workArea.parent().one("mousedown",function(e){
				if(e.button===2)return false;
				This.setName(This.$textArea.data("id"),This.$textArea.val(),"line");
				This.$textArea.val("").removeData("id").hide();
			});
		});
	},
	//初始化區域塊（泳道）層
	_initGroup:function(width,height){
		this.$group=$("<div class='GooFlow_work_group' style='width:"+width+"px;height:"+height+"px'></div>");//存放背景區域的容器
		this.$workArea.prepend(this.$group);
		if(!this.$editable)	return;

        //繫結右鍵事件
        this.$group.on("contextmenu",".GooFlow_area",{inthis:this},function(e){
			var This=e.data.inthis;
            if(typeof This.onItemRightClick==='function' && This.onItemRightClick(this.id,"area")===false){
                window.event? window.event.returnValue=false : e.preventDefault();
                return false;
            }
        });
		//區域劃分框操作區的事件繫結
		this.$group.on("mousedown",{inthis:this},function(e){//繫結RESIZE功能以及移動功能
			if(e.button===2)return false;
			var This=e.data.inthis;
			if(This.$nowType!=="group")	return;
			if(!e)e=window.event;
			var cursor=$(e.target).css("cursor");
			var id=e.target.parentNode;
			switch(cursor){
				case "nw-resize":id=id.parentNode;break;
				case "w-resize":id=id.parentNode;break;
				case "n-resize":id=id.parentNode;break;
				case "move":break;
				default:return;
			}
			id=id.id;

			var ev=_mouseP(e),t=This.t;//t=_elCsys(This.$workArea[0]);

			var X,Y,vX,vY;
			X=ev.x-t.left+This.$workArea[0].parentNode.scrollLeft;
			Y=ev.y-t.top+This.$workArea[0].parentNode.scrollTop;
			if (cursor !== "move") {
				This.$ghost.css({
					display: "block",
					width: This.$areaData[id].width * This.$scale + "px",
					height: This.$areaData[id].height * This.$scale + "px",
					top: This.$areaData[id].top * This.$scale + t.top - This.$workArea[0].parentNode.scrollTop + "px",
					left: This.$areaData[id].left * This.$scale + t.left - This.$workArea[0].parentNode.scrollLeft + "px",
					cursor: cursor
				});
				vX = (This.$areaData[id].left * This.$scale + This.$areaData[id].width * This.$scale) - X;
				vY = (This.$areaData[id].top * This.$scale + This.$areaData[id].height * This.$scale) - Y;
			}
			else {
				vX = X - This.$areaData[id].left * This.$scale;
				vY = Y - This.$areaData[id].top * This.$scale;
			}
			var isMove=false;
			This.$ghost.css("cursor",cursor);
			document.onmousemove=function(e){
				if(!e)e=window.event;
				var ev=_mouseP(e);
				if(cursor!=="move"){
					X=ev.x-t.left+This.$workArea[0].parentNode.scrollLeft-This.$areaData[id].left*This.$scale+vX;
					Y=ev.y-t.top+This.$workArea[0].parentNode.scrollTop-This.$areaData[id].top*This.$scale+vY;
					if(X<200*This.$scale)	X=200*This.$scale;
					if(Y<100*This.$scale)	Y=100*This.$scale;
					switch(cursor){
						case "nw-resize":This.$ghost.css({width:X+"px",height:Y+"px"});break;
						case "w-resize":This.$ghost.css({width:X+"px"});break;
						case "n-resize":This.$ghost.css({height:Y+"px"});break;
					}
				}
				else{
					if(This.$ghost.css("display")==="none"){
						This.$ghost.css({display:"block",
							width:This.$areaData[id].width*This.$scale+"px", height:This.$areaData[id].height*This.$scale+"px",
							top:This.$areaData[id].top*This.$scale+t.top-This.$workArea[0].parentNode.scrollTop+"px",
							left:This.$areaData[id].left*This.$scale+t.left-This.$workArea[0].parentNode.scrollLeft+"px",cursor:cursor});
					}
					X=ev.x-vX;Y=ev.y-vY;
					if(X<t.left-This.$workArea[0].parentNode.scrollLeft)
						X=t.left-This.$workArea[0].parentNode.scrollLeft;
					else if(X+This.$workArea[0].parentNode.scrollLeft+This.$areaData[id].width*This.$scale>t.left+This.$workArea.width())
						X=t.left+This.$workArea.width()-This.$workArea[0].parentNode.scrollLeft-This.$areaData[id].width*This.$scale;
					if(Y<t.top-This.$workArea[0].parentNode.scrollTop)
						Y=t.top-This.$workArea[0].parentNode.scrollTop;
					else if(Y+This.$workArea[0].parentNode.scrollTop+This.$areaData[id].height*This.$scale>t.top+This.$workArea.height())
						Y=t.top+This.$workArea.height()-This.$workArea[0].parentNode.scrollTop-This.$areaData[id].height*This.$scale;
					This.$ghost.css({left:X+"px",top:Y+"px"});
				}
				isMove=true;
			};
			document.onmouseup=function(){
				This.$ghost.empty().hide();
				document.onmousemove=null;
				document.onmouseup=null;
				if(!isMove)return;
				if(cursor!=="move")
					This.resizeArea(id,This.$ghost.outerWidth()/This.$scale,This.$ghost.outerHeight()/This.$scale);
				else
					This.moveArea(id,(X+This.$workArea[0].parentNode.scrollLeft-t.left)/This.$scale, (Y+This.$workArea[0].parentNode.scrollTop-t.top)/This.$scale);
				return false;
			}
		});
		//繫結修改文字說明功能
		this.$group.on("dblclick",{inthis:this},function(e){
			var This=e.data.inthis;
			if(This.$nowType!=="group")	return;
			if(!e)e=window.event;
			if(e.target.tagName!=="LABEL")	return false;
			var p=e.target.parentNode;
			if(typeof This.onItemDbClick==='function' && This.onItemDbClick(p.id,"area")===false)	return;

			var oldTxt=e.target.innerHTML;
			var x=parseInt(p.style.left,10)+18,y=parseInt(p.style.top,10)+1;
			var t=This.t;//t=_elCsys(This.$workArea[0]);
			This.$textArea.val(oldTxt).css({display:"block",width:130,height:26,
				left:t.left+x-This.$workArea[0].parentNode.scrollLeft,
				top:t.top+y-This.$workArea[0].parentNode.scrollTop}).data("id",p.id).focus();
			This.$workArea.parent().one("mouseup",function(e){
				if(e.button===2)return false;
				if(This.$textArea.css("display")==="block"){
					This.setName(This.$textArea.data("id"),This.$textArea.val(),"area");
					This.$textArea.val("").removeData("id").hide();
				}
				return false;
			});
			return false;
		});
		//繫結點選事件
		this.$group.mouseup({inthis:this},function(e){
			var This=e.data.inthis;
			if(This.$textArea.css("display")==="block"){
				This.setName(This.$textArea.data("id"),This.$textArea.val(),"area");
				This.$textArea.val("").removeData("id").hide();
				return false;
			}

			if(This.$nowType!=="group")	return;
			if(!e)e=window.event;
			switch($(e.target).attr("class")){
				case "rs_close":	This.delArea(e.target.parentNode.parentNode.id);return false;//刪除該分組區域
				case "bg":	return;
			}
			switch(e.target.tagName){
				case "LABEL":	return false;
				case "I"://繫結變色功能
					var id=e.target.parentNode.id;
					switch(This.$areaData[id].color){
						case "red":	This.setAreaColor(id,"yellow");break;
						case "yellow":	This.setAreaColor(id,"blue");break;
						case "blue":	This.setAreaColor(id,"green");break;
						case "green":	This.setAreaColor(id,"red");break;
					}
					return false;
			}
			if(e.data.inthis.$ghost.css("display")==="none"){
				var X,Y;
				var ev=_mouseP(e),t=_elCsys(this);
				X=ev.x-t.left+this.parentNode.parentNode.scrollLeft;
				Y=ev.y-t.top+this.parentNode.parentNode.scrollTop;
				var color=["red","yellow","blue","green"];
				e.data.inthis.addArea(new Date().getTime(),
					{name:"area_"+e.data.inthis.$max,left:X/This.$scale,top:Y/This.$scale,color:color[e.data.inthis.$max%4],width:200,height:100}
				);
				e.data.inthis.$max++;
				return false;
			}
		});
	},
	//初始化節點繪製層
	_initWorkForNode:function(){
		//繫結點選事件
		this.$workArea.on("click",".GooFlow_item",{inthis:this},function(e){
			e.data.inthis.focusItem(this.id,true);
			$(this).removeClass("item_mark");
		});
		//繫結右鍵事件
		this.$workArea.on("contextmenu",".GooFlow_item",{inthis:this},function(e){
			var This=e.data.inthis;
			if(typeof This.onItemRightClick==='function' && This.onItemRightClick(this.id,"node")===false){
				window.event? window.event.returnValue=false : e.preventDefault();
				return false;
			}
		});

		//繫結雙擊功能
		var tmpDbClickFunc=function(This){
			This.$workArea.parent().one("mousedown",function(e){
				if(e.button===2)return false;
				This.setName(This.$textArea.data("id"),This.$textArea.val(),"node");
				This.$textArea.val("").removeData("id").hide();
			});
		};
		this.$workArea.on("dblclick",".ico",{inthis:this},function(e){
			var id=$(this).parents(".GooFlow_item").attr("id");
			var This=e.data.inthis;
			if(typeof This.onItemDbClick==='function' && This.onItemDbClick(id,"node")===false)	return false;
		});
		//繫結雙擊(包括雙擊編輯)事件
		this.$workArea.on("dblclick",".GooFlow_item > .span",{inthis:this},function(e){
			var id=this.parentNode.id;
			var This=e.data.inthis;
			if(typeof This.onItemDbClick==='function' && This.onItemDbClick(id,"node")===false)	return false;
			if(!This.$editable)	return;
			var oldTxt=this.innerHTML;
			var t=This.t;//t=_elCsys(This.$workArea[0]);
			This.$textArea.val(oldTxt).css({display:"block",height:$(this).height()+6,width:100,
				left:t.left+This.$nodeData[id].left*This.$scale-This.$workArea[0].parentNode.scrollLeft-26,
				top:t.top+This.$nodeData[id].top*This.$scale-This.$workArea[0].parentNode.scrollTop+26})
			.data("id",This.$focus).focus();
			tmpDbClickFunc(This);
		});
		this.$workArea.on("dblclick",".ico + td",{inthis:this},function(e){
			var id=$(this).parents(".GooFlow_item").attr("id");
			var This=e.data.inthis;
			if(typeof This.onItemDbClick==='function' && This.onItemDbClick(id,"node")===false)	return false;
			if(!This.$editable)	return;
			var oldTxt=this.childNodes[0].innerHTML;
			var t=This.t;//t=_elCsys(This.$workArea[0]);
			This.$textArea.val(oldTxt).css({display:"block",width:$(this).width()+26,height:$(this).height()+6,
				left:t.left+26+This.$nodeData[id].left*This.$scale-This.$workArea[0].parentNode.scrollLeft,
				top:t.top+2+This.$nodeData[id].top*This.$scale-This.$workArea[0].parentNode.scrollTop})
			.data("id",This.$focus).focus();
			tmpDbClickFunc(This);
		});
		if(!this.$editable)	return;

		//以下是工作區為編輯模式時才繫結的事件
		//繫結用滑鼠移動事件
		this.$workArea.on("mousedown",".ico",{inthis:this},function(e){
			if(!e)e=window.event;
			if(e.button===2)return false;
			var This=e.data.inthis;
			if(This.$nowType==="direct"||This.$nowType==="dashed")	return;
			var Dom=$(this).parents(".GooFlow_item");
			var id=Dom.attr("id");
			This.focusItem(id,true);

			var ev=_mouseP(e),t=This.t;//t=_elCsys(This.$workArea[0]);

			Dom.children("table").clone().prependTo(This.$ghost);
			var X,Y;
			X=ev.x-t.left+This.$workArea[0].parentNode.scrollLeft;
			Y=ev.y-t.top+This.$workArea[0].parentNode.scrollTop;
			var vX=X-This.$nodeData[id].left*This.$scale,vY=Y-This.$nodeData[id].top*This.$scale;
			var isMove=false;
			document.onmousemove=function(e){
				if(!e)e=window.event;
				var ev=_mouseP(e);
				if(X===ev.x-vX&&Y===ev.y-vY)	return false;
				X=ev.x-vX;Y=ev.y-vY;

				if(isMove&&This.$ghost.css("display")==="none"){
					This.$ghost.css({display:"block",
						width:This.$nodeData[id].width*This.$scale+"px", height:This.$nodeData[id].height*This.$scale+"px",
						top:This.$nodeData[id].top*This.$scale+t.top-This.$workArea[0].parentNode.scrollTop+"px",
						left:This.$nodeData[id].left*This.$scale+t.left-This.$workArea[0].parentNode.scrollLeft+"px",
						cursor:"move"
					});
				}

				if(X<t.left-This.$workArea[0].parentNode.scrollLeft)
					X=t.left-This.$workArea[0].parentNode.scrollLeft;
				else if(X+This.$workArea[0].parentNode.scrollLeft+This.$nodeData[id].width*This.$scale>t.left+This.$workArea.width())
					X=t.left+This.$workArea.width()-This.$workArea[0].parentNode.scrollLeft-This.$nodeData[id].width*This.$scale;
				if(Y<t.top-This.$workArea[0].parentNode.scrollTop)
					Y=t.top-This.$workArea[0].parentNode.scrollTop;
				else if(Y+This.$workArea[0].parentNode.scrollTop+This.$nodeData[id].height*This.$scale>t.top+This.$workArea.height())
					Y=t.top+This.$workArea.height()-This.$workArea[0].parentNode.scrollTop-This.$nodeData[id].height*This.$scale;
				This.$ghost.css({left:X+"px",top:Y+"px"});
				isMove=true;
			};
			document.onmouseup=function(){
				if(isMove)This.moveNode(id,(X+This.$workArea[0].parentNode.scrollLeft-t.left)/This.$scale,(Y+This.$workArea[0].parentNode.scrollTop-t.top)/This.$scale);
				This.$ghost.empty().hide();
				document.onmousemove=null;
				document.onmouseup=null;
			}
		});
		//繫結滑鼠覆蓋/移出事件
		this.$workArea.on("mouseenter",".GooFlow_item",{inthis:this},function(e){
			if((e.data.inthis.$nowType!=="direct"&&e.data.inthis.$nowType!=="dashed")&&!document.getElementById("GooFlow_tmp_line"))	return;
			$(this).addClass("item_mark").addClass("crosshair").css("border-color",GooFlow.color.mark);
		});
		this.$workArea.on("mouseleave",".GooFlow_item",{inthis:this},function(e){
			if((e.data.inthis.$nowType!=="direct"&&e.data.inthis.$nowType!=="dashed")&&!document.getElementById("GooFlow_tmp_line"))	return;
			$(this).removeClass("item_mark").removeClass("crosshair");
			if(this.id===e.data.inthis.$focus){
				$(this).css("border-color",GooFlow.color.line);
			}else{
				$(this).css("border-color",GooFlow.color.node);
			}
		});
		//繫結連線時確定初始點
		this.$workArea.on("mousedown",".GooFlow_item",{inthis:this},function(e){
			if(e.button===2)return false;
			var This=e.data.inthis;
			if(This.$nowType!=="direct"&&This.$nowType!=="dashed")	return;
			var ev=_mouseP(e),t=_elCsys(This.$workArea[0]);
			var X,Y;
			X=ev.x-t.left+This.$workArea[0].parentNode.scrollLeft;
			Y=ev.y-t.top+This.$workArea[0].parentNode.scrollTop;
			This.$workArea.data("lineStart",{"x":X,"y":Y,"id":this.id}).css("cursor","crosshair");
			var line=GooFlow.prototype.drawLine("GooFlow_tmp_line",[X,Y],[X,Y],true,true,1);
			This.$draw.appendChild(line);
		});
		//繫結連線時確定結束點
		this.$workArea.on("mouseup",".GooFlow_item",{inthis:this},function(e){
			var This=e.data.inthis;
			if((This.$nowType!=="direct"&&This.$nowType!=="dashed")&&!This.$mpTo.data("p"))	return;
			var lineStart=This.$workArea.data("lineStart");
			var lineEnd=This.$workArea.data("lineEnd");
			if(lineStart&&!This.$mpTo.data("p")){
				var tmp={from:lineStart.id,to:this.id,name:""};
				if(This.$nowType==="dashed"){
					tmp.dash=true;
				}
				This.addLine(new Date().getTime().toString(),tmp);
				This.$max++;
			}
			else{
				if(lineStart){
					This.moveLinePoints(This.$focus,lineStart.id,this.id);
				}else if(lineEnd){
					This.moveLinePoints(This.$focus,this.id,lineEnd.id);
				}
				if(!This.$nodeData[this.id].marked){
					$(this).removeClass("item_mark");
					if(this.id!==This.$focus){
						$(this).css("border-color",GooFlow.color.node);
					}
					else{
						$(this).css("border-color",GooFlow.color.line);
					}
				}
			}
		});

		//繫結結點的刪除功能
		this.$workArea.on("click",".rs_close",{inthis:this},function(e){
			if(!e)e=window.event;
			e.data.inthis.delNode(e.data.inthis.$focus);
			return false;
		});
		//繫結結點的RESIZE功能
		this.$workArea.on("mousedown",".GooFlow_item > div > div[class!=rs_close]",{inthis:this},function(e){
			if(!e)e=window.event;
			if(e.button===2)return false;
			var cursor=$(this).css("cursor");
			if(cursor==="pointer"){return;}
			var This=e.data.inthis;
			var id=This.$focus;
			This.switchToolBtn("cursor");
			e.cancelBubble = true;
			e.stopPropagation();

			var ev=_mouseP(e),t=This.t;//t=_elCsys(This.$workArea[0]);
			This.$ghost.css({display:"block",
				width:This.$nodeData[id].width*This.$scale+"px", height:This.$nodeData[id].height*This.$scale+"px",
				top:This.$nodeData[id].top*This.$scale+t.top-This.$workArea[0].parentNode.scrollTop+"px",
				left:This.$nodeData[id].left*This.$scale+t.left-This.$workArea[0].parentNode.scrollLeft+"px",
				cursor:cursor
			});
			var X,Y;
			X=ev.x-t.left+This.$workArea[0].parentNode.scrollLeft;
			Y=ev.y-t.top+This.$workArea[0].parentNode.scrollTop;
			var vX=(This.$nodeData[id].left*This.$scale+This.$nodeData[id].width*This.$scale)-X;
			var vY=(This.$nodeData[id].top*This.$scale+This.$nodeData[id].height*This.$scale)-Y;
			var isMove=false;
			This.$ghost.css("cursor",cursor);
			document.onmousemove=function(e){
				if(!e)e=window.event;
				var ev=_mouseP(e);
				X=ev.x-t.left+This.$workArea[0].parentNode.scrollLeft-This.$nodeData[id].left*This.$scale+vX;
				Y=ev.y-t.top+This.$workArea[0].parentNode.scrollTop-This.$nodeData[id].top*This.$scale+vY;
				if(X<104*This.$scale)	X=104*This.$scale;
				if(Y<28*This.$scale)	Y=28*This.$scale;
				isMove=true;
				switch(cursor){
					case "nw-resize":This.$ghost.css({width:X+"px",height:Y+"px"});break;
					case "w-resize":This.$ghost.css({width:X+"px"});break;
					case "n-resize":This.$ghost.css({height:Y+"px"});break;
				}
			};
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
				This.$ghost.hide();
				if(!isMove)return;
				//if(!e)e=window.event;
				This.resizeNode(id,This.$ghost.outerWidth()/This.$scale,This.$ghost.outerHeight()/This.$scale);
			};
		});
	},
	//加入手動擴充套件編輯區功能，一次擴充套件200px
	_initExpendFunc:function(){
		var titleExendRight=GooFlow.remarks.extendRight? ' title="'+GooFlow.remarks.extendRight+'"':'';
        var titleExendBottom=GooFlow.remarks.extendBottom? ' title="'+GooFlow.remarks.extendBottom+'"':'';
		this.$workArea.append('<div class="Gooflow_extend_right"'+titleExendRight+'></div><div class="Gooflow_extend_bottom"'+titleExendBottom+'></div>');
	    this.$workArea.children(".Gooflow_extend_right").on("click",{inthis:this},function(e){
			var This=e.data.inthis;
			var w = This.$workArea.width()+This.$workExtendStep;
			var h = This.$workArea.height();
			This.$workArea.css({width:w+"px"});
			if(GooFlow.prototype.useSVG===""){
				This.$draw.coordsize = w+","+h;
			}
			This.$draw.style.width = w + "px";
			if(This.$group!=null){
				This.$group.css({width:w+"px"});
			}
			var parentDiv = This.$workArea.parent()[0];
			parentDiv.scrollLeft = parentDiv.scrollWidth;
            This.$workArea.parent().css("overflow","scroll");
			return false;
	    });
	    this.$workArea.children(".Gooflow_extend_bottom").on("click",{inthis:this},function(e){
			var This=e.data.inthis;
			var w = This.$workArea.width();
			var h = This.$workArea.height()+This.$workExtendStep;
			This.$workArea.css({height:h+"px"});
			if(GooFlow.prototype.useSVG===""){
				This.$draw.coordsize = w+","+h;
			}
			This.$draw.style.height = h + "px";
			if(This.$group!=null){
				This.$group.css({height:h+"px"});
			}
			var parentDiv = This.$workArea.parent()[0];
			parentDiv.scrollTop = parentDiv.scrollHeight;
            This.$workArea.parent().css("overflow","scroll");
			return false;
	    });
	},
	//初始化用來改變連線的連線端點的兩個小方塊的操作事件
	_initLinePointsChg:function(){
		this.$mpFrom.on("mousedown",{inthis:this},function(e){
			var This=e.data.inthis;
			This.switchToolBtn("cursor");
			var ps=This.$mpFrom.data("p").split(",");
			var pe=This.$mpTo.data("p").split(",");
			$(this).hide();
			This.$workArea.data("lineEnd",{"x":pe[0],"y":pe[1],"id":This.$lineData[This.$lineOper.data("tid")].to}).css("cursor","crosshair");
			var line=GooFlow.prototype.drawLine("GooFlow_tmp_line",[ps[0],ps[1]],[pe[0],pe[1]],true,true,1);
			This.$draw.appendChild(line);
			return false;
	    });
		this.$mpTo.on("mousedown",{inthis:this},function(e){
			var This=e.data.inthis;
			This.switchToolBtn("cursor");
			var ps=This.$mpFrom.data("p").split(",");
			var pe=This.$mpTo.data("p").split(",");
			$(this).hide();
			This.$workArea.data("lineStart",{"x":ps[0],"y":ps[1],"id":This.$lineData[This.$lineOper.data("tid")].from}).css("cursor","crosshair");
			var line=GooFlow.prototype.drawLine("GooFlow_tmp_line",[ps[0],ps[1]],[pe[0],pe[1]],true,true,1);
			This.$draw.appendChild(line);
			return false;
	    });
	},
	//初始化設計器的編輯功能
	_initEditFunc:function(useOperStack){
		//劃線或改線時用的繫結
		this.$workArea.mousemove({inthis:this},function(e){
			var This=e.data.inthis;
			if((This.$nowType!=="direct"&&This.$nowType!=="dashed")&&!This.$mpTo.data("p"))	return;
			var lineStart=$(this).data("lineStart");
			var lineEnd=$(this).data("lineEnd");
			if(!lineStart&&!lineEnd)return;

			var ev=_mouseP(e),t=_elCsys(this);
			var X,Y;
			X=ev.x-t.left+this.parentNode.scrollLeft;
			Y=ev.y-t.top+this.parentNode.scrollTop;
			var line=document.getElementById("GooFlow_tmp_line");
			if(lineStart){
				if(GooFlow.prototype.useSVG!==""){
					line.childNodes[0].setAttribute("d","M "+lineStart.x+" "+lineStart.y+" L "+X+" "+Y);
					line.childNodes[1].setAttribute("d","M "+lineStart.x+" "+lineStart.y+" L "+X+" "+Y);
					if(line.childNodes[1].getAttribute("marker-end")==='url("#arrow2")')
						line.childNodes[1].setAttribute("marker-end","url(#arrow3)");
					else	line.childNodes[1].setAttribute("marker-end","url(#arrow2)");
				}
				else	line.points.value=lineStart.x+","+lineStart.y+" "+X+","+Y;
			}else if(lineEnd){
				if(GooFlow.prototype.useSVG!==""){
					line.childNodes[0].setAttribute("d","M "+X+" "+Y+" L "+lineEnd.x+" "+lineEnd.y);
					line.childNodes[1].setAttribute("d","M "+X+" "+Y+" L "+lineEnd.x+" "+lineEnd.y);
					if(line.childNodes[1].getAttribute("marker-end")==='url("#arrow2")')
						line.childNodes[1].setAttribute("marker-end","url(#arrow3)");
					else	line.childNodes[1].setAttribute("marker-end","url(#arrow2)");
				}
				else	line.points.value=X+","+Y+" "+lineEnd.x+","+lineEnd.y;
			}
		});
		this.$workArea.mouseup({inthis:this},function(e){
			var This=e.data.inthis;
			if((This.$nowType!=="direct"&&This.$nowType!=="dashed")&&!This.$mpTo.data("p"))	return;
			var tmp=document.getElementById("GooFlow_tmp_line");
			if(tmp){
				$(this).css("cursor","auto").removeData("lineStart").removeData("lineEnd");
				This.$mpTo.hide().removeData("p");
				This.$mpFrom.hide().removeData("p");
				This.$draw.removeChild(tmp);
				This.focusItem(This.$focus,false);
			}else{
				This.$lineOper.removeData("tid");
			}
		});

		this.$textArea=$("<textarea></textarea>");
		this.$bgDiv.append(this.$textArea);
		this.$lineMove=$('<div class="GooFlow_linemove" style="display:none"></div>');//操作折線時的移動框
		this.$workArea.append(this.$lineMove);
		this.$lineMove.on("mousedown",{inthis:this},function(e){
			if(e.button===2)return false;
			var lm=$(this);
			lm.css({"background-color":"#333"});
			var This=e.data.inthis;
			var ev=_mouseP(e),t=_elCsys(This.$workArea[0]);
			var X,Y;
			X=ev.x-t.left+This.$workArea[0].parentNode.scrollLeft;
			Y=ev.y-t.top+This.$workArea[0].parentNode.scrollTop;
			var p=This.$lineMove.position();
			var vX=X-p.left,vY=Y-p.top;
			var isMove=false;
			document.onmousemove=function(e){
				if(!e)e=window.event;
				var ev=_mouseP(e);
				//var ps=This.$lineMove.position();
				X=ev.x-t.left+This.$workArea[0].parentNode.scrollLeft;
				Y=ev.y-t.top+This.$workArea[0].parentNode.scrollTop;
				if(This.$lineMove.data("type")==="lr"){
					X=X-vX;
					if(X<0)	X=0;
					else if(X>This.$workArea.width())
						X=This.$workArea.width();
					This.$lineMove.css({left:X+"px"});
				}
				else if(This.$lineMove.data("type")==="tb"){
					Y=Y-vY;
					if(Y<0)	Y=0;
					else if(Y>This.$workArea.height())
						Y=This.$workArea.height();
					This.$lineMove.css({top:Y+"px"});
				}
				isMove=true;
			};
			document.onmouseup=function(){
				if(isMove){
					var p=This.$lineMove.position();
					if(This.$lineMove.data("type")==="lr")
						This.setLineM(This.$lineMove.data("tid"),(p.left+3)/This.$scale);
					else if(This.$lineMove.data("type")==="tb")
						This.setLineM(This.$lineMove.data("tid"),(p.top+3)/This.$scale);
				}
				This.$lineMove.css({"background-color":"transparent"});
				if(This.$focus===This.$lineMove.data("tid")){
					This.focusItem(This.$lineMove.data("tid"));
				}
				document.onmousemove=null;
				document.onmouseup=null;
			};
		});

		//選定一條轉換線后出現的浮動操作欄，有改變線的樣式和刪除線等按鈕。
		this.$lineOper=$("<div class='GooFlow_line_oper' style='display:none'><i class='b_l1'></i><i class='b_l2'></i><i class='b_l3'></i><i class='b_x'></i></div>");//選定線時顯示的操作框
		this.$workArea.parent().append(this.$lineOper);
		this.$lineOper.on("click",{inthis:this},function(e){
			if(!e)e=window.event;
			if(e.target.tagName!=="I")	return;
			var This=e.data.inthis;
			var id=$(this).data("tid");
			switch($(e.target).attr("class")){
				case "b_x":
					This.delLine(id);
					this.style.display="none";break;
				case "b_l1":
					This.setLineType(id,"lr");break;
				case "b_l2":
					This.setLineType(id,"tb");break;
				case "b_l3":
					This.setLineType(id,"sl");break;
			}
		});
		//新增移動線兩個端點至新的結點功能移動功能，這裡要提供移動用的DOM
		this.$mpFrom=$("<div class='GooFlow_line_mp' style='display:none'></div>");
		this.$mpTo=$("<div class='GooFlow_line_mp' style='display:none'></div>");
		this.$workArea.append(this.$mpFrom).append(this.$mpTo);
		this._initLinePointsChg();

		if(useOperStack){//如果要使用堆疊記錄操作並提供「撤銷/重做」的功能,只在編輯狀態下有效
			this.$undoStack=[];
			this.$redoStack=[];
			this.$isUndo=0;
			///////////////以下是構造撤銷操作/重做操作的方法
			//檢查撤銷棧與重做棧處理好頭部按鈕的顯示
			this._checkStack=function(type){
				if(this.$head===null)	return;
				if(!type || type==='undo'){
					if(this.$undoStack.length===0){
						this.$head.find(".ico_undo").parent().addClass("a_disabled");
					}else{
						this.$head.find(".ico_undo").parent().removeClass("a_disabled");
					}
				}
				if(!type || type==='redo'){
					if(this.$redoStack.length===0){
						this.$head.find(".ico_redo").parent().addClass("a_disabled");
					}else{
						this.$head.find(".ico_redo").parent().removeClass("a_disabled");
					}
				}
			};
			//為了節省瀏覽器記憶體空間,undo/redo中的操作快取棧,最多隻可放50步操作;超過50步時,將自動刪掉最舊的一個快取
			this.pushOper=function(funcName,paras){
				if(this.$isUndo===1){
					this.$redoStack.push([funcName,paras]);
					this.$isUndo=0;
					if(this.$redoStack.length>50)	this.$redoStack.shift();
					this._checkStack('redo');
				}else{
					this.$undoStack.push([funcName,paras]);
					if(this.$undoStack.length>50)	this.$undoStack.shift();
					if(this.$isUndo===0){
						this.$redoStack.splice(0,this.$redoStack.length);
					}
					this.$isUndo=0;
					this._checkStack();
				}
			};
			//將外部的方法加入到GooFlow對象的事務操作堆疊中,在過後的undo/redo操作中可以進行控制，一般用於對流程圖以外的附加資訊進行編輯的事務撤銷/重做控制；
			//傳參func為要執行方法對像,jsonPara為外部方法僅有的一個面向字面的JSON傳參,由JSON對像帶入所有要傳的資訊；
			//提示:為了讓外部方法能夠被UNDO/REDO,需要在編寫這些外部方法實現時,加入對該方法執行後效果回退的另一個執行方法的pushExternalOper
			this.pushExternalOper=function(func,jsonPara){
				this.pushOper("externalFunc",[func,jsonPara]);
			};
			//撤銷上一步操作
			this.undo=function(){
				if(this.$undoStack.length===0)	return;
				this.blurItem();
				var tmp=this.$undoStack.pop();
				this.$isUndo=1;
				if(tmp[0]==="externalFunc"){
					tmp[1][0](tmp[1][1]);
				}
				else{
					//傳參的數量,最小0個最多12個.
					this[tmp[0]](tmp[1][0],tmp[1][1],tmp[1][2],tmp[1][3],tmp[1][4],tmp[1][5],
						tmp[1][6],tmp[1][7],tmp[1][8],tmp[1][9],tmp[1][10],tmp[1][11]);
				}
				this._checkStack();
			};
			//重做最近一次被撤銷的操作
			this.redo=function(){
				if(this.$redoStack.length===0)	return;
				this.blurItem();
				var tmp=this.$redoStack.pop();
				this.$isUndo=2;
				if(tmp[0]==="externalFunc"){
					tmp[1][0](tmp[1][1]);
				}
				else{
					//傳參的數量,最小0個最多12個.
					this[tmp[0]](tmp[1][0],tmp[1][1],tmp[1][2],tmp[1][3],tmp[1][4],tmp[1][5],
						tmp[1][6],tmp[1][7],tmp[1][8],tmp[1][9],tmp[1][10],tmp[1][11]);
				}
				this._checkStack();
			};
		}
		$(document).keydown({inthis:this},function(e){
			//繫結鍵盤操作
			var This=e.data.inthis;
			if(This.$focus==="")return;
			switch(e.keyCode){
				case 46://刪除
					This.delNode(This.$focus,true);
					This.delLine(This.$focus);
					break;
			}
		});
	},

	//對頭部欄自定義按鈕的事件繫結，使用者可用來對另行加入的頭部按鈕自定義功能
	//傳參為json結構，key為按鈕的型別名(需另行寫好'ico_'+按鈕型別名的樣式類定義)，value為相關事件的方法實現定義
	bindHeadBtnEvent:function(funcs){
		if(this.$head!=null)
		this.$headBtnEvents=funcs;
	},
	//每一種型別結點及其按鈕的說明文字
	setNodeRemarks:function(remark){
    if(this.$tool==null)  return;
		this.$tool.children("a").each(function(){
			try{
				this.title=remark[$(this).attr("id").split("btn_")[1]];
            }catch(e){}
		});
	},
    //(當有頂部工具欄按鈕組時)設定頂部工具欄按鈕的說明文字
    setHeadToolsRemarks:function(remark){
        if(this.$head==null)  return;
        this.$head.children("a").each(function(){
            try{
            	this.title=remark[$(this).children("i").attr("class").split('ico_')[1]];
            }catch(e){}
        });
    },
	//設定擴充套件工作區寬高的長條按鈕的說明文字
	setExtWorkRemarks:function(remark){
		this.$workArea.children(".Gooflow_extend_right").attr("title",remark.extendRight);
		this.$workArea.children(".Gooflow_extend_bottom").attr("title",remark.extendBottom);
	},

	//切換左邊工具欄按鈕,傳參TYPE表示切換成哪種型別的按鈕
	switchToolBtn:function(type){
		if(this.$tool!=null){
			this.$tool.children("#"+this.$id+"_btn_"+this.$nowType.split(" ")[0]).attr("class","GooFlow_tool_btn");
		}
		if(this.$nowType==="group"){
			this.$workArea.prepend(this.$group);
			for(var k in this.$areaDom)	this.$areaDom[k].addClass("lock").children("div:eq(1)").css("display","none");
		}
		this.$nowType=type;
		if(this.$tool!=null){
			this.$tool.children("#"+this.$id+"_btn_"+type.split(" ")[0]).attr("class","GooFlow_tool_btndown");
		}
		if(this.$nowType==="group"){
			this.blurItem();
			this.$workArea.append(this.$group);
			for(var key in this.$areaDom)	this.$areaDom[key].removeClass("lock").children("div:eq(1)").css("display","");
		}else if(this.$nowType==="direct"||this.$nowType==="dashed"){
            this.blurItem();
		}
		if(this.$textArea&&this.$textArea.css("display")==="none")	this.$textArea.removeData("id").val("").hide();
	},

	//獲取結點/連線/分組區域的詳細資訊
	getItemInfo:function(id,type){
		switch(type){
			case "node":	return this.$nodeData[id]||null;
			case "line":	return this.$lineData[id]||null;
			case "area":	return this.$areaData[id]||null;
		}
	},
	//取消所有結點/連線被選定的狀態
	blurItem:function(){
		if(this.$focus!==""){
			var jq=$("#"+this.$focus);
			if(jq.prop("tagName")==="DIV"){
				if(typeof this.onItemBlur==='function' && this.onItemBlur(this.$focus,"node")===false)	return false;
				jq.removeClass("item_focus").children("div:eq(0)").css("display","none");
				if(this.$nodeData[this.$focus].marked){
					jq.addClass("item_mark").css("border-color",GooFlow.color.mark);
				}
			}
			else{
				if(typeof this.onItemBlur==='function' && this.onItemBlur(this.$focus,"line")===false)	return false;
				if(GooFlow.prototype.useSVG!==""){
					if(!this.$lineData[this.$focus].marked){
						jq[0].childNodes[1].setAttribute("stroke",GooFlow.color.line);
						jq[0].childNodes[1].setAttribute("marker-end","url(#arrow1)");
					}
				}
				else{
					if(!this.$lineData[this.$focus].marked){
                        jq[0].strokeColor=GooFlow.color.line;
					}
				}
				if(this.$editable){
                    	this.$lineMove.hide().removeData("type").removeData("tid");
						this.$lineOper.hide().removeData("tid");
						this.$mpFrom.hide().removeData("p");
						this.$mpTo.hide().removeData("p");
				}
			}
		}
		this.$focus="";
		return true;
	},
	//選定某個結點/轉換線 bool:TRUE決定了要觸發選中事件，FALSE則不觸發選中事件，多用在程式內部呼叫。
	focusItem:function(id,bool){
		var jq=$("#"+id);
		if(jq.length===0)	return;
		if(!this.blurItem())	return;//先執行"取消選中",如果返回FLASE,則也會阻止選定事件繼續進行.
		if(bool&& typeof this.onItemFocus==='function' && this.onItemFocus(id,"node")===false)	return;
        this.$focus=id;
		if(jq.prop("tagName")==="DIV"){
			jq.addClass("item_focus");
			if(GooFlow.color.line){
        		jq.css("border-color",GooFlow.color.line);
			}
			if(this.$editable)jq.children("div:eq(0)").css("display","block");
			//this.$workArea.append(jq);
		}else{//如果是連線線
			if(GooFlow.prototype.useSVG!==""){
				jq[0].childNodes[1].setAttribute("stroke",GooFlow.color.mark);
				jq[0].childNodes[1].setAttribute("marker-end","url(#arrow2)");
			}
			else{
                jq[0].strokeColor=GooFlow.color.mark;
			}
			if(!this.$editable)	return;
			var x,y,from,to,n;
			if(GooFlow.prototype.useSVG!==""){
				from=jq.attr("from").split(",");
				to=jq.attr("to").split(",");
				n=[from[0],from[1],to[0],to[1]];
			}else{
				n=jq[0].getAttribute("fromTo").split(",");
				from=[n[0],n[1]];
				to=[n[2],n[3]];
			}
			from[0]=parseInt(from[0],10);
			from[1]=parseInt(from[1],10);
			to[0]=parseInt(to[0],10);
			to[1]=parseInt(to[1],10);
			//var t=_elCsys(this.$workArea[0]);
			if(this.$lineData[id].type==="lr"){
				from[0]=this.$lineData[id].M*this.$scale;
				to[0]=from[0];

				this.$lineMove.css({
					width:"5px",height:(to[1]-from[1])*(to[1]>from[1]? 1:-1)+"px",
					left:from[0]-3+"px",
					top:(to[1]>from[1]? from[1]:to[1])+1+"px",
					cursor:"e-resize",display:"block"
				}).data({"type":"lr","tid":id});
			}
			else if(this.$lineData[id].type==="tb"){
				from[1]=this.$lineData[id].M*this.$scale;
				to[1]=from[1];
				this.$lineMove.css({
					width:(to[0]-from[0])*(to[0]>from[0]? 1:-1)+"px",height:"5px",
					left:(to[0]>from[0]? from[0]:to[0])+1+"px",
					top:from[1]-3+"px",
					cursor:"s-resize",display:"block"
				}).data({"type":"tb","tid":id});
			}
			x=(from[0]+to[0])/2-40;
			y=(from[1]+to[1])/2+4;
			this.$lineOper.css({display:"block",left:x+"px",top:y+"px"}).data("tid",id);
			if(this.$editable){
				this.$mpFrom.css({display:"block",left:n[0]-4+"px",top:n[1]-4+"px"}).data("p",n[0]+","+n[1]);
				this.$mpTo.css({display:"block",left:n[2]-4+"px",top:n[3]-4+"px"}).data("p",n[2]+","+n[3]);
			}
			this.$draw.appendChild(jq[0]);
		}

		this.switchToolBtn("cursor");
	},
	//傳入一個節點的ID，判斷在圖中的哪個區域組(泳道)的範圍內
	_node2Area:function(nodeId){
		if(this.$group===null)	return;
		var node=this.$nodeData[nodeId];
		var lane=false;
		for(var key in this.$areaData){
			var area = this.$areaData[key];
			if( node.left>=area.left&&node.left<area.left+area.width &&
				node.top>=area.top&&node.top<area.top+area.height
			){
				node.areaId=key;
				lane=true;
				break;
			}
		}
		if(!lane){	delete node.areaId;	} //不屬於任何區域組(泳道)的情況
	},
	//增加一個流程結點,傳參為一個JSON,有id,name,top,left,width,height,type(結點型別)等屬性
	addNode: function (id, json) {
        if (json.id == undefined) {
            $.extend(json,{id:id});
        }
		if(typeof this.onItemAdd==='function' && this.onItemAdd(id,"node",json)===false)return;
		if(this.$undoStack&&this.$editable){
			this.pushOper("delNode",[id]);
		}
		var mark=json.marked? " item_mark":"";
		if(json.type.indexOf(" round")<0){
			if(!json.width||json.width<104)json.width=104;
			if(!json.height||json.height<26)json.height=26;
			if(!json.top||json.top<0)json.top=0;
			if(!json.left||json.left<0)json.left=0;

			this.$nodeDom[id]=$("<div class='GooFlow_item"+mark+"' id='"+id+"' style='top:"+json.top*this.$scale+"px;left:"+json.left*this.$scale+"px'><table cellspacing='1' style='width:"+(json.width*this.$scale-2)+"px;height:"+(json.height*this.$scale-2)+"px;'><tr><td class='ico'><i class='ico_"+json.type+"'></i></td><td><div>"+json.name+"</div></td></tr></table><div style='display:none'><div class='rs_bottom'></div><div class='rs_right'></div><div class='rs_rb'></div><div class='rs_close'></div></div></div>");
		}
		else{
			json.width=26;json.height=26;
			this.$nodeDom[id]=$("<div class='GooFlow_item item_round"+mark+"' id='"+id+"' style='top:"+json.top*this.$scale+"px;left:"+json.left*this.$scale+"px'><table cellspacing='0' style='width:"+(json.width*this.$scale-2)+"px;height:"+(json.height*this.$scale-2)+"px;'><tr><td class='ico'><i class='ico_"+json.type+"'></i></td></tr></table><div  style='display:none'><div class='rs_close'></div></div><div class='span'>"+json.name+"</div></div>");
		}
		if(GooFlow.color.node){
			if(json.type.indexOf(" mix")>-1){
				this.$nodeDom[id].css({"background-color":GooFlow.color.mix,"border-color":GooFlow.color.mix});
				if(GooFlow.color.mixFont){
					this.$nodeDom[id].find("td:eq(1)").css("color",GooFlow.color.mixFont);
					this.$nodeDom[id].find(".span").css("color",GooFlow.color.mixFont);
				}
			}else{
				this.$nodeDom[id].css({"background-color":GooFlow.color.node,"border-color":GooFlow.color.node});
			}
			if(mark&&GooFlow.color.mark){
				this.$nodeDom[id].css({"border-color":GooFlow.color.mark});
			}
		}
		if(json.type.indexOf(" mix")>-1){
			this.$nodeDom[id].addClass("item_mix");
		}

		var ua=navigator.userAgent.toLowerCase();
		if(ua.indexOf('msie')!==-1 && ua.indexOf('8.0')!==-1)
			this.$nodeDom[id].css("filter","progid:DXImageTransform.Microsoft.Shadow(color=#94AAC2,direction=135,strength=2)");
		this.$workArea.append(this.$nodeDom[id]);
		this.$nodeData[id]=json;
		++this.$nodeCount;
		if(this.$editable){
			this.$nodeData[id].alt=true;
			this._node2Area(id);
			if(this.$deletedItem[id])	delete this.$deletedItem[id];//在回退刪除操作時,去掉該元素的刪除記錄
		}
	},
	//移動結點到一個新的位置
	moveNode:function(id,left,top){
		if(!this.$nodeData[id])	return;
		if(typeof this.onItemMove==='function' && this.onItemMove(id,"node",left,top)===false)	return;
		if(this.$undoStack){
			var paras=[id,this.$nodeData[id].left,this.$nodeData[id].top];
			this.pushOper("moveNode",paras);
		}
		if(left<0)	left=0;
		if(top<0)	top=0;
		$("#"+id).css({left:left*this.$scale+"px",top:top*this.$scale+"px"});
		this.$nodeData[id].left=left;
		this.$nodeData[id].top=top;
		//重畫轉換線
		this.resetLines(id,this.$nodeData[id]);
		if(this.$editable){
			this.$nodeData[id].alt=true;
			this._node2Area(id);
		}
	},
	//設定結點/連線/分組區域的文字資訊
	setName:function(id,name,type, setInfo){
		var oldName;
		if (type === "node") {//如果是結點
		    this.$nodeData[id].setInfo = setInfo;
			if(!this.$nodeData[id])	return;
			if(this.$nodeData[id].name===name)	return;
			if(typeof this.onItemRename==='function' && this.onItemRename(id,name,"node")===false)	return;
			oldName=this.$nodeData[id].name;
			this.$nodeData[id].name=name;
			if(this.$nodeData[id].type.indexOf("round")>1){
				this.$nodeDom[id].children(".span").text(name);
			}
			else{
				this.$nodeDom[id].find("td:eq(1)").children("div").text(name);

				var width=this.$nodeDom[id].outerWidth();
				var height=this.$nodeDom[id].outerHeight();
				if(this.$nodeData[id].width!==width || this.$nodeData[id].height!==height){
					this.$nodeDom[id].children("table").css({width:width-2+"px",height:height-2+"px"});
					if(this.$undoStack){
						var para=[id,this.$nodeData[id].width,this.$nodeData[id].height];
						this.pushOper("resizeNode",para);
					}
					this.$nodeData[id].width=width;
					this.$nodeData[id].height=height;
				}
			}
			if(this.$editable){
				this.$nodeData[id].alt=true;
			}
			//重畫轉換線
			this.resetLines(id,this.$nodeData[id]);
		}
		else if (type === "line") {//如果是線
		    this.$lineData[id].setInfo = setInfo;
			if(!this.$lineData[id])	return;
			if(this.$lineData[id].name===name)	return;
			if(typeof this.onItemRename==='function' && this.onItemRename(id,name,"node")===false)	return;
			oldName=this.$lineData[id].name;
			this.$lineData[id].name=name;
			if(GooFlow.prototype.useSVG!==""){
				this.$lineDom[id].childNodes[2].textContent=name;
			}
			else{
				this.$lineDom[id].childNodes[1].innerHTML=name;
				var n=this.$lineDom[id].getAttribute("fromTo").split(",");
				var x;
				if(this.$lineData[id].type!=="lr"){
					x=(n[2]-n[0])/2;
				}
				else{
					var Min=n[2]>n[0]? n[0]:n[2];
					if(Min>this.$lineData[id].M) Min=this.$lineData[id].M;
					x=this.$lineData[id].M-Min;
				}
				if(x<0) x=x*-1;
				this.$lineDom[id].childNodes[1].style.left=x-this.$lineDom[id].childNodes[1].offsetWidth/2+4+"px";
			}
			if(this.$editable){
				this.$lineData[id].alt=true;
			}
		}
		else if(type==="area"){//如果是分組區域
			if(!this.$areaData[id])	return;
			if(this.$areaData[id].name===name)	return;
			if(typeof this.onItemRename==='function' && this.onItemRename(id,name,"node")===false)	return;
			oldName=this.$areaData[id].name;
			this.$areaData[id].name=name;
			this.$areaDom[id].children("label").text(name);
			if(this.$editable){
				this.$areaData[id].alt=true;
			}
		}
		if(this.$undoStack){
			var paras=[id,oldName,type];
			this.pushOper("setName",paras);
		}
	},
	//設定結點的尺寸,僅支援非開始/結束結點
	resizeNode:function(id,width,height){
		if(!this.$nodeData[id])	return;
		if(typeof this.onItemResize==='function' && this.onItemResize(id,"node",width,height)===false)	return;
		if(this.$nodeData[id].type==="start"||this.$nodeData[id].type==="end")return;
		if(this.$undoStack){
			var paras=[id,this.$nodeData[id].width,this.$nodeData[id].height];
			this.pushOper("resizeNode",paras);
		}

		this.$nodeDom[id].children("table").css({width:(width-2)*this.$scale+"px",height:(height-2)*this.$scale+"px"});
		//確保因內部文字太多而撐大時，寬高尺寸仍然是精確的
		width=this.$nodeDom[id].outerWidth();
		height=this.$nodeDom[id].outerHeight();
		this.$nodeDom[id].children("table").css({width:width-2+"px",height:height-2+"px"});
        //確保因內部文字太多而撐大時，寬高尺寸仍然是精確的 END
		this.$nodeData[id].width=width;
		this.$nodeData[id].height=height;
		if(this.$editable){
			this.$nodeData[id].alt=true;
		}
		//重畫轉換線
		this.resetLines(id,this.$nodeData[id]);
		this._node2Area(id);
	},
	//刪除結點
	delNode:function(id,trigger){
		if(!this.$nodeData[id])	return;
		if(false!==trigger && typeof this.onItemDel==='function' && this.onItemDel(id,"node")===false)	return;
		//先刪除可能的連線
		for(var k in this.$lineData){
			if(this.$lineData[k].from===id||this.$lineData[k].to===id){
				//this.$draw.removeChild(this.$lineDom[k]);
				//delete this.$lineData[k];
				//delete this.$lineDom[k];
				this.delLine(k,false);
			}
		}
		//再刪除結點本身
		if(this.$undoStack){
			var paras=[id,this.$nodeData[id]];
			this.pushOper("addNode",paras);
		}
		delete this.$nodeData[id];
		this.$nodeDom[id].remove();
		delete this.$nodeDom[id];
		--this.$nodeCount;
		if(this.$focus===id)	this.$focus="";

		if(this.$editable){
			//在回退新增操作時,如果節點ID以this.$id+"_node_"開頭,則表示為本次編輯時新加入的節點,這些節點的刪除不用加入到$deletedItem中
			//if(id.indexOf(this.$id+"_node_")<0)
				this.$deletedItem[id]="node";
		}
	},
	//設定流程圖的名稱
	setTitle:function(text){
		this.$title=text;
		if(this.$head)	this.$head.children("label").attr("title",text).text(text);
	},
    //僅供內部使用：計算流程圖的實際寬高（單位畫素）
	_suitSize:function(){
        var maxW=0,maxH=0;
        for(var k1 in this.$nodeData){
            var node = this.$nodeData[k1];
            if(maxW < node.width+node.left){
                maxW = node.width+node.left;
            }
            if(maxH < node.height+node.top){
                maxH = node.height+node.top;
            }
        }
        for(var k2 in this.$areaData){
            var area = this.$areaData[k2];
            if(maxW < area.width+area.left){
                maxW = area.width+area.left;
            }
            if(maxH < area.height+area.top){
                maxH = area.height+area.top;
            }
        }
        for(var k3 in this.$lineData){
            var line = this.$lineData[k3];
            if(line.M && line.type==="lt" && maxW < line.M ){
                maxW = M+4;
            }
            if(line.M && line.type==="tb" && maxH < line.M ){
                maxH = M+4;
            }
        }
        return {width:maxW,height:maxH}

	},
	//載入一組數據
	loadData: function (data) {
	    this.clearData();  //載入之前先清空數據 yubaolee
		var t=this.$editable;
		this.$editable=false;
		if(data.title)	this.setTitle(data.title);
		if (data.initNum) this.$max = data.initNum;

		if (data != "") {
		    var length,k;
		    for (k = 0, length = data.nodes.length; k < length; k++) {
		        this.addNode(data.nodes[k].id, data.nodes[k]);
		    }
		    for (k = 0, length = data.lines.length; k < length; k++) {
		        this.addLine(data.lines[k].id, data.lines[k]);
		    }
		    for (k = 0,length = data.areas.length; k < length; k++) {
		        this.addArea(data.areas[k].id, data.areas[k]);
		    }
        }
		

		this.$editable=t;
		this.$deletedItem={};
		//自行重構工作區，使之大小自適應
        var width=this.$workArea.width();
        var height=this.$workArea.height();
        var max=this._suitSize();
        while(max.width>width){
            width+=this.$workExtendStep;
        }
        while(max.height>height){
            height+=this.$workExtendStep;
        }
        this.$workArea.css({height:height+"px",width:width+"px"});
        if(GooFlow.prototype.useSVG===""){
            this.$draw.coordsize = width+","+height;
        }
        this.$draw.style.width = width + "px";
        this.$draw.style.height = height + "px";
        if(this.$group!=null){
            this.$group.css({height:height+"px",width:width+"px"});
        }
	},
	//用AJAX方式，遠端讀取一組數據
	//參數para為JSON結構，與JQUERY中$.ajax()方法的傳參一樣
	loadDataAjax:function(para){
		var This=this;
		$.ajax({
			type:para.type,
			url:para.url,
			dataType:"json",
			data:para.data,
			success: function(msg){
				if(para['dataFilter'])	para['dataFilter'](msg,"json");
     			This.loadData(msg);
				if(para.success)	para.success(msg);
   			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				if(para.error)	para.error(textStatus,errorThrown);
			}
		})
	},
	//把畫好的整個流程圖導出到一個變數中(其實也可以直接訪問GooFlow對象的$nodeData,$lineData,$areaData這三個JSON屬性)
	exportData:function(){
		var ret={};
		ret.title=this.$title;
		ret.nodes=[];
		ret.lines=[];
		ret.areas=[];
		ret.initNum=this.$max;
		for(var k1 in this.$nodeData){
			if(!this.$nodeData[k1].marked){
				delete this.$nodeData[k1]["marked"];
			}
			ret.nodes.push(JSON.parse(JSON.stringify(this.$nodeData[k1])));
			//ret.nodes[k1]=JSON.parse(JSON.stringify(this.$nodeData[k1]));
        }
		for(var k2 in this.$lineData){
			if(!this.$lineData[k2].marked){
				delete this.$lineData[k2]["marked"];
			}
			ret.lines.push(JSON.parse(JSON.stringify(this.$lineData[k2])));
           // ret.lines[k2]=JSON.parse(JSON.stringify(this.$lineData[k2]));
		}
        for(var k3 in this.$areaData){
            if(!this.$areaData[k3].marked){
                delete this.$areaData[k3]["marked"];
            }

            ret.areas.push(JSON.parse(JSON.stringify(this.$areaData[k3])));
            // ret.areas[k3]=JSON.parse(JSON.stringify(this.$areaData[k3]));
        }
		return ret;
	},
	//只把本次編輯流程圖中作了變更(包括增刪改)的元素導出到一個變數中,以方便使用者每次編輯載入的流程圖后只獲取變更過的數據
	exportAlter:function(){
		var ret={nodes:{},lines:{},areas:{}};
		for(var k1 in this.$nodeData){
			if(this.$nodeData[k1].alt){
				ret.nodes[k1]=this.$nodeData[k1];
			}
		}
		for(var k2 in this.$lineData){
			if(this.$lineData[k2].alt){
				ret.lines[k2]=this.$lineData[k2];
			}
		}
		for(var k3 in this.$areaData){
			if(this.$areaData[k3].alt){
				ret.areas[k3]=this.$areaData[k3];
			}
		}
		ret.deletedItem=this.$deletedItem;
		return ret;
	},
	//變更元素的ID,一般用於快速儲存后,將後臺返回新元素的ID更新到頁面中;type為元素型別(節點,連線,區塊)
	transNewId:function(oldId,newId,type){
		var tmp;
		switch(type){
			case "node":
			if(this.$nodeData[oldId]){
				tmp=this.$nodeData[oldId];
				delete this.$nodeData[oldId];
				this.$nodeData[newId]=tmp;
				tmp=this.$nodeDom[oldId].attr("id",newId);
				delete this.$nodeDom[oldId];
				this.$nodeDom[newId]=tmp;
			}
			break;
			case "line":
			if(this.$lineData[oldId]){
				tmp=this.$lineData[oldId];
				delete this.$lineData[oldId];
				this.$lineData[newId]=tmp;
				tmp=this.$lineDom[oldId].attr("id",newId);
				delete this.$lineDom[oldId];
				this.$lineDom[newId]=tmp;
			}
			break;
			case "area":
			if(this.$areaData[oldId]){
				tmp=this.$areaData[oldId];
				delete this.$areaData[oldId];
				this.$areaData[newId]=tmp;
				tmp=this.$areaDom[oldId].attr("id",newId);
				delete this.$areaDom[oldId];
				this.$areaDom[newId]=tmp;
			}
			break;
		}
	},
	//清空工作區及已載入的數據
	clearData:function(){
		for(var k1 in this.$nodeData){
			this.delNode(k1);
		}
		for(var k2 in this.$lineData){
			this.delLine(k2);
		}
		for(var k3 in this.$areaData){
			this.delArea(k3);
		}
		this.$deletedItem={};
	},
	//銷燬自己
	destrory:function(){
		this.$bgDiv.empty();
		this.$lineData=null;
		this.$nodeData=null;
		this.$lineDom=null;
		this.$nodeDom=null;
		this.$areaDom=null;
		this.$areaData=null;
		this.$nodeCount=0;
		this.$areaCount=0;
		this.$areaCount=0;
		this.$deletedItem={};
	},
///////////以下為有關畫線的方法
	//繪製一條箭頭線，並返回線的DOM
	drawLine:function(id,sp,ep,mark,dash,$scale){
		var line,text;
        var x=(ep[0]+sp[0])/2, y=(ep[1]+sp[1])/2;
		if(GooFlow.prototype.useSVG!==""){
			line=document.createElementNS("http://www.w3.org/2000/svg","g");
			var hi=document.createElementNS("http://www.w3.org/2000/svg","path");
			var path=document.createElementNS("http://www.w3.org/2000/svg","path");

			if(id!=="")	line.setAttribute("id",id);
			line.setAttribute("from",sp[0]+","+sp[1]);
			line.setAttribute("to",ep[0]+","+ep[1]);
			hi.setAttribute("visibility","hidden");
			hi.setAttribute("stroke-width",'9');
			hi.setAttribute("fill","none");
			hi.setAttribute("stroke","white");
			hi.setAttribute("d","M "+sp[0]+" "+sp[1]+" L "+ep[0]+" "+ep[1]);
			hi.setAttribute("pointer-events","stroke");
			path.setAttribute("d","M "+sp[0]+" "+sp[1]+" L "+ep[0]+" "+ep[1]);
			path.setAttribute("stroke-width",mark? '2.4':'1.4');
			path.setAttribute("stroke-linecap","round");
			path.setAttribute("fill","none");
			if(dash)	path.setAttribute("style", "stroke-dasharray:6,5");
			if(mark){
				path.setAttribute("stroke",GooFlow.color.mark);
				path.setAttribute("marker-end","url(#arrow2)");
			}
			else{
				path.setAttribute("stroke",GooFlow.color.line);
				path.setAttribute("marker-end","url(#arrow1)");
			}
			line.appendChild(hi);
			line.appendChild(path);
			line.style.cursor="crosshair";
			if(id!==""&&id!=="GooFlow_tmp_line"){
				text=document.createElementNS("http://www.w3.org/2000/svg","text");
				text.setAttribute("fill",GooFlow.color.lineFont);
				line.appendChild(text);

				text.setAttribute("text-anchor","middle");
				text.setAttribute("x",x+'');
				text.setAttribute("y",y+'');
				text.style.cursor="text";
                text.style.fontSize=14*$scale+"px";
                line.style.cursor="pointer";
			}
		}else{
			line=document.createElement("v:polyline");
			if(id!=="")	line.id=id;
			//line.style.position="absolute";
			line.points.value=sp[0]+","+sp[1]+" "+ep[0]+","+ep[1];
			line.setAttribute("fromTo",sp[0]+","+sp[1]+","+ep[0]+","+ep[1]);
			line.strokeWeight="1.2";
			line.stroke.EndArrow="Block";
			line.style.cursor="crosshair";
			if(id!==""&&id!=="GooFlow_tmp_line"){
				text=document.createElement("div");
				//text.innerHTML=id;
				line.appendChild(text);
				if(x<0) x=x*-1;
				if(y<0) y=y*-1;
				text.style.left=x+"px";
				text.style.top=y-6+"px";
                text.style.color=GooFlow.color.lineFont;
                text.style.fontSize=14*$scale+"px";
				line.style.cursor="pointer";
			}
			if(dash)	line.stroke.dashStyle="Dash";
			if(mark)	line.strokeColor=GooFlow.color.mark;
			else	line.strokeColor=GooFlow.color.line;
			line.fillColor=GooFlow.color.line;
		}
		return line;
	},
	//畫一條只有兩個中點的折線
	drawPoly:function(id,sp,m1,m2,ep,mark,dash,$scale){
		var poly,strPath, text;
		var x=(m2[0]+m1[0])/2, y=(m2[1]+m1[1])/2;
		if(GooFlow.prototype.useSVG!==""){
			poly=document.createElementNS("http://www.w3.org/2000/svg","g");
			var hi=document.createElementNS("http://www.w3.org/2000/svg","path");
			var path=document.createElementNS("http://www.w3.org/2000/svg","path");
			if(id!=="")	poly.setAttribute("id",id);
			poly.setAttribute("from",sp[0]+","+sp[1]);
			poly.setAttribute("to",ep[0]+","+ep[1]);
			hi.setAttribute("visibility","hidden");
			hi.setAttribute("stroke-width",'9');
			hi.setAttribute("fill","none");
			hi.setAttribute("stroke","white");
			strPath="M "+sp[0]+" "+sp[1];
			if(m1[0]!==sp[0]||m1[1]!==sp[1])
				strPath+=" L "+m1[0]+" "+m1[1];
			if(m2[0]!==ep[0]||m2[1]!==ep[1])
				strPath+=" L "+m2[0]+" "+m2[1];
			strPath+=" L "+ep[0]+" "+ep[1];
			hi.setAttribute("d",strPath);
			hi.setAttribute("pointer-events","stroke");
			path.setAttribute("d",strPath);
			path.setAttribute("stroke-width",mark? '2.4':'1.4');
			path.setAttribute("stroke-linecap","round");
			path.setAttribute("fill","none");
            if(dash)	path.setAttribute("style", "stroke-dasharray:6,5");
			if(mark){
				path.setAttribute("stroke",GooFlow.color.mark);
				path.setAttribute("marker-end","url(#arrow2)");
			}
			else{
				path.setAttribute("stroke",GooFlow.color.line);
				path.setAttribute("marker-end","url(#arrow1)");
			}
			poly.appendChild(hi);
			poly.appendChild(path);
			text=document.createElementNS("http://www.w3.org/2000/svg","text");
			text.setAttribute("fill",GooFlow.color.lineFont);
			poly.appendChild(text);
			text.setAttribute("text-anchor","middle");
			text.setAttribute("x",x+'');
			text.setAttribute("y",y+'');
			text.style.cursor="text";
		}
		else{
			poly=document.createElement("v:Polyline");
			if(id!=="")	poly.id=id;
			poly.filled="false";
			strPath=sp[0]+","+sp[1];
			if(m1[0]!==sp[0]||m1[1]!==sp[1])
				strPath+=" "+m1[0]+","+m1[1];
			if(m2[0]!==ep[0]||m2[1]!==ep[1])
				strPath+=" "+m2[0]+","+m2[1];
			strPath+=" "+ep[0]+","+ep[1];
			poly.points.value=strPath;
			poly.setAttribute("fromTo",sp[0]+","+sp[1]+","+ep[0]+","+ep[1]);
			poly.strokeWeight=mark? "2.4":"1.2";
			poly.stroke.EndArrow="Block";
			text=document.createElement("div");
			//text.innerHTML=id;
			poly.appendChild(text);
			if(x<0) x=x*-1;
			if(y<0) y=y*-1;
			text.style.left=x+"px";
			text.style.top=y-4+"px";
            text.style.color=GooFlow.color.lineFont;
            if(dash)	poly.stroke.dashStyle="Dash";
			if(mark)	poly.strokeColor=GooFlow.color.mark;
			else	poly.strokeColor=GooFlow.color.line;
		}
        poly.style.cursor="pointer";
        text.style.fontSize=14*$scale+"px";
		return poly;
	},
	//原lineData已經設定好的情況下，只在繪圖工作區畫一條線的頁面元素
	addLineDom:function(id,lineData){
		var n1=this.$nodeData[lineData.from],n2=this.$nodeData[lineData.to];//獲取開始/結束結點的數據
		if(!n1||!n2)	return;
		//開始計算線端點座標
		var res;
		if(lineData.type&&lineData.type!=="sl")
			res=calcPolyPoints(n1,n2,lineData.type,lineData.M, this.$scale);
		else
			res=calcStartEnd(n1,n2, this.$scale);
		if(!res)	return;

		if(lineData.type==="sl")
			this.$lineDom[id]=GooFlow.prototype.drawLine(id,res.start,res.end,lineData.marked,lineData.dash, this.$scale);
		else
			this.$lineDom[id]=GooFlow.prototype.drawPoly(id,res.start,res.m1,res.m2,res.end,lineData.marked,lineData.dash, this.$scale);
		this.$draw.appendChild(this.$lineDom[id]);
		if(GooFlow.prototype.useSVG===""){
			this.$lineDom[id].childNodes[1].innerHTML=lineData.name;
			if(lineData.type!=="sl"){
				var Min=(res.start[0]>res.end[0]? res.end[0]:res.start[0]);
				if(Min>res.m2[0])	Min=res.m2[0];
				if(Min>res.m1[0])	Min=res.m1[0];
				this.$lineDom[id].childNodes[1].style.left = (res.m2[0]+res.m1[0])/2-Min-this.$lineDom[id].childNodes[1].offsetWidth/2+4;
				Min=(res.start[1]>res.end[1]? res.end[1]:res.start[1]);
				if(Min>res.m2[1])	Min=res.m2[1];
				if(Min>res.m1[1])	Min=res.m1[1];
				this.$lineDom[id].childNodes[1].style.top = (res.m2[1]+res.m1[1])/2-Min-this.$lineDom[id].childNodes[1].offsetHeight/2;
			}else
				this.$lineDom[id].childNodes[1].style.left=
				((res.end[0]-res.start[0])*(res.end[0]>res.start[0]? 1:-1)-this.$lineDom[id].childNodes[1].offsetWidth)/2+4;
		}
		else{
            this.$lineDom[id].childNodes[2].textContent=lineData.name;
        }
	},
	//增加一條線
	addLine: function (id, json) {
	    if (json.id == undefined) {
	        $.extend(json, { id: id });
	    }
		if(typeof this.onItemAdd==='function' && this.onItemAdd(id,"line",json)===false)return;
		if(this.$undoStack&&this.$editable){
			this.pushOper("delLine",[id]);
		}
		if(json.from===json.to)	return;
		var n1=this.$nodeData[json.from],n2=this.$nodeData[json.to];//獲取開始/結束結點的數據
		if(!n1||!n2)	return;
		//避免兩個節點間不能有一條以上同向接連線
		for(var k in this.$lineData){
			if((json.from===this.$lineData[k].from&&json.to===this.$lineData[k].to&&json.dash===this.$lineData[k].dash))
				return;
		}
		//設定$lineData[id]
		this.$lineData[id]={};
		if(json.type){
			this.$lineData[id].type=json.type;
			this.$lineData[id].M=json.M;
		}
		else	this.$lineData[id].type="sl";//預設為直線
		this.$lineData[id].from=json.from;
		this.$lineData[id].to = json.to;
		this.$lineData[id].id = json.id;  //賦值ID
		this.$lineData[id].setInfo = json.setInfo;
		this.$lineData[id].name=json.name;
		if(json.marked)	this.$lineData[id].marked=json.marked;
		else	this.$lineData[id].marked=false;
        if(json.dash)	this.$lineData[id].dash=json.dash;
        else	this.$lineData[id].dash=false;
		//設定$lineData[id]完畢

		this.addLineDom(id,this.$lineData[id]);

		++this.$lineCount;
		if(this.$editable){
			this.$lineData[id].alt=true;
			if(this.$deletedItem[id])	delete this.$deletedItem[id];//在回退刪除操作時,去掉該元素的刪除記錄
		}
	},
	//重構所有連向某個結點的線的顯示，傳參結構為$nodeData陣列的一個單元結構
	resetLines:function(id,node){
		for(var i in this.$lineData){
		  var other=null;//獲取結束/開始結點的數據
		  var res;
		  if(this.$lineData[i].from===id){//找結束點
			other=this.$nodeData[this.$lineData[i].to]||null;
			if(other==null)	continue;
			if(this.$lineData[i].type==="sl")
				res=calcStartEnd(node,other, this.$scale);
			else
				res=calcPolyPoints(node,other,this.$lineData[i].type,this.$lineData[i].M, this.$scale);
			if(!res)	break;
		  }
		  else if(this.$lineData[i].to===id){//找開始點
			other=this.$nodeData[this.$lineData[i].from]||null;
			if(other==null)	continue;
			if(this.$lineData[i].type==="sl")
				res=calcStartEnd(other,node, this.$scale);
			else
				res=calcPolyPoints(other,node,this.$lineData[i].type,this.$lineData[i].M, this.$scale);
			if(!res)	break;
		  }
		  if(other==null)	continue;
		  this.$draw.removeChild(this.$lineDom[i]);
		  if(this.$lineData[i].type==="sl"){
		  	this.$lineDom[i]=GooFlow.prototype.drawLine(i,res.start,res.end,this.$lineData[i].marked,this.$lineData[i].dash, this.$scale);
		  }
		  else{
			this.$lineDom[i]=GooFlow.prototype.drawPoly(i,res.start,res.m1,res.m2,res.end,this.$lineData[i].marked,this.$lineData[i].dash, this.$scale);
		  }
		  this.$draw.appendChild(this.$lineDom[i]);
		  if(GooFlow.prototype.useSVG===""){
			this.$lineDom[i].childNodes[1].innerHTML=this.$lineData[i].name;
			if(this.$lineData[i].type!=="sl"){
				var Min=(res.start[0]>res.end[0]? res.end[0]:res.start[0]);
				if(Min>res.m2[0])	Min=res.m2[0];
				if(Min>res.m1[0])	Min=res.m1[0];
				this.$lineDom[i].childNodes[1].style.left = (res.m2[0]+res.m1[0])/2-Min-this.$lineDom[i].childNodes[1].offsetWidth/2+4;
				Min=(res.start[1]>res.end[1]? res.end[1]:res.start[1]);
				if(Min>res.m2[1])	Min=res.m2[1];
				if(Min>res.m1[1])	Min=res.m1[1];
				this.$lineDom[i].childNodes[1].style.top = (res.m2[1]+res.m1[1])/2-Min-this.$lineDom[i].childNodes[1].offsetHeight/2-4;
			}else
				this.$lineDom[i].childNodes[1].style.left=
				((res.end[0]-res.start[0])*(res.end[0]>res.start[0]? 1:-1)-this.$lineDom[i].childNodes[1].offsetWidth)/2+4;
		  }
		  else	this.$lineDom[i].childNodes[2].textContent=this.$lineData[i].name;
		}
	},
	//重新設定連線的樣式 newType= "sl":直線, "lr":中段可左右移動型折線, "tb":中段可上下移動型折線
	setLineType:function(id,newType,M){
		if(!newType||newType==null||newType===""||newType===this.$lineData[id].type)	return false;
		if(typeof this.onLineSetType==='function' && this.onLineSetType(id,newType)===false)	return;
		if(this.$undoStack){
			var paras=[id,this.$lineData[id].type,this.$lineData[id].M];
			this.pushOper("setLineType",paras);
		}
		var from=this.$lineData[id].from;
		var to=this.$lineData[id].to;
		this.$lineData[id].type=newType;
		var res;
		//如果是變成折線
		if(newType!=="sl"){
		  //res=calcPolyPoints(this.$nodeData[from],this.$nodeData[to],this.$lineData[id].type,this.$lineData[id].M, this.$scale);
		  if(M){
		  	this.setLineM(id,M,true);
		  }else{
		  	this.setLineM(id,getMValue(this.$nodeData[from],this.$nodeData[to],newType),true);
		  }
		}
		//如果是變回直線
		else{
		  delete this.$lineData[id].M;
		  this.$lineMove.hide().removeData("type").removeData("tid");
		  res=calcStartEnd(this.$nodeData[from],this.$nodeData[to], this.$scale);
		  if(!res)	return;
		  this.$draw.removeChild(this.$lineDom[id]);
		  this.$lineDom[id]=GooFlow.prototype.drawLine(id,res.start,res.end,this.$lineData[id].marked,this.$lineData[id].dash, this.$scale);
		  this.$draw.appendChild(this.$lineDom[id]);
		  if(GooFlow.prototype.useSVG===""){
		  	this.$lineDom[id].childNodes[1].innerHTML=this.$lineData[id].name;
			this.$lineDom[id].childNodes[1].style.left=
			((res.end[0]-res.start[0])*(res.end[0]>res.start[0]? 1:-1)-this.$lineDom[id].childNodes[1].offsetWidth)/2+4;
		  }
		  else
			this.$lineDom[id].childNodes[2].textContent=this.$lineData[id].name;
		}
		if(this.$focus===id){
			this.focusItem(id);
		}
		if(this.$editable){
			this.$lineData[id].alt=true;
		}
	},
	//設定折線中段的X座標值（可左右移動時）或Y座標值（可上下移動時）
	setLineM:function(id,M,noStack){
		if(!this.$lineData[id]||M<0||!this.$lineData[id].type||this.$lineData[id].type==="sl")	return false;
		if(typeof this.onLineMove==='function' && this.onLineMove(id,M)===false)	return false;
		if(this.$undoStack&&!noStack){
			var paras=[id,this.$lineData[id].M];
			this.pushOper("setLineM",paras);
		}
		var from=this.$lineData[id].from;
		var to=this.$lineData[id].to;
		this.$lineData[id].M=M;
		var ps=calcPolyPoints(this.$nodeData[from],this.$nodeData[to],this.$lineData[id].type,this.$lineData[id].M, this.$scale);
		this.$draw.removeChild(this.$lineDom[id]);
		this.$lineDom[id]=GooFlow.prototype.drawPoly(id,ps.start,ps.m1,ps.m2,ps.end,this.$lineData[id].marked,this.$lineData[id].dash, this.$scale);
		this.$draw.appendChild(this.$lineDom[id]);
		if(GooFlow.prototype.useSVG===""){
			this.$lineDom[id].childNodes[1].innerHTML=this.$lineData[id].name;
			var Min=(ps.start[0]>ps.end[0]? ps.end[0]:ps.start[0]);
			if(Min>ps.m2[0])	Min=ps.m2[0];
			if(Min>ps.m1[0])	Min=ps.m1[0];
			this.$lineDom[id].childNodes[1].style.left = (ps.m2[0]+ps.m1[0])/2-Min-this.$lineDom[id].childNodes[1].offsetWidth/2+4;
			Min=(ps.start[1]>ps.end[1]? ps.end[1]:ps.start[1]);
			if(Min>ps.m2[1])	Min=ps.m2[1];
			if(Min>ps.m1[1])	Min=ps.m1[1];
			this.$lineDom[id].childNodes[1].style.top = (ps.m2[1]+ps.m1[1])/2-Min-this.$lineDom[id].childNodes[1].offsetHeight/2-4;
		}
		else	this.$lineDom[id].childNodes[2].textContent=this.$lineData[id].name;
		if(this.$editable){
			this.$lineData[id].alt=true;
		}
	},
	//刪除轉換線
	delLine:function(id,trigger){
		if(!this.$lineData[id])	return;
		if(false!==trigger && typeof this.onItemDel==='function' && this.onItemDel(id,"node")===false)	return;
		if(this.$undoStack){
			var paras=[id,this.$lineData[id]];
			this.pushOper("addLine",paras);
		}
		this.$draw.removeChild(this.$lineDom[id]);
		delete this.$lineData[id];
		delete this.$lineDom[id];
		if(this.$focus===id)	this.$focus="";
		--this.$lineCount;
		if(this.$editable){
			//在回退新增操作時,如果節點ID以this.$id+"_line_"開頭,則表示為本次編輯時新加入的節點,這些節點的刪除不用加入到$deletedItem中
			// if(id.indexOf(this.$id+"_line_")<0)
			this.$deletedItem[id]="line";
			this.$mpFrom.hide().removeData("p");
			this.$mpTo.hide().removeData("p");
		}
		if(this.$lineOper){
			this.$lineOper.hide().removeData("tid");
		}
	},
	//變更連線兩個端點所連的結點
	//參數：要變更端點的連線ID，新的開始結點ID、新的結束結點ID；如果開始/結束結點ID是傳入null或者""，則表示原端點不變
	moveLinePoints:function(lineId, newStart, newEnd, noStack){
		if(newStart===newEnd)	return;
		if(!lineId||!this.$lineData[lineId])	return;
		if(newStart==null||newStart==="")
			newStart=this.$lineData[lineId].from;
		if(newEnd==null||newEnd==="")
			newEnd=this.$lineData[lineId].to;

		//避免兩個節點間不能有一條以上同向接連線
		for(var k in this.$lineData){
			if((newStart===this.$lineData[k].from&&newEnd===this.$lineData[k].to))
				return;
		}
		if(typeof this.onLinePointMove==='function' && this.onLinePointMove(lineId,newStart,newEnd)===false)	return;
		if(this.$undoStack&&!noStack){
			var paras=[lineId,this.$lineData[lineId].from,this.$lineData[lineId].to];
			this.pushOper("moveLinePoints",paras);
		}
		if(newStart!=null&&newStart!==""){
			this.$lineData[lineId].from=newStart;
		}
		if(newEnd!=null&&newEnd!==""){
			this.$lineData[lineId].to=newEnd;
		}
		//重建轉換線
		this.$draw.removeChild(this.$lineDom[lineId]);
		this.addLineDom(lineId,this.$lineData[lineId]);
		if(this.$editable){
			this.$lineData[lineId].alt=true;
		}
	},

	//用顏色標註/取消標註一個結點或轉換線，常用於顯示重點或流程的進度。
	//這是一個在編輯模式中無用,但是在純瀏覽模式中非常有用的方法，實際運用中可用於跟蹤流程的進度。
	markItem:function(id,type,mark){
		if(type==="node"){
			if(!this.$nodeData[id])	return;
			if(typeof this.onItemMark==='function' && this.onItemMark(id,"node",mark)===false)	return;
				this.$nodeData[id].marked=mark||false;
			if(mark){
				this.$nodeDom[id].addClass("item_mark").css("border-color",GooFlow.color.mark);
			}
			else{
				this.$nodeDom[id].removeClass("item_mark");
				if(id!==this.$focus) this.$nodeDom[id].css("border-color","transparent");
			}

		}else if(type==="line"){
			if(!this.$lineData[id])	return;
			if(this.onItemMark!=null&&!this.onItemMark(id,"line",mark))	return;
			this.$lineData[id].marked=mark||false;
			if(GooFlow.prototype.useSVG!==""){
				if(mark){
					this.$lineDom[id].childNodes[1].setAttribute("stroke",GooFlow.color.mark);
					this.$lineDom[id].childNodes[1].setAttribute("marker-end","url(#arrow2)");
                    this.$lineDom[id].childNodes[1].setAttribute("stroke-width",2.4);
				}else{
					this.$lineDom[id].childNodes[1].setAttribute("stroke",GooFlow.color.line);
					this.$lineDom[id].childNodes[1].setAttribute("marker-end","url(#arrow1)");
                    this.$lineDom[id].childNodes[1].setAttribute("stroke-width",1.4);
				}
			}else{
				if(mark){
                    this.$lineDom[id].strokeColor=GooFlow.color.mark;
                    this.$lineDom[id].strokeWeight="2.4";
				}
				else{
                    this.$lineDom[id].strokeColor=GooFlow.color.line;
                    this.$lineDom[id].strokeWeight="1.2";
				}
			}
		}
		if(this.$undoStack){
			var paras=[id,type,!mark];
			this.pushOper("markItem",paras);
		}
	},
	////////////////////////以下為區域分組塊操作
	//傳入一個區域組(泳道)的ID，判斷圖中所有結點在此區域組(泳道)的範圍內
	_areaFixNodes:function(areaId){
		var area=this.$areaData[areaId];
		for(var key in this.$nodeData){
			var node = this.$nodeData[key];
			if( node.left>=area.left&&node.left<area.left+area.width &&
				node.top>=area.top&&node.top<area.top+area.height
			){
				node.areaId=areaId;
			}else if(node.areaId && node.areaId===areaId){
				this._node2Area(key);
			}
		}
	},
	moveArea:function(id,left,top){
		if(!this.$areaData[id])	return;
		if(this.onItemMove!=null&&!this.onItemMove(id,"area",left,top))	return;
		if(this.$undoStack){
			var paras=[id,this.$areaData[id].left,this.$areaData[id].top];
			this.pushOper("moveArea",paras);
		}
		if(left<0)	left=0;
		if(top<0)	top=0;
		$("#"+id).css({left:left*this.$scale+"px",top:top*this.$scale+"px"});
		this.$areaData[id].left=left;
		this.$areaData[id].top=top;
		if(this.$editable){
			this.$areaData[id].alt=true;
			this._areaFixNodes(id);
		}
	},
	//刪除區域分組
	delArea:function(id, trigger){
		if(!this.$areaData[id])	return;
		if(this.$undoStack){
			var paras=[id,this.$areaData[id]];
			this.pushOper("addArea",paras);
		}
		if(false!==trigger && typeof this.onItemDel==='function' && this.onItemDel(id,"node")===false)	return;
		delete this.$areaData[id];
		this.$areaDom[id].remove();
		delete this.$areaDom[id];
		--this.$areaCount;
		if(this.$editable){
			//在回退新增操作時,如果節點ID以this.$id+"_area_"開頭,則表示為本次編輯時新加入的節點,這些節點的刪除不用加入到$deletedItem中
			//if(id.indexOf(this.$id+"_area_")<0)
			for(var key in this.$nodeData){
				var node = this.$nodeData[key];
				if(node.areaId===id){
					delete node.areaId
				}
			}
			this.$deletedItem[id]="area";
		}
	},
	//設定區域分組的顏色
	setAreaColor:function(id,color){
		if(!this.$areaData[id])	return;
		if(this.$undoStack){
			var paras=[id,this.$areaData[id].color];
			this.pushOper("setAreaColor",paras);
		}
		if(color==="red"||color==="yellow"||color==="blue"||color==="green"){
			this.$areaDom[id].removeClass("area_"+this.$areaData[id].color).addClass("area_"+color);
			this.$areaData[id].color=color;
		}
		if(this.$editable){
			this.$areaData[id].alt=true;
		}
	},
	//設定區域分塊的尺寸
	resizeArea:function(id,width,height){
		if(!this.$areaData[id])	return;
		if(typeof this.onItemResize==='function' && this.onItemResize(id,"area",width,height)===false)	return;
		if(this.$undoStack){
			var paras=[id,this.$areaData[id].width,this.$areaData[id].height];
			this.pushOper("resizeArea",paras);
		}

		this.$areaDom[id].children(".bg").css({width:width*this.$scale+"px",height:height*this.$scale+"px"});

		width=this.$areaDom[id].outerWidth();
		height=this.$areaDom[id].outerHeight();
		this.$areaDom[id].children("bg").css({width:width+"px",height:height+"px"});

		this.$areaData[id].width=width;
		this.$areaData[id].height=height;
		if(this.$editable){
			this.$areaData[id].alt=true;
			this._areaFixNodes(id);
		}
	},
	addArea:function(id,json){
		if(typeof this.onItemAdd==='function' && this.onItemAdd(id,"area",json)===false)return;
		if(this.$undoStack&&this.$editable){
			this.pushOper("delArea",[id]);
		}
		this.$areaDom[id]=$("<div id='"+id+"' class='GooFlow_area area_"+json.color
			+"' style='top:"+json.top*this.$scale+"px;left:"+json.left*this.$scale+"px'><div class='bg' style='width:"+(json.width*this.$scale)+"px;height:"+(json.height*this.$scale)+"px'></div>"
			+"<label>"+json.name+"</label><i></i><div><div class='rs_bottom'></div><div class='rs_right'></div><div class='rs_rb'></div><div class='rs_close'></div></div></div>");
		this.$areaData[id]=json;
		this.$group.append(this.$areaDom[id]);
		if(this.$nowType!=="group")	this.$areaDom[id].children("div:eq(1)").css("display","none");
		++this.$areaCount;
		if(this.$editable){
			this.$areaData[id].alt=true;
			this._areaFixNodes(id);
			if(this.$deletedItem[id])	delete this.$deletedItem[id];//在回退刪除操作時,去掉該元素的刪除記錄
		}
	},
	//重構整個流程圖設計器的寬高
	reinitSize:function(width,height){
		var w=(width||this.$bgDiv.width());
		var h=(height||this.$bgDiv.height());
		this.$bgDiv.css({height:h+"px",width:w+"px"});
		var headHeight=0,hack=8;
		if(this.$head!=null){
			headHeight=26;
			hack=5;
		}
		if(this.$tool!=null){
			this.$tool.css({height:h-headHeight-hack+"px"});
			w-=31;
		}
		w-=9;
		h=h-headHeight-(this.$head!=null? 5:8);
		//this.$workArea.parent().css({height:h+"px",width:w+"px"});
		
		if(this.$workArea.width()>w){
			w=this.$workArea.width();
		}
		if(this.$workArea.height()>h){
			h=this.$workArea.height();
		}
		
		this.$workArea.css({height:h+"px",width:w+"px"});
		if(GooFlow.prototype.useSVG===""){
			this.$draw.coordsize = w+","+h;
		}
		this.$draw.style.width = w + "px";
		this.$draw.style.height = h + "px";
		if(this.$group!=null){
			this.$group.css({height:h+"px",width:w+"px"});
		}
	},
	//重設整個工作區內容的顯示縮放比例，從0.5至4倍
	resetScale:function(scale){
		if(!scale)	scale=1.0;
		else if(scale<0.5)	scale=0.5;
		else if(scale>4)	scale=4;
		//以上是固定死取值範圍：不讓使用者縮放過大或過小，已免無意中影響的顯示效果
		if(this.$scale===scale)	return;
		var oldS=this.$scale;
		this.$scale=scale;
		var factor = oldS/scale;//因數（舊縮放比例除以新縮放比例）,元素的現有值除以該因子，就能得到新的縮放后的值
        var W=0,H=0,P={};//寬、高、左及上的臨時變數
		//開始正式的縮放（節點、連線、泳道塊有寬高和定位，其它編輯工具元素則只有定位）（全部以左上角為原點）
        this.blurItem();
		//先縮放工作區
        W=this.$workArea.width()/factor;
        H=this.$workArea.height()/factor;
        this.$workArea.css({"height":H+"px","width":W+"px"});
        if(GooFlow.prototype.useSVG!==""){

        }else{
            this.$draw.coordsize = W+","+H;
		}
        this.$draw.style.width = W + "px";
        this.$draw.style.height = H + "px";
        if(this.$group!=null){
            this.$group.css({height:H+"px",width:W+"px"});
        }
        //縮放節點
        var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1;
        this.$workArea.children(".GooFlow_item").each(function(){
            var This=$(this);
            P=This.position();
            This.css({ "left":P.left/factor+"px", "top":P.top/factor+"px" });
            This=This.children("table");
            W=This.outerWidth()/factor;
            H=This.outerHeight()/factor;
            This.css({ "width":W+"px", "height":H+"px" });
            var tmp=18*scale;
            This.find("td[class='ico']").css({width:tmp+"px"});
            var newSize= {};
            if(tmp<12&&isWebkit){
                newSize["width"]="18px";newSize["height"]="18px";
                newSize["font-size"]="18px";
                newSize["transform"]="scale("+(tmp/18)+")";
                newSize["margin"]=-((18-tmp)/2)+"px";
            }else{
                newSize["width"]=tmp+"px"; newSize["height"]=tmp+"px";
                newSize["font-size"]=tmp+"px";
                newSize["transform"]="none";
                newSize["margin"]="0px auto";
            }
            This.find("td[class='ico']").children("i").css(newSize);

            tmp=14*scale;
            if(This.parent().find(".span").length===1){
                This.parent().css("border-radius",W/2+"px");
                This=This.parent().find(".span");
                This.css({"font-size":tmp+"px"});
            }else{
                This=This.find("td:eq(1) div");
                newSize={};
                if(tmp<12&&isWebkit){
                    newSize["font-size"]="14px";
                    newSize["transform"]="scale("+(tmp/14)+")";
                    var mW=(W/scale-18-(W-18*scale))/2;
                    var mH=(H/scale-H)/2;
                    newSize["margin"]=-mH+"px "+(-mW)+"px";
                }else{
                    newSize["transform"]="none";
                    newSize["font-size"]=tmp+"px";
                    newSize["margin"]="0px";
                }
                This.css(newSize);
            }
		});
        //縮放區域圖
		var ifs=16*scale+2;
		this.$group.children(".GooFlow_area").each(function(){
            var This=$(this);
            P=This.position();
            This.css({ "left":P.left/factor+"px", "top":P.top/factor+"px" });
            This=This.children("div:eq(0)");
            W=This.outerWidth()/factor;
            H=This.outerHeight()/factor;
            This.css({ "width":W+"px", "height":H+"px" });
            This.next("label").css({
				"font-size": 14*scale+"px",
				"left": ifs+3+"px"
            }).next("i").css({
				"font-size": ifs-2+"px",
				width:ifs+"px",
				height:ifs+"px",
				"line-height":ifs+"px"
            });
		});
		//縮放連線
		for(var id in this.$lineDom){
            this.$draw.removeChild(this.$lineDom[id]);
            delete this.$lineDom[id];
		}
        for (var key in this.$lineData) {
            this.addLineDom(key, this.$lineData[key]);
        }
	}
};
//預設的顏色樣式
GooFlow.color={
	//main:"#20A0FF",
	font:"#15428B",
	node:"#C0CCDA",
	line:"#1D8CE0",
	lineFont:"#777",
	mark:"#ff8800",
	mix:"#B6F700",
	mixFont:"#777"
};
	//預設的文字說明註釋內容
GooFlow.remarks={
    headBtns:{},
	toolBtns:{},
    extendRight:undefined,
    extendBottom:undefined
};
//當不想使用jquery外掛式初始化方法時，另一種通過直接呼叫GooFlow內部構造方法進行的初始化
GooFlow.init=function(selector,property){
	return new GooFlow(selector,property);
};
//在初始化出一個對像前的公用方法：覆蓋設定GooFlow預設的顏色定義
GooFlow.setColors=function(colors){
	$.extend(GooFlow.color,colors);
};
//擴充套件GooFlow方法的擴充套件用接口，一般用在CMD,AMD
GooFlow.extend=function(json){
	for(var funcName in json){
		GooFlow.prototype[funcName]=json[funcName];
	}
};
//將此類的建構函式加入至JQUERY對像中
$.extend({
	createGooFlow:function(selector,property){
		return new GooFlow(selector,property);
	}
});

        exports('flow/gooflow');
    });
