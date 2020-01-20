/**
 * 스키마를 선언
 */

// 모듈 연결
var mongoose = require('mongoose');
var Schema=mongoose.Schema;

// 스키마 선언
var taskSchema = new Schema({
	status : { type : String, 'default': 'TO-DO'},
	contents : String,
	createDate : { type: Date, 'default': Date.now},
	author : { type:String, 'default':'kim'}
}); // default는 왜  ' '해야 하나??
 
// task-controller에서 사용할 수 있도록 exports
module.exports = mongoose.model('Task', taskSchema);