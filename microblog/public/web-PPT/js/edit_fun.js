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
		/*
		_this.sectionObj = [{
			"parameter" : {
				
			},
			"element" : {
				"1_0e0" : {
							"type" : 'div',
							"text" : {
								"value" : "点击添加标题"
							}, //内容
							"attr" : { //attr属性
								"class" : "1_0e0"
							},
							"block" : {  //style属性
								"top" : ".1rem"
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
				"1_0e1" : {
							"type" : 'div',
							"text" : {
								"value" : "点击添加内容"
							}, //内容
							"attr" : { //attr属性
								"class" : "1_0e1"
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
		*/
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
			
			/**************loginOrOut********/
			connect.loginOrOut(function(){
				/*******connect ***********/
				connect.addUserList();
				/*********init muau tool ******/
				_this.muauListFun();
				
				/***********ppt list *********/
				_this.PPTlistFun();
				/***********init bar **********/
				_this.barFun();
				

			});
			/*******give other rely on ***********/
			connect.relyOn.single =  _this.single;
			connect.relyOn.observer = _this.observer;

			

			_this.observer.createName('openPPT').listen("openPPT",function(){
				
								/*********init insert tool*****/
				_this.insertFun();
				/*******init font tool******/
				_this.toolRunFun();
				/******init borderTool *******/
				_this.borderFun();
				/******init WhTool*/
				_this.WhToolFun();
				
				//事件捕捉
				_this.catchFn();
					//初始化根字体
				_this.parentSize();

				_this.pageGoToFns();
				
				

				for(var i =0,len = _this.sectionObj.length;i< len;i++){
					_this.pageGoTo.addPage(false);
					_this.fillView(".page:eq("+i+")",_this.sectionObj[i],i);	
				}
			

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
		_this.addImg = function(){
			var file = document.getElementById('insertImg');
			var types = ['bmp','jpg','png','tiff','gif','pcx','tga','exif','fpx','svg','psd','cdr','pcd','dxf','ufo','eps','ai','raw','WMF'];
			file.value= null;
			file.onchange = function(){
			       var type = file.value.substr(file.value.indexOf('.')+1,file.value.length).toLowerCase();
			       for(var i = 0,len=types.length;i<len;i++){
			          if(i===len-1&&type !== types[i] ){
			                console.log("图片格式不正确!");
			                file.value = null;
			                return false;
			           }
			           if(type===types[i])
			           	break;
			       }
			       readH5(file);
			}
			

			function readH5(file){
		        var file = file.files[0];
		        var read = new FileReader();
		       
		       read.readAsDataURL(file);
		       read.onload = function(){
		       		read.onload = null;
		            var img = new Image();
		            var obj = {};
		            img.onload = function(){
		                img.onload = null;
		                var base64 = "<img src='"+img.src+"'/>";
		                var _id = _this._id+"_"+ _this.pageNow + "e"+(_this.MaxId+1);
		                _this.addEle({
							id :_id,
							type : "div",
							base64 : base64,
							NoEdit : 'false'
						});
						$('.'+_this.nowId).html(base64);
						obj[_id] = img.src;
						_this.upDateFn.base64Push.push(obj);
		               _this.WhToolObj.textAlign();
		            }
		            img.src = this.result;
		       }
		      }
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
		

		
		// *****************
		_this.dragScale = function(obj){ //控制控件右下角缩放
			obj = "."+obj + ':eq(1)';
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
			return false;
			$(json.obj).mousedown(function(ev){
				var x_X = ev.clientX,
				    y_Y = ev.clientY,
				    num = 0,
				    num_H = 0;
				if(!_this.scaleOnoff(ev,json.width,json.height))
					return;
				$(document).mousemove(function(ev){
						 num = (ev.clientX-json.x)||0; //增数
						 num_H = (ev.clientY-json.y)||0;
						$(json.obj).css("width",(num+json.width + "px"));
						$(json.obj).css("height",(num_H+json.height +"px"));
				})
				var fn = function(){
					$(document).unbind("mousemove");
					$(document).unbind("mouseup",fn);
					$('.'+_this.nowId+':eq(0)').css({
					"width":(num+json.width + "px"),
					"height":(num_H+json.height +"px")
					})
					json = {
						width :  _this.percentCal(num+json.width,true),
						height :  _this.percentCal(num_H+json.height,false) 
					}
					_this.addEleStyles(_this.nowId,'block',json)
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
		
	

	//捕捉事件
	ppt_edit.prototype.catchFn = function(){
		let onoffMove = function(ev,target,width,height){
			let topDvalue = ev.clientY - $(target).offset().top;
			let bottomDvalue = ev.clientY - $(target).offset().top-height;
			let leftDvalue = ev.clientX - $(target).offset().left;
			let rightDvalu = ev.clientX - $(target).offset().left-width;
			
			if(topDvalue <= _this.eMinTriger ){
				return true;
			}
			return false;
		}
		$("section").mousemove(function(ev){   //鼠标样式
			var ev = ev || window.event;
			var target = ev.target||ev.srcElement;
			var isChild = /dom/.test(target.className);
			var isImg = $(target)[0].tagName.toLowerCase()==='img';
			var left,top,x,y,width,height;
			var _cursor = function(targ){
					width = targ.innerWidth();
					height = targ.innerHeight();
					if(onoffMove(ev,target,width,height)){
						targ.css("cursor","move");
					}
					else if(_this.scaleOnoff(ev,width,height))
						targ.css("cursor",_this.cursor[1])
					else
						targ.css("cursor","text");	
			}
			if(isChild){
				_cursor($(target));
			}
			if(isImg){
				_cursor($(target).parents('.dom'));
			}	 
		});
		$("section").mousedown(function(ev){  
			var ev = ev || window.event;
			var target = ev.target||ev.srcElement;
			var className = target.className;
			var isChild = /dom/.test(className);
			var isImg = $(target)[0].tagName.toLowerCase()==='img';
			var left,top,x,y,width,height;

			left = $(target).position().left;
			top = $(target).position().top;
			width = $(target).width();
			height = $(target).height()
			x = ev.clientX;
			y = ev.clientY;
			
			if(ev.button==2)
				console.log('右键');
			if(ev.button==0&&isImg){ //如果是图片
				ev.preventDefault();
				$(target).parents('.dom').focus().css('outline','red');
				//return false;
			}
			if(ev.button==0&&isChild){
				_this.nowId = className.split(' ')[0].trim();
				
				if(onoffMove(ev,target,width,height)){  //位置
					$(document).mousemove(function(ev){
						$(target).css("left",left+(ev.clientX - x)+'px');
						$(target).css("top",top+(ev.clientY - y)+'px');
						return false;
					})
					$(document).mouseup(function(){
						let x_x = Math.floor($(target).position().left);
						let y_y =Math.floor($(target).position().top);
						var json = {
							left :  _this.percentCal(x_x,true),
							top :  _this.percentCal(y_y,false)
						};
						
						$('.'+_this.nowId).css("left",x_x+'px');
						$('.'+_this.nowId).css("top",y_y+'px');
						//绑定控件
						$(".boxX").val(x_x)
						$(".boxY").val(y_y)
						_this.addEleStyles(_this.nowId,'block',json)
						$(document).unbind("mousemove");
						$(document).unbind("mouseup");
					})
				}
				if(_this.scaleOnoff(ev,$(target).width(),$(target).height())){  //尺寸
					$(document).mousemove(function(ev){
						var num_W = (ev.clientX-x)||0;
						var num_H = (ev.clientY-y)||0;
						$(target).css("width",(num_W + width + "px"));
						$(target).css("height",(num_H + height +"px"));
						return false;
					})
					$(document).mouseup(function(){
						let w_w = Math.floor($(target).width());
						let h_h = Math.floor($(target).height());
						var json = {
							width :  _this.percentCal(w_w,true),
							height:  _this.percentCal(h_h,false)
						};

						$('.'+_this.nowId).css("width",w_w+'px');
						$('.'+_this.nowId).css("height",h_h+'px');
						//绑定控件
						$(".boxWidth").val(w_w);
						$(".boxHeight").val(h_h);
						_this.addEleStyles(_this.nowId,'block',json)
						$(document).unbind("mousemove");
						$(document).unbind("mouseup");
					})
				}
			}
		})
	}
/*
$(json.obj).mousedown(function(ev){
				var x_X = ev.clientX,
				    y_Y = ev.clientY,
				    num = 0,
				    num_H = 0;
				if(!_this.scaleOnoff(ev,json.width,json.height))
					return;
				$(document).mousemove(function(ev){
						 num = (ev.clientX-x_X)||0; //增数
						 num_H = (ev.clientY-y_Y)||0;
						$(json.obj).css("width",(num+json.width + "px"));
						$(json.obj).css("height",(num_H+json.height +"px"));
				})
				var fn = function(){
					$(document).unbind("mousemove");
					$(document).unbind("mouseup",fn);
					$('.'+_this.nowId+':eq(0)').css({
					"width":(num+json.width + "px"),
					"height":(num_H+json.height +"px")
					})
					json = {
						width :  _this.percentCal(num+json.width,true),
						height :  _this.percentCal(num_H+json.height,false) 
					}
					_this.addEleStyles(_this.nowId,'block',json)
				}
				$(document).mouseup(fn);
			})	

*/


	//拖动函数
	
	ppt_edit.prototype.moveEle = function(obj,onoff){
		_this.drag(obj);
		return false;
		
		var fn1 = function(){
			var ev = arguments[0];
			if(onoff)
				_this.nowId = _this.substringClass($(obj).attr('class'));
			return (function(){
				ppt_edit.prototype.likePlaceholder($(obj),true); // get focus placeholder
				if(ev.clientY - $(obj).offset().top <= _this.eMinTriger * 2){

					return {
						left : $(obj).position().left,
						top : $(obj).position().top,
						evDown : ev
					}
				}
				else
					return false;
			})();
		}
		var fn2 = function(){
			var ev = arguments[0];
			var json = arguments[1];
			
			if(!json)
				return false;
			return (function(){
				
				$(obj).css("left",json.left+(ev.clientX - json.evDown.clientX)+'px');
				$(obj).css("top",json.top+(ev.clientY - json.evDown.clientY)+'px');
				return json;
			})();

		}
		var fn3 = function(){
			var json_old = arguments[1];
			
			if(!onoff) //是否需要被记忆xy
				return;
			/*
				class,type,json
				json = {
					name : str
				}
			*/
					
			 if(!json_old)
			 	return;
			var json = {
						left :  _this.percentCal($(obj).position().left,true),
						top :  _this.percentCal($(obj).position().top,false)
					};
			$("."+_this.nowId).css({
					"left" : json.left,
					"top" : json.top
				})
			_this.addEleStyles(_this.nowId,'block',json)

		}
		var fn = _this.downMoveUp(obj,fn1,fn2,fn3);
		fn();
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
	/*************deep clone *******************/
	ppt_edit.prototype.deepClone = function(json){
		var obj = null;
		if(typeof json[key]==='object')
		{
			obj[key] = (json.constructor===Object)?{}:[];
		}
		else
			return json;
		for(var key in json){
			if(typeof json[key]==='object'){
				obj[key] = (json[key].constructor===Object)?{}:[];
				obj[key] = arguments.callee(obj[key]);
			}	
			else{
				obj[key] = json[key];
			}
		}
		return obj;
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
/*************PPT pageGoToFns*****************/
ppt_edit.prototype.pageGoTo={
	
	pageStyle : function(){
		var that= this;
		//$(view.pageGoTo).insertBefore($("#addPage"));
		$(".pageGoTo").addClass('pageGoToFns');
		setTimeout(function(){
				that.initPageCan();
				$(".pageGoTo").css("display","block");
				$("#addPage").click(function(){
						that.addPage(true);
				});
		},300)
	
	},
	initPageCan : function(){

		var x = _this.page.x,
			y = _this.page.y;
		$(".pageGoToFns").css("width",x+'px');
		$(".pageGoToFns").css("height",y*5+'px');
		/*
		for(var i =0;i< _this.sectionObj.length;i++){
			$(view.pageGoTo).insertBefore($("#addPage"));
			displayView(".cPage:eq("+i+")","pageClone",'['+JSON.stringify(_this.sectionObj[i])+']',0);	
		}
		*/
	},
	addPage : function(onoff){ //是否需要增加 sectionObj里面的对象数组
		$(view.pageGoTo).insertBefore($("#addPage"));
		$("section").append(view.headTitle);
		$(".cPage").css("height",_this.page.y+"px");
		
		_this.pageNow = _this.pageNum++;
		if(onoff)
			_this.upDateFn.pushs({name:'addPage'});

		_this.eleScale.push({
			"element": {
				
			}
		});
	
		this.cutPage(_this.pageNow);
	},
	addPageEvent : function(){
		that = this;
		$(".cPage").css("height",_this.page.y+"px");
		_this.pageNow =	_this.pageNum++;
		$("#addPage").click(function(){
			that.addPage(true);
		});
		that.cutPage(_this.pageNow);
	},
	cutPage : function(num){
		var	that = this;
		$('.cPage:eq('+num+')').click(function(){
			$(".page:eq("+(_this.pageNow)+")").css("display","none");
			$(".page:eq("+num+")").css("display","block");
			
			_this.pageNow = num;
		})   
	}
}
ppt_edit.prototype.pageGoToFns = function(){
	_this.pageGoTo.pageStyle();
	
}
/*************PPT list ***************/

ppt_edit.prototype.PPTlist = {
	sort: '{"page":1,"pageNum":6,"sort":{"pptCreateDate":-1}}',
	page : 1, //当前第几页
	pageNum : 6,
	sortList :  "pptCreateDate",
	sortOrder : -1,
	pageAll : 2,
	pptName : function(name,pas){
		if(!name){
			connect.toast("未输入PPTName");
			return false;
		}
		return true;
	},
	passWord : function(name,pas){
		if($("#unPublic input[name=public]:checked").val()&&!pas){
			connect.toast("未输入密码");
			return false;
		}
		return true;
	}
	
}
ppt_edit.prototype.PPTlistFun = function(){
	_this.observer.createName('login').listen('pptList',function(){
			$('body').append(view.myPPTList);
			_this.PPTlist.pageAll = arguments[1];
			for(var key in _this.PPTlist.pageOperate){
				_this.PPTlist.pageOperate[key]();
			}
			_this.PPTlist.addListEle(arguments[0],true);

	})
	_this.PPTlist.new_ppt();
	
}

ppt_edit.prototype.PPTlist.appendPPTList = function(){
	var obj = arguments[0],
	onoff = arguments[1]; //是否开启动画
	//var thisFun = arguments.callee;
	return (function(){
		
		

		_this.PPTlist.addPPTlistBody(obj);
		if(onoff)
			setTimeout(function(){
				$('.myPPTList').css({"bottom":0,"transition":'.5s'});
			},50);
		
		return true;
	})();
}
ppt_edit.prototype.PPTlist.addListEle = ppt_edit.prototype.single(ppt_edit.prototype.PPTlist.appendPPTList);

ppt_edit.prototype.PPTlist.addPPTlistBody = function(obj){
	var len = obj.length,
	str = '',
	itObj;
	var getItObj = function(num,obj){
		return {
			pptCreateDate : obj[num].pptCreateDate,
			pptLastAlterDate : obj[num].pptLastAlterDate,
			pptName : obj[num].pptName,
			public : obj[num].public,
			sectionObj :obj[num].sectionObj,
			_id 	: obj[num]._id
		}
	}
	return (function(){
	
		for(var i = 0;i < len; i++){
			var itObj = getItObj(i,obj); 
			var fn1 = _this.PPTlist.appendPPT.
						afterFun( _this.PPTlist.fillCoverIt.
						afterFun( _this.PPTlist.operatePPT.
						afterFun(_this.PPTlist.fillPPT) ) );
			fn1(i,itObj);
		}
	})();

	
}
ppt_edit.prototype.PPTlist.appendPPT = function(){

	$(".myPPTbody").append(view.PPTlistBody);
	return true;
}

ppt_edit.prototype.PPTlist.fillCoverIt = function(index,itObj){
	
			$('.lastAlterTime:eq('+ index +')>span').html(_this.formatDateTime(new Date(itObj.pptLastAlterDate)));
			$('.thisPPTid:eq('+ index +')').val(itObj._id);
			$('.thisPPTpsWord:eq('+ index +')').val(itObj.psWord);
			$('.pptInf:eq('+ index +') span:eq(0)').html(itObj.pptName);
			$('.pptInf:eq('+ index +') span:eq(1)').html(_this.formatDateTime(new Date(itObj.pptCreateDate)));
			return true;
}
ppt_edit.prototype.PPTlist.operatePPT = function(index){

				$('.mngerIt:eq('+index+') a:eq(0)').click(function(){  //delete this ppt
					_this.myComfire("确认删除？",function(){
						var id = $('.thisPPTid:eq('+ index +')').val();
						connect.deletePPT(id,function(){
							$('.PPTlistBody:eq('+index+')').css({"display":"none"});
						})
					})
				})

				$('.mngerIt:eq('+index+') a:eq(1)').click(function(){  //edit this ppt
					var id = $('.thisPPTid:eq('+ index +')').val();
					connect.openPPT(id,function(){
						var obj = arguments[0],
							str = {};
						$("section").html('');
						if(obj.sectionObj.length!=0){
							_this.sectionObj = obj.sectionObj;
						}
						_this._id = obj._id;
						_this.pptName = obj.pptName;
						_this.pptCreateDate = obj.pptCreateDate;
						_this.pptLastAlterDate = obj.pptLastAlterDate;
						_this.public = obj.public;
						
						_this.observer.createName('openPPT').publish("openPPT");	
						$('.myPPTList').css({"bottom":'-70%',"transition":'1s'});
						
					})
				})
				$('.mngerIt:eq('+index+') a:eq(2)').click(function(){  //look this ppt

					window.open("index.html?_id="+ $('.thisPPTid:eq('+ index +')').val(),'_blank');
				})
				$('.mngerIt:eq('+index+') a:eq(3)').click(function(){  //safe this ppt
					
				})
				return true;
}
ppt_edit.prototype.PPTlist.fillPPT = function(index,itObj){

	displayView(".pageClone:eq("+index+")",itObj.sectionObj);
}
ppt_edit.prototype.PPTlist.new_ppt = function(){
	//$("section").append(view.new_PPT); //add #new_ppt
	var getItObj = function(obj){
		return {
			pptCreateDate : obj.pptCreateDate,
			pptLastAlterDate : obj.pptLastAlterDate,
			pptName : obj.pptName,
			public : obj.public,
			sectionObj :obj.sectionObj,
			_id 	: obj._id
		}
	}
	var open = function(){
		_this.createWindow(view.new_option,".new_option",".close_option");
		$("#cover").css('display','block');
		$(".new_option").css('display','block');

		$("#public").click(function(){
			$(".n_body li:eq(2)").css('display',"none");

		})
		$("#unPublic").click(function(){

			$(".n_body li:eq(2)").css('display',"block");	
		})
		$("#createNew").click(function(){
			var that = _this.PPTlist,
			 
			 	name = $("#newPptName").val(),
				psw = $("#newPptPsw").val()||null,
				public = !!$("#unPublic input[name=public]:checked").val(),
				fn = that.pptName.afterFun(that.passWord.afterFun(function(){
						connect.new_PPT(name,public,psw,function(json){
							$("#cover").css('display','none');
							$(".new_option").css('display','none');
							_this._id=json.obj._id;
							_this.pptName = json.obj.pptName;
							var fn1 = _this.PPTlist.appendPPT.afterFun( _this.PPTlist.fillCoverIt.afterFun( _this.PPTlist.operatePPT.afterFun(_this.PPTlist.fillPPT) ) );
													
							fn1($(".PPTlistBody").length,getItObj(json.obj));
							_this.observer.createName('openPPT').publish("openPPT");
					});
				}));
				
				fn(name,psw);
			
				
		})
	}
	$("#new_ppt").click(function(){
		
		open();
	})
	$('.userList>li:eq(1)').click(function(){

		open();	
	})

	
}
/*
sortList : "pptCreateDate",
	sortOrder : -1, '{"page":1,"pageNum":6,"sort":{"pptCreateDate":-1}}'
*/
ppt_edit.prototype.PPTlist.pageOperate = {
	getPPT : function(){ //获得ppt列表
		var that = this;
		return function(){
			_this.PPTlist.sort = '{"page":'+_this.PPTlist.page+',"pageNum":'+_this.PPTlist.pageNum+',"sort":{"'+_this.PPTlist.sortList+'":'+_this.PPTlist.sortOrder+'}}';
			connect.findPPT(_this.PPTlist.sort,function(json){
				if(json.statu){
						$(".myPPTbody").html('');
						_this.PPTlist.appendPPTList(json.object,false);
				}
				else
						alert(json.inf)
			});	
		}
		
	},
	refreshSort : function(){
		var that = this;
		
		return (function(){
			$("#sort").click(_this.PPTlist.pageOperate.getPPT());
			for(var i=0;i< $(".sortList>a").length;i++){ 
				(function(i){
					$(".sortList>a:eq("+i+")").click(function(){
						$("#sortList").html($(this).html()+"  <span class=\"caret\"></span>");
						_this.PPTlist.sortOrder = $(this).attr('tabindex');
					})
					$(".sortObj>a:eq("+i+")").click(function(){
						$("#sortObj").html($(this).html()+"  <span class=\"caret\"></span>");
						_this.PPTlist.sortList = $(this).attr('tabindex');
					})
				})(i);
			}	
		})();
	},
	nextPage : function(){
		var that = this;
		$("#nextPage").click(function(){
	
			if(_this.PPTlist.page!==_this.PPTlist.pageAll){
				_this.PPTlist.page++;
				that.getPPT()();
				
			}
			else{
				alert("到最后一页了!");
			}
		});
	},
	lastPage : function(){
		$("#lastPage").click(function(){
			if(_this.PPTlist.page!==1){
				_this.PPTlist.page--;
				_this.PPTlist.pageOperate.getPPT()();

			}else{
				alert("已经到第一页了!");
			}
		});
	},
	refreshList : function(){
		var that = this;
		$(".myPPThead #refresh").click(_this.PPTlist.pageOperate.getPPT())
	},
	closePPT : function(){
		$(".myPPThead #close").click(function(){
			$('.myPPTList').css({"bottom":'-70%',"transition":'.5s'});
		})
	},
	pageChange : function(){
		var that = this;
		return (function(){
			var pageAll =_this.PPTlist.pageAll;
			var ar1 = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
			var ar2 = ["十"];
			var str = '';
			var fn = function(page){
				var msg=1; //中文汉字
				if(0<page<10){
					msg = ar1[page]; 
				}
				if(20>page>=10){
					if(page==10)
						msg = ar2[0];
					else{
						msg = ar2[0] + ar1[page.substring(1)];
					}
				}
				if(page>=20){
					msg = ar1[page.substring(0)] + ar1[page.substring(1)];
				}
				return msg;	
			} // fn ending
			var addList = function(){
				var pageList = document.getElementById('pageList'),
				pageList = pageList.getElementsByTagName('a');
				for(var i=0;i<pageList.length;i++){ 
						(function(){
							pageList[i].onclick = function(){
								
								$(".pageCg").html($(this).html()+"  <span class=\"caret\"></span>");
								_this.PPTlist.page = $(this).attr('tabindex')/1;
								that.getPPT()();
							}
						})();
						
				}
			}
			for(var i =1;i<=pageAll;i++){
				str += '<a role=\"menuitem\" tabindex='+i+' href=\"#\" >第'+fn(i)+'页</a>';
			}
			
			$("#pageList").html(str);
			addList();
		})();
	}				
};
/*************meau list***************/
	ppt_edit.prototype.meauList = {

	}
	ppt_edit.prototype.muauListFun = function(){
		
		_this.meauList.login();
		_this.meauList.saveAll();
		_this.meauList.chagePptName();
	}
	ppt_edit.prototype.meauList.saveAll = function(){
		$("#saveAll").click(function(){
			
			connect.sendSectionObj({
				sectionObj : _this.upDateFn.arr,
				pptName    : _this.pptName,
				_id        : _this._id,
				files      : _this.upDateFn.base64Push
			},function(){			//提交成功
				_this.upDateFn.arr.length = 0; 
				_this.upDateFn.base64Push.length = 0;
			},function(){
				console.log("提交失败");
			});
		});
	}
	ppt_edit.prototype.meauList.login = function(){ // click login and 
		var loginOnce = _this.single(function(){
			connect.login(function(){  	// callback to click single
				var singOnce = _this.single(function(){
						connect.singBody();		
						return true;
					})
				$('#toSing').click(function(){
					
					singOnce();
					$(".singBody").css('display','block');
				})
				
			});
			return true;
		})
		
		$('#myCenter').click(function(){
			var name;
			if(name = $('#loginOrOutId').val()){
				return true;
			}
			loginOnce();
			$(".loginBody").css({'display' : 'block'});
		})
	}
	
	ppt_edit.prototype.meauList.chagePptName = function(){
		$("#pptName").blur(function(){
			connect.chagePptName($(this).val);
		})
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
/*****************insert ui *****************/
ppt_edit.prototype.insert = {

}
ppt_edit.prototype.insertFun = function(){
	_this.insert.addlistFun();
}
ppt_edit.prototype.insert.addlistFun = function(){  //add textarea
		
			$(".insertLi:eq(0)").click(function(){
					ppt.addEle({
						id :_this._id+"_"+ _this.pageNow + "e"+(_this.MaxId+1),
						type : "div",
						html : "点击添加内容"
					});
			})
			$(".insertLi:eq(1)").click(function(){
					ppt.addImg();
			})

		
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
			for(var i = 0; i<=120; i++){
				arr.push(i+'pt');	
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
	_this.toolFun.addCom(); //add commend like b / l /underline
	_this.toolFun.textShadow();
}

ppt_edit.prototype.toolFun.clickColor = function(){ //choose color
	
	var colorChoose = ppt_edit.prototype.single(ppt_edit.prototype.colorChoose);
	var canvas = _this.canvasSing('color',".colorFt",'fontCanvas');
	var changeStyle = function(){
		
		canvas();
		$(".colorFt").css("display","block");
		
		colorChoose({
			id : "fontCanvas",
			fontColors : ".fontColors", //the color view
			style : "color"  		//which style should be fill
		})
		
		return false;
	}
		$(".fontColors").click(changeStyle);
}
ppt_edit.prototype.toolFun.tTextSize = function(){
	
	/*
	var timer_1 = null,
		timer_2 = null;
	var fn1 = function(){
		timer_1 = setInterval(function(){
			size(true);
		},200);
		size(true);
	}
	var fn3 = function(){
		clearInterval(timer_1);

	}
	var move = new _this.downMoveUp("#sizeBig",fn1,null,fn3);
	move(123);
	var fn1 = function(){
		timer_2 = setInterval(function(){
			size(false);
		},200);
		size(false);
	}
	var fn3 = function(){
		clearInterval(timer_2);

	}
	var move2 = new _this.downMoveUp("#sizeSmall",fn1,null,fn3);
	move2();
	var size = function(onoff){
		if(!_this.nowId)
			return false;
		var size = $("."+_this.nowId).css("font-size");
		return (function(){
			size = parseInt(size.substr(0,size.length-2));
			onoff?(size--):(size--);
		//	$('#'+_this.nowId).parent().css('font-size');
			console.log(size)
			document.execCommand('FontSize');
			/*
			$("."+_this.nowId).css("font-size",size);
			_this.addEleStyle({  //add style to json
						class :_this.nowId, 
						type : "block",
						name : "font-size",
						str : _this.emCal(size)
			})
				
		})();
		}
		*/
		var objFun = _this.createBindLi(function(obj,key){
			
			//document.execCommand('FontSize',false,key);
					var spanString = $('<span/>', {'text': document.getSelection()}).css('font-size', key + 'px').prop('outerHTML');

		    document.execCommand('insertHTML', false, spanString);
			
		});
		
		objFun.addStyle({
			arr : _this.toolFun.fontSize(),
			put : ".sizeFamily",
			change : "#toolSizeFamily",
			style : "font-family"
		})
	
	
} 
ppt_edit.prototype.toolFun.tTextAlign = function(){ //textalign fun
	var a = ['left',"center",'right'];
	
	for(var i = 0;i<$(".tTextAlign>a").length;i++){
		
		(function(i){
			$(".tTextAlign>a:eq("+i+")").click(function(){

				$("."+_this.nowId).css("text-align",a[i]);

				_this.addEleStyle({  //add style to json
					id : _this.nowId, 
					type : "block",
					name : "text-align",
					str : a[i]
				})
			})	
		})(i);
	}

}

ppt_edit.prototype.toolFun.fontStyle = function(){ //to add font family
	
	var objFun = _this.createBindLi(function(obj,key){
	
		document.execCommand('FontName',false,key);
	});
	objFun.addStyle({
		arr : _this.toolFun.fontFamilyArr,
		put : ".fontFamily",
		change : "#toolFontFamily",
		style : "font-family"
	})
}
ppt_edit.prototype.toolFun.addCom = function(obj){

	var arr = ['bold','italic','underline'];
	for(var i = 0;i<arr.length;i++){
		(function(i){
			document.getElementById(arr[i]).onclick = function(ev){

				document.execCommand(arr[i],false);
				
			}
		})(i);
	}
	/*
	_this.addExecCommand('bold','bold',null);

	_this.addExecCommand('italic','italic',null);

	_this.addExecCommand('underline','underline',null);
	*/
}
ppt_edit.prototype.toolFun.textShadow = function(){
	var cache = false;
		name = "text-shadow",
		str = '5px 3px 3px #337ab7';
	return (function(){
		$('#textSadow').click(function(){
			
			
			$('.'+_this.nowId).css({"text-shadow":'5px 3px 3px'});	
			_this.addEleStyle({
				id : _this.nowId, //第几个节点
				type : "block",
				name : "text-shadow",
				str : '4px 3px 3px '
			})

			

			cache = !cache;
		})	
	})();
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
	var canvas = _this.canvasSing("border",".colorBd",'borderCanvas');
	var colorChoose = ppt_edit.prototype.single(ppt_edit.prototype.colorChoose);
	var changeStyle = function(event){
		canvas();
		$(".colorBd").css("display","block");
		colorChoose({
			id : "borderCanvas",
			fontColors : ".borderColors", //the color view
			style : "border-color"  		//which style should be fill
		})
		return false;
	}
	$(".borderColors").click(changeStyle);
}
ppt_edit.prototype.borderObj.borderStyle = function(){ //to add border family
	
	var objFun = _this.createBindLi(function(obj,key){
		$("."+_this.nowId).css(obj.style,key);
			_this.addEleStyle({
					id : _this.nowId, 
					type : "block",
					name : obj.style,
					str : key
			})
	});
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
				_this.eleScale[_this.pageNow]['element'][_this.nowId]['border'] = true;
				$("."+_this.nowId).css('border','1px solid black');
			}else{
				$("."+_this.nowId).css('border','none');
			}
		}
	}
	$("#borderOnOff").click(function(){
		var checked = $(this).prop("checked");
		$("."+_this.nowId).unbind("blur");
		if(checked){
			_this.borderNone("."+_this.nowId,borderStyle({
				obj : ".borderSit",
				onoff : true
			}) );
			borderStyle({
				obj : ".borderSit",
				onoff : true
			})();
			
		}
		else{
			_this.borderNone("."+_this.nowId);
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
	var canvas = _this.canvasSing('wHblock','.bgColorTable','WhbgCanvas');
	var colorChoose = ppt_edit.prototype.single(ppt_edit.prototype.colorChoose);
	var changeStyle = function(){
		
		canvas();
		$(".bgColorTable").css("display","block");
		colorChoose({
			id : "WhbgCanvas",
			fontColors : ".whBgColors", //the color view
			style : "background"  		//which style should be fill
		})
		return false;
		
	}
	$(".whBgColors").click(changeStyle);
}
ppt_edit.prototype.WhToolObj.textAlign = function(){  //居中图片
	var left = _this.page.x/2-$('.'+_this.nowId+':eq(0)').width()/2 +'px';
	  
	   $('.'+_this.nowId).css({
	   		left : left,
	   		top : '10%',
	   		display : 'block'
	   })

		json = {
					left : left,
					top : '10%'
				}
		_this.addEleStyles(_this.nowId,'block',json)

}
/**********************ending...*************************/
	
	
	window.onload = function(){
		var ppt = new ppt_edit();
		ppt.init();
		window.ppt = ppt;
	}
})(window);
/**/