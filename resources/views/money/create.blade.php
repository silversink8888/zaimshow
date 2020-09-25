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
			<a href="/money">ZAIMSHOW</a> &nbsp;&nbsp; &gt; &nbsp;&nbsp; <a href="/money/create">家計簿を入力</a>
		</div>
		<!-- パンくずリスト /-->

		<div>
			<table class="table2">
		       <tr>
			       <td class="current_tab">支出</td>
			       <td>収入</td>
			       <td>振替</td>
		       </tr>
	       </table>
       </div>

		<div class="container">
			<header class="">
				<div>
					@include('money/form', ['target' => 'store'])
				</div>
			</header>
		</div><!-- container -->
	</section>

	<!--/ フッター -->
	@include('/money/footer')
	<!-- フッター /-->

</div><!-- wrapper -->

</body>
</html>
