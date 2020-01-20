
var express = require('express'),
	http = require('http'),
	path = require('path');

// 익스프레서의 미들웨어 불러오기 - 순서도 중요 ( 순서가 바뀌면 오류 발생할 수도 )
var stati = require('serve-static');	
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

// ###### 파일 업로드용 미들웨어
// 파일 업로드 후에 업로드한 파일을 다루어야 하는 경우가 있기에 fs도 필요할수도
// 클라이언트에서 ajax로 요청했을 때 cors(다중서버접속) 지원
var multer = require('multer');
var fs = require('fs'); 
var cors = require('cors');

//  익스프레스 객체 생성
var app = express();

//  기본 포트를 app 객체에 속성으로 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use( bodyParser.urlencoded({ extended : false}));
// body-parser를 사용해 application/json 파싱
app.use( bodyParser.json());

// 쿠키와 세션은 미들웨어
app.use ( cookieParser());
app.use ( expressSession( {
	secret : 'my session',
	resave : true,
	saveUninitialized : true
}));

// 요청패스와 특정 폴더 매핑
app.use( stati(path.join(__dirname, 'public'))); 
// ###### upload 폴더 매핑
app.use( stati(path.join(__dirname, 'uploads')))
// ###### 클라이언트에서 ajax로 요청했을 때 다중 서버 접속 지원
app.use( cors());

// ###### multer 미들웨어 사용 ( body-parser / multer / router 순서 중요 )
var storage = multer.diskStorage({
	destination : function( req, file, callback){
		callback( null, 'uploads');
	},
	filename : function( req, file, callback){
		callback(null, file.originalname + Date.now());
	}
});
var upload = multer({
	storage : storage,
	limits : {
		files : 10,						// 파일수 10개 제한
		fileSize : 1024 * 1024 * 1024   // 파일용량 1G 제한
	}
});


//라우터 객체 참조
var router = express.Router();

//#####  파일업로드 필요한 경로 http://localhost:3000/process/uplaod 을 요청한다면
router.route('/process/upload').post( upload.array('photo',1), function( req, res){
	console.log('/process/upload 호출됨');
	
	var files = req.files;
	console.log(req.files[0]);
	
	var originalname = '', filename ='', mimetype ='', size=0;
	
	if( Array.isArray(files)){ // 배열로 받는 경우
		for( var idx=0; idx < files.length; idx++){
			originalname = files[idx].originalname;
			filename = files[idx].filename;
			mimetype = files[idx].mimetype;
			size = files[idx].size;
		}
	}
	
	// 클라이언트에 응답전송
	res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
	res.write('<h1> 파일 업로드 결과 </h1>');
	res.write('원본파일명 : ' + originalname + '<br/>');
	res.write('저장파일명 : ' + filename  + '<br/>');
	res.write('마임타입 : ' + mimetype  + '<br/>');
	res.write('크기 : ' + size  + '<br/>');
	res.end();
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



