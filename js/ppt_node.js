

var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.post('/ppt', function (req, res) {
   console.log("登陆 POST 请求");
   res.header("Access-Control-Allow-Origin", "*");
   json = [{
	"parameter" : {  //ppt整体 背景、音乐等参数
		"background-color" : "#ccc",
		"background-music" : "none",
		"background-image" : "none",
		"background-size" : "cover",
		"page"	: "0",
		"color" : "white"
	},
	"element" : {  //各个元素参数 
					"h1" : {
							"id" : "h1_1",
							"text" : "这是主标题",
							"block" : {
								"width" : "3rem",
								"height": ".2rem",
								
								"left" : "0",
								"top": ".1rem",
								"font-size" : ".1rem",
								"font-style" : "微软雅黑",
								"line-height": ".2rem",
								"text-align":"center"
							}
					
					}
	}
},{
	"parameter" : {  //ppt整体 背景、音乐等参数
		"background-color" : "white",
		"background-music" : "none",
		"background-image" : "none",
		"background-size" : "cover",
		"color" : "white",
		"left" : "3rem",
		"page"	: "0"
	},
	"element" : {  //各个元素参数 
					"h2" : {
							"id" : "h1_2",
							"text" : "这是副标题",
							"block" : {
								"width" : "100%",
								"height": ".4rem",
								"background":"white",
								"border" : "1px solid #333",
								"left" : "0",
								"top": ".5rem",
								"font-size" : ".1rem",
								"line-height": ".4rem",
								"text-align":"center"
							}
					
					}
	}
}];
   json = JSON.stringify(json);
   res.send(json);
})
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})