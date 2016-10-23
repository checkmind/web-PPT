!(function(window,undefine){

	function ppt(cd_key){ //cd_key is ppt's key.
		_this = this;
		_this.cd_key = cd_key; //ppt的唯一id
		_this.data = {}; //获取到的数据包
		_this.width = document.documentElement.clientWidth;
		_this.height = document.documentElement.clientHeight;
		_this.headTop = 0.15;	//高度
		_this.rem = _this.width / 3;
		_this.bottomTop =document.documentElement.clientHeight/_this.rem - 0.15;  
		_this.nowPage = 0; //当前页
		_this.allPage = 0; //所有页
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
					_this.cutPageAdd();
					_this.addBtm(_this.allPage);
			    }
			});
		}
		_this.displayView = function(){ //渲染表现层
			var style = "";
			var attr = "";
			var str = "";
			_this.allPage = _this.data.length; //总共页数
			for(var page = 0; page < _this.data.length; page++){ // page 页数
				str = "";
				//page 属性
				style = _this.data[page]["parameter"];
				$("section").html($("section").html()+"<div class='page' style='"+_this.parseCss(style)+";z-index:"+(_this.data.length-page)+"'></div>");
				$("section").css({
					"width" : _this.width*_this.allPage+1+"px"
				})
				//渲染所有节点
				for(var key_2 in _this.data[page]["element"]){
					style = _this.data[page]["element"][key_2].block;
					attr = _this.data[page]["element"][key_2].attr;
					
					str+= "<"+ key_2 +_this.parseAttr(attr) + "' style='"+_this.parseCss(style)+"'>" 
					         + _this.data[page]["element"][key_2].text +
					      "</"+ key_2 + ">";
				}
				$(".page:eq("+page+")").html(str);  //将str装载进对应的section
			}
		}
		
		_this.parseAttr = function(str){ //将json对象变成attr属性
			var str_1 = '';
			return (function(){
				
				for(var key in str)
				{
					console.log(key);
					str_1 +=" " + key + "='" + str[key]+"' ";
				}	
				return str_1;
			})();
		}
		_this.parseCss = function(str){ //将 json 对象组变成 css属性对
			return (function(){
				la = JSON.stringify(str);
				str1 = la.replace(/,/g,";");
				str1 = str1.replace(/{|}|"/g," ");
				return str1;
			})();
		}
		//页数加载
		_this.addBtm = function(allPage){
			var str = '';
			for(var i = 0;i<allPage;i++){
				str += "<li><a href='javascript:;'>"+(i+1)+"</a></li>";
			}
			$(".btmDrop").html(str);
			_this.addLiClick(allPage);
		}
		_this.addLiClick = function(allPage){
			for(var i = 0;i<allPage;i++){
				(function(i){
					$(".btmDrop>li:eq("+i+")").click(function(){
						$(".NowPage").html( (1+i)+" <span class='caret'></span>" );
						
						_this.pageAdd(_this.nowPage,i)
					})
				})(i);
			}
		}
		_this.cutPageAdd = function(){ //切页面方法
			var onoff = true; //判断时间间隔
			//鼠标单击事件
			$("section").click(function(){
				_this.pageAdd(_this.nowPage,_this.nowPage+1)
			})
			//鼠标滚轮事件
			var scrollFunc = function(e){
				 var direct=0;
				  e=e || window.event;
				  setTimeout(function(){
					onoff = true;
				},500);
				  e = e.detail || e.wheelDelta;
				  if(onoff){
	  					  if(e>0&&_this.nowPage!=0){
	  					  	_this.pageAdd(_this.nowPage,_this.nowPage-1)
	  					  	onoff = false;
	  					  }
	  					  else if(e<0&&_this.nowPage!=_this.allPage-1){
	  					  	_this.pageAdd(_this.nowPage,_this.nowPage+1)
	  					  	onoff = false;
	  					 }
	  					 else 
	  					 	return 0;
				  	}
			}
			
			 if(document.addEventListener){
				 document.addEventListener('DOMMouseScroll',scrollFunc,false);
			 }//W3C
			 window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome/Safari
			 ;
		}
		_this.pageAdd = function(pageNow,pageAfter){ //当前页 改变后页
			console.log(pageNow,pageAfter)
			if(pageNow==0&&pageNow>pageAfter) //如果是第一页并且是要到负一页则return
				return 0;
			if(pageNow==_this.allPage-1&&pageNow<pageAfter)
				return 1;

			$("section").animate({
					"left" : -(pageAfter*3) + "rem"
			},500)
			_this.nowPage = pageAfter;
			$(".NowPage").html( (1+_this.nowPage)+" <span class='caret'></span>" );
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