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
		url: '/money/summary/'+selectedmonth + select_day_style_pulldown,
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
			var startYear=2019;

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

			/******************************************************************************************/
			//当月　購入額グラフ
			/******************************************************************************************/

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
				
				//該当年月
				if(selectedmonth == response[i].buy_date.slice( 0, 7 )){


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
				var graph_style = "line";
			}else if(select_day_style_pulldown == "6"){
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
						,"エンタ"
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
						
						label: selectedmonth + ' カテゴリ別購入額',

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
							]
						}]
					},
					options: {
						title: {
							display: false,
							text: selectedyear + '年  月ごと購入額', //グラフの見出し
							padding:3
						},
						scales: {
							xAxes: [{
								//stacked: true, //積み上げ棒グラフにする設定
								display: true,      //表示設定
								//barPercentage: 0.4,         //棒グラフ幅
								categoryPercentage: 0.4,      //棒グラフ幅
								scaleLabel: {                 //軸ラベル設定
									display: false,            //表示設定
									labelString: '横軸ラベル',  //ラベル
									fontSize: 18               //フォントサイズ
								},
							}],
							yAxes: [{
								 // stacked: true, //積み上げ棒グラフにする設定
								  display: true, //表示設定
								  scaleLabel: {            //軸ラベル設定
									display: false,        //表示設定
									labelString: '(円)',  //ラベル
									fontSize: 15          //フォントサイズ
								},
								ticks: {
									min: 0,
									callback: function(label, index, labels) {
										return "￥" + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ;
									},
									
								},
							}]
						},
						legend: {
							labels: {
								boxWidth:30,
								padding:20 //凡例の各要素間の距離
							},
							display: true
						},
						tooltips:{
							mode:'label', //マウスオーバー時に表示されるtooltip
							callbacks: {
								// マウスオーバーで３桁カンマ区切り 
								label: function(tooltipItem, data){
									return "￥" + tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ;
								},
							},
						},
						layout: {
							width:300,
							height:300,
							padding: {
								//top: 50,
								//bottom: 50,
								left: 50,
								right: 50,
							}
						},
					}
				});


				
				}
			});

			/******************************************************************************************/
			//年間　月別　購入額グラフ
			/******************************************************************************************/
			var d = new Date();
			var thisYear = d.getFullYear();//今年			

			var selectedyear = selectedmonth.slice( 0, 4 );
			//alert('selectedyear :'+selectedyear);


			//各月のカテゴリ毎の変数の宣言 (15カテゴリ×12カ月)
			for(category_cnt=1;category_cnt<=15;category_cnt++){

				if(category_cnt < 10){
					category_cnt = '0' + category_cnt;
				}
				
				for(month_cnt=1;month_cnt<=12;month_cnt++){
					if(month_cnt < 10){
						month_cnt = '0' + month_cnt;
					}
					eval("var price_" + month_cnt + "_month_" + category_cnt + "= 0;");
				}

			}



			for(var i=0; i<len; i++){

				//1月～12月
				for(month_cnt=1;month_cnt<=12;month_cnt++){

					if(month_cnt < 10){
						month_cnt = '0' + month_cnt;
					}

					if(selectedyear+'-'+ month_cnt == response[i].buy_date.slice( 0, 7 )){

						//カテゴリ毎に分類
						for(cate=1;cate<=15;cate++){
							if(cate < 10){
								cate = '0'+cate;
							}
							//同カテゴリの金額合計処理
							if(cate == response[i].dai_category){
								eval( "price_"+month_cnt+"_month_" + cate + " = price_"+month_cnt+"_month_" + cate + " + " + parseInt(response[i].price) + ";");
							}
						}
					}

				}

			}

			var selectedyear = selectedmonth.slice( 0, 4 );
			//alert('selectedyear :'+selectedyear);


			var app_graph2 = new Vue({
				el: '#app_graph2',
				mounted: function(){
				var ctx = document.getElementById('myChart2').getContext('2d');

				var myChart2 = new Chart(ctx, {
					type: 'bar',
					data: {
						labels: [
							selectedyear + "年1月"
							,selectedyear + "年2月"
							,selectedyear + "年3月"
							,selectedyear + "年4月"
							,selectedyear + "年5月"
							,selectedyear + "年6月"
							,selectedyear + "年7月"
							,selectedyear + "年8月"
							,selectedyear + "年9月"
							,selectedyear + "年10月"
							,selectedyear + "年11月"
							,selectedyear + "年12月"
						],
						datasets: [
						{
							label: "食費",
							borderWidth:1,
							backgroundColor: "#2ecc71",
							borderColor: "#121554",
							data: [price_01_month_01, price_02_month_01, price_03_month_01, price_04_month_01, price_05_month_01, price_06_month_01, price_07_month_01 , price_08_month_01 , price_09_month_01 , price_10_month_01 , price_11_month_01, price_12_month_01 ]
						},
						{
							label: "衣類",
							borderWidth:1,
							backgroundColor: "#3498db",
							borderColor: "#1d3681",
							data: [price_01_month_02, price_02_month_02, price_03_month_02, price_04_month_02, price_05_month_02, price_06_month_02, price_07_month_02 , price_08_month_02 , price_09_month_02 , price_10_month_02 , price_11_month_02, price_12_month_02 ]
						},{
							label: "雑貨",
							borderWidth:1,
							backgroundColor: "#95a5a6",
							borderColor: "#2e70a7",
							data: [price_01_month_03, price_02_month_03, price_03_month_03, price_04_month_03, price_05_month_03, price_06_month_03, price_07_month_03 , price_08_month_03 , price_09_month_03 , price_10_month_03 , price_11_month_03, price_12_month_03 ]
						},{
							label: "通信",
							borderWidth:1,
							backgroundColor: "#9b59b6",
							borderColor: "#4eadc7",
							data: [price_01_month_04, price_02_month_04, price_03_month_04, price_04_month_04, price_05_month_04, price_06_month_04, price_07_month_04 , price_08_month_04 , price_09_month_04 , price_10_month_04 , price_11_month_04, price_12_month_04 ]
						},{
							label: "エンタメ",
							borderWidth:1,
							backgroundColor: "#f1c40f",
							borderColor: "#a7d8bf",
							data: [price_01_month_05, price_02_month_05, price_03_month_05, price_04_month_05, price_05_month_05, price_06_month_05, price_07_month_05 , price_08_month_05 , price_09_month_05 , price_10_month_05 , price_11_month_05, price_12_month_05 ]
						},{
							label: "住居",
							borderWidth:1,
							backgroundColor: "#e74c3c",
							borderColor: "#a7d8bf",
							data: [price_01_month_06, price_02_month_06, price_03_month_06, price_04_month_06, price_05_month_06, price_06_month_06, price_07_month_06 , price_08_month_06 , price_09_month_06 , price_10_month_06 , price_11_month_06, price_12_month_06 ]
						},{
							label: "交通費",
							borderWidth:1,
							backgroundColor: "#FF00FF",
							borderColor: "#a7d8bf",
							data: [price_01_month_07, price_02_month_07, price_03_month_07, price_04_month_07, price_05_month_07, price_06_month_07, price_07_month_07 , price_08_month_07 , price_09_month_07 , price_10_month_07 , price_11_month_07, price_12_month_07 ]
						},{
							label: "交際費",
							borderWidth:1,
							backgroundColor: "#808000",
							borderColor: "#a7d8bf",
							data: [price_01_month_08, price_02_month_08, price_03_month_08, price_04_month_08, price_05_month_08, price_06_month_08, price_07_month_08 , price_08_month_08 , price_09_month_08 , price_10_month_08 , price_11_month_08, price_12_month_08 ]
						},{
							label: "教育",
							borderWidth:1,
							backgroundColor: "#CCFF33",
							borderColor: "#a7d8bf",
							data: [price_01_month_09, price_02_month_09, price_03_month_09, price_04_month_09, price_05_month_09, price_06_month_09, price_07_month_09 , price_08_month_09 , price_09_month_09 , price_10_month_09 , price_11_month_09, price_12_month_09 ]
						},{
							label: "医療",
							borderWidth:1,
							backgroundColor: "#00ff00",
							borderColor: "#a7d8bf",
							data: [price_01_month_10, price_02_month_10, price_03_month_10, price_04_month_10, price_05_month_10, price_06_month_10, price_07_month_10 , price_08_month_10 , price_09_month_10 , price_10_month_10 , price_11_month_10, price_12_month_10 ]
						},{
							label: "光熱費",
							borderWidth:1,
							backgroundColor: "#FF3333",
							borderColor: "#a7d8bf",
							data: [price_01_month_11, price_02_month_11, price_03_month_11, price_04_month_11, price_05_month_11, price_06_month_11, price_07_month_11 , price_08_month_11 , price_09_month_11 , price_10_month_11 , price_11_month_11, price_12_month_11 ]
						},{
							label: "車",
							borderWidth:1,
							backgroundColor: "#20B2AA",
							borderColor: "#a7d8bf",
							data: [price_01_month_12, price_02_month_12, price_03_month_12, price_04_month_12, price_05_month_12, price_06_month_12, price_07_month_12 , price_08_month_12 , price_09_month_12 , price_10_month_12 , price_11_month_12, price_12_month_12 ]
						},{
							label: "税金",
							borderWidth:1,
							backgroundColor: "#2f4f4f",
							borderColor: "#a7d8bf",
							data: [price_01_month_13, price_02_month_13, price_03_month_13, price_04_month_13, price_05_month_13, price_06_month_13, price_07_month_13 , price_08_month_13 , price_09_month_13 , price_10_month_13 , price_11_month_13, price_12_month_13 ]
						},{
							label: "家電",
							borderWidth:1,
							backgroundColor: "#0000cd",
							borderColor: "#a7d8bf",
							data: [price_01_month_14, price_02_month_14, price_03_month_14, price_04_month_14, price_05_month_14, price_06_month_14, price_07_month_14 , price_08_month_14 , price_09_month_14 , price_10_month_14 , price_11_month_14, price_12_month_14 ]
						},{
							label: "その他",
							borderWidth:1,
							backgroundColor: "#000000",
							borderColor: "#a7d8bf",
							data: [price_01_month_15, price_02_month_15, price_03_month_15, price_04_month_15, price_05_month_15, price_06_month_15, price_07_month_15 , price_08_month_15 , price_09_month_15 , price_10_month_15 , price_11_month_15, price_12_month_15 ]
						}
					
					]
			
					},
					options: {
						title: {
							display: true,
							text: selectedyear + '年  月ごと購入額', //グラフの見出し
							padding:3
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
									fontSize: 18               //フォントサイズ
								},
							}],
							yAxes: [{
								  stacked: true, //積み上げ棒グラフにする設定
								  display: true, //表示設定
								  scaleLabel: {            //軸ラベル設定
									display: false,        //表示設定
									labelString: '(円)',  //ラベル
									fontSize: 15          //フォントサイズ
								},
								ticks: {
									min: 0,
									callback: function(label, index, labels) {
										return "￥" + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ;
									},
									
								},
								
							}]
						},
						legend: {
							labels: {
								boxWidth:30,
								padding:20 //凡例の各要素間の距離
							},
							display: true
						},
						tooltips:{
						mode:'label', //マウスオーバー時に表示されるtooltip
						filter: function (item, data) {
							// 値が 0 より大きいものだけを表示
							return (item.yLabel > 0);
						},
						callbacks: {
							// マウスオーバーで３桁カンマ区切り 
							label: function(tooltipItem, data){
								return "￥" + tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ;
							},
						},

						},
						layout: {
							width:300,
							height:300,
							padding: {
								//top: 50,
								//bottom: 50,
								left: 50,
								right: 50,
							}
						},
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
