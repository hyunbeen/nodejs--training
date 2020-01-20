
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 2000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

//-------------------------------------
// #1. 페이지 이동 : http://localhost:2000/RedirectPage
//app.get('/', routes.index );
//app.get('/RedirectPage', function( request, response) {
//		response.redirect( 'http://kosta.or.kr'  );
//	
//});
app.get('/', routes.index );
app.get('/RedirectPage', function( request, response) {
		response.writeHead( 302, { 'Location': 'http://kosta.or.kr' } );
		response.end();
});

//#1. 브라우저 구별하고자 할 때 :  // http://localhost:2000/ChromePage
app.get('/ChromePage', function( request, response) {
		var agent = request.header('User-Agent');
		
		if( agent.toLowerCase().match(/chrome/) ) {
				response.writeHead( 200, { 'Content-Type':'text/html;charset=UTF-8'} );// 한글처리
				response.end('<h1>크롬만 환영</h1>');
		} else{
				response.end('/');
		}
});	

// #2. 요청 매개변수 얻기
// http://127.0.0.1:2000/Param?id=당신의아이디&name=당신의이름  로 접속시	

app.get('/Param', function( request, response) {
	var output = '';
	output += 'id = ' + request.param('id') + '<br/>';
	output += 'name = ' + request.param('name') + '<br/>';
	
	response.writeHead( 200, { 'Content-Type':'text/html;charset=UTF-8'} ); // 한글처리
	response.end( output);
});


		
//------------------------------------

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
