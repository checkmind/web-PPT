/*
	捕捉事件，处理拖动 缩放
*/
define(['edit_fun'],function(ppt){
	_this = ppt;
	var catchFn = {
		init : function(){
			this.bindIt();
		}
	};
	//捕捉事件
	catchFn.bindIt = function(){
		var onoffMove = function(ev,target,width,height){  //是否能被移动
			var topDvalue = ev.clientY - $(target).offset().top;
			var bottomDvalue = ev.clientY - $(target).offset().top-height;
			var leftDvalue = ev.clientX - $(target).offset().left;
			var rightDvalu = ev.clientX - $(target).offset().left-width;
			
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
	catchFn.init();
})