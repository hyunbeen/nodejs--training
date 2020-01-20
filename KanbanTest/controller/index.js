/**
 * http://usejsdoc.org/
 */

var initTasks = require('../model/task');

exports.index = function(req,res){
	res.render('index',{
		//views 폴더에 있는 index(.jade)
		title : '나의 칸반',
		todoTasks : initTasks.getTasks().todo,
		doingTasks: initTasks.getTasks().inProgress,
		doneTasks : initTasks.getTasks().done
	});
}