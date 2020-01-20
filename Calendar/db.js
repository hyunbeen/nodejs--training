/**
 * Mongo DB와 연결
 */

// mongoose 모듈 연결
var mongoose = require('mongoose');

// 연결 URI
var dbURI ='mongodb://localhost:27017/test';

// app.js 에서 호출한 함후
exports.connect = function(){
	mongoose.connect(dbURI);	// DB connection Pool에서 연결 얻어오기
	
	mongoose.connection.on('connected', function(){
		console.log('연결성공: ' + dbURI);
	});
	mongoose.connection.on('error', function(err){
		console.log('연결실패: ' + err);
	});
	mongoose.connection.on('disconnected', function(){
		console.log('연결이 끊어짐 ');
	});
	
	// Nodejs 프로그램이 끝나면, DB 연결 닫음
	process.on('SIGINT',  function(){
		mongoose.connection.close( function(){
			console.log('응용프로그램 종료로 디비 닫음');
			process.exit(0);
		});
	});
	
}