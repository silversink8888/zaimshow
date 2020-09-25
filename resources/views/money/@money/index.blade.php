<!--/ header -->
<!DOCTYPE HTML>
<html>
<head>

<title>ZAIMSHOW</title>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
<link href="{{asset('/assets/css/main.css')}}" rel="stylesheet">
<link href="{{asset('/assets/css/main2.css')}}" rel="stylesheet">


</head>
<!-- header /-->

<body class="is-preload">

<!--/ sidebar -->
<section id="header">
<header>
	
	<h1 id="logo"><a href="#">111111</a></h1>
	<p>xxxxxxxxxxxxxxx</p>
</header>
<nav id="nav">
	<ul>
		<li><a href="#one" class="active">About</a></li>
		<li><a href="#two">Things I Can Do</a></li>
		<li><a href="#three">A Few Accomplishments</a></li>
		<li><a href="#four">Contact</a></li>
	</ul>
</nav>
<footer>
	<ul class="icons">
		<li><a href="#" class="icon brands fa-twitter"><span class="label">Twitter</span></a></li>
		<li><a href="#" class="icon brands fa-facebook-f"><span class="label">Facebook</span></a></li>
		<li><a href="#" class="icon brands fa-instagram"><span class="label">Instagram</span></a></li>
		<li><a href="#" class="icon brands fa-github"><span class="label">Github</span></a></li>
		<li><a href="#" class="icon solid fa-envelope"><span class="label">Email</span></a></li>
	</ul>
</footer>
</section>
<!-- sidebar /-->
	
	<!-- Wrapper -->
		<div id="wrapper">

			<!-- Main -->
				<div id="main">

					<!-- One -->
						<section id="one">
							<!--/ ヘッダー -->
							<div class="image_temp" data-position="center">
							<!--  
								<img src="images/banner.jpg" alt="" />
							-->
								<table class="table1">
								<tr>
									<td><a href="/zaimshow">ZAIMSHOW</a></td>
									<td><a href="/zaimshow/money/index">家計簿を入力</a></td>
									<td>履歴</td>
									<td>分析</td>
								</tr>
								</table>
							</div>
							<!-- ヘッダー /-->
							
							<div class="container">
								<header class="major">
									<h2>家計簿を入力する</h2>

								    <table class="table text-center">
								      <tr>
								        <th class="text-center">ID</th>
								        <th class="text-center">アカウント名</th>
								        <th class="text-center">商品名</th>
								        <th class="text-center">大カテゴリー</th>
								        <th class="text-center">中カテゴリー</th>
								        <th class="text-center">価格</th>
								        <th class="text-center">購入日</th>
								        <th class="text-center">メモ</th>
								        <th class="text-center">削除</th>
								      </tr>



								      @foreach($money_arr as $money)
								      <tr>
								        <td>
								          <a href="/book/{{ $money->id }}/edit">{{ $money->id }}</a>
								        </td>
								        <td>{{ $money->name }}</td>
								        <td>{{ $money->item_name }}</td>
								        <td>{{ $money->dai_category }}</td>
								        <td>{{ $money->chuu_category  }}</td>
								        <td>{{ $money->price }}</td>
								        <td>{{ $money->buy_date }}</td>
								        <td>{{ $money->memo }}</td>
								        <td>
								          <form action="/book/{{ $money->id }}" method="post">
								            <input type="hidden" name="_method" value="DELETE">
								            <input type="hidden" name="_token" value="{{ csrf_token() }}">
								            <button type="submit" class="btn btn-xs btn-danger" aria-label="Left Align"><span class="glyphicon glyphicon-trash"></span></button>
								          </form>
								        </td>
								      </tr>
								      @endforeach
								    </table>
    
								</header>
								<p></p>
							</div>
						</section>



				</div>
	
<!--/ footer -->
<!-- Footer -->
	<section id="footer">
		<div class="container">
			<ul class="copyright">
				<li>&copy; Untitled. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
			</ul>
		</div>
	</section>

	<!-- Scripts -->
	<script src="assets/js/jquery.min.js"></script>
	<script src="assets/js/jquery.scrollex.min.js"></script>
	<script src="assets/js/jquery.scrolly.min.js"></script>
	<script src="assets/js/browser.min.js"></script>
	<script src="assets/js/breakpoints.min.js"></script>
	<script src="assets/js/util.js"></script>
	<script src="assets/js/main.js"></script>
<!-- footer /-->

</div><!-- Wrapper /-->





</body>
</html>