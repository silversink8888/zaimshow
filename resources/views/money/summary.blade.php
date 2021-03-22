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
			<a href="/money">ZAIMSHOW</a> &nbsp;&nbsp; &gt; &nbsp;&nbsp; <a href="/money/summary">分析</a> &nbsp;&nbsp; &gt; 日ごとの分析&nbsp;&nbsp;
		</div>
		<!-- パンくずリスト /-->

		<div class="container">

			<!-- 履歴のday or week or month ナビ /-->
			<!-- 
			@include('/money/show_navi')
			-->

			<table class="table-kiroku">
				<tr>
					<td>
						<div id='last_month_data'></div><!-- Ajaxでここにデータ表示 -->
						<input type='button' value='<' id='last_month'>
					</td>

					<td width="30%">
						<div id='this_month_data'></div><!-- Ajaxでここに今月データ表示 -->
					</td>

					<td>
						<div id='next_month_data'></div><!-- Ajaxでここにデータ表示 -->
						<input type='button' value='>' id='next_month'>
					</td>
				</tr>
			</table>

		</div><!-- container -->
	</section>

	<!--/ 月毎購入データ -->
	@include('/money/summary_graph_month')

	<div id="userTable"></div><!-- scrollbar -->
	<!-- 月毎購入データ /-->

</div><!-- wrapper -->

</body>
</html>
