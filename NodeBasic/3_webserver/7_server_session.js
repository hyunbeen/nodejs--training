
var express = require('express'),
	http = require('http'),
	path = require('path');


// 익스프레서의 미들웨어 불러오기
var servestatic = require('serve-static');	
var bodyParser = require("body-parser");



// ###### 세션은 쿠키도 사용하므로 쿠키모듈도 필요 :  package.json에 추가
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');



//  익스프레스 객체 생성
var app = express();



//  기본 포트를 app 객체에 속성으로 설정
app.set('port', process.env.PORT || 3000);


// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use( bodyParser.urlencoded({ extended : false}));


// body-parser를 사용해 application/json 파싱
app.use( bodyParser.json());




// ###### 쿠키와 세션은 미들웨어로 사용되기에 때문에 use() 메소드를 이용하여 미들웨어에 추가 
app.use ( cookieParser());

app.use ( expressSession( {
	secret : 'my session',
	resave : true,
	saveUninitialized : true
}));


// 요청패스와 특정 폴더 매핑
app.use( servestatic(path.join(__dirname, 'public'))); 
	

//라우터 객체 참조
var router = express.Router();


//#####  1.  로그인이 필요한 경로 http://localhost:3000/process/main 을 요청한다면
router.route('/process/main').get(function( req, res){
	console.log('/process/main 호출됨');
	
	if( req.session.user ){
		res.redirect('/myPage.html');
	}else{
		res.redirect('/login2.html');
	}
});


router.route('/process/login').post(function(req, res) {
	console.log('/process/login 처리함.');

	var paramId = req.body.id || req.query.id;
	var paramPassword = req.body.pw || req.query.pw;
	
	// #####  2. 이미 로그인 된 상태라면 바로 myPage.html 로 이동
	if( req.session.user){
		console.log('이미 로그인되어 상품 페이지로 이동합니다.');
		res.redirect('/myPage.html');
		
	}else{ // ##### 로그인한 상태가 아니라면 세션에 저장 
		
		req.session.user = {
			id : paramId,
			name : '홍길동',
			authorized : true
		};
		
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
		res.write('<div><p>Param id : ' + paramId + '</p></div>');
		res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
		res.write("<br><br><a href='/myPage.html'> 우리 사이트 들어가기 </a>");
		res.end();
	}
});

// ###### 3. 로그아웃
router.route('/process/logout').get(function(req, res){
	console.log('/process/logout 호출됨.');
	
	if( req.session.user){ // 기존에 로그인된 상태라면
		console.log('로그아웃합니다.');
		req.session.destroy(function (err){
			if( err) { throw err;}
			console.log('세션을 삭제하였습니다.');
			res.redirect('/login2.html');
		});
	}else{ // 로그인된 상태가 아니라면
		console.log('로그인된 상태가 아닙니다.');
		res.redirect('/login2.html');
	}
	
});

// 라우터 객체를 app 객체에 등록
app.use('/', router);

// 등록되지 않은 패스에 대해 페이지 오류 응답
app.all('*', function(req, res) {
	res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
});



// 익스프레스 서버 시작
http.createServer(app).listen( app.get('port'), function(){
	console.log('익스프레스 서버 시작 : ' +  app.get('port'));
});



