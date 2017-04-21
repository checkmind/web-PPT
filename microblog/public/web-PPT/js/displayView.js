
var displayView = function(section,data,callback){ //section-> fill where,className ->canvas div, data  num
		var style = "";
		var attr = "";
		var str = "";
		var ele = '';
		var val = '';
		var pageThis = '';

		if(!data||data.length==0){
			$(section).html("<h3 style='padding:0;margin:0;border:0;line-height:200px;'>待编辑</h3>");
			return;
		}
		if(typeof data==='string')
			data = JSON.parse(data);
		_this.allPage = data.length; //总共页数
		$(section).html('');
		for(var page = 0; page < data.length; page++){ // page 页数
			str = "";
			//page 属性
			styles = data[page]["parameter"];
			
			
			//渲染所有节点
			for(var key_2 in data[page]["element"]){
				style = data[page]["element"][key_2].block;
				attr = data[page]["element"][key_2].attr;
				ele = data[page]["element"][key_2].type;
				if(data[page]["element"][key_2]['text'])
					val = data[page]["element"][key_2]['text'].value;
				str+= "<"+ ele +parseAttr(attr)+"class='dom'" + " style='"+parseCss(style)+"'>" 
				         + _spaceAndEnter(val) +
				      "</"+ ele + ">";
				 
			}
			$(section).attr("style",parseCss(styles));
			$(section).append(str);  //将str装载进对应的section
			x = $(section).width()/100;
			$(section).css('font-size',x +'px');
			
		}
		callback && callback(attr.class);
	}
var parseAttr = function(str){ //将json对象变成attr属性
	var str_1 = '';
	return (function(){
		
		if(str.length==0)
			return false;
		for(var key in str)
		{
			

			str_1 +=" " + key + "='" + str[key]+"' ";
		}	
		return str_1;
	})();
}

var parseCss = function(str){ //将 json 对象组变成 css属性对
	
	return (function(){
		if(!str)
			return null;
		la = JSON.stringify(str);
		str1 = la.replace(/,/g,";");
		str1 = str1.replace(/"/g,"");
		str1 = str1.replace(/{|}|/g,"");
		
		return str1;
	})();
}

var spaceAndEnter = function(str,src){ //如果是图片的话，文件名就是节点名
	
	var re =  /src=["|']([^\"]*?)["|']/gi;
	var res=  /\$img([^img\$]*?)img\$/gi;
	var helpClass=  /\$help([^img\$]*?)help\$/gi;  //辅助类，上传时过滤掉
	if(!str||str.length==0)
		return '';
	if(src)
		str= str.replace(re,'$img'+src+'img$');
	str = str.replace(helpClass,"");
	return $('<div/>').text(str).html();
}
var  _spaceAndEnter = function(str){

	if(!str||str.length===0)
		return "";
	
	return $('<div/>').html(str).text();
}

var execFontSize = function (size, unit) {
    var spanString = $('<span/>', {
        'text': document.getSelection()
    }).css('font-size', size + unit).prop('outerHTML');

    document.execCommand('insertHTML', false, spanString);
};