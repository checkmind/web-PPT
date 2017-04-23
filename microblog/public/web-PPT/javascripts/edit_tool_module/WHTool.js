define(['edit_fun'],function(ppt){
	var _this = ppt;
	var WhToolObj = {
		init : function(){
			WhToolObj.wAndH();
			WhToolObj.lAndT();
			WhToolObj.clickbgColor();
		}
	};
	WhToolObj.wAndH = function(){
			
			_this.oneInput({
				class : '.boxWidth',
				style : 'width'
			})
			_this.oneInput({
				class : '.boxHeight',
				style : 'height'
			})
	}
	WhToolObj.lAndT = function(){

			_this.oneInput({
				class : '.boxX',
				style : 'left'
			})
			_this.oneInput({
				class : '.boxY',
				style : 'top'
			})
	}
	WhToolObj.clickbgColor = function(){ //choose color
		var canvas = _this.canvasSing('wHblock','.bgColorTable','WhbgCanvas');
		var colorChoose = _this.single(_this.colorChoose);
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
	WhToolObj.textAlign = function(){  //居中图片
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
	WhToolObj.init();
})