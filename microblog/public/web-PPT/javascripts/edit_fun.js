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
		_this.pageNum = 0; //总页数
		_this.pageNow = 0; //当前页数
		_this.nowId=null; //当前id
		_this.MaxId = 0; //当前最大id
 		
		//项目对应参数
		_this._id = null;
		_this.pptName = 1;
		_this.pptCreateDate = null; 
		_this.pptLastAlterDate = null;
		_this.public = null;
		_this.bar = 0;
		_this.pptType = 0; //0 1 类型
		_this.platform = 0; //0 1 平台

		_this.page = {
			
		}
		_this.parentSize = (function(){
			var size = null;
			
			return function(){
				if(size)
					return size;
					var str = '';
					var x = $('section').width();

					var y = x/1.87;
					_this.page = {
						x : x,
						y : y
					};
					var x_y = x/$(".pageGoToFns").width();
					
					$('section').css("height",y+'px');
					$('section').css("height",y+'px');
					x = x/100;
					$('.section').css('font-size',x+'px');
					//$(".pageSm").css("font-size",$(".pageSm").width()/100+'px');
					str = $("section").css("font-size");

					str = str.substr(0,str.length-2);
					str = parseInt(str);

					return size = str; 
			}
		})();
		_this.emCal = function(px){

			var em;
			return (function(){
				em = px/_this.parentSize();
				return em+'em';
			})();
		}
		_this.percentCal = function(px,onoff){
			var percent,
				arr = {},
				sacla = onoff?(_this.page.x):(_this.page.y);
			return (function(){
				percent = (px / sacla)*100;
				return   percent.toFixed() + '%';
			})();
		}
		
		_this.sectionObj = [{
			"parameter" : {
				
			},"element" : {

			}}];

	/*	
	addEleStyle ==>{
			class : $(this).attr("id"), //第几个节点
			page : 1,	//第几页
			type : "attr",
		    name : "value",
			str : $(this).val()
		}
	addEle ==> {
				id :_this._id+"_"+ _this.pageNow + "e"+(_this.MaxId+1),
				type : "div",
				html : "lalal",
				page : 1
	}
	*/
		
		_this.upDateFn = {
			upDateObj : {},
			arr : [],
			base64Push : [], //name:sdfsfalkjlkvclxkj;
			pushs : function(obj){
				var _name = obj.name;
				var _json = obj.json;
				var arr = this.arr;
				var len = arr.length;
				var arrObj = null;
				this.arr.push(obj);
				if(len===0)
					return;
				if(_name==='addEle'||_name==='addPage'){
				
					return;
				}
				for(let i = len-1;i>=0;i--){
					arrObj = arr[i]; 

					if(!arrObj['json'])
						continue;
					if(arrObj['json']['id']===_json.id&&arrObj['json']['type']===_json.type&&arrObj['json']['name']===_json.name){
						
						var it = this.arr.splice(i,1);
							
					}
				}
			}	
		};

		/*
		_this.workerSubstrUpdate = function(){ //简化 upDateFn
			var w = new Worker("js/workerSubstrUpdate.js");
			setInterval(function(){
				w.postMessage({upDateFn:_this.upDateFn,upDateObj:_this.upDateObj});
			},3000);
			w.onmessage = function (event) {
				var data = event.data;
		    	_this.upDateFn =data.upDateFn;
		    	_this.upDateObj = data.upDateObj;
		    };
		}
		*/
		_this.export = function(num){
			return _this.sectionObj[num];
		}
		// _this.eleScale[_this.pageNow]['element'][_this.nowId]['style']
		/*
		_this.eleScale = [{
			"element": {
				"_0e0" : {
					border : false
				},
				"_0e1" : {
					border : false
				}
			}
		}];
		*/
	
		_this.eleScale = [];
		_this.init = function(){  //初始化

			require(['PPTlist']);  //这里注册了 发布订阅 的登陆时间 底部的ppt列表
			/**************loginOrOut********/
			connect.loginOrOut(function(){  

				/*******connect ***********/
				connect.addUserList();
				/*********init muau tool ******/
				//_this.muauListFun();
				require(['meauList']);
				/***********ppt list *********/
				//_this.PPTlistFun();
				
				/***********init bar **********/
				_this.barFun();
				

			});
			/*******give other rely on ***********/
			connect.relyOn.single =  _this.single;
			connect.relyOn.observer = _this.observer;


			_this.observer.createName('openPPT').listen("openPPT",function(){
				
				/*********init insert tool 插入操作 图片 超链接 文本*****/
				require(['insert']);
				/*******init font tool 字体大小样式******/
				require(['fontTool']);
				/******init borderTool 边框大小样式 *******/
				
				require(['borderTool']);
				/******init WhTool 宽度高度位置*/
				require(['WHTool']);
				//事件捕捉
				//_this.catchFn();
				require(['catchFn']);
					//初始化根字体
				_this.parentSize();

				//_this.pageGoToFns();
				require(['ppt_manager_module/pageGoToFns'],function(pageGoTo){

					for(var i =0,len = _this.sectionObj.length;i< len;i++){
						pageGoTo.addPage(false);
						_this.fillView(".page:eq("+i+")",_this.sectionObj[i],i);	
					}
					
				});
			});
			//_this.observer.createName('openPPT').publish("openPPT");	
			
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
			json.page = _this.pageNow;	
			_this.upDateFn.pushs({name:'addEleStyle',json:json});
			return true;
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
					id : classes, //第几个节点
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
		/*
			_this.addEle({
							id :_this._id+"_"+ _this.pageNow + "e"+(_this.MaxId+1),
							type : "div",
							html : "lalal"
			});
		*/
		_this.addEle = function(json){  //增加节点  
			if(json.pageIt)
				page = json.pageIt;
			else 
				page = _this.pageNow;
			var ele  = document.createElement(json.type);
			ele.innerHTML = json.html||null;
			ele.class = json.id;
			ele.setAttribute("class",json.id);
		
			//给 pageSm 增加节点
			var ele_c = document.createElement(json.type);
			ele_c.innerHTML = json.html||null;
			ele_c.class = json.id;
			ele_c.setAttribute("class",json.id);
			$(".cPage:eq("+page+")").append(ele_c);
			$(".page:eq("+page+")").append(ele);
			$('.'+json.id).addClass('dom');
			$('.'+json.id).addClass('domRotate');
			$('.'+json.id).attr("contentEditable",json.NoEdit||true);
			_this.eleScale[_this.pageNow]['element'][json.id] = {border:false};
			_this.borderNone("."+json.id);
			//_this.moveEle("."+json.id+":eq(1)",true);
			//_this.dragScale(json.id);

			_this.nowId = json.id;
			if(!json.onoff){
				json.page = _this.pageNow;
			json.html = spaceAndEnter(json.base64,json.id);
			_this.upDateFn.pushs({name:'addEle',json:json});
			if(json.NoEdit==='false')
				_this.addEleStyle({
					id : _this.nowId, //第几个节点
					type : "attr",
					name : "contentEditable",
					str :  'false'
				})
			//删除无用属性
			delete json.base64;
			delete json.NoEdit;
			}
			return _this.MaxId++;
		}
		
		_this.addLink = function(){
			_this.addEle({
							id :_id,
							type : "div",
							base64 : base64,
							NoEdit : 'false'
			});
		}
		_this.fillView = function(section,data,index){ //添加sectionObj
				
			
				var displayView = function(){ //section-> fill where,className ->canvas div, data  num
					var style = "";
					var attr = "";
					var str = "";
					var ele = '';
					var val = '';
					
				
					$(section).html('');
						//page 属性
						styles = data["parameter"];
						//渲染所有节点
						for(var key_2 in data["element"]){
							style = data["element"][key_2].block;
							attr = data["element"][key_2].attr;
							ele = data["element"][key_2].type;
							if(val = data["element"][key_2]['text'])
							val = data["element"][key_2]['text'].value;
							_this.addEle({  
								id : attr.class,
								type :ele,
								html : _spaceAndEnter(val),
								pageIt : index,
								onoff : true
							});
							for(var key in attr){
								if(key!=='class')
									$("."+attr.class).attr(key,attr[key]);	
							}
							$("."+attr.class).attr('style',parseCss(style));
							
						}
						$(section).attr("style",parseCss(styles));
						$(section).append(str);  //将str装载进对应的section
						x = $(section).width()/100;
						$(section).css('font-size',x +'px');						
			}
			
				displayView();

		}
		//缩放属性

		//拖拽属性


		_this.eMinHeight = 30; //最小宽度高度
		_this.eMinWidth = 30;
		_this.eMinTriger = 10; //边界数

		_this.cursor = ["n-resize","se-resize","text","default"]; //上下左右
		// *****************
		_this.scaleOnoff = function(ev,width,height){
			return ((ev.offsetX>=width-_this.eMinTriger*2)&&(ev.offsetY>=height-_this.eMinTriger*2))
		}
		_this.rotateOnoff = function(){

		}
		

		

		_this.ABS = function(num){  //绝对值
			
			if(num<0)
				return -num;
			else
				return num;
		}
			
	};	 //ppt ending---
		
	



	
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
			return true;
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
				
				if(fn1){
					f1return = fn1.apply(_this,arguments); 
				}
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

	
	/******************aop function ******************/
	Function.prototype.beforeFun = function(beforefn){
		var that = this;
		return function(){
			beforefn&&beforefn.apply(this,arguments);
			return that.apply(this,arguments);
		};
	}
	Function.prototype.afterFun = function(afterfn){
		var that = this;
		return function(){
			var str = that.apply(this,arguments);
			if(str)
				afterfn&&afterfn.apply(this,arguments);
			return str;
		};
	}
	
	/*
	observer.createName('duhao').listen("fn",function(){alert(1)});
	observer.createName('uhao').listen("fn",function(){alert(1)});
	observer.createName('duhao').publish("fn");
	observer.createName('uhao').publish("fn");
	*/
	// turn date
	ppt_edit.prototype.formatDateTime = function (date) {  
		    var y = date.getFullYear();  
		    var m = date.getMonth() + 1;  
		    m = m < 10 ? ('0' + m) : m;  
		    var d = date.getDate();  
		    d = d < 10 ? ('0' + d) : d;  
		    var h = date.getHours();  
		    var minute = date.getMinutes();  
		    minute = minute < 10 ? ('0' + minute) : minute;  
		    return y + '-' + m + '-' + d+' '+h+':'+minute;  
	};  
	ppt_edit.prototype.addCover = function(){
		var _con;

		var fn = function(e){
			var e = e || window.event;
			for(var i = 0;i<$(".dhCover").length;i++){
		  		_con = $(".dhCover:eq("+i+")");  
			  	if(!_con.is(e.target) && _con.has(e.target).length === 0){ // Mark 1
			  		if(_con.css("display")==="block"){
			  			_con.css("display","none");
			  		}
			  	}
			}


		}
		
		$(document).mousedown(fn);	
		document.oncontextmenu = function(){
			
			return false;
		}
		return false;
	}
	ppt_edit.prototype.addCover()
	ppt_edit.prototype.substringClass = function(str){
		var num;
		return (function(){
			num = str.indexOf(" ");
			str = str.substring(0,num); //截取掉多余的dom class属性
			return str;
		})();
	}
	
	//var addCover = ppt_edit.prototype.single(ppt_edit.prototype.addCover);
	ppt_edit.prototype.borderNone = function(obj,fn){

		obj =$( obj +":eq(1)" );
		obj.blur(function(ev){
			
			_this.nowId = _this.substringClass($(obj).attr("class"));
			classObj = $("."+_this.nowId);
			if(obj.html()==='' && !_this.eleScale[_this.pageNow]['element'][_this.nowId]['border']){
				
				classObj.css("border","1px dotted blue")
			}
			else{
				
				if(!fn && !_this.eleScale[_this.pageNow]['element'][_this.nowId]['border'])
				{
					
					classObj.css("border","0");
				}
				else{ 
					//fn.apply(this,arguments);

				}
				html = $(this).html();
				$("."+_this.nowId+':eq(0)').html(html);
				_this.addEleStyle({
					id : _this.nowId, //第几个节点
					type : "text",
					name : "value",
					str :  spaceAndEnter(html,_this.nowId)
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
		var ctx =document.getElementById(obj.id).getContext("2d");
		var color = 'red';
		var colorArr = ["red", "orange", "yellow", "green" ,"Cyan", "blue", "purple"];
		img.src = 'image/back.png';
		for(let i = 0,len=$(".colorBtnCs>li").length;i<len;i++){

			$(".colorBtnCs>li:eq("+i+")").click(function(){
				color=colorArr[i%7]
				drawImgAndred(color);
				rgb = color;
				$("."+_this.nowId).css(obj.style,rgb);
				_this.addEleStyle({
					id : _this.nowId, //第几个节点
					type : "block",
					name : obj.style,
					str : rgb
				})
			})
		}
		
		var drawImgAndred = function(color){ 		// draw color and fill img to canvas
			ctx.fillStyle=color;
			ctx.fillRect(0,0,150,150);
			ctx.drawImage(img,0,0);
			img.onload = function(){
				ctx.fillStyle=color;
				ctx.fillRect(0,0,150,150);
				ctx.drawImage(img,0,0);	
			}
		}
		
		drawImgAndred(color);	
		var fillEleCl = function(ev){
			var imgDate = ctx.getImageData(ev.clientX - $("#"+obj.id).offset().left,ev.clientY - $("#"+obj.id).offset().top,1,1);
			rgb ="#" + imgDate.data[4].toString(16) + imgDate.data[5].toString(16) + imgDate.data[6].toString(16);
			$("."+_this.nowId).css(obj.style,rgb);
			return rgb;
		}
		
		var drawCircle = function(x,y){ 
			
			ctx.beginPath();
			ctx.clearRect(0,0,150,150);
			drawImgAndred(color);
			ctx.arc(x - $("#"+obj.id).offset().left,y - $("#"+obj.id).offset().top,5,0,2*Math.PI);
			ctx.stroke();
		}

		var fn1 = function(){ // mousedown fn
			
			var ev = arguments[0];
			return (function(){
				drawCircle(ev.clientX,ev.clientY);
				rgb = fillEleCl(ev);
				_this.addEleStyle({
						id : _this.nowId, //第几个节点
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
			ev.preventDefault();
			let x = ev.clientX - $("#"+obj.id).offset().left;
			let y = ev.clientY - $("#"+obj.id).offset().top;
			if(x<0||y<0||x>150||y>150)
				return false;
			return (function(){
				ctx.beginPath();
				drawImgAndred();
				ctx.arc(x,y,5,0,2*Math.PI); 
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
				id : _this.nowId, //第几个节点
				type : "block",
				name : obj.style,
				str : rgb
			})
		}
		var move = new _this.downMoveUp("#"+obj.id,fn1,fn2,fn3);
		move();
		return true;
	}
	//
	
	//choose color canvas single
	ppt_edit.prototype.canvasSing = function(str,ar1,ar2){
		
		
		var fn = function(){
			var obj = ar1;
			var canvas = document.createElement('canvas');
			canvas.width = 150;
			canvas.height = 150;
			canvas.id = ar2;
			$(obj).append(canvas);
			
			$(obj).append(view.colorBtnCs);	
			return true;
		}
		
			var obj = {
				color : function(){
							return 	ppt_edit.prototype.single(fn)
						},
				border : function(){
							return ppt_edit.prototype.single(fn);
						},
				wHblock : function(){
					return ppt_edit.prototype.single(fn);
				}
				
			}
		
		
		return ppt_edit.prototype.single(fn);
	}
	
	
	// create click list and bind obj
	ppt_edit.prototype.createBindLi = function(callback){

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
							callback&&callback(obj,key);
							
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
				    		$('.' + _this.nowId).css(json.styleArr[key],val+'px');
				    	}
				    	_this.addEleStyles(_this.nowId,'block',obj)

				    }  
				    else{
				    	_this.addEleStyle({  //add style to json
							id : _this.nowId, 
							type : "block",
							name : json.styleArr[i],
							str : $(this).val()+'px'
						})
				    	$('.' + _this.nowId).css(json.styleArr[i],$(this).val()+'px');
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
			var num,onoff,val=$(this).val();
			
			if(json.style==='width'||json.style==='left')
				onoff = true;
			else
				onoff=false;
			num = _this.percentCal(val,onoff); 
			$('.'+_this.nowId).css(json.style,val+'px');
			_this.addEleStyle({  //add style to json
							id : _this.nowId, 
							type : "block",
							name : json.style,
							str : num
			})
		})
	}
	ppt_edit.prototype.addExecCommand = function(obj,style,value){
		
		
			document.getElementById(obj).onclick = function(){
				document.execCommand(style,false,value||null);
			}
			
			

		
		
	}
/*****************create one window like alert ***************/
ppt_edit.prototype.createWindow = ppt_edit.prototype.single(function(){  //single create cover and optionbody
									var win = arguments[0], // window html ele
									    win_id = arguments[1]; //window html class
									    closeBtn = arguments[2];
									$("body").append(view.cover); //add cover
									$("#cover").append(win);
									$("#cover").click(function(ev){
										$(win_id).css('border','1px solid red');
										setTimeout(function(){
											$(win_id).css('border','none');
										},100)
									});
									$(win_id).click(function(ev){   // stop propagation
										var ev = ev || window.event;
										ev.stopPropagation()
									});
									$(closeBtn).click(function(){ //close window
										$(win_id).css('display','none');
										$("#cover").css('display','none');
									})
									return true;
								});
// comfire function
ppt_edit.prototype.myComfire = function(inf,fn){
	if(window.confirm(inf)){
                 fn&&fn();
                 return true;
	  }else{
	     return false;
	 }
}


	
/***************bar change******************/
ppt_edit.prototype.barObj = {
	barArr : ["begin","insert","animate","displayView","border","shape"],
	changeAll : function(){
		var that = this;
		return (function(){
			for(var i = 0;i<$(".btnCs").length;i++){
				(function(i){
					$(".btnCs:eq("+i+")").click(function(){
						$(".btnCs:eq("+_this.bar+")").css("background","none");
						$('.'+that.barArr[_this.bar]).css("display","none");
						_this.bar = i;
						$(this).css("background","white");
						$('.'+that.barArr[_this.bar]).css("display","block");
						
					})
				})(i);
			}
		})();
		
		
	}
}
ppt_edit.prototype.barFun = function(){

	_this.barObj.changeAll();
}


/**********************ending...*************************/
	
	
	
		var ppt = new ppt_edit();
		ppt.init();
		window.ppt = ppt;
	
})(window);
/**/