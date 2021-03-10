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
		<form action="/money" method="post" enctype="multipart/form-data">
	@elseif($target == 'update')
		<form action="/money/{{$money_arr->id}}" method="post" enctype="multipart/form-data">
		<!--
		<input type="hidden" name="_method" value="PUT">
		 -->
	@endif
		{{ csrf_field() }}
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
				       value="{{ old('buy_date', isset($default_buy_date) ? $default_buy_date : '') }}"  id="datepicker" ></td>
					@endif

		       </tr>

		       <tr>
			       <td>お店</td>
			       <td colspan="3" ><input type="text"  maxlength="20" class="form-control" name="store" value="{{ old('store', isset($default_store) ? $default_store : '') }}"></td>
		       </tr>

<!-- 20210205 Added By Suzuki @画像アップロード機能 Start -->
				<tr>
					<td>写真</td>
					<!--
					<td colspan="" ></td>
					-->

						@if($target == 'store')
						
							<td>						
								<label>
									<input type="file" name="file" class="js-upload-file">ファイルを選択
								</label>
								<div class="js-upload-filename">ファイル未選択</div>
								<div class="fileclear js-upload-fileclear">選択ファイルをクリア</div>
							</td>														
						@else

							<!-- 画像あり -->
							@if($attachments_arr['path'] !='no')
								<td>								
									<label>
										<input type="file" name="file" class="js-upload-file">ファイルを選択
									</label>

									<div class="js-upload-filename"></div>
									<div class="fileclear js-upload-fileclear">選択ファイルをクリア</div>
								</td>

								<td>
									<img src="{{ asset('storage/'.$attachments_arr['path']) }}" width="200px" height="140px">
								</td>
							
							@else <!-- 画像なし -->
						
							<td>
								<label>
									<input type="file" name="file" class="js-upload-file">ファイルを選択
								</label>
								<div class="js-upload-filename">ファイル未選択</div>
								<div class="fileclear js-upload-fileclear">選択ファイルをクリア</div>							
							</td>

							@endif

						@endif
					
				</tr>
<!-- 20210205 Added By Suzuki @画像アップロード機能 End -->

				<tr>
					<td colspan="5"><input type="image" src="{{ asset('img/input.png')}}" alt="入力する" id="edit"></td>
				</tr>
				</form>

				<tr>
				@if($target == 'update')
				<td colspan="5">
					<form action="/money/delete/{{ $money_arr ->id }}" method="get" >

						<input type="image" class="delete" id="delete" src="{{ asset('img/delete.png')}}" alt="削除する">
			<!--
						<input type="hidden" name="_method" value="DELETE">
						<input type="hidden" name="_token" value="{{ csrf_token() }}">
			-->
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
$('#delete').on('click', function(e) {
    e.preventDefault();
    var form = $('form');
	
	swal.fire({
        title: "本当に削除しますか?"
        ,icon: "warning"
        ,showCancelButton: true
        ,confirmButtonColor: "#DD6B55"
        ,confirmButtonText: "削除します!"
		,position : 'center'
		,closeOnConfirm: false
		,allowEscapeKey: true //Escボタン
		,allowOutsideClick : true //枠外クリック
		,showCloseButton : true   //閉じるボタン

	}).then(function(result) { //←この行の記述を修正した結果改善された

		if (result.value) {

			form.submit();

			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Successfully Deleted!',
				showConfirmButton: false,
				timer: 2500
			})
		}
	});
});
</script>

<script>
	document.getElementById("edit").onclick = function(e){

		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Successfully Inputed!',
			showConfirmButton: false,
			timer: 2000
			
		})

	};
</script>



<!--
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
<script>
$('.delete').on('click',function(e){
    e.preventDefault();
    var form = $(this).parents('form');
    swal({
        title: "確認",
        text: "削除しますか？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "削除する",
        closeOnConfirm: false
    }, then function(isConfirm){
        if (isConfirm) form.submit();
	    	$(document).ready(function() {
	    	    swal({
	    	      title: "削除完了しました。",
	    	      imageUrl: 'https://torina.top/media/images/smile.jpg',
	    	      confirmButtonText: "すごーい！",
	    	    });
	    	});
        	window.location.href='/money/show';
    });
});
</script>
-->



<script>
$('#aaaaaaaaa').on('click',function(e){
    e.preventDefault();
    var form = $(this).parents('form');
    swal({
        title: "入力",
        text: "入力しますか？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "入力する",
        closeOnConfirm: false
    }, function(isConfirm){
        if (isConfirm) form.submit();
	    	$(document).ready(function() {
	    	    swal({
	    	 		title: "入力しました",
	    	//		text:"編集しました。";
	    	  //    imageUrl: 'https://torina.top/media/images/smile.jpg',
	    	  //    confirmButtonText: "編集しました",
	    	    });
		    	window.location.href='/money/show';
	    	});
    });
});
</script>