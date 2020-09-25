<?php
	function YearMonthPulldown(){
		$ym='';
		$nengetu ='';
		$year = date('Y');
		$yearmonth = '';

		$yearmonth = date('Y-m');
	//	$selected ='';
		//将来的には購入日から該当する年月を表示したり
		for ($i=2018; $i <= $year; $i++) {
			for ($ii=1; $ii <= 12; $ii++) {

				if($ii<=9){$ii = "0".$ii;}//月を2桁に

				if($yearmonth == $i.'-'.$ii){
					$nengetu .= '<option value="'.$i.'-'.$ii.'" selected >'.$i.'年'.$ii.'月</option>';
					$ym = $i.'-'.$ii;
				}else{
					$nengetu .= '<option value="'.$i.'-'.$ii.'" >'.$i.'年'.$ii.'月</option>';
				}
			}
		}
		echo '<select name="ympicker" id="ympicker">'.$nengetu.'</select>';
	}
?>

<!--/ ヘッダー -->
@include('/money/header')
<!-- ヘッダー /-->

<body class="is-preload">

<!--/ サイドバー -->
@include('/money/sidebar')
<!-- サイドバー /-->

<!-- wrapper -->
<div id="wrapper">

	<!-- one -->
	<section id="one">

		<!--/ ヘッダーナビ -->
		@include('/money/headernavi')
		<!-- ヘッダーナビ /-->

		<!--/ パンくずリスト -->
		<div class="pankuzu_list" data-position="center">
			<a href="/money">ZAIMSHOW</a> &nbsp;&nbsp; &gt; &nbsp;&nbsp; <a href="/money/show">履歴</a> &nbsp;&nbsp; &gt; 日ごとの履歴&nbsp;&nbsp;
		</div>
		<!-- パンくずリスト /-->

		<div class="container">

			<div>
				<table class="table-kiroku">
					<tr>
						<td><a href="/money/show">日ごと</a></td>
						<td width="30%">週ごと</td>
						<td>月ごと</td>
					</tr>

					<tr>
						<td>
							<!--
							<a href="/money/show?month={{$month_arr[0]}}"><input type="image" src="{{ asset('img/dainari_1.png') }}" alt="前月"></a>
							 -->

							<div id='last_month_data'></div><!-- Ajaxでここにデータ表示 -->
							<input type='button' value='<' id='last_month'>
						</td>
						<td>
							<div id='this_month'>
								<!--
								<input type='text' id='ympicker' maxlength="7" name='ympicker' value="{{$month_arr[1]}}" placeholder='Enter yyyy-mm'>
								 -->
								<?php //YearMonthPulldown(); ?>
							</div>

							<div id='this_month_data'></div><!-- Ajaxでここに今月データ表示 -->
     					</td>
						<td>
							<div id='next_month_data'></div><!-- Ajaxでここにデータ表示 -->
							<input type='button' value='>' id='next_month'>
						</td>
					</tr>
				</table>
			</div>

		</div><!-- container -->
	</section>



	<!--/ フッター -->
	@include('/money/info_day')
	<!-- フッター /-->

</div><!-- wrapper -->

</body>
</html>
