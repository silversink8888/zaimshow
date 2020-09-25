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
				<a href="/money">ZAIMSHOW</a> &nbsp;&nbsp; &gt; &nbsp;&nbsp; <a href="/register">登録</a>
			</div>
			<!-- パンくずリスト /-->

			<div class="container">

                <div class="card-header">&nbsp;&nbsp;&nbsp;</div>


<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">

                <div class="card-body">
                    <form method="POST" action="{{ route('register') }}">
                        @csrf

                        <div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right">ユーザーID</label>

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
                            <label for="email" class="col-md-4 col-form-label text-md-right">メール &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email">

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">パスワード</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password">

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password-confirm" class="col-md-4 col-form-label text-md-right">パスワード<br>(確認用)</label>

                            <div class="col-md-6">
                                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
					<input type="image" src="{{ asset('img/user_register.png')}}" alt="登録する">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

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
