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

			<!-- 履歴のday or week or month ナビ /-->
			@include('/money/show_navi')

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

	<!--/ 日ごとデーター -->
	@include('/money/info_daily')

	<div id="scrollbar">
		<table class='table-rireki' id='userTable'></table><!-- Ajaxでここにデータ表示 -->
		<!--
		<table class='table-rireki2' id='userTable2'></table><!-- Ajaxでここにデータ表示 -->

	</div><!-- scrollbar -->
	<!-- 日ごとデータ /-->

</div><!-- wrapper -->

</body>
</html>
