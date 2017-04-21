/*
	this js file:
			1 , html' str
*/
!(function(window,undefine){
	
	var view = { // connect obj

			loginBody : "<div class='loginBody'>\
							<li class='singLoginHead'><span>登陆</span><a href='javascript:;' id='closeLB'><span class='glyphicon glyphicon-remove'></span></a></li>\
							<li> <input type='text' id='username' placeholder='输入用户名' class='singLoginInput padLeft20 positionY100'/>\
							</li>\
							<li>\
								<input type='password' id='password' placeholder='输入密码' class='singLoginInput padLeft20 positionY180'/>\
							</li>\
							<li> <button id='login' class='singLoginInput'> 登陆 </button> </li>\
							<button  id='toSing' class='singLoginInput'> 注册</button>\
						</div>",
			singBody : "<div class=\"singBody\">\
							<li class='singLoginHead'><span>注册</span><a href='javascript:;' id='closeSB'><span class='glyphicon glyphicon-remove'></span></a></li>\
							<li>\
								<input type=\"text\" id=\"sUserName\" placeholder='输入用户名' class='singLoginInput padLeft20 positionY100'/>\
							</li>\
							<li>\
								<input type=\"password\" id=\"sPassWord\" placeholder='输入密码' class='singLoginInput padLeft20 positionY180'/>\
							</li>\
							<li>\
								<input type=\"password\" id=\"againPassWord\" placeholder='确认密码' class='singLoginInput padLeft20 positionY180'/>\
							</li>\
							<li>\
								<input type=\"text\" id=\"codeComfirm\" placeholder='验证码' class='singLoginInput padLeft20 positionY180'/>\
							</li>\
							<li>\
								<button id='sing' class='singLoginInput'> 注册 </button>\
							</li>\
						</div>",
			new_PPT :  "<div id=\"new_ppt\">\
						点击新建ppt\
						</div>",
			userList : "<li><a href=\"javascript:;\">My PPT List</a></li>\
						<li><a href=\"javascript:;\">new PPT</a></li>\
						<li><a href=\"javascript:;\">logout</a></li>\
						<li><a href=\"javascript:;\" id=\"saveAll\">saveAll</a></li>",

			/*********************section dom****************/
			headTitle : "<div class=\"page\">\
						 </div>",
			pageGoTo : "<div class=\"cPage\"></div>",
			/***************************pptList *************/
			myPPTList : "<div class=\"myPPTList\">\
							<div class=\"myPPThead\">\
								<h3>my ppt list</h3>\
								<div class=\"line_All\"></div>\
								<div class='sort'>\
									<span>排序方法:</span>\
									<div class=\"dropdown sortPPT\">\
									    <button type=\"button\" class=\"btn btn-default dropdown-toggle\" id=\"sortList\" data-toggle=\"dropdown\">逆序\
									        <span class=\"caret\"></span>\
									    </button>\
									    <ul class=\"dropdown-menu pull-right\" role=\"menu\" aria-labelledby=\"sortList\">\
									        <li role=\"presentation\" class='sortList'>\
									            <a role=\"menuitem\" tabindex=\"1\" href=\"#\" >顺序</a>\
									            <a role=\"menuitem\" tabindex=\"-1\" href=\"#\">逆序</a>\
									        </li>\
									    </ul>\
									</div>\
								</div>\
								<div class='sort'>\
									<span>排序方式:</span>\
									<div class=\"dropdown sortPPT\">\
									    <button type=\"button\" class=\"btn btn-default dropdown-toggle\" id=\"sortObj\" data-toggle=\"dropdown\">创建时间\
									        <span class=\"caret\"></span>\
									    </button>\
									    <ul class=\"dropdown-menu pull-right\" role=\"menu\" aria-labelledby=\"sortObj\">\
									        <li role=\"presentation\" class='sortObj'>\
									            <a role=\"menuitem\" tabindex=\"pptCreateDate\" href=\"#\">创建时间</a>\
									            <a role=\"menuitem\" tabindex=\"pptLastAlterDate\" href=\"#\">修改时间</a>\
									        </li>\
									    </ul>\
									</div>\
								</div>\
								<div class='sort'>\
									<button class='btn btn-primary' id='sort'>确定</button>\
								</div>\
								<a href='javascript:;' id='refresh' title='刷新'><span class=\"glyphicon glyphicon-repeat\" style='margin-right:10px;'></span></a>\
								<a href='javascript:;' id='close' title='最小化'><span class=\"glyphicon glyphicon-minus\"></span></a>\
							</div>\
							<div class=\"myPPTbody\">\
							</div>\
							<div class=\"myPPTfooter\">\
								<div><button class='btn btn-default' id='lastPage'>上一页</button>\
								<div class=\"dropup\">\
								    <button type=\"button\" class=\"btn dropdown-toggle pageCg\" id=\"dropdownMenu1\" data-toggle=\"dropdown\" >第一页\
								        <span class=\"caret\"></span>\
								    </button>\
								    <ul class=\"dropdown-menu pull-right\" role=\"menu\" aria-labelledby=\"dropdownMenu1\">\
								        <li role=\"presentation\" id='pageList'>\
								            <a role=\"menuitem\" tabindex=\"-1\" href=\"#\" >第一页</a>\
								        </li>\
								    </ul>\
								</div>\
								<button class='btn btn-default' id='nextPage'>下一页</button>\
							</div>\
						</div>",
			PPTlistBody : "<div class='PPTlistBody'>\
							<div class='pList col-lg-4 col-md-6'>\
								<div class=\"scaleIt\">\
									<div class='pageClone'></div>\
								</div>\
								<div class=\"coverIt\">\
									<div class=\"mngerIt\">\
										<a href='javascript:;' >删除</a>\
										<a href='javascript:;' >编辑</a>\
										<a href='javascript:;' >预览</a>\
										<a href='javascript:;' >设置</a>\
									 </div>\
									<div class=\"lastAlterTime\">last Time:  <span></span></div>\
								</div>\
								<div class=\"pptInf\">\
									<div>ppt Name: <span></span></div>\
									<div>create time: <span></span></div>\
									<input type=\"hidden\" class=\"thisPPTid\" />\
									<input type=\"hidden\" class=\"thisPPTpsWord\" />\
								</div>\
							</div>\
						</div>",
			cover 	: "<div style='width:100%;height:100%;position:fixed;top:0px;left:0px;z-index:999' id='cover'></div>",
			new_option : 	"<div class='new_option'>\
							<div class='n_head singLoginHead'>\
								新建<a href='javascript:;' class='close_option'><span class='glyphicon glyphicon-remove'></span></a>\
							</div>\
							<div class='n_body'>\
								<li>\
									<span>项目名称: </span>\
									<input type='text'  placeholder='输入标题' id='newPptName' class='inputWh'/>\
								</li>\
								<li>\
									<span>安全: </span>\
									 <label class='checkbox-inline'  id='public'>\
									    <input type='radio' name='public' value='public' checked='true'>公开\
									  </label>\
									   <label class='checkbox-inline' id='unPublic'>\
									    <input type='radio' name='public'  value='unPublic' >加密\
									  </label>\
								</li>\
								<li style='display:none;'>\
									<span>加密: </span>\
									<input type='text' maxLength='4' placeholder='长度为4' id='newPptPsw' class='inputWh'/>\
								</li>\
								<li>\
									<span>类型  : </span>\
									<select  class='inputWh'><option>PPT</option><option>文章</option></select>\
								</li>\
								<li>\
									<span>平台  : </span>\
									<select  class='inputWh'><option>PC</option><option>phone</option></select>\
								</li>\
							</div>\
							<div class='n_footer'>\
								<button type='button' class='btn btn-primary' id='createNew'>创建</button>\
							</div>\
						</div>",
			colorBtnCs : `<div class="colorBtnCs">
								<li style="background: red"></li>
								<li style="background: orange"></li>
								<li style="background:yellow"></li>
								<li style="background:green"></li>
								<li style="background:Cyan"></li>
								<li style="background:blue"></li>
								<li style="background:purple"></li>
						 </div>
						 	<div class='opacityBar'>透明度<a href='javascript:;'></a></div>
						 `

	}

	window.view = view;
})(window)