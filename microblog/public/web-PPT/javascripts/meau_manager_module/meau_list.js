/*
	菜单栏方法，如添加函数，请在下面列出函数名和功能，如：
	alert(index)  弹出index对话框
*/
define(['edit_fun'],function(ppt){
	_this = ppt;
	var meauList = {

	}
	meauList.init = function(){
		
		meauList.login();
		meauList.saveAll();
		meauList.chagePptName();
	}
	meauList.saveAll = function(){
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
	meauList.login = function(){ // click login and 
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
	
	meauList.chagePptName = function(){
		$("#pptName").blur(function(){
			connect.chagePptName($(this).val);
		})
	}
	
	meauList.init();
	return meauList;
});