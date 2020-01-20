
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');


var app = express();


app.configure( function(){
	app.set('port', process.env.PORT || 4000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure("development", function(){
	app.use(express.errorHandler());
});

//[ 실행하려면 ]  http://localhost:4000/calendar.html

var controller = require('./controller/task-controller.js');

app.post('/createTask',controller.create);
app.post('/list',controller.list);
require('./db.js').connect();






var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


var socketio = require('socket.io');

////소켓 구동
var io = socketio.listen(server);
//
////1.소켓 연결
io.sockets.on('connection',function(socket){
////클라이언트로 부터 전송된 데이타 처리
	
socket.on('join',function(data){
	socket.join(data); //join()의 역활
});

socket.on('message',function(data){
	io.sockets.emit('message2',data); 
});

});

