/**
 * Created by JetBrains PhpStorm.
 * User: taoqili
 * Date: 12-1-30
 * Time: 下午12:50
 * To change this template use File | Settings | File Templates.
 */



var wordImage = {};
//(function(){
var g = baidu.g,
	flashObj,flashContainer;

wordImage.init = function(opt, callbacks) {
	showLocalPath("localPath");
	//createCopyButton("clipboard","localPath");
	createFlashUploader(opt, callbacks);
	addUploadListener();
	addOkListener();
};

function hideFlash(){
    flashObj = null;
    flashContainer.innerHTML = "";
}
function addOkListener() {
	dialog.onok = function() {
		if (!imageUrls.length) return;
		var urlPrefix = editor.getOpt('imageUrlPrefix'),
            images = domUtils.getElementsByTagName(editor.document,"img");
        editor.fireEvent('saveScene');
		for (var i = 0,img; img = images[i++];) {
			var src = img.getAttribute("word_img");
			if (!src) continue;
			for (var j = 0,url; url = imageUrls[j++];) {
				if (src.indexOf(url.original.replace(" ","")) != -1) {
					img.src = urlPrefix + url.url;
					img.setAttribute("_src", urlPrefix + url.url);  //同時修改"_src"屬性
					img.setAttribute("title",url.title);
                    domUtils.removeAttributes(img, ["word_img","style","width","height"]);
					editor.fireEvent("selectionchange");
					break;
				}
			}
		}
        editor.fireEvent('saveScene');
        hideFlash();
	};
    dialog.oncancel = function(){
        hideFlash();
    }
}

/**
 * 繫結開始上傳事件
 */
function addUploadListener() {
	g("upload").onclick = function () {
		flashObj.upload();
		this.style.display = "none";
	};
}

function showLocalPath(id) {
    //單張編輯
    var img = editor.selection.getRange().getClosedNode();
    var images = editor.execCommand('wordimage');
    if(images.length==1 || img && img.tagName == 'IMG'){
        g(id).value = images[0];
        return;
    }
	var path = images[0];
    var leftSlashIndex  = path.lastIndexOf("/")||0,  //不同版本的doc和瀏覽器都可能影響到這個符號，故直接判斷兩種
        rightSlashIndex = path.lastIndexOf("\\")||0,
        separater = leftSlashIndex > rightSlashIndex ? "/":"\\" ;

	path = path.substring(0, path.lastIndexOf(separater)+1);
	g(id).value = path;
}

function createFlashUploader(opt, callbacks) {
    //由於lang.flashI18n是靜態屬性，不可以直接進行修改，否則會影響到後續內容
    var i18n = utils.extend({},lang.flashI18n);
    //處理圖片資源地址的編碼，補全等問題
    for(var i in i18n){
        if(!(i in {"lang":1,"uploadingTF":1,"imageTF":1,"textEncoding":1}) && i18n[i]){
            i18n[i] = encodeURIComponent(editor.options.langPath + editor.options.lang + "/images/" + i18n[i]);
        }
    }
    opt = utils.extend(opt,i18n,false);
	var option = {
		createOptions:{
			id:'flash',
			url:opt.flashUrl,
			width:opt.width,
			height:opt.height,
			errorMessage:lang.flashError,
			wmode:browser.safari ? 'transparent' : 'window',
			ver:'10.0.0',
			vars:opt,
			container:opt.container
		}
	};

	option = extendProperty(callbacks, option);
	flashObj = new baidu.flash.imageUploader(option);
    flashContainer = $G(opt.container);
}

function extendProperty(fromObj, toObj) {
	for (var i in fromObj) {
		if (!toObj[i]) {
			toObj[i] = fromObj[i];
		}
	}
	return toObj;
}

//})();

function getPasteData(id) {
	baidu.g("msg").innerHTML = lang.copySuccess + "</br>";
	setTimeout(function() {
		baidu.g("msg").innerHTML = "";
	}, 5000);
	return baidu.g(id).value;
}

function createCopyButton(id, dataFrom) {
	baidu.swf.create({
			id:"copyFlash",
			url:"fClipboard_ueditor.swf",
			width:"58",
			height:"25",
			errorMessage:"",
			bgColor:"#CBCBCB",
			wmode:"transparent",
			ver:"10.0.0",
			vars:{
				tid:dataFrom
			}
		}, id
	);

	var clipboard = baidu.swf.getMovie("copyFlash");
	var clipinterval = setInterval(function() {
		if (clipboard && clipboard.flashInit) {
			clearInterval(clipinterval);
			clipboard.setHandCursor(true);
			clipboard.setContentFuncName("getPasteData");
			//clipboard.setMEFuncName("mouseEventHandler");
		}
	}, 500);
}
createCopyButton("clipboard", "localPath");