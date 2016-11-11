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
			_this.dragScale("#navRight");
			_this.dragScale("#e0");
			_this.dragScale("#e1");
			/*******intit tool******/
			_this.toolRunFun();

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
			_this.moveEle("#"+json.id);
			this.dragScale("#"+json.id);

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

		//拖拽属性


		_this.eMinHeight = 30; //最小宽度高度
		_this.eMinWidth = 30;
		_this.eMinTriger = 4; //边界数

		_this.cursor = ["n-resize","se-resize","text","default"]; //上下左右
		// *****************
		_this.scaleOnoff = function(ev,width,height){
			return ((ev.offsetX>=width-_this.eMinTriger*2)&&(ev.offsetY>=height-_this.eMinTriger*2))
		}
		

		
		// *****************
		_this.dragScale = function(obj){ //控制控件右下角缩放
			$(obj).mousemove(function(ev){
					var width = $(obj).innerWidth();
					var height = $(obj).innerHeight();
					var oLeft =  $(obj).offset().left;
					var oTop = $(obj).offset().top;
				if(ev.offsetX>=_this.eMinTriger&&ev.offsetY>=_this.eMinTriger&&ev.offsetX<=width-_this.eMinTriger&&ev.offsetY<=height-_this.eMinTriger){
			  		$(obj).css("cursor",_this.cursor[2]);
			  		
			  	}else{	
					  	if(_this.scaleOnoff(ev,width,height)){ //
					  		$(obj).css("cursor",_this.cursor[1])
					  		
					  		_this.addWH({
				  				x : ev.clientX,
				  				y : ev.clientY,
				  				obj : obj,
				  				width : width,
				  				height : height,
				  				left : oLeft,
				  				top : oTop,
				  				dir : 4
				  			})
				  			
					  	}	
					  	
				  	}
			});
		}
		
		_this.addWH = function(json){
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
			
	};	 //ppt ending---
		
	ppt_edit.prototype.drag = function(obj){ //拖动改变鼠标
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
		_this.drag(obj);
		var left,top,x,y;
		return (function(){
			$(obj).mousedown(function(ev){
				x = ev.clientX;
				y = ev.clientY;
				left = $(obj).offset().left;
				top = $(obj).offset().top;
				if(ev.clientY - $(obj).offset().top <= _this.eMinTriger * 2){
					$(document).mousemove(function(ev){
						$(obj).css("left",left+(ev.clientX - x)+'px');
						$(obj).css("top",top+(ev.clientY - y)+'px');
					})
					$(document).mouseup(function(){
						$(document).unbind("mousemove");
						$(document).unbind("mouseup");
					})
				}
			})
		})();
	}
	/**********************common function*****************/
	//fn run once
	ppt_edit.prototype.single = function(fn){
		var result;
		return function(){
			return (result || (result = fn.apply(this,arguments)));
		}
	}
	//down move up 
	ppt_edit.prototype.downMoveUp = function(obj,fn1,fn2,fn3){
		var _this = this;
		return function(){
			$(obj).mousedown(function(ev){
				if(fn1)
					var json = fn1.apply(_this,arguments); 
				$(document).mousemove(function(ev){
					Array.prototype.push.call(arguments,json); //将fn1返回的参数放到arguments里面
					if(fn2)
						fn2.apply(_this,arguments);
				})
				$(document).mouseup(function(ev){
					$(document).unbind("mousemove");
					$(document).unbind("mouseup");
					if(fn3)
						fn3.apply(_this,arguments); 
				})
			})	
		};
		
	}
	// add cover all
	ppt_edit.prototype.addCover = function(fn1){
		var _this = this;
		return (function(){
			var fn = function(){  //add cover
				var div = document.createElement("div");
				div.id = "cover";
				document.body.appendChild(div);
				$("#cover").css({
					"position":"fixed",
					"width"  :"100%",
					"height" : "100%",
					"top" : "0",
					"background" : "black",
					"opacity" : "0"
				})
				return div;
			}
			var add = _this.single(fn);
			if(add()){  //click to close cover and run fn1
				$("#cover").click(function(){
					$(this).css("display","none");
					return fn1.apply(_this,arguments);
				})
				$("#cover").css("display","block");
			}
		})();
		
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
	//draw canvas to choose color
	ppt_edit.prototype.colorChoose = function(obj){ 
		
		var ctx =document.getElementById('canvas').getContext("2d");
		var circle; 
		
		
		var drawImgAndred = function(){ //画底色和填充图片
			ctx.fillStyle="red";
			ctx.fillRect(0,0,150,150);
			var img = document.getElementById('clImg');
			ctx.drawImage(img,0,0);
		}
		
		drawImgAndred();	
		
		
		var drawCircle = function(x,y){ //画圆圈
			ctx.beginPath();
			ctx.clearRect(0,0,150,150);
			drawImgAndred();
			ctx.arc(x - $(obj).offset().left,y - $(obj).offset().top,5,0,2*Math.PI);
			ctx.stroke();
		}
		var fn1 = function(){ // mousedown fn
			var ev = arguments[0];
			return (function(){
				drawCircle(ev.clientX,ev.clientY);
				return {
					x : ev.clientX,
					y : ev.clientY,
					left : $(obj).offset().left,
					top : $(obj).offset().top
				}	
			})();
		}
		var fn2 = function(){ // mousemove fn
			var ev = arguments[0];
			ctx.beginPath();
			drawImgAndred();
			ctx.arc(ev.clientX - $(obj).offset().left,ev.clientY - $(obj).offset().top,5,0,2*Math.PI); 
			ctx.stroke();
			var imgDate = ctx.getImageData(ev.clientX - $(obj).offset().left,ev.clientY - $(obj).offset().top,1,1);
			var rgb = "rgb("+imgDate.data[4]+","+imgDate.data[5]+","+imgDate.data[6]+")";
			$(".fontColors").css("background",rgb);

		}
		var move = new _this.downMoveUp(obj,fn1,fn2);
		move();
	}
/*************meau list***************/
	ppt_edit.prototype.addlistFun = function(){  //add textarea
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
/***************toll list*****************/
ppt_edit.prototype.toolFun = {  	//tool singletons


}
ppt_edit.prototype.toolRunFun = function(){
	 
	_this.toolFun.clickColor();
	_this.toolFun.tTextAlign();
}
ppt_edit.prototype.toolFun.clickColor = function(){ //choose color
	var fn = function(){
		$("#canvas").css("display","none");
	}
	$(".fontColors").click(function(){
		$("#canvas").css("display","block");
		_this.colorChoose("#canvas");
		_this.addCover(fn);

	})
}
ppt_edit.prototype.toolFun.tTextAlign = function(){
	var a;
	
	for(var i = 0;i<$(".tTextAlign>a").length;i++){
		
		(function(i){
			$(".tTextAlign>a:eq("+i+")").click(function(){
				alert(i)
			})	
		})(i);
	}
	
}
/**********************ending...*************************/
	var ppt = new ppt_edit();
	ppt.init();
	
})(window);
/**/