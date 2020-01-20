/**
 * http://usejsdoc.org/
 */

var http = require('http');
var fs = require('fs');
var server = http.createServer();

server.listen(9001,function(){
	console.log('9001 서버가 시작되었습니다');
});

server.on('connection',function(socket){
	console.log("클라이언트가 접속했음",socket.address().address);
});

server.on('request',function(req,res){
	console.log("클라이언트 요청이 들어왔습니다");
	 fs.readFile('3_webserver/images/img.png', function(err, data){
		res.writeHead(200,{'Content-Type':'image/png'});
		res.write(data);
		res.end();
		
	});
});