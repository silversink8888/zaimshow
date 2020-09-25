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
			<a href="/money">ZAIMSHOW</a> &nbsp;&nbsp; &gt; &nbsp;&nbsp; <a href="/money/show">履歴</a>  &nbsp;&nbsp; &gt; &nbsp;&nbsp; 家計簿を編集
		</div>
		<!-- パンくずリスト /-->

		<div class="container">
			<header class="major">
				<div>
					@include('money/form', ['target' => 'update'])
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
