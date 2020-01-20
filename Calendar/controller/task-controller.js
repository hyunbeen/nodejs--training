/**
 * http://usejsdoc.org/
 */

var Task = require('../model/task.js');
exports.create = function(req,res){
	Task.find(function(err,tasks){
		new Task({
			content : req.body.content,
			date : req.body.date
		}).save();
		res.end();
	});
};

exports.list = function(req,res){
	Task.find(function(err,tasks){
		var temp = JSON.stringify(tasks);
		res.send(temp);
	});
}

