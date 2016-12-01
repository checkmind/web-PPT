!(function(window,undefine){
/*
	1，字体大小调整不精确
	2，模拟placeholder没完成
*/

	function ppt_edit(){
		_this = this;
		_this.width = document.documentElement.clientWidth;
		_this.height = document.documentElement.clientHeight;
		_this.rem = _this.width / 3;
		_this.pageNum = 1; //总页数
		_this.pageNow = 0; //当前页数
		_this.nowId=null; //当前id
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
			/*******init font tool******/
			_this.toolRunFun();
			/******init borderTool *******/
			_this.borderFun();
			/******init WhTool*/
			_this.WhToolFun();
		}
		/*
			_this.addEleStyle({
					class : $(this).attr("id"), //第几个节点
					type : "attr",
					name : "value",
					str : $(this).val()
			})
		*/
		_this.addEleStyle = function(json){ //type: text/attr/block/animate   增加属性 函数
			
			if(!json.class)
				return false;
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
			console.log(_this.sectionObj);
		}
		
		/*
			class,type,json
			json = {
				name : str
			}
		*/
		_this.addEleStyles = function(classes,type,json){
			for(var key in json){
				_this.addEleStyle({
					class : classes, //第几个节点
					type : type,
					name : key,
					str : json[key]
				})	
			}
		}
		/*
			json = {
				class : $(this).attr("id"), //第几个节点
				type : "attr",
				name : "value"
			}
		*/
		_this.dropEleStyle = function(json){
			if(!json.class)
				return false;
			if(!json.type) //为该页背景
			{
				 
				delete _this.sectionObj[_this.pageNow]["parameter"][json.name];
			}
			else{
				
				delete _this.sectionObj[_this.pageNow]["element"][json.class][json.type][json.name];
				
			}
		}
		/*
			class,type,json
			json = arr;
		*/
		_this.dropEleStyles = function(classes,type,json){
			for(var key in json){
				_this.dropEleStyle({
					class : classes, //第几个节点
					type : type,
					name : json[key]
				})	
			}
		}
		_this.addEle = function(json){  //增加节点
			//
			var ele  = document.createElement(json.type);
			ele.innerHTML = json.html||null;
			//ele.value = json.value||null;
			ele.id = json.id;
			$(".page:eq("+_this.pageNow+")").append(ele);
			$('#'+ele.id).addClass('dom');
			$('#'+ele.id).attr("contentEditable","true");
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
				var fn = function(){
					$(document).unbind("mousemove");
					$(document).unbind("mouseup",fn);
				}
				$(document).mouseup(fn);
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
				ppt_edit.prototype.likePlaceholder($(obj),true); // get focus placeholder
				x = ev.clientX;
				y = ev.clientY;
				left = $(obj).offset().left;
				top = $(obj).offset().top;
				if(ev.clientY - $(obj).offset().top <= _this.eMinTriger * 2){
					$(document).mousemove(function(ev){
						$(obj).css("left",left+(ev.clientX - x)+'px');
						$(obj).css("top",top+(ev.clientY - y)+'px');
					})
					var fn = function(){
						$(document).unbind("mousemove");
						$(document).unbind("mouseup",fn);
					}
					$(document).mouseup(fn);
				}
			})
		})();
	}
	// placeholder examply
	ppt_edit.prototype.likePlaceholder = function(obj,onoff){
		var html = obj.html();
		if(html==''){
			if(obj.attr('id')=='e1') // is h1
				obj.html('点击添加标题');
			else
				obj.html('点击添加内容');
		}
		else if(html=='点击添加标题' || html == '点击添加内容' ){
			if(onoff){
				obj.html('');
			}
		}
		else
			return;
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
		var _this = this,
			f1return,
			f2return;
		return function(){
			$(obj).mousedown(function(ev){
				if(fn1)
					f1return = fn1.apply(_this,arguments); 
				$(document).mousemove(function(ev){
					Array.prototype.push.call(arguments,f1return); //将fn1返回的参数放到arguments里面
					if(fn2)
					 f2return = fn2.apply(_this,arguments);
				})
				var upFun = function(){

					Array.prototype.push.call(arguments,f2return);
					$(document).unbind("mousemove");
					$(document).unbind("mouseup",upFun);
					if(fn3)
						fn3.apply(_this,arguments); 
					
				}
				$(document).mouseup(upFun);
			})	
		};
		
	}
	//observer
	ppt_edit.prototype.observer = (function(){
		var nameSpace = {},
			listen,
			publish,
			remove,
			createName;
		createName = function(spaceName){
			if(!spaceName)
				return;
			if(!nameSpace[spaceName])
				nameSpace[spaceName] = {};
			var spaces = nameSpace[spaceName];
			listen = function(fname,fn){
			if(!nameSpace[spaceName][fname])
				nameSpace[spaceName][fname] = [];
				nameSpace[spaceName][fname].push(fn);
			}
			publish = function(){
				var fname = [].shift.apply(arguments),
				fns = nameSpace[spaceName][fname];
				if(!fns || fns.length==0)
					return;
				for(var i in fns)
					fns[i].apply(this,arguments);
			}
			remove = function(fname,fn){
				
				var fns = nameSpace[spaceName][fname];
				if(!fn && fns){
					fns.length = 0;
					return;
				}
				for(var i = 0;i<fns.length;i++){
					if(fn == fns[i])
						fns.splice(i,1);
				}
			}
			return {
				listen : listen,
				publish : publish,
				remove : remove
			}
		}
		return {
			createName : createName
		};
		
	})();
	var observer = 	ppt_edit.prototype.observer;
	/*
	observer.createName('duhao').listen("fn",function(){alert(1)});
	observer.createName('uhao').listen("fn",function(){alert(1)});
	observer.createName('duhao').publish("fn");
	observer.createName('uhao').publish("fn");
	*/
	
	ppt_edit.prototype.addCover = function(){
		var _con;
		var fn = function(e){
			for(var i = 0;i<$(".dhCover").length;i++){
		  		_con = $(".dhCover:eq("+i+")");  
			  	if(!_con.is(e.target) && _con.has(e.target).length === 0){ // Mark 1
			  		if(_con.css("display")==="block"){
			  			_con.css("display","none");
			  			
			  		}
			  	}
			}
		}
		
		$(document).click(fn);	
		return false;
}
	ppt_edit.prototype.addCover()
	//var addCover = ppt_edit.prototype.single(ppt_edit.prototype.addCover);
	ppt_edit.prototype.borderNone = function(obj,fn){
		obj.blur(function(){
			_this.nowId = obj.attr("id") //设置当前id
			if(obj.html()===''){
				fn?(fn.apply(this,arguments)):(obj.css("border","1px dotted blue"));
			}
			else{
				
				if(!fn)
					obj.css("border","0");
				else{ 
					fn.apply(this,arguments);

				}
				_this.addEleStyle({
					class : $(this).attr("id"), //第几个节点
					type : "attr",
					name : "value",
					str : $(this).html()
				})
			}
			_this.likePlaceholder(obj);
		})
	}
	//draw canvas to choose color
	/*
	colorChoose({
		id : id,
		fontColors : fontColors, //the color view
		style : style  		//which style should be fill
	})
	*/
	ppt_edit.prototype.colorChoose = function(obj){ 
		var rgb;
		var img = new Image(); // onload backImg

		img.src = 'image/back.png';
		
		var ctx =document.getElementById(obj.id).getContext("2d");
		var drawImgAndred = function(){ 		// draw color and fill img to canvas
			ctx.fillStyle="red";
			ctx.fillRect(0,0,150,150);
			ctx.drawImage(img,0,0);
			img.onload = function(){
				ctx.fillStyle="red";
				ctx.fillRect(0,0,150,150);
				ctx.drawImage(img,0,0);	
			}
		}
		
		drawImgAndred();	
		var fillEleCl = function(ev){
			var imgDate = ctx.getImageData(ev.clientX - $("#"+obj.id).offset().left,ev.clientY - $("#"+obj.id).offset().top,1,1);
			rgb = "rgb("+imgDate.data[4]+","+imgDate.data[5]+","+imgDate.data[6]+")";
			$(obj.fontColors).css("background",rgb);
			$("#"+_this.nowId).css(obj.style,rgb);
			return rgb;
		}
		
		var drawCircle = function(x,y){ 
			ctx.beginPath();
			ctx.clearRect(0,0,150,150);
			drawImgAndred();
			ctx.arc(x - $("#"+obj.id).offset().left,y - $("#"+obj.id).offset().top,5,0,2*Math.PI);
			ctx.stroke();
		}

		var fn1 = function(){ // mousedown fn
			var ev = arguments[0];
			return (function(){
				drawCircle(ev.clientX,ev.clientY);
				rgb = fillEleCl(ev);
				_this.addEleStyle({
						class : _this.nowId, //第几个节点
						type : "block",
						name : obj.style,
						str : rgb
				})
				return {
					x : ev.clientX,
					y : ev.clientY,
					left : $("#"+obj.id).offset().left,
					top : $("#"+obj.id).offset().top
				}	
			})();
		}
		var fn2 = function(){ // mousemove fn
			var ev = arguments[0];
			return (function(){
				ctx.beginPath();
				drawImgAndred();
				ctx.arc(ev.clientX - $("#"+obj.id).offset().left,ev.clientY - $("#"+obj.id).offset().top,5,0,2*Math.PI); 
				ctx.stroke();
				rgb = fillEleCl(ev);
				return {
					rgb : rgb
				}	
			})();
			
		}
		var fn3 = function(){ //mouseup
			if(!arguments[1])
				return;
				
			var rgb = arguments[1].rgb || null;
		
			_this.addEleStyle({
				class : _this.nowId, //第几个节点
				type : "block",
				name : obj.style,
				str : rgb
			})
		}
		var move = new _this.downMoveUp("#"+obj.id,fn1,fn2,fn3);
		move();
		return true;
	}
	ppt_edit.prototype.colorChoose = ppt_edit.prototype.single(ppt_edit.prototype.colorChoose);
	//choose color canvas single
	ppt_edit.prototype.canvasSing = ppt_edit.prototype.single(function(){
		var obj = arguments[0];
		var canvas = document.createElement('canvas');
		canvas.width = 150;
		canvas.height = 150;
		canvas.id = arguments[1];
		$(obj).append(canvas);
		return true;
	}); 
	// create click list and bind obj
	ppt_edit.prototype.createBindLi = function(){

		var obj =  {
			addStyle : function(obj){
				var str = '',
				self = this,
				Arr;
				return (function(){

					for(var key in obj.arr){
						str += "<li><a href='#'>"+obj.arr[key]+"</a></li>";
					}
					$(obj.put).html(str);
					self.bindLi({
						arr : obj.arr,
						liArr : obj.put+">li",
						chage : obj.change,
						style : obj.style
					});
				})();	
			},
			bindLi : function(obj){
				/*
					obj = {
						arr,
						liArr,
						chage,
					}
				*/
				var i = 0;
				for(var key in obj.arr){
					(function(i,key){
						$(obj.liArr+":eq(" + i + ")").click(function(){
							if(!_this.nowId)
								return;
							$(obj.chage).html(obj.arr[key] + "<span class='caret'></span>" );
							$("#"+_this.nowId).css(obj.style,key);
							_this.addEleStyle({
									class : _this.nowId, 
									type : "block",
									name : obj.style,
									str : key
							})
						});
						
					})(i,key);
					i++;
				}
			}
		}
		return obj;
	}
	// four input num to change style
	/*
		json = {
			inputClass : class,
			style1 : style,
			styleArr : style,+
			onoff : onoff
		}
	*/
	
	ppt_edit.prototype.fourInput = function(json){
		var obj = {},
			val;

		for(var i = 0;i<$(json.inputClass).length;i++){
			(function(i){
				$(json.inputClass+':eq('+[i]+')').bind('input propertychange', function() {  
				 	if(json.onoff.prop('checked')){
				    	$(json.inputClass).val($(this).val());
				    	val = $(this).val();
				    	for(var key in json.styleArr){
				    		obj[json.styleArr[key]] = val;
				    		$('#' + _this.nowId).css(json.styleArr[key],val+'px');
				    	}
				    	_this.addEleStyles(_this.nowId,'block',obj)

				    }  
				    else{
				    	_this.addEleStyle({  //add style to json
							class : _this.nowId, 
							type : "block",
							name : json.styleArr[i],
							str : $(this).val()
						})
				    	$('#' + _this.nowId).css(json.styleArr[i],$(this).val()+'px');
				    }
				}); 
			})(i);
		}
	}
	/*
		json = {
			class : class,
			style : style
		}

	*/
	ppt_edit.prototype.oneInput = function(json){ // one input to change style
		$(json.class).bind('input propertychange',function(){
		
			$('#'+_this.nowId).css(json.style,$(this).val()+'px');
		})
	}
/*************meau list***************/
	ppt_edit.prototype.addlistFun = function(){  //add textarea
		return (function(){
			//插入fun
			$(".insert>a:eq(0)").click(function(){
					ppt.addEle({
						id : "e"+(_this.MaxId+1),
						type : "div",
						html : "点击添加内容"
					});
			})
		})();
	}
/***************font toll list*****************/
ppt_edit.prototype.toolFun = {  	//tool singletons
	fontFamilyArr : {
		"Microsoft YaHei" : "Microsoft YaHei",
		"黑体" : "黑体",
		"宋体" : "宋体",
		"楷体" : "楷体",
		"Serif" : "Serif",
		"Sans-serif" : "Sans-serif",
		"Monospace" : "Monospace",
		"Cursive" : "Cursive",
		"Fantasy" : "Fantasy"
	}, // font family
	fontSize : function(){ //fontSize arr
		var arr = [];
		return (function(){
			for(var i = 15; i<=120; i++){
				arr.push(i+'px');	
			}
			return arr;
		})();
	}

}
ppt_edit.prototype.toolRunFun = function(){
	_this.toolFun.fontStyle();
	_this.toolFun.clickColor();
	_this.toolFun.tTextAlign();
	_this.toolFun.tTextSize();
	
}

ppt_edit.prototype.toolFun.clickColor = function(){ //choose color
	
	var changeStyle = function(){
		_this.canvasSing(".colorFt",'bgCanvas');
		$(".colorFt").css("display","block");
		_this.colorChoose({
			id : "fontCanvas",
			fontColors : ".fontColors", //the color view
			style : "color"  		//which style should be fill
		})
		return false;
		
	}
	$(".fontColors").click(changeStyle);
}
ppt_edit.prototype.toolFun.tTextSize = function(){
	var maxLength = $(".barPro").width()-10;
	var arr = _this.toolFun.fontSize();
	var fn1 = function(){
		var ev = arguments[0];
		
		return {
			ev : ev.clientX,
			add : $('.fontCursor').position().left
		};
	}
	var fn2 = function(){
		var ev = arguments[0];
		var obj = arguments[1];
		
		var x = ev.clientX - obj.ev;
		var left = $('.fontCursor').position().left;
		console.log(obj.add,x);
		if( left >105 && x>0)
			return;
		if( left < 0 && x<0)
			return;
		
			$('#fontSpan').html((arr[x]));
			$('.fontCursor').css('left',(obj.add+x)+'px');
			$("#"+_this.nowId).css("font-size",obj.add+x+'px');
			_this.addEleStyle({  //add style to json
						class : $("#"+_this.nowId).attr("id"), 
						type : "block",
						name : "font-size",
						str : arr[x]
			})
		
	}
	var fn3 = function(){
		
	}
	var moveCursor = _this.downMoveUp(".fontCursor",fn1,fn2,fn3);
	moveCursor();
} 
ppt_edit.prototype.toolFun.tTextAlign = function(){ //textalign fun
	var a = ['left',"center",'right'];
	
	for(var i = 0;i<$(".tTextAlign>a").length;i++){
		
		(function(i){
			$(".tTextAlign>a:eq("+i+")").click(function(){

				$("#"+_this.nowId).css("text-align",a[i]);

				_this.addEleStyle({  //add style to json
					class : $("#"+_this.nowId).attr("id"), 
					type : "block",
					name : "text-align",
					str : a[i]
				})
			})	
		})(i);
	}

}

ppt_edit.prototype.toolFun.fontStyle = function(){ //to add font family
	
	var objFun = _this.createBindLi();
	objFun.addStyle({
		arr : _this.toolFun.fontFamilyArr,
		put : ".fontFamily",
		change : "#toolFontFamily",
		style : "font-family"
	})
}
/***************border toll list*****************/
ppt_edit.prototype.borderObj = {
	borderStyleArr : {
		"dotted" : "虚线边框 <span class=\"bstyle dotted\"></span>",
		"dashed" : "虚线边框 <span class=\"bstyle dashed\"></span>",
		"solid"  : "实线边框 <span class=\"bstyle solid\"></span>",
		"double" : "双边框  <span class=\"bstyle double\"></span>",
		"groove" : "凹槽边框 <span class=\"bstyle groove\"></span>",
		"ridge"  : "垄状边框 <span class=\"bstyle ridge\"></span>",
		"inset"  : "嵌入边框 <span class=\"bstyle inset\"></span>",
		"outset" : "外凸边框 <span class=\"bstyle outset\"></span>",
		"hidden" : "隐藏边框 <span class=\"bstyle hidden\"></span>"
	}
}
ppt_edit.prototype.borderFun = function(){
	_this.borderObj.borderSet();
	_this.borderObj.borderColor();
	_this.borderObj.borderStyle();
	_this.borderObj.borderRadius();
	_this.borderObj.borderSize();
}
ppt_edit.prototype.borderObj.borderColor = function(){
	
	var changeStyle = function(event){
		_this.canvasSing(".colorBd",'borderCanvas');
		$(".colorBd").css("display","block");
		_this.colorChoose({
			id : "borderCanvas",
			fontColors : ".borderColors", //the color view
			style : "border-color"  		//which style should be fill
		})
		return false;
	}
	$(".borderColors").click(changeStyle);
}
ppt_edit.prototype.borderObj.borderStyle = function(){ //to add font family
	
	var objFun = _this.createBindLi();
	objFun.addStyle({
		arr : _this.borderObj.borderStyleArr,
		put : ".borderFamily",
		change : "#toolBorderFamily",
		style : "border-style"
	})
}
ppt_edit.prototype.borderObj.borderSet = function(){ //set border modle
	var borderStyle = function(obj){
		return function(){
			if(!_this.nowId)
				return false;
			if(obj.onoff){
				
				$("#"+_this.nowId).css('border','1px solid black');
			}else{
				$("#"+_this.nowId).css('border','none');
			}
		}
	}
	$("#borderOnOff").click(function(){
		var checked = $(this).prop("checked");
		$("#"+_this.nowId).unbind("blur");
		if(checked){
			_this.borderNone($("#"+_this.nowId),borderStyle({
				obj : ".borderSit",
				onoff : true
			}) );
			borderStyle({
				obj : ".borderSit",
				onoff : true
			})();
			
		}
		else{
			_this.borderNone($("#"+_this.nowId));
			borderStyle({
				obj : ".borderSit",
				onoff : false
			})();
		}
	})
}
ppt_edit.prototype.borderObj.borderRadius = function(){

	_this.fourInput({
		inputClass : '.borderRadius',
		style1 : "border-radius",
		styleArr : [
					'border-top-left-radius',
					'border-top-right-radius',
					'border-bottom-left-radius',
					'border-bottom-right-radius'
				],
		onoff : $("#radius")
	})
}
ppt_edit.prototype.borderObj.borderSize = function(){
	_this.fourInput({
		inputClass : '.borderSize',
		style1 : "border-size",
		styleArr : [
					'border-top-width',
					'border-bottom-width',
					'border-left-width',
					'border-right-width'
				],
		onoff : $("#bdSize")
	})
}
/***************WH toll list*****************/
ppt_edit.prototype.WhToolObj = {

}
ppt_edit.prototype.WhToolFun = function(){
	_this.WhToolObj.wAndH();
	_this.WhToolObj.lAndT();
	_this.WhToolObj.clickbgColor();
}

ppt_edit.prototype.WhToolObj.wAndH = function(){
		
		_this.oneInput({
			class : '.boxWidth',
			style : 'width'
		})
		_this.oneInput({
			class : '.boxHeight',
			style : 'height'
		})
}
ppt_edit.prototype.WhToolObj.lAndT = function(){

		_this.oneInput({
			class : '.boxX',
			style : 'left'
		})
		_this.oneInput({
			class : '.boxY',
			style : 'top'
		})
}
ppt_edit.prototype.WhToolObj.clickbgColor = function(){ //choose color
	
	var changeStyle = function(){
		_this.canvasSing(".bgColorTable",'WhbgCanvas');
		$(".bgColorTable").css("display","block");
		_this.colorChoose({
			id : "WhbgCanvas",
			fontColors : ".whBgColors", //the color view
			style : "background"  		//which style should be fill
		})
		return false;
		
	}
	$(".whBgColors").click(changeStyle);
}
/**********************ending...*************************/
	var ppt = new ppt_edit();
	ppt.init();
	
})(window);
/**/