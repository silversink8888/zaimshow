<!-- Ajaxで購入データ取得表示 -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.js"></script>

<script type="text/javascript" src="/assets/js/summary_graph_month.js"></script>

<div class='rireki_pull' id='day_pulldown_data'>
	<select id='day_style_pulldown'>
		<option value='1'>棒グラフ</option>
		<option value='2'>円グラフ</option>
		<option value='3'>ドーナッツ</option>
		<option value='4'>ポーラチャート</option>
		<option value='5'>レーダーチャート</option>
	</select>
</div>

<div id='app_graph' style="height:600px; width:900px; margin:0 auto; background:#eee;">
    <canvas id='myChart'></canvas>
</div>