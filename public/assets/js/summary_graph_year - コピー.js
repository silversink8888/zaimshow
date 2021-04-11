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
		  url: '/money/summary_yearly/'+selectedmonth + select_day_style_pulldown,
		  dataType: 'json'
	})



		/**********************************************************/
	    //共通処理
		/**********************************************************/
		.always((response) => {

			$('#userTable').empty(); // Empty
			$('#last_month_data').empty(); // Empty
			$('#next_month_data').empty(); // Empty
			$('#this_month_data').empty(); // Empty

			$('#canvasImage').empty(); // Empty


			var len = 0;
			len = response.length;
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
//			var thisYearMonth = thisYear + "-" + thisMonth;
			var thisYearMonth = thisYear ;

			var startYear = 2019;
			var endYear = thisYear+1;
			var selected;
			selectedmonth  = selectedmonth.slice( 0, 4 );
			//alert(selectedmonth);

			for(var y=startYear; y<=endYear; y++){
				for(var m=1; m<=1; m++){

					if(m<10){m = '0'+m;}//月を2桁
//					var pullym = y+"-"+m;
					var pullym = y;
				//	alert(pullym);

					if(selectedmonth == pullym){
						selected = "selected";
					}

//					yearMonthPulldown += "<option value='" + y + "-" + m + "'"+selected+">" + y + "年" + m + "月</option>" ;
					yearMonthPulldown += "<option value='" + y + "-'" + selected + ">" + y + "年</option>" ;
					selected='';//初期化
				}
			}



			//今月プルダウン
	     	//var this_month = "<input type='hidden' id='next_ympicker' name='next_ympicker' value='" + selectedmonth + "'>";
			var this_month_html = "<select name='ympicker' id='ympicker'>" + yearMonthPulldown + "</select>" ;
			$("#this_month_data").append(this_month_html);
	     	//$("#ympicker").append(this_month);

			//先月ボタン
			//var last_month_html = "<input type='hidden' id='last_ympicker' name='last_ympicker' value='" + last_month + "'>";
			//$("#last_month_data").append(last_month_html);

			//来月ボタン
			//var next_month_html = "<input type='hidden' id='next_ympicker' name='next_ympicker' value='" + next_month + "'>";
			//$("#next_month_data").append(next_month_html);




	//        }else{
	//        }
	

		})



		/**********************************************************/
	    //データ取得成功時
		/**********************************************************/
		.done((response) => {
		    //alert("responseあり");

			/***************************************************************************/
			/*グラフ作成 ****************************************************************/
			/***************************************************************************/
			var len=0;
			len = response.length;
			//alert(len);


			var dai_category = '';

			var price=0;
			var shokuhi_price=0;
			var biyou_price=0;
			var zakka_price=0;
			var tuushinn_price=0;
			var enter_price=0;
			var home_price=0;
			var koutuu_price=0;
			var kousai_price=0;
			var kyouiku_price=0;
			var iryou_price=0;
			var kounetu_price=0;
			var kuruma_price=0;
			var tax_price=0;
			var kadenn_price=0;
			var sonota_price=0;

			//alert(selectedmonth);

			//購入金額のカテゴリ分け
			for(var i=0; i<len; i++){

				//該当年
				if(selectedmonth == response[i].buy_date.slice( 0, 4 )){


					if(response[i].dai_category == '01'){
						//alert(response[1].total_price);
						shokuhi_price = parseInt(shokuhi_price) + parseInt(response[i].price);
					}else if(response[i].dai_category == '02'){
						biyou_price = parseInt(biyou_price) + parseInt(response[i].price);
					}else if(response[i].dai_category == '03'){
						zakka_price = parseInt(zakka_price) + parseInt(response[i].price);
					}else if(response[i].dai_category == '04'){
						tuushinn_price = parseInt(tuushinn_price) + parseInt(response[i].price);
					}else if(response[i].dai_category == '05'){
						enter_price = parseInt(enter_price) + parseInt(response[i].price);
					}else if(response[i].dai_category == '06'){
						home_price = parseInt(home_price) + parseInt(response[i].price);
					}else if(response[i].dai_category == '07'){
						koutuu_price = parseInt(koutuu_price) + parseInt(response[i].price);
					}else if(response[i].dai_category == '08'){
						kousai_price = parseInt(kousai_price) + parseInt(response[i].price);
					}else if(response[i].dai_category == '09'){
						kyouiku_price = parseInt(kyouiku_price) + parseInt(response[i].price);
					}else if(response[i].dai_category == '10'){
						iryou_price = parseInt(iryou_price) + parseInt(response[i].price);
					}else if(response[i].dai_category == '11'){
						kounetu_price = parseInt(kounetu_price) + parseInt(response[i].price);
					}else if(response[i].dai_category == '12'){
						kuruma_price = parseInt(kuruma_price) + parseInt(response[i].price);
					}else if(response[i].dai_category == '13'){
						tax_price = parseInt(tax_price) + parseInt(response[i].price);
					}else if(response[i].dai_category == '14'){
						kadenn_price = parseInt(kadenn_price) + parseInt(response[i].price);
					}else if(response[i].dai_category == '15'){
						sonota_price = parseInt(sonota_price) + parseInt(response[i].price);
					}
				
				}


			}

			//グラフの種類選択処理
			if(select_day_style_pulldown == "1"){
				var graph_style = "bar";
			}else if(select_day_style_pulldown == "2"){
				var graph_style = "pie";
			}else if(select_day_style_pulldown == "3"){
				var graph_style = "doughnut";
			}else if(select_day_style_pulldown == "4"){
				var graph_style = "polarArea";
			}else if(select_day_style_pulldown == "5"){
				var graph_style = "radar";
			}else{
				var graph_style = "bar";
			}
			//alert(graph_style);
			//alert(select_day_style_pulldown);



			var app_graph = new Vue({
				el: '#app_graph',
				mounted: function(){
				var ctx = document.getElementById('myChart').getContext('2d');

				var myChart = new Chart(ctx, {
				type: graph_style,
				data: {
					labels: [
						"食品"
						,"美容・衣類"
						,"日用雑貨"
						,"通信費"
						,"エンタメ"
						,"住居"
						,"交通費"
						,"交際費"
						,"教育"
						,"医療"
						,"光熱費"
						,"車"
						,"税金"
						,"家電"
						,"その他"
					],
					datasets: [{
						backgroundColor: [
							"#2ecc71"
							,"#3498db"
							,"#95a5a6"
							,"#9b59b6"
							,"#f1c40f"

							,"#e74c3c"
							,"#FF00FF"
							,"#808000"
							,"#CCFF33"
							,"#00ff00"

							,"#FF3333"
							,"#20B2AA"
							,"#2f4f4f"
							,"#0000cd"
							,"#000000"
						],
						
						label: selectedmonth +'年カテゴリ別購入額',
						

						data: [
							shokuhi_price
							,biyou_price
							,zakka_price
							,tuushinn_price
							,enter_price
							,home_price
							,koutuu_price
							,kousai_price
							,kyouiku_price
							,iryou_price
							,kounetu_price
							,kuruma_price
							,tax_price
							,kadenn_price
							,sonota_price							
						],

						plugins: {
							outlabels: {
								text: '%l\n%p',
								color: '#000',
								backgroundColor: null,
								lineWidth: 4,
								font: {
									resizable: false,
									size: 20,
								}
							}
						}
						
					}]
				}
				});


				
				}
			});




			/************************************************************/
			//年別　購入額グラフ
			/************************************************************/
			var d = new Date();
			var thisYear = d.getFullYear();//今年

			var price_1_year=0;
			var price_2_year=0;
			var price_3_year=0;
			var price_4_year=0;
			var price_5_year=0;

			var selectedyear = selectedmonth.slice( 0, 4 );
			//alert('selectedyear :'+selectedyear);
			//alert('selectedmonth :'+selectedmonth);
			//alert('selectedmonth :'+selectedmonth.slice( 5, 7 ));

			//当該月の棒グラフの点の背景色を変更する
			var pointBgColor_1 = ( thisYear == selectedyear) ? "black" : "white";
			var pointBgColor_2 = ( thisYear-1 == selectedyear) ? "black" : "white";
			var pointBgColor_3 = ( thisYear-2 == selectedyear) ? "black" : "white";
			var pointBgColor_4 = ( thisYear-3 == selectedyear) ? "black" : "white";
			var pointBgColor_5 = ( thisYear-4 == selectedyear) ? "black" : "white";
			//alert(selectedyear);

			for(var i=0; i<len; i++){

				//今年
				if(thisYear == response[i].buy_date.slice( 0, 4 )){
					price_1_year = price_1_year + response[i].price;
				}

				//1年前
				if(thisYear -1 == response[i].buy_date.slice( 0, 4 )){
					price_2_year = price_2_year + response[i].price;
				}

				//2年前
				if(thisYear -2 == response[i].buy_date.slice( 0, 4 )){
					price_3_year = price_3_year + response[i].price;
				}

				//3年前
				if(thisYear -3 == response[i].buy_date.slice( 0, 4 )){
					price_4_year = price_4_year + response[i].price;
				}

				//4年前
				if(thisYear -4 == response[i].buy_date.slice( 0, 4 )){
					price_5_year = price_5_year + response[i].price;
				}

			}


			var app_graph2 = new Vue({
				el: '#app_graph2',
				mounted: function(){
				var ctx = document.getElementById('myChart2').getContext('2d');

				Chart.defaults.global.elements.point = {
					radius: 10,              // ポイントの半径
					pointStyle: 'circle', // ポイントのスタイル
					hitRadius: 20,          // ホバー検出の半径
					hoverRadius: 20,        // ホバー時の半径
				};
				

				var myChart2 = new Chart(ctx, {
					type: 'line',
					data: {
						labels: [
							
							thisYear-4 + "年"
							,thisYear-3 + "年"
							,thisYear-2 + "年"
							,thisYear-1 + "年"
							,thisYear + "年"
							
						],
						datasets: [{
							borderColor: "red",
							pointBackgroundColor:
							[
								pointBgColor_5
								, pointBgColor_4
								, pointBgColor_3
								, pointBgColor_2
								, pointBgColor_1
							],
							backgroundColor: "rgba(0,0,0,0)",
							borderWidth: 3,
							
							label: 	'過去5年購入額',

							data: [
								price_5_year
								,price_4_year
								,price_3_year
								,price_2_year
								,price_1_year
							]
						}]
					}
				});
				
				}
			});






		})

		/**********************************************************/
	    //データ取得失敗時
		/**********************************************************/
		.fail((response) => {
			alert("通信エラー");
		//	var tr_str =
		//	"No record found"
		//	;
		//	$("#userTable").append(tr_str);
		})

;}
