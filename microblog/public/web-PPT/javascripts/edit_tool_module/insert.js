define(['edit_fun'],function(ppt){
	_this = ppt;
	var insert = {
		init : function(){
			$(".insertLi:eq(0)").click(function(){
					ppt.addEle({
						id :_this._id+"_"+ _this.pageNow + "e"+(_this.MaxId+1),
						type : "div",
						html : "点击添加内容"
					});
			})
			$(".insertLi:eq(1)").click(function(){
					insert.addImg();
			})
			$(".insertLi:eq(4)").click(function(){
					insert.addCode();
			})
		}
	}
	insert.addImg = function(){
			var file = document.getElementById('insertImg');
			var types = ['bmp','jpg','png','tiff','gif','pcx','tga','exif','fpx','svg','psd','cdr','pcd','dxf','ufo','eps','ai','raw','WMF'];
			file.value= null;
			file.onchange = function(){
			       var type = file.value.substr(file.value.indexOf('.')+1,file.value.length).toLowerCase();
			       for(var i = 0,len=types.length;i<len;i++){
			          if(i===len-1&&type !== types[i] ){
			                console.log("图片格式不正确!");
			                file.value = null;
			                return false;
			           }
			           if(type===types[i])
			           	break;
			       }
			       readH5(file);
			}
			

			function readH5(file){
		        var file = file.files[0];
		        var read = new FileReader();
		       
		       read.readAsDataURL(file);
		       read.onload = function(){
		       		read.onload = null;
		            var img = new Image();
		            var obj = {};
		            img.onload = function(){
		                img.onload = null;
		                var base64 = "<img src='"+img.src+"'/>";
		                var _id = _this._id+"_"+ _this.pageNow + "e"+(_this.MaxId+1);
		                _this.addEle({
							id :_id,
							type : "div",
							base64 : base64,
							NoEdit : 'false'
						});
						$('.'+_this.nowId).html(base64);
						obj[_id] = img.src;
						_this.upDateFn.base64Push.push(obj);
		               _this.WhToolObj.textAlign();
		            }
		            img.src = this.result;
		       }
		      }
		}
	insert.addCode = function(){
		var ele = '<link rel="stylesheet" type="text/css" href="./css/jquery.snippet.css">'
		$("head").append(ele);
		var code = '<script src="./javascripts/edit_tool_module/jquery.snippet.js"></script>'
		$("head").append(code);
		
		ppt.addEle({
			id :_this._id+"_"+ _this.pageNow + "e"+(_this.MaxId+1),
			type : "div",
			html : " <pre>this input code</pre>"
		});
		$("pre").snippet("javascript", { style: "random", collapse: true, startCollapsed: false});

	}
	insert.init();
})