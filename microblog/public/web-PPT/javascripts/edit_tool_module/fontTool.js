define(['edit_fun'],function(ppt){
	_this = ppt;
	var toolFun  = {  	//tool singletons
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
		},
		init : function(){
			toolFun.fontStyle();
			toolFun.clickColor();
			toolFun.tTextAlign();
			toolFun.tTextSize();
			toolFun.addCom(); //add commend like b / l /underline
			toolFun.textShadow();
		}
	}
	

	toolFun.clickColor = function(){ //choose color
		
		var colorChoose = _this.single(_this.colorChoose);
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
	toolFun.tTextSize = function(){
		
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
				arr : toolFun.fontSize(),
				put : ".sizeFamily",
				change : "#toolSizeFamily",
				style : "font-family"
			})
		
		
	} 
	toolFun.tTextAlign = function(){ //textalign fun
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

	toolFun.fontStyle = function(){ //to add font family
		
		var objFun = _this.createBindLi(function(obj,key){
		
			document.execCommand('FontName',false,key);
		});
		objFun.addStyle({
			arr : toolFun.fontFamilyArr,
			put : ".fontFamily",
			change : "#toolFontFamily",
			style : "font-family"
		})
	}
	toolFun.addCom = function(obj){

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
	toolFun.textShadow = function(){
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
	toolFun.init();
});