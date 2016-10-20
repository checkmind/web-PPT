

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
   json = {
	   "h1" : {
		"block" : {
			"width" : "100%",
			"height": ".2rem",
			"background":"white",
			"left" : "0",
			"right": "0",
			"font-size" : ".1rem",
			"font-style" : "微软雅黑",
			"color":"black",
			"line-height": ".1rem",
			"text-align":"center"
		},	
		"id" : "h1_1",
		"text" : "这是主标题"
	},
	"span" : {
		"block" : {
			"width" : "100%",
			"height": ".2rem",
			"background":"yellow",
			"left" : "0",
			"right": "0",
			"font-size" : ".1rem",
			"font-style" : "微软雅黑",
			"color":"red",
			"line-height": ".1rem",
			"text-align":"center"
		},	
		"id" : "h1_1",
		"text" : "这是内容"
	}
   }
   json = JSON.stringify(json);
   res.send(json);
})
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})