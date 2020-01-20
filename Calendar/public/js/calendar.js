
// 달력 초기화 재설정
function resetCalendar(year,month){
	
	setTitle( year, month);
	initCal ( year, month );
	setEvent();
	$.ajax({
		type : "POST",
		url : '/list',
		success : function( data){
			var  temp = JSON.parse(data);	// JSON 으로 받은 값을 객체화
			$('.cel li').remove();	// 셀의 목록을 모두 삭제
			for( var key in temp ){ // 받은 데이타를 셀마다 등록
				$('#' + temp[key].date ).append('<li>' + temp[key].content + "</li>");
			}
			
		}
	});
}

function setTitle( year, month){
	alert("확인");
	var prev_month = month - 1;
	var next_month = month + 1;
	var prev_year = year;
	var next_year = year;
	
	// 1월 12월인 경우
	if( month == 1 ){
		prev_month = 12;
		prev_year = year - 1;
	}else if( month == 12){
		next_month = 1;
		next_year = year + 1;
	}
	
	$('.prevMonth').text(prev_year+'-'+prev_month);
	$('.currentMonth').text(year+'-'+month);
	$('.nextMonth').text(next_year+'-'+next_month);
	


}

function initCal( year, month){
	alert("확인2");
	// 1일과 마지막 날짜의 요일 구하기 ( 일요일 : 0, 월요일 : 1 ~ )
	var start_day = new Date( year, month-1, 1).getDay();
	var end_day = get_day_max(year, month-1)
	// 기존 내역 지우기
	$('#calMain_day').empty();
	
	// 달력의 날짜 만들기
	for( var i=0; i < 42; i++){
		
		if( start_day > i ){			// 첫주 설정 : 시작일이 일요일이 아니면 앞에 공백처리
			$('#calMain_day').append('<div class="cel_dummy"></div');
		} else if(  (i -start_day + 1 ) <= end_day ){
												// 1일부터 마지막일까지 출력
			
			// 각각의 날짜에 아이디 지정 : yyyymmdd 형식
			var temp_id = year + '' + get_number_str(month) +  '' + get_number_str( i - start_day + 1);
			$('#calMain_day').append('<div id="'+temp_id+'" class="cel">' + ( i-start_day+1) +'</div>');
			
			// 일요일인 경우
			if( i % 7 == 0 ) { 		$('#' + temp_id).addClass('red');			}
			// 토요일인 경우
			if( i % 7 == 6 ){			$('#' + temp_id).addClass('blue');			}
			
		}else{							// 마지막주 설정 : 끝 나는 요일이 일요일이 아니면 뒤로 공백처리
			if( i%7 == 0) break;
			else {
				$('#calMain_day').append('<div class="cel_dummy"></div');
			}
		}
	}
	
	//#####
	// 날짜에 마우스 롤오버 처리
	$('#calMain_day').find('.cel').hover(function(){
		$(this).css("background-color","yellow	");
	},function(){
		$(this).css("background-color","white");
	});
	
	
}

// 그 달의 마지막 날짜 구하기
function get_day_max( y, m){
	var i = 29;
	while( i < 32 ){
		var cday = new Date( y, m, i);
		if( cday.getFullYear() != y || cday.getMonth() != m ) break;
		i++;
	}
	return i-1;
}

function get_number_str( num){
	if( num < 10 ) { num = '0' + num; }
	return num;
}

