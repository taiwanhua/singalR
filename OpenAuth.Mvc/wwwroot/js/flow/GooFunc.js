/*本系列框架中,一些用得上的小功能函式,一些UI必須使用到它們,使用者也可以單獨拿出來用*/

//獲取一個DIV的絕對座標的功能函式,即使是非絕對定位,一樣能獲取到
function getElCoordinate(dom) {
    var t = dom.offsetTop;
    var l = dom.offsetLeft;
    dom=dom.offsetParent;
    while (dom) {
        t += dom.offsetTop;
        l += dom.offsetLeft;
        dom=dom.offsetParent;
    }; return {
        top: t,
        left: l
    };
}
//相容各種瀏覽器的,獲取滑鼠真實位置
function mousePosition(ev){
	if(!ev) ev=window.event;
    if(ev.pageX || ev.pageY){
        return {x:ev.pageX, y:ev.pageY};
    }
    return {
        x:ev.clientX + document.documentElement.scrollLeft - document.body.clientLeft,
        y:ev.clientY + document.documentElement.scrollTop  - document.body.clientTop
    };
}
//給DATE類新增一個格式化輸出字串的方法
Date.prototype.format = function(format)   
{   
   var o = {   
      "M+" : this.getMonth()+1, //month  
      "d+" : this.getDate(),    //day  
      "h+" : this.getHours(),   //hour  
      "m+" : this.getMinutes(), //minute  
      "s+" : this.getSeconds(), //second  『
	  //quarter  
      "q+" : Math.floor((this.getMonth()+3)/3), 
      "S" : this.getMilliseconds() //millisecond  
   }   
   if(/(y+)/.test(format)) format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));   
    for(var k in o)if(new RegExp("("+ k +")").test(format))   
      format = format.replace(RegExp.$1,   
        RegExp.$1.length==1 ? o[k] :    
          ("00"+ o[k]).substr((""+ o[k]).length));   
    return format;   
}
//JS]根據格式字串分析日期（MM與自動匹配兩位的09和一位的9）
//alert(getDateFromFormat(sDate,sFormat));
function getDateFromFormat(dateString,formatString){
	var regDate = /\d+/g;
	var regFormat = /[YyMmdHhSs]+/g;
	var dateMatches = dateString.match(regDate);
	var formatmatches = formatString.match(regFormat);
	var date = new Date();
	for(var i=0;i<dateMatches.length;i++){
		switch(formatmatches[i].substring(0,1)){
			case 'Y':
			case 'y':
				date.setFullYear(parseInt(dateMatches[i]));break;
			case 'M':
				date.setMonth(parseInt(dateMatches[i])-1);break;
			case 'd':
				date.setDate(parseInt(dateMatches[i]));break;
			case 'H':
			case 'h':
				date.setHours(parseInt(dateMatches[i]));break;
			case 'm':
				date.setMinutes(parseInt(dateMatches[i]));break;
			case 's':
				date.setSeconds(parseInt(dateMatches[i]));break;
		}
	}
	return date;
}
//貨幣分析成浮點數
//alert(parseCurrency("￥1,900,000.12"));
function parseCurrency(currentString){
	var regParser = /[\d\.]+/g;
	var matches = currentString.match(regParser);
	var result = '';
	var dot = false;
	for(var i=0;i<matches.length;i++){
		var temp = matches[i];
		if(temp =='.'){
			if(dot) continue;
		}
		result += temp;
	}
	return parseFloat(result);
}

//將#XXXXXX顏色格式轉換為RGB格式，並附加上透明度
function brgba(hex, opacity) {
    if( ! /#?\d+/g.test(hex) ) return hex; //如果是「red」格式的顏色值，則不轉換。//正則錯誤，參考後面的PS內容
    var h = hex.charAt(0) == "#" ? hex.substring(1) : hex,
        r = parseInt(h.substring(0,2),16),
        g = parseInt(h.substring(2,4),16),
        b = parseInt(h.substring(4,6),16),
        a = opacity;
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

/*
 * AMD模組中，載入器里的配置:
 * exports 可以把某個非requirejs方式的程式碼中的某一個全域性變數暴露出去，當作該模組以引用
   paths: {
   	   'jquery': '/js/lib/jquery/jquery.min',
   	   'gooflow': '/js/lib/jquery/jquery.min',
   },
   shim: {
        'gooflow': {
            deps: ['/js/lib/ueditor/ueditor.config.js', 'css!/js/lib/ueditor/themes/default/css/ueditor']
            exports: 'GooFlow'
        }
    },
 */