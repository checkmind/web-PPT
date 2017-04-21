

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

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "public" );

})
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
					"a" : {
							"text" : "这是主标题", //内容
							"attr" : { //attr属性
								"id" : "h1_1",
								"href" : "http://www.baidu.com"
							},
							"block" : {  //style属性
								"width" : "3rem",
								"height": ".2rem",
								"left" : "0",
								"top": ".1rem",
								"font-size" : ".1rem",
								"font-style" : "微软雅黑",
								"line-height": ".2rem",
								"text-align":"center"
							},
							"animate" : { //运动参数
								"animateIn" : { //入场动画
									"top" : "1rem"
								},
								"animateOut" : { // 出场动画
									"top" : "3rem"
								}
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