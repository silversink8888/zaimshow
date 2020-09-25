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
<!-- sweetalert /-->




</head>