/*
	ppt的页面管理，增加页面，删除页面，如添加函数，请在下面列出函数名和功能，如：
	alert(index)  弹出index对话框
*/
define(['edit_fun'],function(ppt){
	_this = ppt;
	var pageGoTo ={
		init : function(){
			var that= this;
			//$(view.pageGoTo).insertBefore($("#addPage"));
			$(".pageGoTo").addClass('pageGoToFns');
			setTimeout(function(){
					that.initPageCan();
					$(".pageGoTo").css("display","block");
					$("#addPage").click(function(){
							that.addPage(true);
					});
			},300)
		},
		initPageCan : function(){

			var x = _this.page.x,
				y = _this.page.y;
			$(".pageGoToFns").css("width",x+'px');
			$(".pageGoToFns").css("height",y*5+'px');
			/*
			for(var i =0;i< _this.sectionObj.length;i++){
				$(view.pageGoTo).insertBefore($("#addPage"));
				displayView(".cPage:eq("+i+")","pageClone",'['+JSON.stringify(_this.sectionObj[i])+']',0);	
			}
			*/
		},
		addPage : function(onoff){ //是否需要增加 sectionObj 里面的对象数组
			$(view.pageGoTo).insertBefore($("#addPage"));
			$("section").append(view.headTitle);
			$(".cPage").css("height",_this.page.y+"px");
			
			_this.pageNow = _this.pageNum++;
			if(onoff)
				_this.upDateFn.pushs({name:'addPage'});

			_this.eleScale.push({
				"element": {
					
				}
			});
		
			this.cutPage(_this.pageNow);
		},
		addPageEvent : function(){
			that = this;
			$(".cPage").css("height",_this.page.y+"px");
			_this.pageNow =	_this.pageNum++;
			$("#addPage").click(function(){
				that.addPage(true);
			});
			that.cutPage(_this.pageNow);
		},
		cutPage : function(num){
			var	that = this;
			$('.cPage:eq('+num+')').click(function(){
				$(".page:eq("+(_this.pageNow)+")").css("display","none");
				$(".page:eq("+num+")").css("display","block");
				
				_this.pageNow = num;
			})   
		}
	}
	
	pageGoTo.init();
	return pageGoTo;
})