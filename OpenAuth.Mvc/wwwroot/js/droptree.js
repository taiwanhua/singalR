// ***********************************************************************
// Assembly         : OpenAuth.Mvc
// Author           : yubaolee
// Created          : 10-16-2016
//
// Last Modified By : yubaolee
// Last Modified On : 04-02-2019
//                    修改ztree為基於layui的dtree
// ***********************************************************************
// <copyright file="droptree.js" company="www.cnblogs.com/yubaolee">
//     版權所有 玉寶(C) 2017
// </copyright>
//單擊文字框彈出的選擇列表,可以多選。呼叫： 
//var droptree = layui.droptree("/UserSession/GetOrgs", "#Organizations", "#OrganizationIds");
// droptree.render();
// ***********************************************************************

layui.config({
    base: "/js/"
}).define(['jquery', 'layer','dtree'], function (exports) {
    var $ = layui.jquery;
    var layer = layui.layer;
    var dtree = layui.dtree;
    var inst;   //droptree實體

    //構造器
    var  DropTree = function (options) {
        var that = this;
        that.config = $.extend({}, that.config, options);

        var nameObj = $(that.config.nameDOM);
        if (nameObj[0]) {
	        var $events = $._data(nameObj[0], 'events');
	        if ($events && $events["click"]) {
		        console.log("already bind click");
		        return;
	        }
        }
        
        //上級機構選擇框
        $(that.config.nameDOM).on("click", function () {
            layer.open({
                type: 1, //type:0 也行
                title: "選擇",
                area: ["400px", "80%"],
                content: '<ul id="dropTreeSel" class="dtree" data-id="null"></ul>',
                btn: ['確認選擇'],
                success: function(layero, index){
                  var DTree = dtree.render({
                    obj: $(layero).find("#dropTreeSel"), 
                    url: that.config.url,
                    method:'GET',
                    dataFormat:'list',
                      dataStyle: 'layuiStyle',
                    initLevel: "4",
                    response:{
                        statusName: "Code", //返回標識（必填）
                        statusCode: 200, //返回碼（必填）
                        message: "Message", //返回資訊（必填）
                        rootName: "Result", //根節點名稱（必填）
                        treeId: that.config.key, //節點ID（必填）
                        parentId: that.config.parentKey, //父節點ID（必填）
                        title: that.config.text, //節點名稱（必填）
                    },
                    checkbar: that.config.selectedMulti, // 開啟覈取方塊
                    checkbarType:'p-casc',
                    success: function(data, obj){  //使用非同步載入回撥
                        $.each(data.Result,
                            function (i, item) {
                                item.checkArr=[{  //覈取方塊的數據必須加上這個，😰
                                    type:0,
                                    isChecked:0
                                }]
                            })
                       },
                    done: function(data, obj){  //使用非同步載入回撥
                        var checkedIds = $(that.config.idDOM).val();
                        if (that.config.selectedMulti) {
	                        dtree.chooseDataInit("dropTreeSel", checkedIds); // 初始化覈取方塊的值
                        } else {
                            dtree.dataInit("dropTreeSel", checkedIds);
                        }
                    }
                  });

                   // 繫結節點的雙擊
                   dtree.on("nodedblclick('dropTreeSel')", function(obj){
                        $(that.config.idDOM).val(obj.param.nodeId);
                        $(that.config.nameDOM).val(obj.param.context);
                        $(that.config.idDOM).change(); 

                        layer.close(index);
                    });
                },
                yes: function(index, layero) {
                  var flag = true;
                  var ids=[];
                  var names=[];
                  if(that.config.selectedMulti){  //多選
                    var multi = dtree.getCheckbarNodesParam("dropTreeSel"); // 獲取選中值
                      if (multi.length == 0){
                      layer.msg("請至少選擇一個節點",{icon:2});
                      flag = false;
                    }
                    
                      for (var key in multi){
                          var param = multi[key];
	                      ids.push(param.nodeId);
	                      names.push(param.context);
                    }
                  }
                  else{ //單選
                    var single = dtree.getNowParam("dropTreeSel"); // 獲取當前選中節點
                      if (single == null){
                        layer.msg("請至少選擇一個節點",{icon:2});
                        flag = false;
                    }
                      ids.push(single.nodeId);
                      names.push(single.context);
                  }
                  
                  $(that.config.idDOM).val(ids.join(","));
                  $(that.config.nameDOM).val(names.join(","));
                  if(options.callback){
                      options.callback(ids.join(","), names.join(","));
                  }
                  $(that.config.idDOM).change(); 
                  if(flag){
                    layer.close(index);
                  }
                }
              });
        });
     };
     
    //預設配置
    DropTree.prototype.config = {
        text: 'Name',
        key: 'Id',
        parentKey: 'ParentId',
        callback:null,   //選中后的回撥
        selectedMulti: true    //預設是多選
        
    };

    exports('droptree', function (url, name, id, selectedMulti,callback) {
      var options = {
            nameDOM: name,   //顯示的文字框ID，如："#catetoryName"
            idDOM: id,   //隱藏的文字框，如："#categoryId"
            url: url, 
            callback:callback,  //選中后的回撥
            selectedMulti: selectedMulti  //是否為多選
        }
        inst = new DropTree(options);
        return inst;
    });
});