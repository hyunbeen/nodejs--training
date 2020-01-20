/**
 * http://usejsdoc.org/
 */

var http = require('http');
//http://127.0.0.1:9000/add
var server = http.createServer(function(req, res){
   if(req.url=='/'){
	res.writeHead(200, {'Content-Type':'text/plain;charset=UTF-8'});
   res.write("메인페이지");
   res.end();
   }else if(req.url=='/add'){
		res.writeHead(200, {'Content-Type':'text/plain;charset=UTF-8'});
		   res.write("더하기 작업중");
		   res.end();
   }
});
server.listen(9000, "127.0.0.1");

console.log('서버실행중.......');