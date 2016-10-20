(function(window,undefine){

	function ppt(cd_key){ //cd_key is ppt's key.
		_this = this;
		_this.cd_key = cd_key; //ppt的唯一id
		_this.data = {}; //获取到的数据包
		_this.width = document.documentElement.clientWidth;
		_this.height = document.documentElement.clientHeight;
		_this.headTop = 0.15;	//高度
		_this.rem = _this.width / 3;
		_this.bottomTop =document.documentElement.clientHeight/_this.rem - 0.15;  
		
		_this.getDates = function(){ //得到后台的ppt数据
			
			$.ajax({
			    url: "http://localhost:8081/ppt",    //请求的url地址
			    dataType: "json",   //返回格式为json
			    async: true, //请求是否异步，默认为异步，这也是ajax重要特性
			    data: { "id": "value" },    //参数值
			    type: "post",   //请求方式
			    success: function(req) {
			        _this.data = req;
					_this.displayView();
			    }
			});
		}
		_this.displayView = function(){ //渲染表现层
			var la = "";
			var str = "";
			for(var key in _this.data){
				la = _this.data[key].block;
				la = JSON.stringify(la);
				str1 = la.replace(/,/g,";");
				str1 = str1.replace(/{|}|"/g," ");
				str+= "<"+ key + " id='" + _this.data[key].id + "' style='"+str1+"'>" 
				         + _this.data[key].text +
				      "</"+ key + ">";
			}
			$("section:eq(0)").html(str);
		}
		
		/************下面是控制器(next is ctrl head and footer)***********/
		
		_this.listenMouse = function(){
			 $("header").mousemove(function(e){
			 	  
			 	  moves("head","+.15rem");
			 });
			 $("header").mouseout(function(e){
			 	 
			 	  moves("head","-.15rem");
			 });
			 $("footer").mousemove(function(e){
			 	  
			 	  moves("foot","-.15rem");
			 });
			 $("footer").mouseout(function(e){
			 	 
			 	  moves("foot","+.15rem");
			 });
			function moves(id,onoff){
				return (function(){
				
					$("#"+id).css({
			 	  	transition: ".6s",
					transform: "translateY("+onoff+")",
			 	  })
				})();
			}
		}
		
	}	
	
	var ppt = new ppt("32sdf");
	ppt.getDates();
	ppt.listenMouse();
	
})(window)