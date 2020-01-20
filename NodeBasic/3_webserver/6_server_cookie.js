/**
 * http://usejsdoc.org/
 */

var  express = require('express');
         //(1) 동일한 폴더에서 express.js 파일
          //(2) node_modules 폴더에 express.js 파일
         //(3) node_moudles / express 폴더를 찾고 index.js 찾음
var http = require('http');
var path =require('path');

var stati = require('serve-static');
var bodyParse = require('body-parser');

var cookieParser = require('cookie-parser');


var app = express();
app.set('port',process.env.PORT || 3000);
app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json()); //json으로 데이터 받기위해

app.use(stati(path.join(__dirname,'public')));
app.use(cookieParser()); // cookie parser 설정



var router = express.Router();
router.route('/process/login').post(function(req,res){
   console.log('/process/login 요청됨');
   
   
   var paramId = req.body.id;
   var paramPw = req.body.pw;
   
   res.cookie('user', {
      id : paramId,
      name : "홍길동",
      authorized : true
   });
   
   
   //get 방식 여전히안됨
   /*var paramId = req.query.id;
   var paramPw = req.query.pw;*/
   
   
   res.writeHead(200, {'Content-Type':'text/html;charset=UTF-8'});
   res.write("<h1>로그인페이지</h1>");
   res.write("아이디 : " + paramId + "<br/>");
   res.write("패스워드 : " + paramPw + "<br/>");
   res.write("<a href ='/process/main'>우리사이트 메인으로 </a>");
   res.end();
});



router.route('/process/main').get(function(req,res){
   console.log('/process/main 이 요청됨');
   var user = req.cookies.user;
   if(user==null|| user=='' || user == undefined){
      res.redirect('/login2.html');
   }else{
      res.send(req.cookies);
   }
   
});

app.use('/', router);
app.all('*', function(req,res){
   console.log('<h1> 페이지를 찾을수 없음 </h1>');
});


http.createServer(app).listen(app.get('port'), function(){
   console.log('서버 실행중....');
}); //http://127.0.0.1:3000/login.html