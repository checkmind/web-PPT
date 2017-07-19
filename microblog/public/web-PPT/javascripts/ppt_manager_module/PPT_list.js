/*
	ppt的列表管理，如添加函数，请在下面列出函数名和功能，如：
	alert(index)  弹出index对话框
*/

define(['edit_fun'],function(ppt){
	_this = ppt;
	PPTlist = {
		sort: '{"page":1,"pageNum":6,"sort":{"pptCreateDate":-1}}',
		page : 1, //当前第几页
		pageNum : 6,
		sortList :  "pptCreateDate",
		sortOrder : -1,
		pageAll : 2,
		pptName : function(name,pas){
			if(!name){
				connect.toast("未输入PPTName");
				return false;
			}
			return true;
		},
		passWord : function(name,pas){
			if($("#unPublic input[name=public]:checked").val()&&!pas){
				connect.toast("未输入密码");
				return false;
			}
			return true;
		}
		
	}
	PPTlist.init = function(){
		_this.observer.createName('login').listen('pptList',function(){
				console.log("ok");
				$('body').append(view.myPPTList);
				PPTlist.pageAll = arguments[1];
				for(var key in PPTlist.pageOperate){
					PPTlist.pageOperate[key]();
				}
				PPTlist.addListEle(arguments[0],true);

		})
		PPTlist.new_ppt();
		
	}

	PPTlist.appendPPTList = function(){
		var obj = arguments[0],
		onoff = arguments[1]; //是否开启动画
		//var thisFun = arguments.callee;
		return (function(){
			
			

			PPTlist.addPPTlistBody(obj);
			if(onoff)
				setTimeout(function(){
					$('.myPPTList').css({"bottom":0,"transition":'.5s'});
				},50);
			
			return true;
		})();
	}
	PPTlist.addListEle = _this.single(PPTlist.appendPPTList);

	PPTlist.addPPTlistBody = function(obj){
		var len = obj.length,
		str = '',
		itObj;
		var getItObj = function(num,obj){
			return {
				pptCreateDate : obj[num].pptCreateDate,
				pptLastAlterDate : obj[num].pptLastAlterDate,
				pptName : obj[num].pptName,
				public : obj[num].public,
				sectionObj :obj[num].sectionObj,
				_id 	: obj[num]._id
			}
		}
		return (function(){
		
			for(var i = 0;i < len; i++){
				var itObj = getItObj(i,obj); 
				var fn1 = PPTlist.appendPPT.
							afterFun( PPTlist.fillCoverIt.
							afterFun( PPTlist.operatePPT.
							afterFun(PPTlist.fillPPT) ) );
				fn1(i,itObj);
			}
		})();

		
	}
	PPTlist.appendPPT = function(){

		$(".myPPTbody").append(view.PPTlistBody);
		return true;
	}

	PPTlist.fillCoverIt = function(index,itObj){
		
				$('.lastAlterTime:eq('+ index +')>span').html(_this.formatDateTime(new Date(itObj.pptLastAlterDate)));
				$('.thisPPTid:eq('+ index +')').val(itObj._id);
				$('.thisPPTpsWord:eq('+ index +')').val(itObj.psWord);
				$('.pptInf:eq('+ index +') span:eq(0)').html(itObj.pptName);
				$('.pptInf:eq('+ index +') span:eq(1)').html(_this.formatDateTime(new Date(itObj.pptCreateDate)));
				return true;
	}
	PPTlist.operatePPT = function(index){

					$('.mngerIt:eq('+index+') a:eq(0)').click(function(){  //delete this ppt
						_this.myComfire("确认删除？",function(){
							var id = $('.thisPPTid:eq('+ index +')').val();
							connect.deletePPT(id,function(){
								$('.PPTlistBody:eq('+index+')').css({"display":"none"});
							})
						})
					})

					$('.mngerIt:eq('+index+') a:eq(1)').click(function(){  //edit this ppt
						var id = $('.thisPPTid:eq('+ index +')').val();
						connect.openPPT(id,function(){
							var obj = arguments[0],
								str = {};
							$("section").html('');
							if(obj.sectionObj.length!=0){
								_this.sectionObj = obj.sectionObj;
							}
							_this._id = obj._id;
							_this.pptName = obj.pptName;
							_this.pptCreateDate = obj.pptCreateDate;
							_this.pptLastAlterDate = obj.pptLastAlterDate;
							_this.public = obj.public;
							
							_this.observer.createName('openPPT').publish("openPPT");	
							$('.myPPTList').css({"bottom":'-70%',"transition":'1s'});
							
						})
					})
					$('.mngerIt:eq('+index+') a:eq(2)').click(function(){  //look this ppt

						window.open("index.html?_id="+ $('.thisPPTid:eq('+ index +')').val(),'_blank');
					})
					$('.mngerIt:eq('+index+') a:eq(3)').click(function(){  //safe this ppt
						
					})
					return true;
	}
	PPTlist.fillPPT = function(index,itObj){

		displayView(".pageClone:eq("+index+")",itObj.sectionObj);
	}
	PPTlist.new_ppt = function(){
		//$("section").append(view.new_PPT); //add #new_ppt
		var getItObj = function(obj){
			return {
				pptCreateDate : obj.pptCreateDate,
				pptLastAlterDate : obj.pptLastAlterDate,
				pptName : obj.pptName,
				public : obj.public,
				sectionObj :obj.sectionObj,
				_id 	: obj._id
			}
		}
		var open = function(){
			_this.createWindow(view.new_option,".new_option",".close_option");
			$("#cover").css('display','block');
			$(".new_option").css('display','block');

			$("#public").click(function(){
				$(".n_body li:eq(2)").css('display',"none");

			})
			$("#unPublic").click(function(){

				$(".n_body li:eq(2)").css('display',"block");	
			})
			$("#createNew").click(function(){
				var that = PPTlist,
				 
				 	name = $("#newPptName").val(),
					psw = $("#newPptPsw").val()||null,
					public = !!$("#unPublic input[name=public]:checked").val(),
					fn = that.pptName.afterFun(that.passWord.afterFun(function(){
							connect.new_PPT(name,public,psw,function(json){
								$("#cover").css('display','none');
								$(".new_option").css('display','none');
								_this._id=json.obj._id;
								_this.pptName = json.obj.pptName;
								var fn1 = PPTlist.appendPPT.afterFun( PPTlist.fillCoverIt.afterFun( PPTlist.operatePPT.afterFun(PPTlist.fillPPT) ) );
														
								fn1($(".PPTlistBody").length,getItObj(json.obj));
								_this.observer.createName('openPPT').publish("openPPT");
						});
					}));
					
					fn(name,psw);
				
					
			})
		}
		$("#new_ppt").click(function(){
			
			open();
		})
		$('.userList>li:eq(1)').click(function(){

			open();	
		})

		
	}
	/*
	sortList : "pptCreateDate",
		sortOrder : -1, '{"page":1,"pageNum":6,"sort":{"pptCreateDate":-1}}'
	*/
	PPTlist.pageOperate = {
		getPPT : function(){ //获得ppt列表
			var that = this;
			return function(){
				PPTlist.sort = '{"page":'+PPTlist.page+',"pageNum":'+PPTlist.pageNum+',"sort":{"'+PPTlist.sortList+'":'+PPTlist.sortOrder+'}}';
				connect.findPPT(PPTlist.sort,function(json){
					if(json.statu){
							$(".myPPTbody").html('');
							PPTlist.appendPPTList(json.object,false);
					}
					else
							alert(json.inf)
				});	
			}
			
		},
		refreshSort : function(){
			var that = this;
			
			return (function(){
				$("#sort").click(PPTlist.pageOperate.getPPT());
				for(var i=0;i< $(".sortList>a").length;i++){ 
					(function(i){
						$(".sortList>a:eq("+i+")").click(function(){
							$("#sortList").html($(this).html()+"  <span class=\"caret\"></span>");
							PPTlist.sortOrder = $(this).attr('tabindex');
						})
						$(".sortObj>a:eq("+i+")").click(function(){
							$("#sortObj").html($(this).html()+"  <span class=\"caret\"></span>");
							PPTlist.sortList = $(this).attr('tabindex');
						})
					})(i);
				}	
			})();
		},
		nextPage : function(){
			var that = this;
			$("#nextPage").click(function(){
		
				if(PPTlist.page!==PPTlist.pageAll){
					PPTlist.page++;
					that.getPPT()();
					
				}
				else{
					alert("到最后一页了!");
				}
			});
		},
		lastPage : function(){
			$("#lastPage").click(function(){
				if(PPTlist.page!==1){
					PPTlist.page--;
					PPTlist.pageOperate.getPPT()();

				}else{
					alert("已经到第一页了!");
				}
			});
		},
		refreshList : function(){
			var that = this;
			$(".myPPThead #refresh").click(PPTlist.pageOperate.getPPT())
		},
		closePPT : function(){
			$(".myPPThead #close").click(function(){
				$('.myPPTList').css({"bottom":'-70%',"transition":'.5s'});
			})
		},
		pageChange : function(){
			var that = this;
			return (function(){
				var pageAll =PPTlist.pageAll;
				var ar1 = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
				var ar2 = ["十"];
				var str = '';
				var fn = function(page){
					var msg=1; //中文汉字
					if(0<page<10){
						msg = ar1[page]; 
					}
					if(20>page>=10){
						if(page==10)
							msg = ar2[0];
						else{
							msg = ar2[0] + ar1[page.substring(1)];
						}
					}
					if(page>=20){
						msg = ar1[page.substring(0)] + ar1[page.substring(1)];
					}
					return msg;	
				} // fn ending
				var addList = function(){
					var pageList = document.getElementById('pageList'),
					pageList = pageList.getElementsByTagName('a');
					for(var i=0;i<pageList.length;i++){ 
							(function(){
								pageList[i].onclick = function(){
									
									$(".pageCg").html($(this).html()+"  <span class=\"caret\"></span>");
									PPTlist.page = $(this).attr('tabindex')/1;
									that.getPPT()();
								}
							})();
							
					}
				}
				for(var i =1;i<=pageAll;i++){
					str += '<a role=\"menuitem\" tabindex='+i+' href=\"#\" >第'+fn(i)+'页</a>';
				}
				
				$("#pageList").html(str);
				addList();
			})();
		}				
	};
	
		PPTlist.init();	
	
	
	return PPTlist;
});