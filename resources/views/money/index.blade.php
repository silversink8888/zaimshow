<!--/ ヘッダー -->
@include('/money/header')
<!-- ヘッダー /-->

<body class="is-preload">

<!--/ サイドバー -->
@include('/money/sidebar')
<!-- サイドバー /-->

<!-- wrapper -->
<div id="wrapper">

	<!-- main -->
	<div id="main">

		<!-- one -->
		<!--
		<section id="one">
		 -->
			<!--/ ヘッダーナビ -->
			@include('/money/headernavi')
			<!-- ヘッダーナビ /-->

			<!--/ パンくずリスト -->
			<div class="pankuzu_list" data-position="center">
				<a href="/money">ZAIMSHOW</a>
			</div>
			<!-- パンくずリスト /-->

			<div class="container">

				<div>
					<table class="table-kiroku">
						<tr>
							<td>記録数　{{$arr_money_sum['kiroku_suu']}}　回</td>
							<td>記録日数　{{$arr_money_sum['kiroku_nisuu']}}　日</td>
							<td>連続記録　{{$arr_money_sum['renzoku_kiroku']}}　日</td>
						</tr>
					</table>
				</div>


				<table class="table-joukyou">
					<tr>
						<td>

							<div id="menu">
								<table>
									<tr>
										<td><p><?php echo DATE('n')?> 月の状況</p></td>
									</tr>

									<tr>
										<td>
											<div class="table-kongetu">
											<span>今月 &yen; {{ $arr_money_sum['money_month_sum'] }}　円</span>
											<p class="arrow_box">&yen; {{ $arr_money_sum['money_month_sum'] }}</p>
											</>
										</td>
									</tr>

									<tr>
										<td>
											<div class="table-konnshuu">
											<span>今週 &yen; {{ $arr_money_sum['money_week_sum'] }}　円</span>
											<p class="arrow_box">&yen; {{ $arr_money_sum['money_week_sum'] }}</p>
											</>
										</td>
									</tr>

									<tr>
										<td>
											<div class="table-kyou">
											<span>今日 &yen; {{ $arr_money_sum['money_today_sum'] }}　円</span>
											<p class="arrow_box">&yen; {{ $arr_money_sum['money_today_sum'] }}</p>
											</>
										</td>
									</tr>
								</table>

							</div><!-- menu -->

						</td>

					</tr>
					<tr>
						<td>
							<!-- /* 2021/03/19 Edited by Suzuki @grah機能*/ -->
							<!-- 
							@include('/money/chartjs')
							 -->

							<!--/ 円グラフ-->
							@include('/money/vue-chart')
							<!-- 円グラフ/-->
						</td>
					</tr>
				</table>


				<!--/ 会計情報 -->
				<!-- 会計情報 /-->

			</div><!-- container -->
<!--
		</section>
 -->

		<!--/ フッター -->
		@include('money/footer')
		<!-- フッター /-->

	</div><!-- Main -->
</div><!-- Wrapper -->

</body>
</html>
