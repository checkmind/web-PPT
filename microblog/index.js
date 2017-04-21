

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); 
var upload = multer({ dest:  "C:/img" }); //上传路径

app.use(bodyParser.json({ extended: true },{limit: '50mb'})); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//app.use(multer()); // for parsing multipart/form-data

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.post('/LoginByPassWord', function (req, res) {
   console.log("登陆 POST 请求");
   res.header("Access-Control-Allow-Origin", "*");
   json = {
   	statu : true
   }
   json = JSON.stringify(json);
   res.send(json);
})

app.post('/myHead', function (req, res) {
   console.log("登陆 POST 请求");
   res.header("Access-Control-Allow-Origin", "*");
   json = {
    headImg : "http://v1.qzone.cc/avatar/201408/16/16/17/53ef13a659995557.jpg!200x200.jpg",
    name : "天才小熊猫"
   }
   json = JSON.stringify(json);
   res.send(json);
})

app.post('/photo', upload.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

app.post('/QueryPersonInformationPageServlet',function (req, res) {
  
   console.log("个人信息 POST 请求");
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.body);
        json = {
      img   :   "http://v1.qzone.cc/avatar/201408/16/16/17/53ef13a659995557.jpg!200x200.jpg",
      name  :   "天才小熊猫",
      sex   :   "男",
      birthday :  "1996.06.09"
  }
       json = JSON.stringify(json);
       res.send(json);
})

app.post('/QueryHomePageServlet', function (req, res) {
   console.log("主页 POST 请求");
   res.header("Access-Control-Allow-Origin", "*");
   json = [
           {
               shopId : "0",
               img : "http://img2.imgtn.bdimg.com/it/u=4057819552,2327794172&fm=21&gp=0.jpg",
               title : "高沙商城",
               content : "满十五减五，满二十减十"
            },
            {
               shopId : "1",
               img : "http://img2.china-ef.com/member/shop/2013/201311080738158.jpg",
               title : "东沙商城",
               content : "满一百减五"
            },
            {
               shopId : "2",
               img : "http://pic18.nipic.com/20111227/1295091_140319762000_2.jpg",
               title : "西沙商城",
               content : "满四百减一百"
            }
  ];
   json = JSON.stringify(json);
   res.send(json);
})

app.post('/QueryShopPageServlet', function (req, res) {
   console.log("商铺 POST 请求");
   res.header("Access-Control-Allow-Origin", "*");
   json = { 
              img   : "http://i1.sinaimg.cn/hs/news/2009-05-13/U3237P666T37D11851F2253DT20090513135216.jpg",
              title : "高沙商贸城",
            likeNum : 200,
              today : [ "满一百减九十九","全场九折"],
             coupon : [{
                        couponInf : "满十减五"
                      },
                      {
                        couponInf : "满五十减五"
                      }],
            vipInf : [{
                       vipId : 0,
                      vipType : "普通会员"
                }],
            goods : [
                      {goodId:0,goodTitle:"连衣裙",goodCost:100,goodImg:"http://img2.imgtn.bdimg.com/it/u=633342962,2323662678&fm=206&gp=0.jpg"}
                    ]
          }
   json = JSON.stringify(json);
   res.send(json);
})

app.post('/QueryHistoryPageServlet', function (req, res) {
   console.log("历史浏览 POST 请求");
   res.header("Access-Control-Allow-Origin", "*");
   json = [
           {
               shopId : "0",
               img : "http://img2.imgtn.bdimg.com/it/u=4057819552,2327794172&fm=21&gp=0.jpg",
               title : "高沙商城",
               content : "满十五减五，满二十减十"
            },
            {
               shopId : "1",
               img : "http://img2.china-ef.com/member/shop/2013/201311080738158.jpg",
               title : "东沙商城",
               content : "满一百减五"
            },
            {
               shopId : "2",
               img : "http://pic18.nipic.com/20111227/1295091_140319762000_2.jpg",
               title : "西沙商城",
               content : "满四百减一百"
            }
  ];
   json = JSON.stringify(json);
   res.send(json);
})
app.post('/QueryGoodsPageServlet', function (req, res) {
   console.log("商品 POST 请求");
   res.header("Access-Control-Allow-Origin", "*");
   json = {
              img   :   ["http://img2.imgtn.bdimg.com/it/u=633342962,2323662678&fm=206&gp=0.jpg","http://img1.imgtn.bdimg.com/it/u=2331582740,969546821&fm=11&gp=0.jpg","http://img0.imgtn.bdimg.com/it/u=1072030677,4155224413&fm=21&gp=0.jpg"],
              goodTitle:"连衣裙 夏日清凉 超薄 纯棉连衣裙 夏日清凉 超薄 纯棉连衣裙 夏日清凉 超薄 纯棉连衣裙 夏日清凉 超薄 纯棉",
              goodCost:"750",
              goodOldCost:"1100",
              evaluationNum:20,
              evaluation:[{
                    buyerImg: "http://v1.qzone.cc/avatar/201402/16/09/57/53001b1a6c61a030.gif!200x200.jpg",
                    buyerPhoneNumber:"17826833487",
                    commitStart: 5,
                    buyerEvaluation:"衣服质量很不错。穿着很舒服合身。衣服质量很不错。穿着很舒服合身。,衣服质量很不错。穿着很舒服合身。.",
                    evaluationTime:"2016.08.05",
                    goodSize:'商品大小',
                    goodColor:"商品颜色"
            }],
            goodParameter:"商品参数"
}
  
   json = JSON.stringify(json);
   res.send(json);
})

app.post('/QueryRecommendPageServlet', function (req, res) {
   console.log("推送商品 POST 请求");
   res.header("Access-Control-Allow-Origin", "*");
           json = [ {
               goodId :   0,
               img    :   "http://img2.imgtn.bdimg.com/it/u=633342962,2323662678&fm=206&gp=0.jpg",
               goodMark : "连衣裙 夏日 清凉",
               goodCost: 100
          },{
               goodId :   1,
               img    :   "http://img1.imgtn.bdimg.com/it/u=2331582740,969546821&fm=11&gp=0.jpg",
               goodMark : "薄纱 时尚 清凉",
               goodCost: 200
          },{
               goodId :   1,
               img    :   "http://img1.imgtn.bdimg.com/it/u=2331582740,969546821&fm=11&gp=0.jpg",
               goodMark : "薄纱 时尚 清凉",
               goodCost: 200
          },{
               goodId :   1,
               img    :   "http://img1.imgtn.bdimg.com/it/u=2331582740,969546821&fm=11&gp=0.jpg",
               goodMark : "薄纱 时尚 清凉",
               goodCost: 200
          },{
               goodId :   0,
               img    :   "http://img2.imgtn.bdimg.com/it/u=633342962,2323662678&fm=206&gp=0.jpg",
               goodMark : "连衣裙 夏日 清凉",
               goodCost: 100
          },{
               goodId :   0,
               img    :   "http://img2.imgtn.bdimg.com/it/u=633342962,2323662678&fm=206&gp=0.jpg",
               goodMark : "连衣裙 夏日 清凉",
               goodCost: 100
          },{
               goodId :   0,
               img    :   "http://img2.imgtn.bdimg.com/it/u=633342962,2323662678&fm=206&gp=0.jpg",
               goodMark : "连衣裙 夏日 清凉",
               goodCost: 100
          }];
   json = JSON.stringify(json);
   res.send(json);
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})