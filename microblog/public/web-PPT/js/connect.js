
!(function(window,undefine){
	
	var connect = { // connect obj
	user : {
		username : null,
		pptName : null,
		pptId : null		
	},
	relyOn : { // relyOn another js
		single : null,
		observer : null
	},
	toast : function(what){
		var create = function(){
			if(document.getElementById("toast")){
				return false;
			}
				var div = document.createElement('div');
				div.id = 'toast';	
				$("body").append(div);
				$('#toast').css({
					padding: "0 20px 0",
					height : "30px",
					lineHeight : "30px",
					border: "1px solid #ccc",
					position : "fixed",
					zIndex : "99",
					left : "50%",
					top: "90%",
					margin : "-50px",
					borderRadius : '3px',
					background : 'black',
					color : 'white',
					opacity : 0,
					transition : '1s'
				})
				return true;
			
		}
		create();
		$("#toast").html(what)
		
		setTimeout(function(){
			$("#toast").css('opacity',1);
		},0);
		
		setTimeout(function(){
			$("#toast").css('opacity',0);
			
		},1000);

	},
	loginOrOut : function(callback){
		var _this = this;
		if(!document.getElementById('loginOrOutId')){
			var div = document.createElement('input');
			div.id = 'loginOrOutId';
			div.type = 'hidden';
			$('body').append(div);
		}
		$.ajax({
			url : '/loginOrOut',
			type : 'post',
			success : function(json){
				if(json.statu){
					$('#myCenter').attr('data-toggle','dropdown');
					$("#loginOrOutId").val(json.name);
					$('#myCenter>span:eq(0)').html(json.name);
					_this.user.username = json.name;
					if(callback)
					_this.findPPT('{"page":1,"pageNum":6,"sort":{"pptCreateDate":-1}}',function(json){
						if(json.statu)
							
								connect.relyOn.observer.createName('login').publish("pptList",json.object,json.pageAll);
					});
				}
				else
								_this.toast("未登录");
				if(callback)
						callback();
			}
		})
	},
	loginBind : function(){

		$('#closeLB').click(function(){
			$(".loginBody").css({'display' : 'none'});
		})
	},
	addUserList : function(){
		var _this = this;
		return (function(){
			$(".userList").append(view.userList);
			_this.userList();	
			return true;
		})();
	},
	addMyPPTList : function(obj){
		var _this = this,
		pptCreateDate = obj.pptCreateDate,
		pptLastAlterDate = obj.pptLastAlterDate,
		pptName = obj.pptName,
		public = obj.public,
		sectionObj = obj.sectionObj;
	
		return (function(){
			$('body').append(view.myPPTList);
			setTimeout(function(){
				$('.myPPTList').css({"bottom":0,"transition":'.5s'});
			},50)
			
			return true;
		})();
	},
	userList : function(){
		var that = this;
		$('.userList>li:eq(2)').click(function(){
			$.ajax({
				url : '/loginOut',
				type : 'post',
				success : function(json){
					$('#loginOrOutId').val('');
					$('#myCenter').attr('data-toggle','');
					$('#myCenter>span:eq(0)').html('my center');
					 location.reload(true);
				}
			});
		});
		$('.userList>li:eq(0)').click(function(){
				$('.myPPTList').css({"bottom":0,"transition":'.5s'});
		});	

			

	},
	login : function(callback){
		var div,_this;
			div = view.loginBody; 
			_this = this;
		var sendFn = function(){
			$("#login").click(function(){
				var username = $("#username").val();
				var password = $("#password").val();
				if(!username || !password){
					_this.toast("请核对用户名和密码");
					return false;
				}
				$.ajax({
					url : '/login',
					type : "post",
					data : "username=" +username+"&"+"password="+password+'&obj={"page":1,"pageNum":6,"sort":{"pptCreateDate":-1}}',
					success : function(json){
						
						if(json.statu==true){
							$(".loginBody").css({'display' : 'none'});
							_this.loginOrOut();
							connect.relyOn.observer.createName('login').publish("pptList",json.object,json.pageAll);
							_this.toast(json.inf);
							return true;
						}
						else
							_this.toast(json.inf);
					}
				})

			})
					}
		return (function(){
			$('body').append(div);
			_this.loginBind();
			if(callback)
				callback();
			sendFn();
			return true;
		})();
	},
	findPPT : function(sort,success){

		$.ajax({
				url : '/findPPT',
				data : 'obj='+sort,
				type : "post",
				success : function(json){
					success&&success(json);
				}
		})
	},
	singBind : function(){
		$('#closeSB').click(function(){
			$(".singBody").css({'display' : 'none'});
		})
	},
	singBody : function(){
		var div = view.singBody;
		var _this = this;
		var singFun = function(){
			$("#sing").click(function(){
				var sUserName,sPassWord,againPassWord,codeComfirm;
				sUserName = $("#sUserName").val();
				sPassWord = $("#sPassWord").val();
				againPassWord = $("#againPassWord").val();
				codeComfirm = $("#codeComfirm").val();
				if(!sUserName||!sPassWord){
					_this.toast("请填写用户名和密码");
					return false;
				}
				$.ajax({
					url : "/sing",
					type : "post",
					data : "sUserName=" + sUserName + "&sPassWord="+sPassWord,
					success : function(json){
						if(json.statu)
							$(".singBody").css('display','none');
					}
				})
			})
		}
		return (function(){
			$('body').append(div); // add login body
			singFun();
			_this.singBind();
		})();
	},
	/*{
		sectionObj : sectionObj,
		pptId     : pptId,
		pptName : pptName
	}
	*/
	sendSectionObj : function(obj,success,faile){
		var sectionObj = JSON.stringify(obj.sectionObj),
			_id = obj._id,
			pptName = obj.pptName,
			files = JSON.stringify(obj.files),
			that = this;
		if(sectionObj.length===0)
			return false;
		return (function(){
			
			$.ajax({
				url : '/pullSectionObj',
				type : 'post',
				data : {sectionObj : sectionObj,pptId : _id,pptName : pptName,files : files},
				success : function(json){
					if(json.statu){
						that.toast("提交成功");
						success&&success();
					}else{
						that.toast("提交失败");
						faile&&faile();
					}
				}
			})
		})();
	},
	chagePptName : function(){
		
	},
	new_PPT : function(pptName,public,psWord,callback){
		var _this = this;
		return (function(){
			$.ajax({
				url : '/new_PPT',
				type : 'post',
				data :  'pptName=' + pptName + '&public=' + public + '&psWord=' + psWord,
				success : function(json){
					if(json.statu)
						callback&&callback(json);
					else
						_this.toast(json.inf)
				}
			})
		})();
	},
	deletePPT : function(pptId,callback){
		var _this = this;
		return (function(){
			$.ajax({
				url : "/deletePPT",
				type : "post",
				data : '_id='+pptId,
				success : function(json){
					if(json.statu){
						callback&&callback();

					}
					
					_this.toast(json.inf);
				}
			})
		})();
	},
	openPPT : function(pptId,callback){
		var _this = this;
		return (function(){
			$.ajax({
				url : "/openPPT",
				type : "post",
				data : '_id='+pptId,
				success : function(json){
					if(json.statu)
						callback&&callback(json.returnObj);
					_this.toast(json.inf);
				}
			})
		})();
	}

	}

	window.connect = connect;
})(window)