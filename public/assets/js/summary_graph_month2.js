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
	$('#this_month_data').change(function(){
	//  var selectedmonth = Number($('#search').val().trim());
		var selectedmonth = $('#ympicker').val().trim();
		if(selectedmonth){
		//	fetchRecords(selectedmonth);
		//	fetchRecords(selectedmonth,select_day_style_pulldown);
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

			//$('#userTable').empty(); // Empty
			//$('#last_month_data').empty(); // Empty
			//$('#next_month_data').empty(); // Empty
			$('#this_month_data').empty(); // Empty

			//$('#canvasImage').empty(); // Empty


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
		    //alert("データあり");

			/***************************************************************************/
			/*グラフ作成 ****************************************************************/
			/***************************************************************************/
			var len=0;
			len = response.length;
			//alert(len);

			/*
			if(len < 1){
				alert("データがありません");
				var tr_title2 = "データがありません" ;
				
				$("#app_graph2").append(tr_title2);
				return;
			}
			*/


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


			//購入金額のカテゴリ分け
			for(var i=0; i<len; i++){


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



			var app_graph2 = new Vue({
				el: '#app_graph2',
				mounted: function(){
				var ctx = document.getElementById('myChart2').getContext('2d');

				var myChart2 = new Chart(ctx, {
				type: graph_style,
				data: {
					labels: [
						
						graph_style + "年1月"
						,"年2月"
						,"年3月"
						,"年4月"
						,"年5月"
						,"年6月"
						,"年7月"
						,"年8月"
						,"年9月"
						,"年10月"
						,"年11月"
						,"年12月"
						
					],
					datasets: [{
						backgroundColor: [
							"cyan"
							,"cyan"
							,"cyan"
							,"cyan"
							,"cyan"
							,"cyan"
							,"cyan"
							,"cyan"
							,"cyan"
							,"cyan"
							,"cyan"
							,"cyan"
							,"cyan"
							,"cyan"
							,"cyan"						],
						
						label: 'カテゴリ別購入額',

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
