
!(function(window,undefine){
	
	var connect = { // connect obj
	login : function(){
		var div = view.loginBody; 
		return (function(){
			$('body').append(div); // add login body

			$("#login").click(function(){
				var username = $("#username").val();
				var password = $("#password").val();
				$.ajax({
					url : '/login',
					type : "post",
					data : "username=" +username+"&"+"password="+password,
					success : function(json){
						if(json.statu==true)
							return true;
						else
							console.log('error!');
					}
				})
			})
			return true;
		})();
	},
	singBody : function(){
		var div = view.singBody;
		return (function(){
			$('body').append(div);
			$("#sing").click(function(){
				var sUserName,sPassWord,againPassWord,codeComfirm;
				sUserName = $("#sUserName").val();
				sPassWord = $("#sPassWord").val();
				againPassWord = $("#againPassWord").val();
				codeComfirm = $("#codeComfirm").val();
				$.ajax({
					url : "/sing",
					type : "post",
					data : "sUserName=" + sUserName + "&sPassWord = "+sPassWord,
					success : function(json){
						
					}
				})
			})
		})();
	}

	}
	connect.singBody();
	window.connect = connect;
})(window)