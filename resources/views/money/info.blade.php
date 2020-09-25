<div id="scrollbar">

	<div class="table">
		<div class="table_line">
			<div class="block1" >編集</div>
			<!--
			<div class="block">削除</div>
			 -->
			<div class="block0">購入日</div>
			<div class="block0">商品名</div>
			<div class="block0">カテゴリ</div>
			<div class="block0">価格</div>
			<div class="block0">メモ</div>
		</div>

		@foreach($money_arr as $money)
			<div class="table_line">
				<div class="block1"><a href="/money/{{ $money->id }}/edit"><img src="{{ asset('img/edit_bottun.png')}}" alt="編集する"></a></div>
	<!--
				<div class="block">
					<form action="/money/{{ $money->id }}" method="post">
					<input type="image" src="{{ asset('img/delete.png')}}" alt="削除する">
					<input type="hidden" name="_method" value="DELETE">
					<input type="hidden" name="_token" value="{{ csrf_token() }}">
					</form>
				</div>
	 -->
	 			<div class="block">{{ $money->buy_date }}</div>
				<div class="block">{{ $money->item_name }}</div>
				<div class="block">{{ $money->dai_category }}</div>
				<div class="block">{{ $money->price }}</div>
				<div class="block">{{ $money->memo }}</div>
			</div>
		@endforeach

	</div>

</div><!-- scrollbar -->