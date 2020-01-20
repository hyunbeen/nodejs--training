/**
 * 
 */

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/test");

var db = mongoose.connection;

db.on('error',console.error.bind(console,"연결실패"));
db.once('open',function callback(){
	//스키마 생성
	var sungjuk = mongoose.Schema({
		name : String,
		kor : Number,
		eng : Number		
	});
	
	var Student = mongoose.model('student',sungjuk);
	var s1 = new Student({
		name : '한지민',
		kor : 66,
		eng : 88
	});
	
	s1.save(function(err,s1){
		if(err){
			throw err;
		}
		Student.find(function(err,data){
			if(err){throw err;}
			db.close();
			console.log("---------------------");
			console.log(data);
		});
		
	})
	

	
});