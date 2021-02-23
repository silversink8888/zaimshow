<!DOCTYPE HTML>
<html>
<head>
<!--/ googleanalytics -->
@include('/money/header/googleanalytics')
<!-- googleanalytics /-->

<title>ZAIMSHOW</title>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
<link rel="stylesheet" href="/assets/css/main.css" />
<link rel="stylesheet" href="/assets/css/main2.css" />

<link rel="stylesheet" href="/assets/css/calendar.css" />

<script type="text/javascript"　src="js/calendar.js"></script>
<script type="text/javascript" src="/assets/js/main2.js"></script>


<!-- Chart.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.js"></script>

<!--/ jQuery UI Datepicker -->
<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<link rel="stylesheet" href="/resources/demos/style.css">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1/i18n/jquery.ui.datepicker-ja.min.js"></script>

<!-- Ajax　履歴ページ用 -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<!--
<script type="text/javascript" src="/assets/js/info_day.js"></script>
-->


<script>
$( function() {
	var today = new Date();
	  $("#datepicker").datepicker();
	  $("#datepicker").datepicker("setDate",today);

	  //$("#datepicker").datepicker("option", "dateFormat", 'y/m/d');//->18/2/9
	  //$("#datepicker").datepicker("option", "dateFormat", 'yy/mm/dd');//->2018/02/20
	  $("#datepicker").datepicker("option", "dateFormat", 'yy-mm-dd');//->2018-02-20
	});

</script>
<!-- jQuery UI Datepicker /-->

<!--/ Datepicker custom-->
<link rel="stylesheet" href="/assets/css/jquery-ui-yscustom.css">
<script charset="UTF-8" src="/assets/js/jquery-3.3.1.min.js"></script>
<script charset="UTF-8" src="/assets/js/jquery-migrate-3.0.1.min.js"></script>
<script charset="UTF-8" src="/assets/js/jquery-ui-yscustom.min.js"></script>
<script charset="UTF-8" src="/assets/js/index.js"></script>
<!-- Datepicker custom/-->

<!--/ sweetalert -->
<script src="https://torina.top/media/sweetalert/sweetalert.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://torina.top/media/sweetalert/sweetalert.css">

<script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.css">
<!-- sweetalert /-->


<!-- 20210216 Added By Suzuki @画像アップロード機能 Start -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script>
$(function() {
  $('.js-upload-file').on('change', function () { //ファイルが選択されたら
    let file = $(this).prop('files')[0]; //ファイルの情報を代入(file.name=ファイル名/file.size=ファイルサイズ/file.type=ファイルタイプ)
    $('.js-upload-filename').text(file.name); //ファイル名を出力
    $('.js-upload-fileclear').show(); //クリアボタンを表示
  });

  $('.js-upload-fileclear').click(function() { //クリアボタンがクリックされたら
    $('.js-upload-file').val(''); //inputをリセット
    $('.js-upload-filename').text('ファイルが未選択です'); //ファイル名をリセット
    $(this).hide(); //クリアボタンを非表示
  });
});
</script>
<!-- 20210216 Added By Suzuki @画像アップロード機能 end -->

<!-- 20210217 Added By Suzuki @削除ダイアログ修正 Start -->
<!--
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.6.5/sweetalert2.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/10.15.4/sweetalert2.css"  />
<script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/10.15.4/sweetalert2.js"></script>

-->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<link rel="stylesheet" href="/assets/css/sweetalert2.css">
<script charset="UTF-8" src="/assets/js/sweetalert2.js"></script>


<!-- 20210217 Added By Suzuki @削除ダイアログ修正 End -->


</head>