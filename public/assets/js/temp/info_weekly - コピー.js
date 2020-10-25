
$(document).ready(function(){

	var d = new Date();
	var thisYear = d.getFullYear();//今年
	var thisMonth = d.getMonth()+1;//今月
	if(thisMonth <10){thisMonth = "0" + thisMonth}
	var selectedmonth = thisYear + "-" + thisMonth;

	var select_day_style_pulldown=1;

	//先月
	$('#last_month').click(function(){
		var select_last_month = $('#last_ympicker').val().trim();
		if(select_last_month){
		//	fetchRecords(select_last_month);
		//	fetchRecords(select_last_month,select_day_style_pulldown);
		}
	});

	//翌月
	$('#next_month').click(function(){
		var selectedmonth = $('#next_ympicker').val().trim();
		if(selectedmonth){
		//	fetchRecords(selectedmonth);
		//	fetchRecords(selectedmonth,select_day_style_pulldown);
		}
	});

	//当月
//	$('#this_month').click(function(){
	$('#weekly_style').click(function(){
//		alert('weekly_style');
	//  var selectedmonth = Number($('#search').val().trim());
	    var selectedmonth = $('#ympicker').val().trim();
		if(selectedmonth){
		//	fetchRecords(selectedmonth);
			fetchRecordsweekly(selectedmonth,select_day_style_pulldown);
		}
	});

	//日付用プルダウン
	$('#day_pulldown_data').change(function(){
		select_day_style_pulldown = $('#day_style_pulldown').val().trim();
		selectedmonth = $('#ympicker').val().trim();

		if(select_day_style_pulldown){
		//	alert(selectedmonth);
		//	fetchRecordsweeklyweekly(selectedmonth,select_day_style_pulldown);
		}
	});

	//履歴ページ初回処理
	if(selectedmonth !=''){
//		var selectedmonth = $('#ympicker').val().trim();
	//	fetchRecordsweekly(selectedmonth,select_day_style_pulldown);
	}




});


//週のスタート日、月のスタート日、週のエンド日を取得
function getWeekOfMonth2(year, month, weekNumber) {

	let startDayOfMonth = new Date(year, month - 1, (weekNumber - 1) * 7 + 1);

	let startDayOfWeek = new Date(year, month - 1, (weekNumber - 1) * 7 + 1);
//	alert('月のスタート日は　' + startDayOfWeek);

	let day2 = startDayOfWeek.getDay();//曜日を数字で取得(0～6)

	//startDayOfWeek.setDate(startDayOfWeek.getDate() + (day2 ? 1 - day2 : -6));
	var diffDay;

	if (day2) {
		diffDay = 0 - day2;//月〜土の場合
	}else{
		diffDay = -6;//日の場合
	}

	startDayOfWeek.setDate(startDayOfWeek.getDate() + diffDay);
	//alert('週のスタート日は　' + startDayOfWeek);

	let endDayOfWeek = new Date(startDayOfWeek);
	endDayOfWeek.setDate(endDayOfWeek.getDate() + 6);
	//alert('週のエンド日 は　' + endDayOfWeek);

	//月末日を取得
	var endDayOfMonth = new Date(year,month,0);
//	var endDayOfMonth = date.toDateString();


	//YYYY-MM-DD の書式に変換
	startDayOfMonth = formatDate(startDayOfMonth);
	startDayOfWeek = formatDate(startDayOfWeek);
	endDayOfWeek = formatDate(endDayOfWeek);
	endDayOfMonth = formatDate(endDayOfMonth);

//	alert(endDayOfMonth);

	return { startDayOfMonth: startDayOfMonth,
			startDayOfWeek: startDayOfWeek,
			endDayOfWeek: endDayOfWeek,
			endDayOfMonth:endDayOfMonth
			}
}

// 日付をYYYY-MM-DDの書式で返す
function formatDate(dt) {
  var y = dt.getFullYear();
  var m = ('00' + (dt.getMonth()+1)).slice(-2);
  var d = ('00' + dt.getDate()).slice(-2);
  return (y + '-' + m + '-' + d);
}

// YYYY-MM-DDから年月日で返す
function changeToDateFomYyyymmdd(short_buy_date){

		var str_yyyy = short_buy_date.substr(0,4);//yyyy/mm/dd
	//	alert(str_yyyy);

		var str_mm = short_buy_date.substr(5,2);//yyyy/mm/dd
	//	alert(str_mm);

		var str_dd = short_buy_date.substr(8,2);//yyyy/mm/dd
	//	alert(str_dd);

 		var date_buy_date = new Date(str_yyyy,str_mm-1,str_dd);

		return date_buy_date;
	//	return {str_yyyy:str_yyyy,str_mm:str_mm,str_dd:str_dd};
}


function fetchRecordsweekly(selectedmonth,select_day_style_pulldown){
	alert('fetchRecordsweekly');
	$.ajax({
		  type: 'GET',
		  cache: false,
//		  url: '/money/show/'+selectedmonth + select_day_style_pulldown,
		  url: '/money/show_weekly/'+selectedmonth,
		  dataType: 'json'
		})


		//共通処理
		.always((response) => {

			$('#day_pulldown_data').empty(); // Empty
			$('#userTable').empty(); // Empty
			$('#userTable2').empty(); // Empty
			$('#last_month_data').empty(); // Empty
			$('#next_month_data').empty(); // Empty
			$('#this_month_data').empty(); // Empty

     		var len = 0;
     		len = response.length;
		//	len = len-3;//配列に格納している月情報(先月、今月、来月)除く

     	//来月
//     	var next_month = new Date(date.getFullYear(), date.getMonth()+1);
		var next_ym = selectedmonth.split("-");
		var next_my_temp = new Date(next_ym[0],next_ym[1],01);
		next_my_temp = next_my_temp.toLocaleString();
		var temp_next_month = next_my_temp.split("/");

		//月が1桁の時は先頭に「0」を付ける
		if(1 == temp_next_month[1].length){
			temp_next_month[1]  = "0"+temp_next_month[1];
			next_my_temp = temp_next_month[0] + "-" + temp_next_month[1];
		}else{
			next_my_temp  = next_my_temp.slice( 0, 7 );
			next_my_temp = next_my_temp.replace('/', '-')
		}

		var next_month = next_my_temp;

		/*********************/
     	//今月
		/*********************/
//     	var this_month = response[response.length - 2];
     	var this_month = selectedmonth;

		/*********************/
     	//先月
		/*********************/
//     	var last_month = response[response.length - 3];
		var last_ym = selectedmonth.split("-");
		var last_my_temp = new Date(last_ym[0],last_ym[1]-2,01);
		last_my_temp = last_my_temp.toLocaleString();
		var temp_last_month = last_my_temp.split("/");

		//月が1桁の時は先頭に「0」を付ける
		if(1 == temp_last_month[1].length){
			temp_last_month[1]  = "0"+temp_last_month[1];
			last_my_temp = temp_last_month[0] + "-" + temp_last_month[1];
		}else{
			last_my_temp  = last_my_temp.slice( 0, 7 );
			last_my_temp = last_my_temp.replace('/', '-')
		}

		var last_month = last_my_temp;

		var thisYear = Number(selectedmonth.substr(0,4));//年のみ取得
		var thisMonth = Number(selectedmonth.substr(5,2));//月のみ取得

	//	alert(thisMonth);

		//var {startOfmonth,startOfweek, end}  = getWeekOfMonth('2020','9','1');

		//週ごとの開始日と終了日の配列の初期化
		var weekArr = new Array(6);
		for(let y = 0; y < 6; y++) {
		  weekArr[y] = new Array(2).fill(0);
		}

		for(var x=0;x<=4;x++){

			var week_num = x+1;
			var {startDayOfMonth,startDayOfWeek,endDayOfWeek,endDayOfMonth}  = getWeekOfMonth2(thisYear,thisMonth,week_num);
//			var {startDayOfMonth,startDayOfWeek,endDayOfWeek,endDayOfMonth}  = getWeekOfMonth2('2020','9',week_num);

		//	alert('月のスタート日は　' + startDayOfMonth);
		//	alert('週のスタート日 は　' + startDayOfWeek);
		//	alert('週のエンド日 は　' + endDayOfWeek);
		//	alert('月のエンド日 は　' + endDayOfMonth);

			if(x==0){
				//	weekArr[0]['startDayOfWeek']  = startDayOfMonth;//月初め
				//	weekArr[0]['endDayOfWeek']    = endDayOfWeek;
					startDayOfWeek = startDayOfMonth;
			}

			if(x==4){
					endDayOfWeek = endDayOfMonth;//月最終日
			}

			weekArr[x]['startDayOfWeek']  = startDayOfWeek;
			weekArr[x]['endDayOfWeek']    = endDayOfWeek;


			if(startDayOfWeek=='' ){break;}

			if(x==0){startDayOfWeek = startDayOfMonth;} //月開始日
			if(x==4){endDayOfWeek = endDayOfMonth;}     //月最終日

			var week_num =x+1;

			var tr_title =
 				"<th>" + week_num + " 週目　<br>"+ startDayOfWeek + "～" + endDayOfWeek +"</th>" ;

			$("#userTable2").append(tr_title);
		}

		var tr_first = "<tr>" ;
		var tr_end = "</tr>" ;

		$("#userTable2").append(tr_first).append(tr_end);

//     	if(len > 0){
//     		alert(len);
     		var cnt = len-1;
//     		for(var i=0; i<len; i++){
  			for(var i=cnt; cnt>=0; i--){
     			var id           = response[i].id;
     			var buy_date     = response[i].buy_date;
     			var item_name    = response[i].item_name;
     			var dai_category = response[i].dai_category;
     			var price        = response[i].price;
     			var store        = response[i].store;
     			var memo         = response[i].memo;

     			var short_item_name = item_name.substr(0,7);
     			var short_buy_date = buy_date.substr(0,10);

     			if(store){
     				var short_store = store.substr(0,7);
     				store = short_store;
     			}

     			if(memo){
     				var short_memo = memo.substr(0,7);
     				memo = short_memo;
     			}


     			//入力必須ではないので、表示時に「null」表示を防ぐ
     			if(!store){store='';}
     			if(!memo){memo='';}


     			//yyyy/mm/dd ～　yyyy/mm/dd
     			var tr_week;

     			//購入日の年月日
     			var date_buy_date = changeToDateFomYyyymmdd(short_buy_date);
     	 	//	alert(date_buy_date);


     			for(var week_count=0;week_count<=4;week_count++){
     			//	alert();

     			}



     			//週ごとテンプレートの開始日　年月日
 				var graph_start_buy_date = weekArr[1]['startDayOfWeek'];
 				graph_start_buy_date = changeToDateFomYyyymmdd(graph_start_buy_date);

     			//週ごとテンプレートの終了日　年月日
 				var graph_end_buy_date = weekArr[1]['endDayOfWeek'];
 				graph_end_buy_date = changeToDateFomYyyymmdd(graph_end_buy_date);


     			// X週目の開始日～終了日
        		if(graph_start_buy_date <= date_buy_date && date_buy_date <= graph_end_buy_date){

        			//週分回す
     				for(x=0;x<5;x++){

     					tr_week += "<td>" +
	     						   "<div>" + "<a href='/money/" + id + "/edit'>" +
	     						   "<img src='/img/edit_bottun.png' alt='編集'></a>" +
	     						   short_buy_date + "<br>" + short_item_name + price + "</div>" +
	     						   "</td>"
	     						   ;
     				}
 				}

     			var tr_str =
     				"<tr>" + tr_week + "</tr>"
     				;

     			//$("#userTable2 tbody").append(tr_str);
     			$("#userTable2").append(tr_str);











     			tr_week='';
     		}

     		//選んだ月を「今月」のプルダウンに渡す

     		var yearMonthPulldown; //プルダウン表示用
     		var d = new Date();
     		var thisYear = d.getFullYear();//今年
     		var thisMonth = d.getMonth()+1;//今月
     		var thisYearMonth = thisYear + "-" + thisMonth;
     		var selected;

     		for(var y=thisYear-1; y<=thisYear+1; y++){
     			for(var m=1; m<=12; m++){

     				if(m<10){m = '0'+m;}//月を2桁
     				var pullym = y+"-"+m;



     				if(selectedmonth == pullym){
     					 selected = "selected";
     				}else if(thisYearMonth == pullym){
     					 selected = "selected";
     				}

     				yearMonthPulldown += "<option value='" + y + "-" + m + "'"+selected+">" + y + "年" + m + "月</option>" ;
     				selected='';//初期化
     			}
     		}

     		//今月
//     		var this_month = "<input type='hidden' id='next_ympicker' name='next_ympicker' value='" + selectedmonth + "'>";
     		var this_month_html = "<select name='ympicker' id='ympicker'>" + yearMonthPulldown + "</select>" ;

     		$("#this_month_data").append(this_month_html);
//     		$("#ympicker").append(this_month);

     		//先月
     		var last_month_html = "<input type='hidden' id='last_ympicker' name='last_ympicker' value='" + last_month + "'>";
     		$("#last_month_data").append(last_month_html);

     		//来月
     		var next_month_html = "<input type='hidden' id='next_ympicker' name='next_ympicker' value='" + next_month + "'>";
     		$("#next_month_data").append(next_month_html);


	//        }else{
	//        }

		  })

		  .done((response) => {
		      //  alert("データあり");
		      //データ取得成功時の箇所だが「always」で共通処理として記載している
		  })

		  .fail((response) => {
	 //       alert("データなし");
	     	   var tr_str =
	     		   "<td colspan='7'>No record found.</td>"
	     		   ;
	     		   $("#userTable22").append(tr_str);

		  })

;}
