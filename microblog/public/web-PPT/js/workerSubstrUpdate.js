onmessage = function(event){
    //向主线程发送event.data.name信息
   let upDateFn = event.data.upDateFn;
   let upDateObj = event.data.upDateObj;

   /*	
	addEleStyle ==>{
			class : $(this).attr("id"), //第几个节点
			page : 1,	//第几页
			type : "attr",
		    name : "value",
			str : $(this).val()
		}
	addEle ==> {
				id :_this._id+"_"+ _this.pageNow + "e"+(_this.MaxId+1),
				type : "div",
				html : "lalal",
				page : 1
	}
	*/
    const upDatePPT = {  //函数
			addPage : function(){
				console.log(arguments)
			},
			addEle : function(){

			},
			addPageStyle : function(){
			},
			dropPage : function(){
			},
			addEleStyle : function(){
				console.log(arguments)
			},
			dropEleStyle : function(){
			}
	}; 
   let fn = null;
    for(let i = upDateFn.length-1;i>=0;i--){
   		 fn = upDateFn[i]['name'];
   		 json = upDateFn[i]['json'];
   		 upDatePPT[fn](json||null);
 	}
    postMessage({upDateFn:upDateFn,upDateObj:upDateObj});
};