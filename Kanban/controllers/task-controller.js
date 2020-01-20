/**
 * task 모델을 바인딩
 */

var Task = require('../models/task.js');

// list() 선언
exports.list = function( req, res){
	Task.find( function( err, tasks) {
		console.log('작업 성공 : ' + tasks);
		
		var todoTasks = [];			// 배열변수 선언
		var progressTasks = [];
		var doneTasks = [];
		
		for( var key in tasks ){
			var task = tasks[key];
			if( task.get('status') === 'TO-DO'){
				todoTasks.push( task.get('contents'));
			}else if ( task.get('status') === 'PROGRESS'){
				progressTasks.push( task.get('contents'));
			}else if ( task.get('status') === 'DONE'){
				doneTasks.push( task.get('contents'));
			}else if ( task.get('status') === 'DELETE'){
				doneTasks.pop( task.get('contents'));
			}else{
				console.log('작업상태의 값이 없습니다.');
			}
		}		
		// index.jade에 task list에 랜더링
		res.render('index', {
			title : '나의 메모',
			todoTasks : todoTasks,
			progressTasks : progressTasks,
			doneTasks : doneTasks
		});
	});
};


//------------------------------------------
// 작업 추가하기
exports.create = function( req, res ){
	Task.find( {contents:req.body.contents }, function(err, tasks){
		if( err ) throw err;
		new Task({
			contents : req.body.contents
		}).save();
	});	
	res.redirect('/');
	res.end();
};

//--------------------------------------------
// 작업 단계 이동하기 - 수정
exports.update = function( req, res ){
	Task.update({ 
			contents: req.body.contents
		},	{
			status : req.body.status 
		},
		function( err ){
				if( err) throw err;
				console.log('문서가 수정되었습니다'); 
			}
		);
	
	res.redirect('/');
	res.end();
}

//--------------------------------------------
// 작업 제거하기
exports.remove = function( req, res ){
	Task.remove( {
		contents : req.body.contents
	}, function(err){
		if( err ) throw err;
		console.log( req.body.contents + "작업이 삭제되었습니다");
	});
	res.redirect('/');
	res.end();
}
