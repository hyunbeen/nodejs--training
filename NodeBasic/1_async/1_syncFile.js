/**
 * http://usejsdoc.org/
 */

var fs = require('fs');//filesysystem 모듈

console.log('시작');

var fnames = fs.readdirSync('.');
for(var i=0;i<fnames.length;i++){
	console.log(fnames[i]);
}

console.log('끝');