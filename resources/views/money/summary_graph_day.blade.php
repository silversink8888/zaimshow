<!-- Ajaxで購入データ取得表示 -->

<!--
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript" src="/assets/js/pieceLabel/chartjs-plugin-labels.js"></script>
-->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script type="text/javascript" src="/assets/js/summary_graph_day.js"></script>

<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels"></script>

<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.css"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js"></script>

<!-- piechart-outlabelsプラグインを呼び出す -->
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-piechart-outlabels"></script>


<div>
	<h4>日ごとの支出</h4>
</div>

<!-- 日別　購入額 -->
<div id='app_graph_day' style="padding:10px 100px 20px 100px;">
    <canvas id='myChart_day'style="background:#eee;"></canvas>
</div>

<div>
	<h4>カテゴリ全体の支出</h4>
	月の開始日からのカテゴリ全体の支出を累計で表示しています。
</div>

<!-- カテゴリ全体の支出 -->
<div id='app_graph_day_all' style="padding:10px 100px 20px 100px;">
    <canvas id='myChart_day_all'style="background:#eee;"></canvas>
</div>



<div>
	<h4>カテゴリ別の推移</h4>
</div>
月の開始日からのカテゴリ別の支出を累計で表示しています。

<?php
/*
*/
for($x=1;$x<=15;$x++){
//	echo '<div id="app_graph_day_category_".$x." style="padding:50px 150px 50px 150px;">';
	echo "<div  style='padding:50px 150px 50px 150px;'>";
	echo "<canvas id='myChart_day_category_".$x."' style='background:#eee;'></canvas>";
	echo '</div>';
}

?>

<!-- 週　カテゴリ別　購入額 -->
<!--
<div style="padding:10px 100px 20px 100px;">
<canvas id='myChart_week'.<?php $x;?>' style="background:#eee;"></canvas>
</div>





<div class='rireki_pull' id='day_pulldown_data'>
	<select id='day_style_pulldown'>
		<option value='1'>棒グラフ</option>
		<option value='2'>円グラフ</option>
		<option value='3'>ドーナッツ</option>
		<option value='4'>ポーラチャート</option>
		<option value='5'>レーダーチャート</option>
	</select>
</div>



<div class='rireki_pull' id=''>
	<select id='img_style_pulldown' onchange="downloadCanvas()">
		<option value='0'>ダウンロード</option>
		<option value='1'>JPG画像としてダウンロード</option>
		<option value='2'>PNG画像としてダウンロード</option>
	</select>
</div>
-->
<!--
<div>
	<canvas id="myChart" style="border: solid 1px; width: 500px; height: 500px"></canvas>
</div>
-->
