var socketio = require('socket.io');
var express = require('express');
var http = require('http');
var fs = require('fs');

var seats  = [
    [1,1,0,1,1,0,0,0,0,1,1,0,1,1],          
    [1,1,0,1,1,1,1,1,1,1,1,0,1,1],          
    [1,1,0,1,1,1,1,1,1,1,1,0,1,1],          
    [1,1,0,1,1,1,1,1,1,1,1,0,1,1],          
    [1,1,0,1,1,1,1,1,1,1,1,0,1,1],          
    [1,1,0,1,1,1,1,1,1,1,1,0,1,1],          
    [1,1,0,1,1,1,1,1,1,1,1,0,1,1],          
    [1,1,0,1,1,1,1,1,1,1,1,0,1,1],          
    [1,1,0,1,1,1,1,1,1,1,1,0,1,1],          
    [1,1,0,1,1,1,1,1,1,1,1,0,1,1],          
    [1,1,0,1,1,1,1,1,1,1,1,0,1,1],          
    [1,1,0,1,1,1,1,1,1,1,1,0,1,1],          
    [1,1,0,1,1,1,1,1,1,1,1,0,1,1]          
 ];

//웹서버생성
var app = express();

//미들웨어(라우터) 설정
app.use(app.router);

//라우터를 수행
app.get('/', function(request, response){
	fs.readFile('HTMLPage.html', function(error, data){
		response.send(data.toString());
	});
});

app.get('/seats', function(request, response){
	response.send(seats);
});

// 웹서버 실행
var server = http.createServer(app);
server.listen(5100, function(){
	console.log('Server running...');
});




// 1. 웹소켓생성,실행

//소켓 구동
var io = socketio.listen(server);

//1.소켓 연결
io.sockets.on('connection',function(socket){
//클라이언트로 부터 전송된 데이타 처리


socket.on('location',function(data){

	
	var x = data.lx;
	var y = data.ly;
	seats[y][x] = 2;
	
	io.sockets.emit('Make',seats); 
	
});


});
