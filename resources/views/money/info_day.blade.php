<?php
//print_r($_GET);
?>
<!-- Ajaxで購入データ取得表示 -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript" src="/assets/js/info_day.js"></script>

<div class='rireki_pull' id='day_pulldown_data'>
	<select id='day_style_pulldown'>
		<option value='1'>日付(新しい順)</option>
		<option value='2'>日付(古い順)</option>
		<option value='3'>記録日(新しい順)</option>
		<option value='4'>記録日(古い順)</option>
		<option value='5'>金額(多い順)</option>
		<option value='6'>金額(少ない順)</option>
	</select>
</div>


<div id="scrollbar">
<!--
	<table class='table-rireki'>
		<tr>
			<th>編集</th>
			<th>削除</th>
			<th>購入日</th>
			<th>商品名</th>
			<th>カテゴリ</th>
			<th>価格</th>
			<th>ストア</th>
			<th>メモ</th>
		</tr>
	</table>
 -->
	<table class='table-rireki'  id='userTable'>
	</table><!-- Ajaxでここにデータ表示 -->



</div><!-- scrollbar -->