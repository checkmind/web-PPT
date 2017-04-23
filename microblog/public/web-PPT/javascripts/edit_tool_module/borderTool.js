define(['edit_fun'],function(ppt){
	_this = ppt;
	var borderObj  = {
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
		},
		init : function(){
			borderObj.borderSet();
			borderObj.borderColor();
			borderObj.borderStyle();
			borderObj.borderRadius();
			borderObj.borderSize();
		}
	}

	borderObj.borderColor = function(){
		var canvas = _this.canvasSing("border",".colorBd",'borderCanvas');
		var colorChoose = _this.single(_this.colorChoose);
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
	borderObj.borderStyle = function(){ //to add border family
		
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
			arr : borderObj.borderStyleArr,
			put : ".borderFamily",
			change : "#toolBorderFamily",
			style : "border-style"
		})
	}
	borderObj.borderSet = function(){ //set border modle
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
	borderObj.borderRadius = function(){

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
	borderObj.borderSize = function(){
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
	borderObj.init();
})