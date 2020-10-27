
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
		//	fetchRecordsweekly(select_last_month);
			fetchRecordsweekly(select_last_month,select_day_style_pulldown);
		}
	});

	//翌月
	$('#next_month').click(function(){
		var selectedmonth = $('#next_ympicker').val().trim();
		if(selectedmonth){
		//	fetchRecordsweekly(selectedmonth);
			fetchRecordsweekly(selectedmonth,select_day_style_pulldown);
		}
	});

	//当月
//	$('#this_month').click(function(){
	$('#this_month_data').change(function(){
	//  var selectedmonth = Number($('#search').val().trim());
	    var selectedmonth = $('#ympicker').val().trim();
		if(selectedmonth){
		//	fetchRecordsweekly(selectedmonth);
			fetchRecordsweekly(selectedmonth,select_day_style_pulldown);
		}
	});




	//履歴ページ初回処理
	if(selectedmonth !=''){
//		var selectedmonth = $('#ympicker').val().trim();
		fetchRecordsweekly(selectedmonth,select_day_style_pulldown);
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

/***************************************************/
//　今日がその週に該当するかどうかの判定
//@para
// today - 今日の日付
// graph_start_buy_date - その週の開始日時
// graph_end_buy_date - その週の終わり日時
//
//@return - CSS用のクラス名
/***************************************************/
function getThisWeekStyle(today,graph_start_buy_date,graph_end_buy_date){

	var sell_style = '';
//		if(today >= '2020/10/25' && today <= '2020/10/31'){
	if(today >= graph_start_buy_date && today <= graph_end_buy_date){
		sell_style = 'this_week_style';
	}else{
		sell_style = 'this_week_style_not';
	}

	return sell_style
}

//今日の日付
var today = new Date();


function fetchRecordsweekly(selectedmonth,select_day_style_pulldown){
//	alert('fetchRecordsweekly');
	$.ajax({
		  type: 'GET',
		  cache: false,
//		  url: '/money/show/'+selectedmonth + select_day_style_pulldown,
		  url: '/money/show_weekly_for_ajax/'+selectedmonth,
		  dataType: 'json'
		})


		//共通処理
		.always((response) => {

			$('#userTable_for_week').empty(); // Empty
			$('#userTable_for_week_1').empty(); // Empty
			$('#userTable_for_week_2').empty(); // Empty
			$('#userTable_for_week_3').empty(); // Empty
			$('#userTable_for_week_4').empty(); // Empty
			$('#userTable_for_week_5').empty(); // Empty
			$('#userTable_for_week_6').empty(); // Empty

			$('#userTable_for_week_1_sum').empty(); // Empty
			$('#userTable_for_week_2_sum').empty(); // Empty
			$('#userTable_for_week_3_sum').empty(); // Empty
			$('#userTable_for_week_4_sum').empty(); // Empty
			$('#userTable_for_week_5_sum').empty(); // Empty

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
		for(let y=0; y<=6; y++) {
		  weekArr[y] = new Array(2).fill(0);
		}

 		/**************************************/
 		//週始め～週終わり　の表
 		/**************************************/
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




			if(startDayOfWeek==''){break;}

			if(x==0){startDayOfWeek = startDayOfMonth;} //月開始日
			if(x==4){endDayOfWeek = endDayOfMonth;}     //月最終日

			endDayOfWeek = endDayOfWeek.substr(5,5); //週間の最終日を月日のみに切り出し 「10-01」

			var week_num =x+1;

			var tr_title =

 				"<th>" + week_num + " 週目　<br>"+ startDayOfWeek + "～" + endDayOfWeek +"</th>"
 				;

			var tr_first = "<table class='table-rireki2'><tr>" ;
			var tr_end = "</tr></table>" ;

			$("#userTable_for_week").append(tr_title);
		//	$("#userTable_for_week").append(tr_first).append(tr_title).append(tr_end);
		}


	//	$("#userTable_for_week").append(tr_first).append(tr_end);

		//各週目の合計金額
		var price_week_1_sum = 0;
		var price_week_2_sum = 0;
		var price_week_3_sum = 0;
		var price_week_4_sum = 0;
		var price_week_5_sum = 0;

 		/**************************************/
 		//データの週ごと集計
 		/**************************************/
//     	if(len > 0){
     	//	alert(len);
     		for(var i=0; i<len; i++){
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
     		//	if(!short_store){short_store='';}
     		//	if(!short_memo){short_memo='';}


     			//yyyy/mm/dd ～　yyyy/mm/dd
     			var tr_week;

     			//購入日の年月日
     			var date_buy_date = changeToDateFomYyyymmdd(short_buy_date);
     	 	//	alert(date_buy_date);


     		//「￥」＋「コンマ付き金額」を数字に戻す
 			//	var price_number = Number(price.replace('￥',''));
 				var price_number = price.replace('￥','');

 				if(price_number.length >3){
 		 			price_number = parseInt(price_number.split(',').join(''));
 	 			//	alert(price_number.length);
 				}



     			/**********************************************/
				//	1週間目
     			/**********************************************/

     			//週ごとテンプレートの開始日　年月日
 				var graph_start_buy_date = weekArr[0]['startDayOfWeek'];
 				//alert(graph_start_buy_date);
 				graph_start_buy_date = changeToDateFomYyyymmdd(graph_start_buy_date);

     			//週ごとテンプレートの終了日　年月日
 				var graph_end_buy_date = weekArr[0]['endDayOfWeek'];
 				//alert(graph_end_buy_date);
 				graph_end_buy_date = changeToDateFomYyyymmdd(graph_end_buy_date);
 				//alert(date_buy_date);

 				// price_number = price_number.replace('.','');
 	 			//	var num = parseInt('100,000'.split(',').join(''));
 	 			//	var price_number = parseInt(price_number.split(',').join(''));
// 				alert(price_number);

     			// 1週目の開始日～終了日
        		if(graph_start_buy_date <= date_buy_date && date_buy_date <= graph_end_buy_date){


 					tr_week =  "<div>" + "<a href='/money/" + id + "/edit'>" +
					   "<img src='/img/edit_bottun.png' alt='編集'></a>" +
					   short_buy_date + "<br>" + short_item_name + price + "</div>"
					   ;
 					//今週該当時スタイル判定
        			var sell_style = getThisWeekStyle(today,graph_start_buy_date,graph_end_buy_date);

 					var tr_str =
	     				//"<tr><td>" + tr_week + "</td></tr>"
	     				"<div class='" + sell_style + "'>" + tr_week + "</div>"
 	     				;


	     			$("#userTable_for_week_1").append(tr_str);
	     			tr_week='';

	     			//金額合計
        			price_week_1_sum = Number(price_number) + Number(price_week_1_sum) ;


 				}


    			/**********************************************/
				//	2週間目
 				/**********************************************/

     			//週ごとテンプレートの開始日　年月日
 				var graph_start_buy_date = weekArr[1]['startDayOfWeek'];
 				//alert(graph_start_buy_date);
 				graph_start_buy_date = changeToDateFomYyyymmdd(graph_start_buy_date);

     			//週ごとテンプレートの終了日　年月日
 				var graph_end_buy_date = weekArr[1]['endDayOfWeek'];
 				//alert(graph_end_buy_date);
 				graph_end_buy_date = changeToDateFomYyyymmdd(graph_end_buy_date);
 				//alert(date_buy_date);

     			// 2週目の開始日～終了日
        		if(graph_start_buy_date <= date_buy_date && date_buy_date <= graph_end_buy_date){

 					tr_week =  "<div>" + "<a href='/money/" + id + "/edit'>" +
					   "<img src='/img/edit_bottun.png' alt='編集'></a>" +
					   short_buy_date + "<br>" + short_item_name + price + "</div>"
					   ;
 					//今週該当時スタイル判定
        			var sell_style = getThisWeekStyle(today,graph_start_buy_date,graph_end_buy_date);

 					var tr_str =
	     				//"<tr><td>" + tr_week + "</td></tr>"
	     				"<div class='" + sell_style + "'>" + tr_week + "</div>"
 	     				;


 	     			$("#userTable_for_week_2").append(tr_str);
 	     			tr_week='';

	     			//金額合計
        			price_week_2_sum = Number(price_number) + Number(price_week_2_sum) ;
 	     		//	alert(price_week_2_sum);
 				}

    			/**********************************************/
				//	3週間目
 				/**********************************************/

     			//週ごとテンプレートの開始日　年月日
 				var graph_start_buy_date = weekArr[2]['startDayOfWeek'];
 				//alert(graph_start_buy_date);
 				graph_start_buy_date = changeToDateFomYyyymmdd(graph_start_buy_date);

     			//週ごとテンプレートの終了日　年月日
 				var graph_end_buy_date = weekArr[2]['endDayOfWeek'];
 				//alert(graph_end_buy_date);
 				graph_end_buy_date = changeToDateFomYyyymmdd(graph_end_buy_date);
 				//alert(date_buy_date);

     			// 3週目の開始日～終了日
        		if(graph_start_buy_date <= date_buy_date && date_buy_date <= graph_end_buy_date){

 					tr_week =  "<div>" + "<a href='/money/" + id + "/edit'>" +
					   "<img src='/img/edit_bottun.png' alt='編集'></a>" +
					   short_buy_date + "<br>" + short_item_name + price + "</div>"
					   ;

 					//今週該当時スタイル判定
        			var sell_style = getThisWeekStyle(today,graph_start_buy_date,graph_end_buy_date);

 					var tr_str =
	     				//"<tr><td>" + tr_week + "</td></tr>"
	     				"<div class='" + sell_style + "'>" + tr_week + "</div>"
 	     				;

 	     			$("#userTable_for_week_3").append(tr_str);
 	     			tr_week='';

	     			//金額合計
        			price_week_3_sum = Number(price_number) + Number(price_week_3_sum) ;
 				}


    			/**********************************************/
				//	4週間目
 				/**********************************************/

     			//週ごとテンプレートの開始日　年月日
 				var graph_start_buy_date = weekArr[3]['startDayOfWeek'];
 				//alert(graph_start_buy_date);
 				graph_start_buy_date = changeToDateFomYyyymmdd(graph_start_buy_date);

     			//週ごとテンプレートの終了日　年月日
 				var graph_end_buy_date = weekArr[3]['endDayOfWeek'];
 				//alert(graph_end_buy_date);
 				graph_end_buy_date = changeToDateFomYyyymmdd(graph_end_buy_date);
 				//alert(date_buy_date);

     			// 4週目の開始日～終了日
        		if(graph_start_buy_date <= date_buy_date && date_buy_date <= graph_end_buy_date){

 					tr_week =  "<div>" + "<a href='/money/" + id + "/edit'>" +
					   "<img src='/img/edit_bottun.png' alt='編集'></a>" +
					   short_buy_date + "<br>" + short_item_name + price + "</div>"
					   ;

 					//今週該当時スタイル判定
        			var sell_style = getThisWeekStyle(today,graph_start_buy_date,graph_end_buy_date);

 					var tr_str =
	     				//"<tr><td>" + tr_week + "</td></tr>"
	     				"<div class='" + sell_style + "'>" + tr_week + "</div>"
 	     				;


 	     			$("#userTable_for_week_4").append(tr_str);
 	     			tr_week='';

	     			//金額合計
        			price_week_4_sum = Number(price_number) + Number(price_week_4_sum) ;
 				}

    			/**********************************************/
				//	5週間目
 				/**********************************************/

    		//	alert(weekArr[4]['startDayOfWeek']);
    		//	alert(weekArr[4]['endDayOfWeek']);

     			//週ごとテンプレートの開始日　年月日
 				var graph_start_buy_date = weekArr[4]['startDayOfWeek'];
 			//	alert(graph_start_buy_date);
 				graph_start_buy_date = changeToDateFomYyyymmdd(graph_start_buy_date);

     			//週ごとテンプレートの終了日　年月日
 				var graph_end_buy_date = weekArr[4]['endDayOfWeek'];
 			//	alert(graph_end_buy_date);
 				graph_end_buy_date = changeToDateFomYyyymmdd(graph_end_buy_date);
 			//	alert(date_buy_date);

     			// 5週目の開始日～終了日
        		if(graph_start_buy_date <= date_buy_date && date_buy_date <= graph_end_buy_date){

 					tr_week =  "<div>" + "<a href='/money/" + id + "/edit'>" +
     						   "<img src='/img/edit_bottun.png' alt='編集'></a>" +
     						   short_buy_date + "<br>" + short_item_name + price + "</div>"
     						   ;

 					//今週該当時スタイル判定
        			var sell_style = getThisWeekStyle(today,graph_start_buy_date,graph_end_buy_date);

 					var tr_str =
	     				//"<tr><td>" + tr_week + "</td></tr>"
	     				"<div class='" + sell_style + "'>" + tr_week + "</div>"
 	     				;

 	     			$("#userTable_for_week_5").append(tr_str);
 	     			tr_week='';

	     			//金額合計
        			price_week_5_sum = Number(price_number) + Number(price_week_5_sum) ;
 				}



     		}

     		/**************************************/
     		//金額合計表示
     		/**************************************/
     		var tr_str_sum;

			//第1週目
     	//	price_week_1_sum = Number.isNaN(price_week_1_sum);
     	//	alert((isNaN(price_week_1_sum)));

     		price_week_1_sum = '￥ ' + Number(price_week_1_sum);
 			$("#userTable_for_week_1_sum").append(price_week_1_sum);

			//第2週目
     		price_week_2_sum = '￥ ' + price_week_2_sum;
 			$("#userTable_for_week_2_sum").append(price_week_2_sum);

			//第3週目
 			price_week_3_sum = '￥ ' + price_week_3_sum;
 			$("#userTable_for_week_3_sum").append(price_week_3_sum);

			//第4週目
     		price_week_4_sum = '￥ ' + price_week_4_sum;
 			$("#userTable_for_week_4_sum").append(price_week_4_sum);

			//第5週目
     		price_week_5_sum = '￥ ' + price_week_5_sum;
 			$("#userTable_for_week_5_sum").append(price_week_5_sum);

 			tr_str_sum='';


     		//選んだ月を「今月」のプルダウンに渡す
     		/**************************************/
     		//プルダウン作成
     		/**************************************/

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

		   // データあり
		  .done((response) => {
		      //データ取得成功時の箇所だが「always」で共通処理として記載している
		  })

		   // データ無し
		  .fail((response) => {
	     	   var tr_str =
//	     		   "<td colspan='7'>No record found.</td>"
	     		   "No record found."
	     		   ;
     		   $("#userTable_for_week_1").append(tr_str);
//     		   $("#userTable_for_week_2").append(tr_str);
 //    		   $("#userTable_for_week_3").append(tr_str);
   //  		   $("#userTable_for_week_4").append(tr_str);
     //		   $("#userTable_for_week_5").append(tr_str);

		  })

;}
