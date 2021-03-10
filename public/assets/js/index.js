;/*************************************************************
; *
; * Copyright (c) 2019 ysrock Co., Ltd.	<info@ysrock.co.jp>
; * Copyright (c) 2019 Yasuo Sugano	<sugano@ysrock.co.jp>
; *
; * Version	: 0.0.1
; * Last Update	: 2019.03.19
; *
; ************************************************************/
(function($){
  $(document).ready(function(){
    $('#datepicker')
    .datepicker({
      prevText			: '前月'
     ,nextText			: '翌月'
     ,monthNames		: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
     ,monthNamesShort	: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
     ,dayNames		: ['日', '月', '火', '水', '木', '金', '土']
     ,dayNamesShort	: ['日', '月', '火', '水', '木', '金', '土']
     ,dayNamesMin		: ['日', '月', '火', '水', '木', '金', '土']
     ,dateFormat		: 'yy-mm-dd'
     ,showMonthAfterYear	: true
     ,changeYear		: true
     ,yearSuffix		: '年'
    });

    $('#ympicker')
    .ympicker({
      prevText		: '前月'
     ,nextText		: '翌月'
     ,monthNames		: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
     ,monthNamesShort	: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
     ,dateFormat		: 'yy-mm'
     ,yearSuffix		: '年'
     ,yearRange		: '-10:+2'
    });
  });

})(jQuery);