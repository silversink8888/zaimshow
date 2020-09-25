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
      prevText			: 'å‰月'
     ,nextText			: 'æ¬¡月'
     ,monthNames		: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
     ,monthNamesShort		: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
     ,dayNames			: ['æ—¥æ›œæ—¥','月æ›œæ—¥','ç«æ›œæ—¥','æ°´æ›œæ—¥','æœ¨æ›œæ—¥','é‡‘æ›œæ—¥','åœŸæ›œæ—¥']
     ,dayNamesShort		: ['æ—¥','月','ç«','æ°´','æœ¨','é‡‘','åœŸ']
     ,dayNamesMin		: ['æ—¥','月','ç«','æ°´','æœ¨','é‡‘','åœŸ']
     ,dateFormat		: 'yy-mm-dd'
     ,showMonthAfterYear	: true
     ,changeYear		: true
     ,yearSuffix		: '年'
    });

    $('#ympicker')
    .ympicker({
      prevText		: 'å‰å¹´'
     ,nextText		: 'ç¿Œå¹´'
     ,monthNames		: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
     ,monthNamesShort	: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
     ,dateFormat		: 'yy-mm'
     ,yearSuffix		: '年'
     ,yearRange		: '-10:+2'
    });
  });

})(jQuery);