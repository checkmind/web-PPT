
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
					data : "username=" +username+"&"+"password="+password

				})
			})
		})();
		

	},
	sing : function(){
	}

	}
	connect.login();
	window.connect = connect;
})(window)