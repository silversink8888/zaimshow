
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

	//日付用プルダウン
	$('#day_pulldown_data').change(function(){
		select_day_style_pulldown = $('#day_style_pulldown').val().trim();
		selectedmonth = $('#ympicker').val().trim();

		if(select_day_style_pulldown){
		//	alert(selectedmonth);
			fetchRecords(selectedmonth,select_day_style_pulldown);
		}
	});













	//履歴ページ初回処理
	if(selectedmonth !=''){
//		var selectedmonth = $('#ympicker').val().trim();
		fetchRecords(selectedmonth,select_day_style_pulldown);
	}




});


function fetchRecords(selectedmonth,select_day_style_pulldown){
//	alert('fetchRecords');
	$.ajax({
		  type: 'GET',
		  cache: false,
		  url: '/money/show/'+selectedmonth + select_day_style_pulldown,
		  dataType: 'json'
		})


		//共通処理
		.always((response) => {

			$('#userTable').empty(); // Empty
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

		var tr_title =
				"<tr>" +
 				"<th>編集</th>" +
 				"<th>購入日</th>" +
 				"<th>商品名</th>" +
 				"<th>カテゴリ</th>" +
 				"<th>価格</th>" +
 				"<th>ストア</th>" +
 				"<th>メモ</th>" +
 				"</tr>" ;

		$("#userTable").append(tr_title);

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

     			const editButtonPath = "{{ asset(¥’/img/edit_bottun.png¥’)}}";
//     			alert(editButtonPath);

     			var tr_str =
     				"<tr>" +
     				"<td><a href='/money/" + id + "/edit'>" +
						"<img src='/img/edit_bottun.png' alt='編集'></a></td>" +

//     						"<img src=¥’" + editButtonPath + "¥’ alt='編集'></a></td>" +
     				"<td>" + buy_date + "</td>" +
     				"<td>" + short_item_name + "</td>" +
     				"<td>" + dai_category + "</td>" +
     				"<td>" + price + "</td>" +
     				"<td>" + store + "</td>" +
     				"<td>" + memo + "</td>" +
     				"</tr>"
     				;

     			//$("#userTable tbody").append(tr_str);
     			$("#userTable").append(tr_str);
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
	     		   $("#userTable").append(tr_str);

		  })

;}
