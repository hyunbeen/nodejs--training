
var socketio = require('socket.io');

var http = require('http'); // 서버 생성

var fs = require('fs');


var server = http.createServer( function(request, response){	
	fs.readFile('02_client.html', function(err, data){
		response.writeHead( 200, { 'Content-Type' : 'text/html' } );
		response.end(data);
	});
}).listen(7500, function(){
	console.log("server runing.....");
});

//소켓 구동
var io = socketio.listen(server);

//1.소켓 연결
io.sockets.on('connection',function(socket){
//클라이언트로 부터 전송된 데이타 처리
socket.on('join',function(data){
	socket.join(data); //join()의 역활
});

socket.on('message',function(data){
	io.sockets.emit('message2',data); //join()의 역활
});

});


