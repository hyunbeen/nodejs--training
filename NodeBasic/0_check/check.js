/**
 * http://usejsdoc.org/
 */

var http = require('http');

http.createServer(function(req, res){
   res.writeHead(200, {'Content-Type':'text/plain;charset=UTF-8'});
   res.write("나의 첫 노드");
   res.end();
}).listen(1337, "127.0.0.1");

console.log('서버실행중.......');