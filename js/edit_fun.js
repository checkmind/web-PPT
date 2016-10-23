!(function(window,undefine){

	function ppt_edit(){
		_this = this;
		_this.width = document.documentElement.clientWidth;
		_this.height = document.documentElement.clientHeight;
		_this.rem = _this.width / 3;
		_this.pageNum = 1; //总页数
		_this.pageNow = 0; //当前页数
		_this.id = 0; //当前id
		_this.MaxId = 1; //当前最大id
		_this.sectionObj = [{
			"parameter" : {
				
			},
			"element" : {
				"e0" : {
								"text" : {

								}, //内容
								"attr" : { //attr属性
									"id" : "h1"
								},
								"block" : {  //style属性
									
								},
								"animate" : { //运动参数
									"animateIn" : { //入场动画
										"top" : "1rem"
									},
									"animateOut" : { // 出场动画
										"top" : "3rem"
									}
								}
				
						},
				"e1" : {
					"text" : {

								}, //内容
								"attr" : { //attr属性
									"id" : "h1"
								},
								"block" : {  //style属性
									
								},
								"animate" : { //运动参数
									"animateIn" : { //入场动画
										"top" : "1rem"
									},
									"animateOut" : { // 出场动画
										"top" : "3rem"
									}
								}
				}		
			}

		}];
		_this.init = function(){  //初始化
			_this.addlistFun(); //菜单栏功能
			//初始化标题副标题和菜单栏的拖拽
			_this.moveEle("#navRight")
			_this.moveEle("#e0")
			_this.moveEle("#e1")
			_this.borderNone($("#e0"));
			_this.borderNone($("#e1"));
		}
		_this.addEleStyle = function(json){ //type: text/attr/block/animate   增加属性 函数
			var fun = {
				"text" : function(){
					obj.val(json.str);
				},
				"attr" : function(){
					obj.attr(json.name,json.str);
				},
				"block" : function(){
					obj.css(json.name,json.str);
				},
				"animate" : function(){

				}
			}
			if(!json.type) //为该页背景
			{
				_this.sectionObj[_this.pageNow]["parameter"][json.name] = json.str;
				obj.css(json.name,json.str);
			}
			else{
				
				_this.sectionObj[_this.pageNow]["element"][json.class][json.type][json.name] = json.str;
				
			}
		}
		_this.addEle = function(json){  //增加节点
			//
			var ele  = document.createElement(json.type);
			//ele.innerHTML = json.html||null;
			//ele.value = json.value||null;
			ele.id = json.id;
			ele.placeholder = "请输入内容";
			$(".page:eq("+_this.pageNow+")").append(ele);
			_this.borderNone($("#"+json.id));
			_this.moveEle("#"+json.id)
			var eIndex = $(ele).index(); //下标
			_this.sectionObj[_this.pageNow]["element"]["e"+eIndex] = {
				"text" : {

					}, //内容
				"attr" : { //attr属性
						"id" : json.id
					},
				"block" : {  //style属性
									
								},
				"animate" : { //运动参数
						"animateIn" : { //入场动画
										"top" : "1rem"
									},
									"animateOut" : { // 出场动画
										"top" : "3rem"
									}
							}
				}
			return _this.MaxId++;
		}
		
		//缩放属性

		_this.eMinHeight = 30; //最小宽度高度
		_this.eMinWidth = 30;
		_this.eMinTriger = 4; //边界数
		_this.cursor = ["n-resize","se-resize","text","default"]; //上下左右
		// *****************
		_this.scaleOnoff = function(ev,width,height){
			return ((ev.offsetX>=width-_this.eMinTriger*2)&&(ev.offsetY>=height-_this.eMinTriger*2))
		}
		_this.dragScale = function(obj){ //控制控件缩放
			_this.drag(obj);
			$(obj).mousemove(function(ev){
					var width = $(obj).innerWidth();
					var height = $(obj).innerHeight();
					var oLeft =  $(obj).offset().left;
					var oTop = $(obj).offset().top;
				if(ev.offsetX>=_this.eMinTriger&&ev.offsetY>=_this.eMinTriger&&ev.offsetX<=width-_this.eMinTriger&&ev.offsetY<=height-_this.eMinTriger){
			  		$(obj).css("cursor",_this.cursor[2]);
			  		
			  	}else{
				  		
					  	if(_this.scaleOnoff(ev,width,height)){ //右边
					  		$(obj).css("cursor",_this.cursor[1])
					  		
					  		_this.addWH({
				  				x : ev.clientX,
				  				y : ev.clientY,
				  				obj : obj,
				  				width : width,
				  				height : height,
				  				left : oLeft,
				  				dir : 4
				  			})
				  			
					  	}	
					  	
				  	}
			});
		}
		_this.addWH = function(json){ //增加高度和宽度
			$(json.obj).mousedown(function(ev){
				var x_X = ev.clientX;
				var y_Y = ev.clientY;
				if(!_this.scaleOnoff(ev,json.width,json.height))
					return;
				$(document).mousemove(function(ev){
						var num = (ev.clientX-json.x)||0; //增数
						var num_H = (ev.clientY-json.y)||0;

						$(json.obj).css("width",(num+json.width + "px"));
						$(json.obj).css("height",(num_H+json.height +"px"));
						
				})
				$(document).mouseup(function(){
					$(document).unbind("mousemove");
					$(document).unbind("mouseup");
				})
			})
			
			
		}

		_this.ABS = function(num){  //绝对值
			
			if(num<0)
				return -num;
			else
				return num;
		}
		
		
		
	}	
		
	ppt_edit.prototype.drag = function(obj){ //拖动工具栏
		return (function(){
			$(obj).mousemove(function(ev){

				if(ev.clientY-$(obj).offset().top<=_this.eMinTriger*2){
					$(obj).css("cursor","move");
					
				}
				else
					$(obj).css("cursor","text");
			});

		})();
	}
	//拖动函数
	ppt_edit.prototype.moveEle = function(obj){
		_this.dragScale(obj);
		var left,top,x,y;
		return (function(){

			$(obj).mousedown(function(ev){

				x = ev.clientX;
				y = ev.clientY;
				left = $(obj).offset().left;
				top = $(obj).offset().top;
				if(ev.clientY-$(obj).offset().top<=_this.eMinTriger*2){
					$(document).mousemove(function(ev){

						$(obj).css("left",left+(ev.clientX - x)+'px');
						$(obj).css("top",top+(ev.clientY - y)+'px');
					})
					$(document).mouseup(function(){
						$(document).unbind();
						document.onmousemove = null;
						document.onmouseup = null;
					})
				}
			})
		})();
	}
	//惰性单例
	ppt_edit.prototype.clickInnerNone = function(fn){
		var result;
		return function(){

			return (result || (result = fn.apply(this,arguments)));
			
		}
	}
	
	ppt_edit.prototype.borderNone = function(obj){
		obj.blur(function(){
			
			if(obj.val()===''){
				obj.css("border","1px dotted blue");
			}
			else{
				obj.css("border","0");
				
				_this.addEleStyle({
					class : $(this).attr("id"), //第几个节点
					type : "block",
					name : "value",
					str : $(this).val()
			})
				
			}
		})
	}
/*************菜单栏***************/
	ppt_edit.prototype.addlistFun = function(){  //增加文本框
		return (function(){
			//插入fun
			$(".insert>a:eq(0)").click(function(){
					ppt.addEle({
						id : "e"+(_this.MaxId+1),
						type : "input",
						html : "nihao"
					});
			})
		})();
	}
/***************工具栏*****************/
ppt_edit.prototype.colorTable = function(canvas){
	var w = 230, h = 125,r = [],g = [],b = [];
	return (function(){
		var ctx = canvas.getContext("2d");
		var imgDate = ctx.createImageData(w,h);
		console.log(imgDate.data.length)
		//getImageData(x,y,w,h);
		for(var i = 0 ;i<255;i+=50)
			for(var j = 0;j<255;j+=50)
				for(var k = 0;k<255;k+=50){
					r.push(i);
					g.push(i);
					b.push(k);
				}
		
		for(var i = 0,j=5; i<imgDate.data.length; i+=4){

			imgDate.data[i] = r[i];
			imgDate.data[i+1] = g[i];
			imgDate.data[i+2] = b[i];
			imgDate.data[i+3] = 255;
		}
		
	})();
}
	var ppt = new ppt_edit();
	ppt.init();
	ppt.colorTable(document.getElementById('canvas'));

	

})(window);
/**/