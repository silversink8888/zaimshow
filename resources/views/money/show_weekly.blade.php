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
			<a href="/money">ZAIMSHOW</a> &nbsp;&nbsp; &gt; &nbsp;&nbsp; <a href="/money/show">履歴</a> &nbsp;&nbsp; &gt;週ごとの履歴&nbsp;&nbsp;
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

<!-- Ajaxで購入データ取得表示 -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript" src="/assets/js/info_weekly.js"></script>

	<div id="scrollbar">

		<div>
			<table class='table-rireki2'>
				<tr id='userTable_for_week'></tr>

				<tr><!-- 個別データ -->
					<td>
						<table class='table-rireki2' id='userTable_for_week_1'></table>
					</td>

					<td>
						<table class='table-rireki2' id='userTable_for_week_2'></table>
					</td>

					<td>
						<table class='table-rireki2' id='userTable_for_week_3'></table>
					</td>

					<td>
						<table class='table-rireki2' id='userTable_for_week_4'></table>
					</td>

					<td>
<!--
						<table class='table-rireki2' id='userTable_for_week_5'></table>
 -->
 					<div class="">
						<table id='userTable_for_week_5'></table>

 					</div>

					</td>
				</tr>

				<tr><!-- 週ごとデータ -->
					<td>
						<table>
							<tr>
								<td>総支出</td>
								<td id='userTable_for_week_1_sum'></td>
							</tr>
						</table>
					</td>

					<td>
						<table>
							<tr>
								<td>総支出</td>
								<td id='userTable_for_week_2_sum'></td>
							</tr>
						</table>
					</td>

					<td>
						<table>
							<tr>
								<td>総支出</td>
								<td id='userTable_for_week_3_sum'></td>
							</tr>
						</table>
					</td>

					<td>
						<table>
							<tr>
								<td>総支出</td>
								<td id='userTable_for_week_4_sum'></td>
							</tr>
						</table>
					</td>

					<td>
						<table>
							<tr>
								<td>総支出</td>
								<td id='userTable_for_week_5_sum'></td>
							</tr>
						</table>
					</td>

				</tr>

			</table>
		</div>




		</table><!-- Ajaxでここにデータ表示 -->

	</div><!-- scrollbar -->
	<!-- 日ごとデータ /-->

</div><!-- wrapper -->

</body>
</html>
