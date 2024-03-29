/*
 * 專門負責導出流程圖檔案並讓使用者下載的擴充套件包方法
 */
;(function ( global, factory ) {
	'use strict';
	if ( typeof define !== 'undefined' && define.amd ) { // export as AMD...
		define( ['jquery','GooFlow'], factory );
	}
	else if ( typeof module !== 'undefined' && module.exports ) { // ...or as browserify
		factory( require('jquery'), require('GooFlow') );
	}else
		factory( global.$, global.GooFlow );

}( typeof window !== 'undefined' ? window : this, function ( $,GooFlow ) {
	if(GooFlow.prototype.exportDiagram && typeof GooFlow.prototype.exportDiagram==='function'){
		return;//防止多次載入
	}
    var Cmder = {
        //構建背景
        initBg : function(width,height,bgColor){
            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext('2d');
            if(bgColor) ctx.fillStyle = bgColor;
            ctx.fillRect(0,0,canvas.width,canvas.height);
            ctx.save();
            return canvas;
        },
        _toNum: function(str){
            return str!==null&&str!==''? parseInt(str.split('px')[0],10):undefined;
        },
        _analyseLabel: function(labelDom){
            var tagName = labelDom[0].tagName;
            var offsetLeft = labelDom[0].offsetLeft;
            var offsetTop = labelDom[0].offsetTop;
            if(tagName==='TD'){
                offsetLeft += labelDom.children("div")[0].offsetLeft;
                offsetTop += labelDom.children("div")[0].offsetTop;
            }

            var lineHeight = this._toNum(labelDom.css("line-height"));
            var fontSize = labelDom.css('font-size');
            return {
                font: fontSize+' '+labelDom.css('font-family'),
                fontSize: this._toNum(fontSize.split("px")[0]),
                text: labelDom.text(),//文字內容
                color: labelDom.css('color'),//文字顏色
                width: labelDom[0].offsetWidth,//文字容器寬度
                height: labelDom[0].offsetHeight,//文字容器高度
                lineHeight:lineHeight,
                offsetLeft:offsetLeft,
                offsetTop:offsetTop,
                lineNum: Math.ceil(labelDom[0].offsetHeight/lineHeight)//文字要分幾行？
            };
        },
        _analyseIcon: function(iconDom){
        	var bgImg = iconDom.css("background-image");
            var property={
                // top: this._toNum(iconDom[0].style.top),//
                // left: this._toNum(iconDom[0].style.left),//
                offsetLeft:iconDom[0].offsetLeft,
                offsetTop:iconDom[0].offsetTop,
                width: iconDom.width(),
                height: iconDom.height()
            };

            if(bgImg && bgImg!=='none'){//CSS SPITE背景圖式
                bgImg = bgImg.replace(/"/g,"").split("url(")[1];
				property.backgroundImage=bgImg.substr(0,bgImg.length-1);//圖示背景圖
                bgImg = iconDom.css("background-position").split(" ");
                property.pX = parseFloat(bgImg[0].split("px")[0])*-1;//圖示背景定位X
                property.pY = parseFloat(bgImg[1].split("px")[0])*-1;//圖示背景定位Y
			}else{//向量圖示字型式
				$.extend(property,{
					font: iconDom.css('font-size')+' '+iconDom.css('font-family').split(' ')[0],//圖示向量字型庫
					lineHeight : this._toNum(iconDom.css('line-height')),//圖示向量字型行高
					color: iconDom.css('color'),//圖示向量字型顏色
					opacity: parseFloat(iconDom.css("opacity")),//圖示向量透明度
					content:window.getComputedStyle(iconDom[0],'::before').getPropertyValue('content')
				});
			}

            return property;
        },
        _analyseArea : function(areaDom){
            var bg=areaDom.children(".bg");
            return {
                top: this._toNum(areaDom[0].style.top),
                left: this._toNum(areaDom[0].style.left),
                width: areaDom.outerWidth(),
                height: areaDom.outerHeight(),
                borderColor: bg.css('border-top-color'),//區域邊框顏色
                bgColor: bg.css('background-color'),//區域塊背景色
                opacity: parseFloat(bg.css("opacity")),//區域塊透明度
                icon: this._analyseIcon(areaDom.children('i')),
                label: this._analyseLabel(areaDom.children("label"))
            };
        },
        _analyseNode : function(nodeDom){
            var property={
                top: this._toNum(nodeDom[0].style.top),//
                left: this._toNum(nodeDom[0].style.left),//
                width: nodeDom.outerWidth(),//
                height: nodeDom.outerHeight(),//
                borderColor: nodeDom.css('border-top-color'),//節點邊框顏色
                borderWidth: this._toNum(nodeDom.css('border-top-width')),//節點邊框寬度
                bgColor: nodeDom.css('background-color'),//節點背景色
                borderRadius: this._toNum(nodeDom.css("border-top-left-radius")),//節點圓角半徑
                boxShadow: nodeDom.css("box-shadow"),//節點陰影
                icon: this._analyseIcon(nodeDom.find('i'))
            };
            if(nodeDom.hasClass("item_round")){
                property.label = this._analyseLabel(nodeDom.children(".span"));
            }else{
                property.label = this._analyseLabel(nodeDom.children("table").find("td:eq(1)"));
            }
            return property;
        },
        _fillIcon:function(canvas, bgLeft,bgTop,icon, bgImage){
            var ctx = canvas.getContext('2d');
            if(icon.backgroundImage===undefined){//向量字型圖示
                if(icon.content.indexOf('"')===0){
                    icon.content = icon.content.split('"')[1];
                }
                icon.color = icon.color.replace('rgb', 'rgba').replace(')', ', ' + icon.opacity + ')');
                ctx.fillStyle = icon.color;
                ctx.font = icon.font;
                ctx.textAlign='center';
                ctx.textBaseline='middle';
                //  繪製內容
                ctx.fillText(icon.content, bgLeft+icon.offsetLeft+4+icon.width/2, bgTop+icon.offsetTop+4+icon.height/2);
                return null;
            }else{//css spite背景定點陣圖標
				var tmpX=0,tmpY=0;
				if(icon.pX<0){
					tmpX-=icon.pX;	icon.pX=0;
				}
				if(icon.pY<0){
					tmpY-=icon.pY;	icon.pY=0;
				}
				//console.log(icon.pX+','+icon.pY);
				ctx.drawImage(bgImage, icon.pX, icon.pY, icon.width, icon.height,
					bgLeft+icon.offsetLeft+4+tmpX, bgTop+icon.offsetTop+4+tmpY, icon.width, icon.height );
            }
        },
        _fillLabel: function(canvas, bgLeft, bgTop, label) {
            var ctx = canvas.getContext('2d');
            ctx.fillStyle = label.color;
            ctx.textAlign='center';
            ctx.font = label.font;
            ctx.textBaseline='top';

            var str=label.text;
            var lineWidth = 0;//某一行字的實際寬度
            var lastSubStrIndex= 0; //每次開始擷取的字串的索引
            var hack = (window.ActiveXObject || "ActiveXObject" in window)? 1:0;
            var x = bgLeft+label.offsetLeft+label.width/2+hack/2;//文字（可能有多行）的x座標
            var y = bgTop+label.offsetTop+hack;//某一行文字（可能有多行）的y座標
			if(navigator.userAgent.indexOf('Firefox')>=0){
				y += (label.lineHeight-label.fontSize);
			}
            for(var i=0;i<str.length;i++){
                lineWidth += ctx.measureText(str[i]).width;
                if(i!==str.length-1){
                    if( lineWidth  >= label.width ){
                        ctx.fillText(str.substring(lastSubStrIndex,i),x,y);//繪製擷取部分
                        y+=label.lineHeight;
                        lineWidth=0;
                        lastSubStrIndex=i;
                    }
                }else{//繪製剩餘部分
                    ctx.fillText(str.substring(lastSubStrIndex,i+1),x,y);
                }
            }
        },
        //根據區域組資訊在背景上畫一堆區域組泳道（傳參areas為要繪製的區域組詳細json資訊）
        renderAreas:function(canvas,areas, iconBgImage){
            var ctx = canvas.getContext('2d');
            for(var key in areas) {
                var area = areas[key];
                //填充半透明矩形
                area.bgColor = area.bgColor.replace('rgb', 'rgba').replace(')', ', ' + area.opacity + ')');
                area.borderColor = area.borderColor.replace('rgb', 'rgba').replace(')', ', ' + area.opacity + ')');
                ctx.fillStyle = area.bgColor;
                ctx.strokeStyle = area.borderColor;
                ctx.rect(area.left, area.top, area.width, area.height);
                ctx.fill();
                ctx.stroke();
                this._fillIcon(canvas, area.left-3, area.top-3, area.icon, iconBgImage);
                this._fillLabel(canvas, area.left, area.top, area.label);
            }
        },

        //根據節點資訊在背景上畫一組節點（傳參nodes為要繪製的節點詳細json資訊）
        renderNodes:function(canvas,nodes,iconBgImage){
            var ctx = canvas.getContext('2d');
            var imgLoadFuncs=[];
            for(var key in nodes){
                var node = nodes[key];
                //渲染陰影
                var sd = node.boxShadow.split(") ");
                if(sd.length===1){
                    var tmp = node.boxShadow.split("rgba");
                    sd[0]='rgba'+tmp[1];
                    sd[1]=tmp[0];
                }
                ctx.shadowColor = sd[0];
                sd=sd[1].split(" ");
                ctx.shadowOffsetX=this._toNum(sd[0])+(node.borderWidth>1? 1:0);
                ctx.shadowOffsetY=this._toNum(sd[1])+(node.borderWidth>1? 1:0);
                ctx.shadowBlur=this._toNum(sd[2]);
                //填充圓角矩形
                ctx.fillStyle=node.bgColor;
                ctx.roundRect( node.left+node.borderWidth/2, node.top+node.borderWidth/2,
                    node.width-node.borderWidth, node.height-node.borderWidth, node.borderRadius).fill();
                //加邊框
                ctx.shadowBlur=0;
                ctx.shadowColor='';
                ctx.shadowOffsetX=0;
                ctx.shadowOffsetY=0;
                ctx.strokeStyle = node.borderColor;
                ctx.lineWidth = (node.borderWidth===0? 0.01:node.borderWidth);
                ctx.stroke();
                this._fillIcon(canvas, node.left, node.top+(node.borderRadius>6? 1:0), node.icon, iconBgImage);
                this._fillLabel(canvas, node.left, node.top, node.label);
            }
            return imgLoadFuncs;
        },

        _analyseLine:function(lineDom){ //only for IE
            var fontFamily = $(".GooFlow").css("font-family");
            //基本樣式
            var path = lineDom.childNodes[1];
            var property={
                color: path.getAttribute("stroke"),//箭頭則用fill
                lineWidth: path.getAttribute("stroke-width"),//線條寬度箭頭的strokeWidth為0
                lineCap: 'round'
            };
            var style = path.style.strokeDasharray;
            property.lineDash=(style && style!=null);
            //文字
            var text=lineDom.childNodes[2];
            var fontColor = text.getAttribute("fill");
            if(!fontColor||fontColor===null||fontColor===''){
                fontColor='#777';
            }
            property.label={
                text: text.textContent,
                font: text.style.fontSize+' '+fontFamily,
                color: fontColor,
                left:text.getAttribute("x"),
                top:text.getAttribute("y")
            };

            //獲取連線從首至尾各個點的座標值
            var d = path.getAttribute("d");
            var tmp = d.substring(2,d.length).split("L");
            var points=[];//連線中各點集合
            for(var i=0;i<tmp.length;++i){
                tmp[i] = tmp[i].replace(/^\s+|\s+$/gm,'');//去掉首尾空格
                var xy=tmp[i].split(" ");
                points.push({ x: parseFloat(xy[0]), y:parseFloat(xy[1]) });
            }
            property.points=points;

            //箭頭預設參數：兩邊到線垂直距離為3，從線至箭頭頂端為6,如果為mark ，則:具體值*(2.4/1.4)=x*1.71
            //畫箭頭攻略：1、先在原點附近畫好一個正的；2、旋轉到與連線最後一段的斜率；3、移動到連線最後一點；4、渲染出來

            //計算連線最後一段與X軸的角度
            var len=points.length;
            var x = points[len-1].x-points[len-2].x, y = points[len-1].y-points[len-2].y;
            property.angle=Math.atan2(y,x);

            return property;
        },
        renderLines:function(canvas, lines){
            var ctx = canvas.getContext('2d');
            for(var key in lines){
                var line = lines[key];
                ctx.save();
                ctx.setLineDash(line.lineDash?[4,6]:[]);
                ctx.strokeStyle = line.color;
                ctx.lineWidth = line.lineWidth;
                ctx.lineCap = line.lineCap;
                var p = line.points;
                ctx.beginPath();
                ctx.moveTo(p[0].x,p[0].y);
                for(var i=1;i<p.length;++i){
                    ctx.lineTo(p[i].x,p[i].y);
                    if(i!==p.length-1){
                        ctx.moveTo(p[i].x,p[i].y);
                    }
                }
                ctx.closePath();
                ctx.stroke();
                ctx.save();

                //箭頭的渲染
                //畫箭頭攻略：1、先在原點附近畫好一個正的；2、旋轉到與連線最後一段的斜率；3、移動到連線最後一點；4、渲染出來
                ctx.translate( p[p.length-1].x, p[p.length-1].y );
                ctx.rotate(line.angle);
                ctx.fillStyle = line.color;
                ctx.beginPath();
                ctx.moveTo(1*line.lineWidth,0);
                ctx.lineTo(-6*line.lineWidth,-3*line.lineWidth);
                ctx.lineTo(-6*line.lineWidth,3*line.lineWidth);
                ctx.lineTo(1*line.lineWidth,0);
                ctx.closePath();
                ctx.fill();
                ctx.restore();

                //文字渲染
                var ctx2 = canvas.getContext('2d');
                var label = line.label;
                ctx2.fillStyle = label.color;
                ctx2.textAlign='center';
                ctx2.font = label.font;
                ctx2.fillText(label.text,label.left,label.top);
            }

        }
    };
	//擴充套件canvas畫圓角矩形的方法
	CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
		if (w < 2 * r) {r = w / 2;}
		if (h < 2 * r){ r = h / 2;}
		this.beginPath();
		this.moveTo(x+r, y);
		this.arcTo(x+w, y, x+w, y+h, r);
		this.arcTo(x+w, y+h, x, y+h, r);
		this.arcTo(x, y+h, x, y, r);
		this.arcTo(x, y, x+w, y, r);
		this.closePath();
		return this;
	};

	//擴充套件定義導出流程圖檔案功能的方法
	GooFlow.prototype.exportDiagram=function(fileName) {
		var areaEl={};
		var iconImage = undefined;
		var bgUrl = null;
		for(var k1 in this.$areaDom){
			areaEl[k1]=Cmder._analyseArea(this.$areaDom[k1]);
			if(areaEl[k1].icon.backgroundImage && bgUrl===null){
                bgUrl=areaEl[k1].icon.backgroundImage;
			}
		}
		//console.log(areaEl);
		var nodeEl={};
		for(var k2 in this.$nodeDom){
			nodeEl[k2]=Cmder._analyseNode(this.$nodeDom[k2]);
            if(nodeEl[k2].icon.backgroundImage && bgUrl===null){
                bgUrl=nodeEl[k2].icon.backgroundImage;
            }
		}
		//console.log(nodeEl);

        var max = this._suitSize();
        var width = (max.width+100)*this.$scale;
        var height = (max.height+100)*this.$scale;
        var canvas = Cmder.initBg(width,height,'#ffffff');//canvas背景元素
        var Goo=this;

        if(bgUrl!==null){
            iconImage = new Image();
            iconImage.setAttribute('crossOrigin', 'anonymous');
            iconImage.src = bgUrl;
        }

		var tempFunc=function(){
            Cmder.renderAreas(canvas,areaEl,iconImage);
            Cmder.renderNodes(canvas,nodeEl,iconImage);

            //處理連線
            var ctx = canvas.getContext('2d');//取得畫布的2d繪圖上下文
            ctx.restore();
            if(window.ActiveXObject || "ActiveXObject" in window || navigator.userAgent.indexOf("Edge")>-1){//當為IE11及以下版本瀏覽器時，使用Canvg第三方工具
                var lineEl={};
                for(var key in Goo.$lineDom){
                    lineEl[key]=Cmder._analyseLine(Goo.$lineDom[key]);
                }
                //console.log(lineEl);
                Cmder.renderLines(canvas,lineEl);
                try{
                    var blob = canvas.msToBlob();
                    navigator.msSaveBlob(blob, fileName+".png");
                }
                catch(e){
                    //產生一個下載鏈接並點選
                    var base64 = canvas.toDataURL('image/png');  //將畫布內的資訊導出為png圖片數據
                    $('body').append('<img src="'+base64+'" id="aaaa" name="fileName">');
                    var oPop=window.open("",'_blank');
                    for (; oPop.document.readyState !== "complete";) {
                        if (oPop.document.readyState === "complete") break;
                    }
                    oPop.document.write('<html><head><title>'+fileName+'.png</title></head><body><img src="'+base64+'" border="1" title="'+fileName+'.png"></body></html>');
                }
            }else{
                var strSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="'+width+'" height="'+height+'">'
                    +'<defs><style type="text/css">text{font-size:14px;line-height:1.42857143;'
                    +'font-family:"Microsoft Yahei", "Helvetica Neue", Helvetica, Hiragino Sans GB, WenQuanYi Micro Hei, Arial, sans-serif;'
                    +'}</style></defs>' + $("#draw_"+Goo.$id).html() +'</svg>'; //COPY連線內容
                var image = new Image();
                image.src='data:image/svg+xml,'+ encodeURIComponent(strSvg);
                image.onload=function(){
                    ctx.drawImage(image, 0, 0);
                    var a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
                    a.href = canvas.toDataURL('image/png');  //將畫布內的資訊導出為png圖片數據
                    a.download = fileName+".png";  //設定下載名稱
                    document.body.appendChild(a);
                    a.click(); //點選觸發下載
                    document.body.removeChild(a);
                };
            }
		};
		// 如果圖片已經存在於瀏覽器快取，直接呼叫回撥函式
        if(!iconImage || iconImage.complete|| (!!window.ActiveXObject||"ActiveXObject" in window) ) {
            tempFunc();
            return;// 直接返回，不用再處理onload事件
        }
        iconImage.onload=function(){
            tempFunc();
        };

	}
}));