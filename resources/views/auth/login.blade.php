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
			@include('/money/headernavi_not_login')
			<!-- ヘッダーナビ /-->

			<!--/ パンくずリスト -->
			<div class="pankuzu_list" data-position="center">
				<a href="/money">ZAIMSHOW</a> &nbsp;&nbsp; &gt; &nbsp;&nbsp; <a href="/login">ログイン</a>
			</div>
			<!-- パンくずリスト /-->

			<div class="container">

                <div class="card-header">&nbsp;&nbsp;&nbsp;</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('login') }}">
                        @csrf

						<!-- 新しくユーザーIDの入力項目を追加する -->
						<div class="form-group row">
						    <label for="name" class="col-md-4 col-form-label text-md-right">ユーザID&nbsp;&nbsp;&nbsp;&nbsp;</label>

						    <div class="col-md-6">
						        <input id="name" type="text" class="form-control @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>

						        @error('name')
						            <span class="invalid-feedback" role="alert">
						                <strong>{{ $message }}</strong>
						            </span>
						        @enderror
						    </div>
						</div>


                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">パスワード</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-md-6 offset-md-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                    <label class="form-check-label" for="remember">ログイン情報を保存する</label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                            <!--
                                <button type="submit" class="btn btn-primary">ログイン</button>
                             -->
                                <input type="image" src="{{ asset('img/login.png')}}" alt="入力する">
                            </div>
                        </div>
						<div>
						    @if (Route::has('password.request'))
						        <a class="btn btn-link" href="{{ route('password.request') }}">パスワードを忘れましたか？</a>
						    @endif
						</div>
                    </form>
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