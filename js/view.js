/*
	this js file:
			1 , html' str
*/
!(function(window,undefine){
	
	var view = { // connect obj

			loginBody : "<div class='loginBody dhCover'>\
							<li> <h3>登陆</h3> </li>\
							<li> <label> 用户名 <label>\
								<input type='text' id='username' />\
							</li>\
							<li>\
								<label> 密码 </label>\
								<input type='password' id='password' />\
							</li>\
							<li> <button id='login'> 登陆 </button> </li>\
							<a href=\"javascript:;\"> 注册</a>\
						</div>",
			singBody : "<div class=\"singBody dhCover\">\
							<li>\
								<h3>注册</h3>\
							</li>\
							<li>\
								<label>	用户名 </label>\
								<input type=\"text\" id=\"sUserName\" />\
							</li>\
							<li>\
								<label>	密码 </label>\
								<input type=\"password\" id=\"sPassWord\" />\
							</li>\
							<li>\
								<label>	确认密码 </label>\
								<input type=\"password\" id=\"againPassWord\" />\
							</li>\
							<li>\
								<label> 验证码 </label>\
								<input type=\"text\" id=\"codeComfirm\" />\
								<span>123</span>\
								<button> 验证 </button>\
							</li>\
							<li>\
								<button id='sing'> 注册 </button>\
							</li>\
						</div>"

	}

	window.view = view;
})(window)