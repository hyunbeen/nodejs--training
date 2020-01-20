var http = require('http');
var fs = require('fs');

var server= http.createServer(function(req,res){
   fs.readFile('01_client.html',function(err,data){
      res.writeHead(200,{'Content-Type':'text/html'});
      res.write(data);
      res.end();
   });
}).listen(7000, function(){
   console.log('서버실행중..');
});
var socketio = require('socket.io');
var io = socketio.listen(server);
io.sockets.on("connection",function(socket){
	console.log("소켓생성");
	socket.on('toServer',function(data){
		console.log("from client->"+data);
		io.sockets.emit('toClient','['+data+']보냄');
	});
});