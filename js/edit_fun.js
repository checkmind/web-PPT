!(function(window,undefine){

	function ppt_edit(){
		_this = this;
		_this.width = document.documentElement.clientWidth;
		_this.height = document.documentElement.clientHeight;
		_this.rem = _this.width / 3;
		//拖拽属性

		_this.eMinHeight = 30; //最小宽度高度
		_this.eMinWidth = 30;
		_this.eMinTriger = 4; //边界数
		_this.cursor = ["n-resize","e-resize","default"]; //上下左右
		// *****************
		_this.dragScale = function(obj){ //控制控件缩放
			$(obj).mousemove(function(ev){
					var width = $(obj).width();
					var height = $(obj).height();
					
				if(ev.offsetX>=_this.eMinTriger&&ev.offsetY>=_this.eMinTriger&&ev.offsetX<=width-_this.eMinTriger&&ev.offsetY<=height-_this.eMinTriger){
			  		$(obj).css("cursor",_this.cursor[2]);
			  		
			  	}else{
				  		if(ev.offsetX<=_this.eMinTriger){  //左边
				  			$(obj).css("cursor",_this.cursor[1]);
				  			_this.addWH({
				  				x : ev.clientX,
				  				obj : obj,
				  				width : width
				  			})
					  	}
					  	if(ev.offsetX>=width-_this.eMinTriger){ //右边
					  		$(obj).css("cursor",_this.cursor[1])
					  		_this.addWH({
				  				x : ev.clientX,
				  				obj : obj,
				  				width : width
				  			})
					  	}	
					  	if(ev.offsetY<=_this.eMinTriger){ //上边
					  		$(obj).css("cursor",_this.cursor[0])
					  		_this.addWH({
				  				y : ev.clientY,
				  				obj : obj,
				  				width : width
				  			})
					  		
					  	}
					  	if(ev.offsetY>=height-_this.eMinTriger){ //下边
					  		$(obj).css("cursor",_this.cursor[0])
					  		_this.addWH({
				  				y : ev.clientY,
				  				obj : obj,
				  				width : width
				  			})
					  		
					  	}
				  	}
			});
		}
		_this.addWH = function(json){
			$(json.obj).mousedown(function(ev){
				var x_X = ev.clientX;
				var y_Y = ev.clientY;

				$(json.obj).unbind();
				$(document).mousemove(function(ev){
					$(json.obj).css("width",(ev.clientX-json.x+json.width+1+"px"))
					
					
				
					
				
					
				})
				$(document).mouseup(function(){
					$(document).unbind();
					document.onmousemove = null;
					document.onmouseup = null;
					ppt.dragScale(json.obj);
				})
			})
			
			
		}
		
	}
	var ppt = new ppt_edit();
	ppt.dragScale('#targer');
	ppt.dragScale('#targer2');
})(window);
/**/