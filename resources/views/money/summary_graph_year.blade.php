<!-- Ajaxで購入データ取得表示 -->

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<script type="text/javascript" src="/assets/js/summary_graph_year.js"></script>

<!--
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<script type="text/javascript" src="/assets/js/pieceLabel/chartjs-plugin-labels.js"></script>

-->
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels"></script>

<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.css"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js"></script>

<!-- piechart-outlabelsプラグインを呼び出す -->
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-piechart-outlabels"></script>



<!-- 月別　購入額 -->
<div id='app_graph2' style="height:; width:; padding:10px 100px 20px 100px ; ">
    <canvas id='myChart2'style="background:#eee;"></canvas>
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

<!--
<button onclick="downloadCanvas()">画像としてダウンロード</button>
-->

<div class='rireki_pull' id=''>
	<select id='img_style_pulldown' onchange="downloadCanvas()">
		<option value='0'>ダウンロード</option>
		<option value='1'>JPG画像としてダウンロード</option>
		<option value='2'>PNG画像としてダウンロード</option>
	</select>
</div>

<!--
<div>
	<canvas id="myChart" style="border: solid 1px; width: 500px; height: 500px"></canvas>
</div>
-->
<div id='app_graph' style="height:px; width:px; margin:0 auto; padding:10px 50px 10px 50px ; ">
    <canvas id='myChart' style="background:#eee; "></canvas>
</div>


<!-- CSSで「display: none;」して非表示 -->
<div style="display:none;">
	<a id="hiddenLink" download="canvas.jpg">link</a>
	<a id="hiddenLink2" download="canvas.png">link</a>
</div>

<!-- CSSで小さめサイズに調整 -->
<div id="notdownload"></div>

<script>
	function downloadCanvas() {

		let canvas = document.getElementById('myChart');
		var img_style_pulldown = document.getElementById("img_style_pulldown").value;
		let link;
		//alert(img_style_pulldown);
		if(img_style_pulldown == 1){
			link   = document.getElementById('hiddenLink');//JPG
		}else if(img_style_pulldown == 2){
			link   = document.getElementById('hiddenLink2');//PNG
		}

		link.href = canvas.toDataURL();
		document.getElementById('canvasImage').src = canvas.toDataURL();
		link.click();

		document.getElementById("notdownload").innerHTML = 
		"<span style='color: red;'>自動でダウンロードされない場合、下図を右クリックして保存して下さい。</span>";

	}
</script>

<div >
	<img id="canvasImage" src="dummy.png" 
	style="height:30px; width:50px; margin:0 auto; background:#eee;">
</div>

