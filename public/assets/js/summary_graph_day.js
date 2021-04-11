$(document).ready(function(){

	var d = new Date();
	var thisYear = d.getFullYear();//今年
	var thisMonth = d.getMonth()+1;//今月
	if(thisMonth <10){thisMonth = "0" + thisMonth}
	var selectedmonth = thisYear + "-" + thisMonth;
	var select_day_style_pulldown=1;

	//alert(select_day_style_pulldown);
/***************************************************************************/
/*各ボタン押下時処理 *********************************************************/
/***************************************************************************/


	//先月
	$('#last_month').click(function(){
	//	alert('先月ボタン');
		var select_last_month = $('#last_ympicker').val().trim();
		if(select_last_month){
		//	fetchRecords(select_last_month);
			fetchRecords(select_last_month,select_day_style_pulldown);
		}
	});

	//翌月
	$('#next_month').click(function(){
		var selectedmonth = $('#next_ympicker').val().trim();
		if(selectedmonth){
		//	fetchRecords(selectedmonth);
			fetchRecords(selectedmonth,select_day_style_pulldown);
		}
	});

	//当月
//	$('#this_month').click(function(){
	$('#this_month_data').change(function(){
	//  var selectedmonth = Number($('#search').val().trim());
		var selectedmonth = $('#ympicker').val().trim();
		if(selectedmonth){
		//	fetchRecords(selectedmonth);
			fetchRecords(selectedmonth,select_day_style_pulldown);
		}
	});

	//グラフ用プルダウン
	$('#day_pulldown_data').change(function(){
		select_day_style_pulldown = $('#day_style_pulldown').val().trim();
		selectedmonth = $('#ympicker').val().trim();
		//alert(select_day_style_pulldown);

		if(select_day_style_pulldown){
			fetchRecords(selectedmonth,select_day_style_pulldown);
		}
	});





	//履歴ページ初回処理
	if(selectedmonth !=''){
	//	alert('履歴ページ初回処理');
//		var selectedmonth = $('#ympicker').val().trim();
		fetchRecords(selectedmonth,select_day_style_pulldown);
	}




});



function fetchRecords(selectedmonth,select_day_style_pulldown){
//	alert('fetchRecords');
//	alert(select_day_style_pulldown);




	$.ajax({
		type: 'GET',
		cache: false,
		url: '/money/summary_weekly/'+selectedmonth + select_day_style_pulldown,
		dataType: 'json'
	})



		/**********************************************************/
	    //共通処理
		/**********************************************************/
		.always((response) => {

			//$('#app_graph_week').empty(); // Empty
			$('#last_month_data').empty(); // Empty
			$('#next_month_data').empty(); // Empty
			$('#this_month_data').empty(); // Empty

			$('#canvasImage').empty(); // Empty


			var len = 0;
			len = response.length;
		//	alert(response);
		//	alert(len);
		

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
			if(temp_last_month[1].length == 1){
				temp_last_month[1]  = "0"+temp_last_month[1];
				last_my_temp = temp_last_month[0] + "-" + temp_last_month[1];
			}else{
				last_my_temp  = last_my_temp.slice( 0, 7 );
				last_my_temp = last_my_temp.replace('/', '-')
			}

			var last_month = last_my_temp;




			//選んだ月を「今月」のプルダウンに渡す

			var yearMonthPulldown; //プルダウン表示用
			var d = new Date();
			var thisYear = d.getFullYear();//今年
			var thisMonth = d.getMonth()+1;//今月
			var thisYearMonth = thisYear + "-" + thisMonth;
			var selected;
			var startYear=2010;

			for(var y=startYear; y<=thisYear+1; y++){
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



			//今月プルダウン
	     	//var this_month = "<input type='hidden' id='next_ympicker' name='next_ympicker' value='" + selectedmonth + "'>";
			var this_month_html = "<select name='ympicker' id='ympicker'>" + yearMonthPulldown + "</select>" ;
			$("#this_month_data").append(this_month_html);
	     	//$("#ympicker").append(this_month);

			//先月ボタン
			var last_month_html = "<input type='hidden' id='last_ympicker' name='last_ympicker' value='" + last_month + "'>";
			$("#last_month_data").append(last_month_html);

			//来月ボタン
			var next_month_html = "<input type='hidden' id='next_ympicker' name='next_ympicker' value='" + next_month + "'>";
			$("#next_month_data").append(next_month_html);





		})



		/**********************************************************/
	    //データ取得成功時
		/**********************************************************/
		.done((response) => {
		    //alert("データあり");


			var len=0;
			len = response.length;
			//alert(len);




			/******************************************************************************************/
			//日ごと　購入額グラフ
			/******************************************************************************************/
			var d = new Date();
			var thisYear = d.getFullYear();//今年			

			var selectedyear = selectedmonth.slice( 0, 4 );
			//alert('selectedyear :'+selectedyear);

			let label_arr = [
				['食品','#2ecc71'],
				['美容・衣類','#3498db'],
				['日用雑貨','#95a5a6'],
				['通信費','#9b59b6'],
				['エンタ','#f1c40f'],
				['住居','#e74c3c'],
				['交通費','#FF00FF'],
				['交際費','#808000'],
				['教育','#CCFF33'],
				['医療','#00ff00'],
				['光熱費','#FF3333'],
				['車','#20B2AA'],
				['税金','#2f4f4f'],
				['家電','#0000cd'],
				['その他','#000000']
			];


			//各月のカテゴリ毎の変数の宣言 (15カテゴリ×31日)
			for(category_cnt=1;category_cnt<=15;category_cnt++){

				if(category_cnt < 10){
					category_cnt = '0' + category_cnt;
				}
				
				for(day_cnt=1;day_cnt<=31;day_cnt++){
					if(day_cnt < 10){
						day_cnt = '0' + day_cnt;
					}
					eval("var price_" + day_cnt + "_day_" + category_cnt + "= 0;");
				}
			}


			for(var i=0; i<len; i++){
				//1～31日
				for(day_cnt=1;day_cnt<=31;day_cnt++){

					if(day_cnt < 10){
						day_cnt = '0' + day_cnt;
					}

//					if(selectedyear+'-'+ day_cnt == response[i].buy_date.slice( 0, 7 )){
					if(selectedmonth+'-'+ day_cnt == response[i].buy_date.slice( 0, 10 )){

						//カテゴリ毎に分類
						for(cate=1;cate<=15;cate++){
							if(cate < 10){
								cate = '0'+cate;
							}
							//同カテゴリの金額合計処理
							if(cate == response[i].dai_category){
								eval( "price_"+day_cnt+"_day_" + cate + " = price_"+day_cnt+"_day_" + cate + " + " + parseInt(response[i].price) + ";");
							}
						}
					}
				}
			}



			var selectedyear = selectedmonth.slice( 0, 4 );
			//alert(weekArr[4]['startDayOfWeek']);









			for(cnt=1;cnt<=15;cnt++){

				if(cnt<10){
					var category_cnt = '0'+cnt;
				}else{
					var category_cnt = cnt;
				}

				//「labels」用変数
				var day_str = "";
				//「data」用変数
				let day_data = "";

				for(var x=31;x>=1;x--){
					if(x<10){
						var day_cnt = '0'+x;
					}else{
						var day_cnt = x;
					}
					day_str = " '" + x + "日'," + day_str;
//					day_data = "price_01_month_" + week_cnt + "," + day_data;
					day_data = "price_"+day_cnt+"_day_" + day_cnt + "," + day_data;
				}
			}







			//alert(selectedmonth);

			var yearonly  = selectedmonth.slice( 0, 4 );
			var monthonly = selectedmonth.slice( 5, 7 );

			//alert('selectedyear :' + yearonly);
			//alert('selectedmonth :' + monthonly);

			/**
			 * 指定月の日数を取得
			 * @param  {number} year  年
			 * @param  {number} month 月
			 * @return {number} 指定月の日数
			 */
			const getLastDay = (year, month) => {
				return new Date(year, month, 0).getDate();
			};

			let lastDay = getLastDay(yearonly, monthonly);
			lastDay = String(lastDay);
			//alert(lastDay);

/****************************************************************************/
//日ごとの支出グラフ
/****************************************************************************/
			//グラフ用横軸日付
			let monthkanji = monthonly + "月";
			let monthhaihunn = monthonly + "-";


			var app_graph_day = new Vue({
				el: '#app_graph_day',
				mounted: function(){
			var ctx = document.getElementById("myChart_day");

			var myChart_day = new Chart(ctx, {
				type: 'bar',
				data: {
//					labels: [1 ,2 ,3 ,4 ,5 ,6 ,7 ,8 ,9 ,10 ,11 ,12 ,13 ,14 ,15 ,16 ,17 ,18 ,19 ,20 ,21 ,22 ,23 ,24 ,25 ,26 ,27 ,28 ,29 ,30 ,31 ,],
					labels: [ '1' ,'2' ,'3' ,'4' ,'5' ,'6' ,'7' ,'8' ,'9' ,'10' ,'11' ,'12' ,'13' ,'14' ,'15' ,'16' ,'17' ,'18' ,'19' ,'20' ,'21' ,'22' ,'23' ,'24' ,'25' ,'26' ,'27' ,'28' ,'29' ,'30' ,'31' , ],
					datasets: [
					{
						label: label_arr[0][0],
						data: [price_01_day_01,price_02_day_01,price_03_day_01,price_04_day_01,price_05_day_01,price_06_day_01,price_07_day_01,price_08_day_01,price_09_day_01,price_10_day_01,price_11_day_01,price_12_day_01,price_13_day_01,price_14_day_01,price_15_day_01,price_16_day_01,price_17_day_01,price_18_day_01,price_19_day_01,price_20_day_01,price_21_day_01,price_22_day_01,price_23_day_01,price_24_day_01,price_25_day_01,price_26_day_01,price_27_day_01,price_28_day_01,price_29_day_01,price_30_day_01,price_31_day_01,],
						backgroundColor: label_arr[0][1]
					},{
						label: label_arr[1][0],
						data: [price_01_day_02,price_02_day_02,price_03_day_02,price_04_day_02,price_05_day_02,price_06_day_02,price_07_day_02,price_08_day_02,price_09_day_02,price_10_day_02,price_11_day_02,price_12_day_02,price_13_day_02,price_14_day_02,price_15_day_02,price_16_day_02,price_17_day_02,price_18_day_02,price_19_day_02,price_20_day_02,price_21_day_02,price_22_day_02,price_23_day_02,price_24_day_02,price_25_day_02,price_26_day_02,price_27_day_02,price_28_day_02,price_29_day_02,price_30_day_02,price_31_day_02,],
						backgroundColor: label_arr[1][1]
					},{
						label: label_arr[2][0],
						data: [price_01_day_03,price_02_day_03,price_03_day_03,price_04_day_03,price_05_day_03,price_06_day_03,price_07_day_03,price_08_day_03,price_09_day_03,price_10_day_03,price_11_day_03,price_12_day_03,price_13_day_03,price_14_day_03,price_15_day_03,price_16_day_03,price_17_day_03,price_18_day_03,price_19_day_03,price_20_day_03,price_21_day_03,price_22_day_03,price_23_day_03,price_24_day_03,price_25_day_03,price_26_day_03,price_27_day_03,price_28_day_03,price_29_day_03,price_30_day_03,price_31_day_03,],
						backgroundColor: label_arr[2][1]
					},{
						label: label_arr[3][0],
						data: [price_01_day_04,price_02_day_04,price_03_day_04,price_04_day_04,price_05_day_04,price_06_day_04,price_07_day_04,price_08_day_04,price_09_day_04,price_10_day_04,price_11_day_04,price_12_day_04,price_13_day_04,price_14_day_04,price_15_day_04,price_16_day_04,price_17_day_04,price_18_day_04,price_19_day_04,price_20_day_04,price_21_day_04,price_22_day_04,price_23_day_04,price_24_day_04,price_25_day_04,price_26_day_04,price_27_day_04,price_28_day_04,price_29_day_04,price_30_day_04,price_31_day_04,],
						backgroundColor: label_arr[3][1]
					},{
						label: label_arr[4][0],
						data: [price_01_day_05,price_02_day_05,price_03_day_05,price_04_day_05,price_05_day_05,price_06_day_05,price_07_day_05,price_08_day_05,price_09_day_05,price_10_day_05,price_11_day_05,price_12_day_05,price_13_day_05,price_14_day_05,price_15_day_05,price_16_day_05,price_17_day_05,price_18_day_05,price_19_day_05,price_20_day_05,price_21_day_05,price_22_day_05,price_23_day_05,price_24_day_05,price_25_day_05,price_26_day_05,price_27_day_05,price_28_day_05,price_29_day_05,price_30_day_05,price_31_day_05,],
						backgroundColor: label_arr[4][1]
					},{
						label: label_arr[5][0],
						data: [price_01_day_06,price_02_day_06,price_03_day_06,price_04_day_06,price_05_day_06,price_06_day_06,price_07_day_06,price_08_day_06,price_09_day_06,price_10_day_06,price_11_day_06,price_12_day_06,price_13_day_06,price_14_day_06,price_15_day_06,price_16_day_06,price_17_day_06,price_18_day_06,price_19_day_06,price_20_day_06,price_21_day_06,price_22_day_06,price_23_day_06,price_24_day_06,price_25_day_06,price_26_day_06,price_27_day_06,price_28_day_06,price_29_day_06,price_30_day_06,price_31_day_06,],
						backgroundColor: label_arr[5][1]
					},{
						label: label_arr[6][0],
						data: [price_01_day_07,price_02_day_07,price_03_day_07,price_04_day_07,price_05_day_07,price_06_day_07,price_07_day_07,price_08_day_07,price_09_day_07,price_10_day_07,price_11_day_07,price_12_day_07,price_13_day_07,price_14_day_07,price_15_day_07,price_16_day_07,price_17_day_07,price_18_day_07,price_19_day_07,price_20_day_07,price_21_day_07,price_22_day_07,price_23_day_07,price_24_day_07,price_25_day_07,price_26_day_07,price_27_day_07,price_28_day_07,price_29_day_07,price_30_day_07,price_31_day_07,],
						backgroundColor: label_arr[6][1]
					},{
						label: label_arr[7][0],
						data: [price_01_day_08,price_02_day_08,price_03_day_08,price_04_day_08,price_05_day_08,price_06_day_08,price_07_day_08,price_08_day_08,price_09_day_08,price_10_day_08,price_11_day_08,price_12_day_08,price_13_day_08,price_14_day_08,price_15_day_08,price_16_day_08,price_17_day_08,price_18_day_08,price_19_day_08,price_20_day_08,price_21_day_08,price_22_day_08,price_23_day_08,price_24_day_08,price_25_day_08,price_26_day_08,price_27_day_08,price_28_day_08,price_29_day_08,price_30_day_08,price_31_day_08,],
						backgroundColor: label_arr[7][1]
					},{
						label: label_arr[8][0],
						data: [price_01_day_09,price_02_day_09,price_03_day_09,price_04_day_09,price_05_day_09,price_06_day_09,price_07_day_09,price_08_day_09,price_09_day_09,price_10_day_09,price_11_day_09,price_12_day_09,price_13_day_09,price_14_day_09,price_15_day_09,price_16_day_09,price_17_day_09,price_18_day_09,price_19_day_09,price_20_day_09,price_21_day_09,price_22_day_09,price_23_day_09,price_24_day_09,price_25_day_09,price_26_day_09,price_27_day_09,price_28_day_09,price_29_day_09,price_30_day_09,price_31_day_09,],
						backgroundColor: label_arr[8][1]
					},{
						label: label_arr[9][0],
						data: [price_01_day_10,price_02_day_10,price_03_day_10,price_04_day_10,price_05_day_10,price_06_day_10,price_07_day_10,price_08_day_10,price_09_day_10,price_10_day_10,price_11_day_10,price_12_day_10,price_13_day_10,price_14_day_10,price_15_day_10,price_16_day_10,price_17_day_10,price_18_day_10,price_19_day_10,price_20_day_10,price_21_day_10,price_22_day_10,price_23_day_10,price_24_day_10,price_25_day_10,price_26_day_10,price_27_day_10,price_28_day_10,price_29_day_10,price_30_day_10,price_31_day_10,],
						backgroundColor: label_arr[9][1]
					},{
						label: label_arr[10][0],
						data: [price_01_day_11,price_02_day_11,price_03_day_11,price_04_day_11,price_05_day_11,price_06_day_11,price_07_day_11,price_08_day_11,price_09_day_11,price_10_day_11,price_11_day_11,price_12_day_11,price_13_day_11,price_14_day_11,price_15_day_11,price_16_day_11,price_17_day_11,price_18_day_11,price_19_day_11,price_20_day_11,price_21_day_11,price_22_day_11,price_23_day_11,price_24_day_11,price_25_day_11,price_26_day_11,price_27_day_11,price_28_day_11,price_29_day_11,price_30_day_11,price_31_day_11,],
						backgroundColor: label_arr[10][1]
					},{
						label: label_arr[11][0],
						data: [price_01_day_12,price_02_day_12,price_03_day_12,price_04_day_12,price_05_day_12,price_06_day_12,price_07_day_12,price_08_day_12,price_09_day_12,price_10_day_12,price_11_day_12,price_12_day_12,price_13_day_12,price_14_day_12,price_15_day_12,price_16_day_12,price_17_day_12,price_18_day_12,price_19_day_12,price_20_day_12,price_21_day_12,price_22_day_12,price_23_day_12,price_24_day_12,price_25_day_12,price_26_day_12,price_27_day_12,price_28_day_12,price_29_day_12,price_30_day_12,price_31_day_12,],
						backgroundColor: label_arr[11][1]
					},{
						label: label_arr[12][0],
						data: [price_01_day_13,price_02_day_13,price_03_day_13,price_04_day_13,price_05_day_13,price_06_day_13,price_07_day_13,price_08_day_13,price_09_day_13,price_10_day_13,price_11_day_13,price_12_day_13,price_13_day_13,price_14_day_13,price_15_day_13,price_16_day_13,price_17_day_13,price_18_day_13,price_19_day_13,price_20_day_13,price_21_day_13,price_22_day_13,price_23_day_13,price_24_day_13,price_25_day_13,price_26_day_13,price_27_day_13,price_28_day_13,price_29_day_13,price_30_day_13,price_31_day_13,],
						backgroundColor: label_arr[12][1]
					},{
						label: label_arr[13][0],
						data: [price_01_day_14,price_02_day_14,price_03_day_14,price_04_day_14,price_05_day_14,price_06_day_14,price_07_day_14,price_08_day_14,price_09_day_14,price_10_day_14,price_11_day_14,price_12_day_14,price_13_day_14,price_14_day_14,price_15_day_14,price_16_day_14,price_17_day_14,price_18_day_14,price_19_day_14,price_20_day_14,price_21_day_14,price_22_day_14,price_23_day_14,price_24_day_14,price_25_day_14,price_26_day_14,price_27_day_14,price_28_day_14,price_29_day_14,price_30_day_14,price_31_day_14,],
						backgroundColor: label_arr[13][1]
					},{
						label: label_arr[14][0],
						data: [price_01_day_15,price_02_day_15,price_03_day_15,price_04_day_15,price_05_day_15,price_06_day_15,price_07_day_15,price_08_day_15,price_09_day_15,price_10_day_15,price_11_day_15,price_12_day_15,price_13_day_15,price_14_day_15,price_15_day_15,price_16_day_15,price_17_day_15,price_18_day_15,price_19_day_15,price_20_day_15,price_21_day_15,price_22_day_15,price_23_day_15,price_24_day_15,price_25_day_15,price_26_day_15,price_27_day_15,price_28_day_15,price_29_day_15,price_30_day_15,price_31_day_15,],
						backgroundColor: label_arr[14][1]
					}
				]
				},
				options: {
				title: {
					display: true,
					text: '1日ごと　購入額'
				},
				scales: {
					xAxes: [{
						stacked: true, //積み上げ棒グラフにする設定
						display: true,      //表示設定
						//barPercentage: 0.4,         //棒グラフ幅
						categoryPercentage: 0.4,      //棒グラフ幅
						scaleLabel: {                 //軸ラベル設定
							display: false,            //表示設定
							labelString: '横軸ラベル',  //ラベル
						},
						ticks: {
							max: lastDay, //最大表示日時 (月ごとで切り替え)
							callback: function(value) {
								//	return ( (value == 1) || ((value % 7) == 0) || (value == lastDay))?  value  : ''
								//	return ( (value == 1) || ((value % 7) == 0) )? monthkanji + value + '日' : ''
									return ( (value % 1) == 0 )? monthkanji + value + '日' : ''
							},
							
						}
					}],
					yAxes: [{
						  stacked: true, //積み上げ棒グラフにする設定
						  display: true, //表示設定
						  scaleLabel: {            //軸ラベル設定
							display: false,        //表示設定
							labelString: '(円)',  //ラベル
						},
						ticks: {
							min: 0,
							callback: function(label, index, labels) {
								return "￥" + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ;
							},
							
						},
						
					}]
				},
				tooltips: {
                    callbacks: {
						// マウスオーバーで３桁カンマ区切り 
						label: function(tooltipItem, data){
                            return "￥" + tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ;
                        },
                    },
                }
				
			
			}
			});

			}
		});










/****************************************************************************/
//カテゴリ全体の支出グラフ
/****************************************************************************/

		//日時とカテゴリの配列の宣言
		var price_day_all_category_arr = new Array(32);	//日付

		for (var i = 0; i < price_day_all_category_arr.length; i++){
			price_day_all_category_arr[i] = new Array(15).fill(0);
		}

		//データを回す
		for(var i=0; i<len; i++){

			//31日分
			for(var day_cnt=1; day_cnt<=31; day_cnt++){

				let day_cnt2 = day_cnt -1;

				if(day_cnt<10){
					day_cnt = '0' +day_cnt;
				}
				//その日に該当するカテゴリデータの累計
				if(selectedmonth+'-'+ day_cnt == response[i].buy_date.slice( 0, 10 )){

					//15カテゴリ分
					for(var cate_cnt=1; cate_cnt<=1; cate_cnt++){
					//	if(cate_cnt == response[i].dai_category){
							price_day_all_category_arr[day_cnt2][0] = response[i].price + price_day_all_category_arr[day_cnt2][0];
					//	}
					}
				}
			}
		}



		//各カテゴリの累計処理
		for(var day_cnt=1; day_cnt< price_day_all_category_arr.length; day_cnt++){

			for(var cate_cnt=0; cate_cnt<15; cate_cnt++){
				price_day_all_category_arr[day_cnt][cate_cnt] = price_day_all_category_arr[day_cnt][cate_cnt] + price_day_all_category_arr[day_cnt-1][cate_cnt];
			//	price_day_all_category_arr[1][0] = price_day_all_category_arr[1][0] + price_day_all_category_arr[0][0];
			}
		}






			//alert(monthkanji);

			var app_graph_day_all = new Vue({
				el: '#app_graph_day_all',
				mounted: function(){
			var ctx = document.getElementById("myChart_day_all");

			var myChart_day_all = new Chart(ctx, {
				type: 'line',
				data: {
				//	labels: [ 1 ,2 ,3 ,4 ,5 ,6 ,7 ,8 ,9 ,10 ,11 ,12 ,13 ,14 ,15 ,16 ,17 ,18 ,19 ,20 ,21 ,22 ,23 ,24 ,25 ,26 ,27 ,28 ,29 ,30 ,31 ,],
					labels: [ '1' ,'2' ,'3' ,'4' ,'5' ,'6' ,'7' ,'8' ,'9' ,'10' ,'11' ,'12' ,'13' ,'14' ,'15' ,'16' ,'17' ,'18' ,'19' ,'20' ,'21' ,'22' ,'23' ,'24' ,'25' ,'26' ,'27' ,'28' ,'29' ,'30' ,'31' , ],

					datasets: [{
						label: '',
						data: [price_day_all_category_arr[0][0],price_day_all_category_arr[1][0],price_day_all_category_arr[2][0],price_day_all_category_arr[3][0],price_day_all_category_arr[4][0],price_day_all_category_arr[5][0],price_day_all_category_arr[6][0],price_day_all_category_arr[7][0],price_day_all_category_arr[8][0],price_day_all_category_arr[9][0],price_day_all_category_arr[10][0],price_day_all_category_arr[11][0],price_day_all_category_arr[12][0],price_day_all_category_arr[13][0],price_day_all_category_arr[14][0],price_day_all_category_arr[15][0],price_day_all_category_arr[16][0],price_day_all_category_arr[17][0],price_day_all_category_arr[18][0],price_day_all_category_arr[19][0],price_day_all_category_arr[20][0],price_day_all_category_arr[21][0],price_day_all_category_arr[22][0],price_day_all_category_arr[23][0],price_day_all_category_arr[24][0],price_day_all_category_arr[25][0],price_day_all_category_arr[26][0],price_day_all_category_arr[27][0],price_day_all_category_arr[28][0],price_day_all_category_arr[29][0], price_day_all_category_arr[30][0], ],
						borderColor: '#90EE90',
						pointRadius: 5,
						
					}]
				},
				options: {
					legend: {
						display: false
					},
					title: {
						display: false,
						text: 'カテゴリ全体の支出'
					},
				scales: {
					xAxes: [{
						stacked: true, //積み上げ棒グラフにする設定
						display: true,      //表示設定
						//barPercentage: 0.4,         //棒グラフ幅
						categoryPercentage: 0.4,      //棒グラフ幅
						scaleLabel: {                 //軸ラベル設定
							display: false,            //表示設定
							labelString: '横軸ラベル',  //ラベル
						//	fontColor: "red",             // 文字の色
						},
						ticks: {
							callback: function(value) {
							//	return ( (value == 1) || ((value % 7) == 0) || (value == lastDay))?  value  : ''
							//	return ( (value == 1) || ((value % 7) == 0) )? monthkanji + value + '日' : ''
								return ( (value % 1) == 0 )? monthkanji + value + '日' : ''
							},
						//	callback: function(value) {return ((value % 5) == 0)?  value  : ''},
							min: 0,
							max: lastDay, //最大表示日時 (月ごとで切り替え)
							stepSize: 1,
							autoSkip: true, //横幅が狭くなったときに表示を間引くか否か
							
						},
						
						
					}],
					yAxes: [{
						stacked: true, //積み上げ棒グラフにする設定
						ticks: {
							min: 0,
							callback: function(label, index, labels) {
								return "￥" + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ;
							},
							
						},
						
					}]
				},
				tooltips: {
                    callbacks: {
						// マウスオーバーで３桁カンマ区切り 
						label: function(tooltipItem, data){
                            return "￥" + tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ;
                        },
                    },
                }
			},
			
			});

			}
		});


/****************************************************************************/
//カテゴリ別の推移　グラフ
/****************************************************************************/

		//日時とカテゴリの配列の宣言
		var price_day_category_arr = new Array(32);	//日付

		for (var i = 0; i < price_day_category_arr.length; i++){
			price_day_category_arr[i] = new Array(15).fill(0);
		}

		//データを回す
		for(var i=0; i<len; i++){

			//31日分
			for(var day_cnt=1; day_cnt<=31; day_cnt++){

				let day_cnt2 = day_cnt -1;

				if(day_cnt<10){
					day_cnt = '0' +day_cnt;
				}
				//その日に該当するカテゴリデータの累計
				if(selectedmonth+'-'+ day_cnt == response[i].buy_date.slice( 0, 10 )){

					//15カテゴリ分
					for(var cate_cnt=1; cate_cnt<=15; cate_cnt++){
						if(cate_cnt == response[i].dai_category){
							price_day_category_arr[day_cnt2][cate_cnt-1] = response[i].price;
						}
					}
				}
			}
		}



		//各カテゴリの累計処理
		for(var day_cnt=1; day_cnt< price_day_category_arr.length; day_cnt++){

			for(var cate_cnt=0; cate_cnt<15; cate_cnt++){
				price_day_category_arr[day_cnt][cate_cnt] = price_day_category_arr[day_cnt][cate_cnt] + price_day_category_arr[day_cnt-1][cate_cnt];
			//	price_day_category_arr[1][0] = price_day_category_arr[1][0] + price_day_category_arr[0][0];
			}
		}

		//15カテゴリ分のグラフ
		for(var category=0; category<15; category++){

			var category2 = category+1;
			var ctx = document.getElementById("myChart_day_category_"+category2);

			eval("var myChart_day_category_" + category2 + " = new Chart(ctx,"+
			"{type: 'line',"+
			"data: {"+
			"labels: ['1' ,'2' ,'3' ,'4' ,'5' ,'6' ,'7' ,'8' ,'9' ,'10' ,'11' ,'12' ,'13' ,'14' ,'15' ,'16' ,'17' ,'18' ,'19' ,'20' ,'21' ,'22' ,'23' ,'24' ,'25' ,'26' ,'27' ,'28' ,'29' ,'30' ,'31' ,],"+
			"datasets: ["+
			"{"+
			"label: label_arr[category][0] ,"+
			"backgroundColor: label_arr[category][1] ,"+
			//"data: [price_01_day_01,price_02_day_01,price_03_day_01,price_04_day_01,price_05_day_01,price_06_day_01,price_07_day_01,price_08_day_01,price_09_day_01,price_10_day_01,price_11_day_01,price_12_day_01,price_13_day_01,price_14_day_01,price_15_day_01,price_16_day_01,price_17_day_01,price_18_day_01,price_19_day_01,price_20_day_01,price_21_day_01,price_22_day_01,price_23_day_01,price_24_day_01,price_25_day_01,price_26_day_01,price_27_day_01,price_28_day_01,price_29_day_01,price_30_day_01,price_31_day_01,]"+
			"data: [price_day_category_arr[0]["+category+"],price_day_category_arr[1]["+category+"],price_day_category_arr[2]["+category+"],price_day_category_arr[3]["+category+"],price_day_category_arr[4]["+category+"],price_day_category_arr[5]["+category+"],price_day_category_arr[6]["+category+"],price_day_category_arr[7]["+category+"],price_day_category_arr[8]["+category+"],price_day_category_arr[9]["+category+"],price_day_category_arr[10]["+category+"],price_day_category_arr[11]["+category+"],price_day_category_arr[12]["+category+"],price_day_category_arr[13]["+category+"],price_day_category_arr[14]["+category+"],price_day_category_arr[15]["+category+"],price_day_category_arr[16]["+category+"],price_day_category_arr[17]["+category+"],price_day_category_arr[18]["+category+"],price_day_category_arr[19]["+category+"],price_day_category_arr[20]["+category+"],price_day_category_arr[21]["+category+"],price_day_category_arr[22]["+category+"],price_day_category_arr[23]["+category+"],price_day_category_arr[24]["+category+"],price_day_category_arr[25]["+category+"],price_day_category_arr[26]["+category+"],price_day_category_arr[27]["+category+"],price_day_category_arr[28]["+category+"],price_day_category_arr[29]["+category+"], ,price_day_category_arr[30]["+category+"],  ]"+
			"},"+
			
			"]"+
			"},"+
			
			"options: { scales: { "+

			"xAxes: [{"+
		//	"scaleLabel: { display: true, labelString: '日' }, "+
			"ticks: {"+
			"max: lastDay,"+
			"callback: function(value) {return ( (value % 1) == 0 )? monthkanji + value + '日' : ''},"+
			" }, "+
			"}],"+

			"yAxes: [{"+
			"ticks: {"+
			
			" min: 0, "+
			" beginAtZero: true, "+
			//	"callback: function(label, index, labels) {return '￥' + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ; },"+
			" userCallback: function(label, index, labels) {if (Math.floor(label) === label) {return '￥' + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ;}}, "+

			" }, "+
		//	"scaleLabel: { display: true, labelString: '(円)' }, "+
		//	"layout: {width:300,height:300,padding: {left: 50,right: 50,} }, "+
			"}] "+
			"},"+
			
			"tooltips: {callbacks: {label: function(tooltipItem, data){return '￥' + tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ;},},}" +
			
			
			" }," +
			
			"},"+
			
			");");
			







		}










		})

		/**********************************************************/
	    //データ取得失敗時
		/**********************************************************/
		.fail((response) => {
			alert("通信エラー");
		})

;}
