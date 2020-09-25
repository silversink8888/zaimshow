
<div class="col-md-6">
@if($target == 'store')
    <h2></h2>
@elseif($target == 'updaate')
    <h2>家計簿　編集</h2>
@endif
</div>

<div class="col-md-8 col-md-offset-1">
	@include('money/message')
	@if($target == 'store')
		<form action="/money" method="post" >
	@elseif($target == 'update')
		<form action="/money/{{ $money_arr->id }}" method="post">
		<input type="hidden" name="_method" value="PUT">
	@endif
		<input type="hidden" name="_token" value="{{ csrf_token() }}">
		<input type="hidden" name="name" value="{{ $money_arr->name }}">

		<table class="table3">
				<tr>
			       <td>品目名</td>
			       <td>カテゴリ</td>
			       <td>金額</td>
			       <td>メモ</td>
		       </tr>

		       <tr>
			       <td><input type="text" maxlength="20" class="form-control" name="item_name" value="{{ old('item_name', isset($default_item_name) ? $default_item_name : '') }}" ></td>
			       <td>
						<select name = "dai_category">
						    @foreach($category_arr as $key => $value )

								//「selected」をつける処理
								@if( $category_arr[$key]->category_id == $money_arr->dai_category)
									<option value="{{$category_arr[$key]->category_id}}" selected >
									{{$category_arr[$key]->category_name}}</option> - {{$category_arr[$key]->category_id}}
								@else
									<option value="{{$category_arr[$key]->category_id}}" >
									{{$category_arr[$key]->category_name}} - {{$category_arr[$key]->category_id}}</option>
								@endif

						    @endforeach
						</select>
					</td>

			       <td><input type="text" maxlength="20" class="form-control" name="price" value="{{ old('price', isset($default_price) ? $default_price : '') }}"></td>
			       <td><input type="text" maxlength="20" class="form-control" name="memo" value="{{ old('memo', isset($default_memo) ? $default_memo : '') }}"></td>
		       </tr>

		       <tr>
			       <td>購入日</td>
			       <td  colspan="3" >
			       @if($target == 'store')
				       <input type="text" maxlength="10" class="form-control" name="buy_date"
				       value="{{ old('buy_date', isset($default_buy_date) ? $default_buy_date : '') }}"  id="datepicker" ></td>
					@else
				       <input type="text" maxlength="10" class="form-control" name="buy_date"
				       value="{{ old('buy_date', isset($default_buy_date) ? $default_buy_date : '') }}"   ></td>
					@endif

		       </tr>

		       <tr>
			       <td>お店</td>
			       <td colspan="3" ><input type="text"  maxlength="20" class="form-control" name="store" value="{{ old('store', isset($default_store) ? $default_store : '') }}"></td>
		       </tr>

		       <tr>
			       <td colspan="5"><input type="image" src="{{ asset('img/input.png')}}" alt="入力する"></td>
		       </tr>
		       </form>

		       <tr>
		        @if($target == 'update')
				<td colspan="5">
					<form action="/money/{{ $money_arr ->id }}" method="post" >

						<input type="image" class="delete" src="{{ asset('img/delete.png')}}" alt="削除する">
						<input type="hidden" name="_method" value="DELETE">
						<input type="hidden" name="_token" value="{{ csrf_token() }}">
					</form>
				</td>
				@endif
		       </tr>


		       <tr>
			       <td colspan="5"><input type="button" value="戻る" onClick="history.back()"></td>
		       </tr>
	</table>

</div>


<script>
$('.delete').on('click',function(e){
    e.preventDefault();
    var form = $(this).parents('form');
    swal({
        title: "確認",
        text: "削除してよろしいですか？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "削除する",
        closeOnConfirm: false
    }, function(isConfirm){
        if (isConfirm) form.submit();

	    	$(document).ready(function() {
	    	    swal({
	    	      title: "削除完了しました。",
	    	  //    imageUrl: 'https://torina.top/media/images/smile.jpg',
	    	  //    confirmButtonText: "すごーい！",
	    	    });
	    	});

        	window.location.href='/money/show';
    });
});
</script>
