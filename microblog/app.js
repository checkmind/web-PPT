var express = require('express');
var app = express();
var fs = require("fs");


var session = require('express-session');

app.use(session({  // session set
    secret: 'duhao', 
    cookie: {maxAge: 60 * 1000 * 60 * 24 * 30} 
}));
var checkUser = function(req){
	var sign = req.session.sign;
	if(sign)
		return true;
	else
		return false;
}
var obj = require('./routes/myMongoose.js');
var users = obj.users;
var pptArr = obj.pptArr;
var Schema = obj.Schema;
/*
var node = new users({'username':'duhao2','password':'1234596'});
node.save(function(err){
	if(err)
		console.log(err);
})

users.remove({username: '222'},function(err){
	if(err)
		console.log(err);
});
*/
/*
db.on('error',function(err , docs){
	console.log(docs);
})
*/


var bodyParser = require('body-parser');
var multer  = require('multer');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false,limit:"10000kb" }));
app.use(multer({ dest: '/public/files'}).array('image'));

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "public" );

})
app.post('/loginOrOut',function(req,res){
	res.send({
		statu : req.session.sign,
		name : req.session.name
	})
})
app.post('/loginOut',function(req, res){
	req.session.sign = false;
	var name =  req.session.name;
    req.session.name = null;
    if(!req.session.sign)
		res.send({
			statu : true,
			inf : name + ",注销成功"
		})
})




app.post('/login',function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	var obj = req.body.obj||null;
	users.findOne({ "username" : username },function(err,users){
		
		if(err)
			console.log(err);

		if(users&&users.password === password){	
			var findPPT = require('./routes/findPPT');
			findPPT(pptArr,users,obj,function(){
				var object = arguments[0] || null;
				var pageAll = arguments[1] || null;
				req.session.sign = true;
	        	req.session.name = username;
				res.send({
					statu : true,
					inf : '登陆成功',
					object : object,
					pageAll : pageAll
				});
				return false;	
			});
					
		}
		else
			res.send({
				statu : false,
				inf : '账号不存在或密码错误!'
			});


	})
})

app.post('/sing',function(req,res){
	var sUserName,
		sPassWord,
		node;
	sUserName = req.body.sUserName;
	sPassWord = req.body.sPassWord;
	if(!sUserName || !sPassWord)
	{
		res.send({
				statu : false,
				inf : '账号或密码未输入'
		})
		return false;
	}
	node = new users({ 'username':sUserName,'password':sPassWord });

	users.findOne({"username" : sUserName},function(err , users){
		if(err)
			console.log(err);
		if(users)
			res.send({
				statu : false,
				inf : '账号已存在'
			})
		else{
			
			node.save(function(err){
				if(err)
					console.log(err);
				else{
					let file = require('./routes/managerFile.js');
					file(fs,__dirname,sUserName)['creatDir']().then(function(obj){
							res.send({
							statu : true,
							inf : obj
						})
				    },function(err){ //失败
				        console.log(err);
				        res.send(err);
				    });
					
				}
			})
			
		}
	})
	
})
app.post('/findPPT',function(req , res){
	var username = req.session.name;
	var obj = req.body.obj;
	if(!username){
		res.send({
					statu : false,
					inf : "未登录!"
				});	
		return false;
	}
	return (function(){
		users.findOne({ "username" : username },function(err,users){

			var findPPT = require('./routes/findPPT');
			findPPT(pptArr,users,obj,function(){
				var object = arguments[0] || null;
				var pageAll = arguments[1] || null;
				req.session.sign = true;
	        	req.session.name = username;
	        	res.send({
					statu : true,
					object : object,
					pageAll : pageAll
				});	
				return true;
			});
		});
	})();
})
// ppt list operate
var pptListOperate = require('./routes/pptListOperate');
pptListOperate(app,__dirname,users,pptArr);


app.post('/pullSectionObj',function(req, res){
	if(!checkUser(req)){
		res.send({
			statu: false,
			inf : "用户未登录"
		})
		return false;
	}
	let sectionObj = req.body.sectionObj;
	let file = require('./routes/managerFile.js');
	let imgData = req.body.files;
   
    //let dataBuffer = JSON.parse(imgData);
	savePPT = require('./routes/savePPT');
	
	file(fs,__dirname,req.session.name+'/'+req.body.pptId)['saveFile'](imgData).then(function(imgDate){

         savePPT(pptArr,users,req,imgDate,function(){
			res.send({
				statu : true,
				inf : "保存成功"
			})	
		})
         
    },function(err){ //失败
        console.log(err);
        res.send(err);
    });

		
})
app.post('/sendAllImg', function(req, res){
    //接收前台POST过来的base64
   
   
    
    
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})