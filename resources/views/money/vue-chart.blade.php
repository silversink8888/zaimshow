<?php

//print_r($arr_money_category_sum);


		$shokuhi = 0;
		$irui = 0;
		$nitiyou_zakka = 0;
		$entertainment = 0;
		$tuusinnhi = 0;
		$juukyohi = 0;

		$koutuuhi = 0;
		$kousaihi = 0;
		$kyouiku = 0;
		$iryou = 0;
		$suidou = 0;
		$car = 0;
		$tax = 0;
		$oogata_shuppi = 0;
		$sonota = 0;

		foreach($arr_money_category_sum as $key => $value){

			if($arr_money_category_sum[$key]->dai_category == '01'){
				$shokuhi = $arr_money_category_sum[$key]->total_price;
			}elseif($arr_money_category_sum[$key]->dai_category == '02'){
				$irui = $arr_money_category_sum[$key]->total_price;
			}elseif($arr_money_category_sum[$key]->dai_category == '03'){
				$nitiyou_zakka = $arr_money_category_sum[$key]->total_price;
			}elseif($arr_money_category_sum[$key]->dai_category == '04'){
				$juukyohi = $arr_money_category_sum[$key]->total_price;
			}elseif($arr_money_category_sum[$key]->dai_category == '05'){
				$entertainment = $arr_money_category_sum[$key]->total_price;
			}elseif($arr_money_category_sum[$key]->dai_category == '06'){
				$tuusinnhi = $arr_money_category_sum[$key]->total_price;
			}elseif($arr_money_category_sum[$key]->dai_category == '07'){
				$koutuuhi = $arr_money_category_sum[$key]->total_price;
			}elseif($arr_money_category_sum[$key]->dai_category == '08'){
				$kousaihi = $arr_money_category_sum[$key]->total_price;
			}elseif($arr_money_category_sum[$key]->dai_category == '09'){
				$kyouiku = $arr_money_category_sum[$key]->total_price;
			}elseif($arr_money_category_sum[$key]->dai_category == '10'){
				$iryou = $arr_money_category_sum[$key]->total_price;
			}elseif($arr_money_category_sum[$key]->dai_category == '11'){
				$suidou = $arr_money_category_sum[$key]->total_price;
			}elseif($arr_money_category_sum[$key]->dai_category == '12'){
				$car = $arr_money_category_sum[$key]->total_price;
			}elseif($arr_money_category_sum[$key]->dai_category == '13'){
				$tax = $arr_money_category_sum[$key]->total_price;
			}elseif($arr_money_category_sum[$key]->dai_category == '14'){
				$oogata_shuppi = $arr_money_category_sum[$key]->total_price;
		//	}elseif($arr_money_category_sum[$key]->dai_category == '15'){
			}else{
				$sonota = $arr_money_category_sum[$key]->total_price;
			}

		//	echo $key;
		//	echo $value;
		//	echo "<br";
		}

		//	print_r($arr_money_category_sum);

		/*
			echo "食費は".$shokuhi.'<br>';
			echo "衣類は".$irui.'<br>';
			echo "日用雑貨は".$nitiyou_zakka.'<br>';
			echo "エンタメは".$entertainment.'<br>';
			echo "住居費は".$juukyohi.'<br>';
			echo "通信費は".$tuusinnhi.'<br>';
			echo "その他は".$sonota.'<br>';
		 */

	//	print_r($arr_money_category_sum);
	//	echo '<br>';
		$arr_money_category_sum = json_encode($arr_money_category_sum);
	//	print_r($arr_money_category_sum);
	//	echo '<br>';



?>


<!--
<script type="text/javascript"　src="js/node_modules/vue.js@"></script>
<script type="text/javascript"　src="js/node_modules/chart.js/Chart.min.js"></script>
-->


<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>


<div id="app" style="width:800px">
	<canvas id="myChart"></canvas>
</div>


<script>

var shokuhi       = <?php echo json_encode($shokuhi); ?>;
var irui          = <?php echo json_encode($irui); ?>;
var entertainment = <?php echo json_encode($entertainment); ?>;
var juukyohi      = <?php echo json_encode($juukyohi); ?>;
var nitiyou_zakka = <?php echo json_encode($nitiyou_zakka); ?>;
var tuusinnhi     = <?php echo json_encode($tuusinnhi); ?>;

var koutuuhi      = <?php echo json_encode($koutuuhi); ?>;
var kousaihi      = <?php echo json_encode($kousaihi); ?>;
var kyouiku       = <?php echo json_encode($kyouiku); ?>;
var iryou         = <?php echo json_encode($iryou); ?>;
var suidou        = <?php echo json_encode($suidou); ?>;
var car           = <?php echo json_encode($car); ?>;
var tax           = <?php echo json_encode($tax); ?>;
var oogata_shuppi = <?php echo json_encode($oogata_shuppi); ?>;

var sonota        = <?php echo json_encode($sonota); ?>;

//var arr_money_category_sum[];

//let arr_money_category_sum = <?php echo $arr_money_category_sum?>;
//console.log(arr_money_category_sum)


$sonota = 0;

  var app = new Vue({
    el: '#app',
    mounted: function(){
		var ctx = document.getElementById('myChart').getContext('2d');
		var myChart = new Chart(ctx, {
		type: 'pie',
		data: {
			labels: [
			"食費",
			"衣類",
			"日用雑貨",
			"エンタメ",
			"住居",
			"通信費",

			"交通費",
			"交際費",
			"教育",
			"医療",
			"光熱費",
			"車",
			"税金",
			"大型出費",

			"その他"

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
              label: '四半期の売上数の遷移',
              data: [
				shokuhi,
				irui,
				nitiyou_zakka,
				entertainment,
				juukyohi,
				tuusinnhi,
				koutuuhi,
				kousaihi,
				kyouiku,
				iryou,
				suidou,
				car,
				tax,
				oogata_shuppi,
				sonota

				]
          }]
        }
      });
    }
  });
</script>
