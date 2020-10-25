<?php

namespace App\Http\Controllers;

//use Illuminate\Http\Request;
use Request;

use App\Http\Requests\Tbl_MoneyRequest;
use App\Tbl_Money;
use App\Mst_category;
use Carbon\Carbon;
use App\Http\Middleware\Authenticate;
use Illuminate\Support\Facades\DB;
use DateTime;

class Tbl_MoneyController extends Controller{
	public $user;

	public function __construct(){
		//ログイン認証
	    $this->middleware('auth');

		$this->middleware(function ($request, $next) {
            // ログイン情報
            $this->user = \Auth::user();
            return $next($request);
        });
	}

	/***********************************/
	//カテゴリマスタ
	/***********************************/
	private function MstCategory_arr(){
		$category_arr = array();
	    $category_arr = DB::table('mst_category')
		->select('id','category_id','category_name')
		->orderBy('id','asc')
		->get();
		return $category_arr;
	}

	/***********************************/
	//購入情報全データ取得
	/***********************************/
	private function GetAllMoneyDate(){
		$money_arr = array();
		$money_arr = DB::table('tbl_money')
		->where('name', $this->user->name)
		->orderBy('buy_date', 'desc')
		->get();

		//「yyyy-mm-dd」
		$money_arr = $this->AdjustDateToyyyymmdd($money_arr);
		return $money_arr;
	}

	/***********************************/
	//「yyyy-mm-dd」
	/***********************************/
	private function AdjustDateToyyyymmdd($money_arr){
		foreach($money_arr as $key => $value){
			$money_arr[$key]->buy_date = mb_substr($money_arr[$key]->buy_date,0,10);
		}
		return $money_arr;
	}

	/***********************************/
	//金額3桁区切り + ￥
	/***********************************/
	private function AdjustPrice($money_arr){
		foreach($money_arr as $key => $value){
			$money_arr[$key]->price = number_format($money_arr[$key]->price);
			$money_arr[$key]->price = "￥".$money_arr[$key]->price;
		}
		return $money_arr;
	}

	/***********************************/
	//日付から曜日取得
	/***********************************/
	private function GetDayOfTheWeeStringFromDate($money_arr){
		foreach($money_arr as $key => $value){

			$date = $money_arr[$key]->buy_date;
			$datetime = new DateTime($date);
			$week = array("日", "月", "火", "水", "木", "金", "土");
			$w = (int)$datetime->format('w');

			$money_arr[$key]->buy_date = $money_arr[$key]->buy_date.' ('.$week[$w].')';
		}
		return $money_arr;
	}

	/***********************************/
	//今月の合計金額
	/***********************************/
	private function GetThisMonthMoneyData($this_month){

		$money_month_sum_arr =array();
	    $money_month_sum_arr = DB::table('tbl_money')
	        ->where('name', $this->user->name)
			->where('buy_date','like', $this_month.'%')
			->orderBy('buy_date','desc')
			->orderBy('id','desc')
			->get();

		//「yyyy-mm-dd」の形に成形
		$money_month_sum_arr = $this->AdjustDateToyyyymmdd($money_month_sum_arr);
		//日付から曜日を取得
		$money_month_sum_arr = $this->GetDayOfTheWeeStringFromDate($money_month_sum_arr);

		return $money_month_sum_arr;
	}

	/***********************************/
	//今日の合計
	/***********************************/
	private function GetTodayMoneyData($today){
		$money_today_sum_arr = array();
		$money_today_sum_arr = DB::table('tbl_money')
								->where('name', $this->user->name)
								->where('buy_date','like', '%'. $today.'%')
								->get();
		return $money_today_sum_arr;
	}
	/***********************************/
	//記録数
	/***********************************/
	private function GetKirokusuuMoneyData(){
		$kiroku_suu = 0;
		$kiroku_suu = DB::table('tbl_money')
						->where('name', $this->user->name)
						->count();
		return $kiroku_suu;
	}

	/***********************************/
	//記録日数
	/***********************************/
	private function GetKirokunisuuMoneyData(){
		$kiroku_nisuu = 0;
		$kiroku_nisuu_arr = array();

		$kiroku_nisuu_arr = DB::table('tbl_money')
						->select('buy_date')
						->where('name', $this->user->name)
						->groupBy('buy_date')
					//	->count('buy_date');
						->get();

		$kiroku_nisuu = count($kiroku_nisuu_arr);
		return $kiroku_nisuu;
	}

	/***********************************/
	//連続記録
	/***********************************/
	private function GetRenzokukirokuMoneyData(){
		$renzoku_kiroku = 0;
		$renzoku_kiroku_arr = array();
		$money_sum__all_arr = array(); //アカウントの前データ取得用
		$renzoku_cnt = 0;

		$money_sum__all_arr = DB::table('tbl_money')
							->where('name', $this->user->name)
							->get();

		for($renzoku_cnt=0; $renzoku_cnt < count($money_sum__all_arr) ;$renzoku_cnt++){
//		for($renzoku_cnt=1; $renzoku_cnt < count($money_sum__all_arr) ;$renzoku_cnt++){
			//前日
			$yesterday = DATE('Y-m-d' , strtotime('-'.$renzoku_cnt.' day'));

			$money_today_sum_arr = DB::table('tbl_money')
			->where('name', $this->user->name)
			->where('buy_date','like', '%'. $yesterday.'%')
			->get();

			if(count($money_today_sum_arr)){
				$renzoku_kiroku_arr = array();
				$renzoku_kiroku++;
			//	echo $renzoku_kiroku.'<br>';
			}else{
				//配列が空の時は処理を止める
				break;
			}
		}
		return $renzoku_kiroku;
	}

	/***********************************/
	//今月のカテゴリ毎の合計
	/***********************************/
	private function GetCategorySumMoneyData(){
		$arr_money_category_sum = array();
		$money_month_category_sum = 0;
		$this_month = DATE('Y-m-');

		$arr_money_category_sum = DB::table('tbl_money')
						->select('dai_category',DB::raw('SUM(price) as total_price'))
						->where('name', $this->user->name)
						->groupBy('dai_category')
						->get();
		return $arr_money_category_sum;
	}

	/***********************************/
	//今週の開始日と終了日の取得
	/***********************************/
	private function getWeekStartAndEndDate($checkData){
		$result = array(
			'startDate' => null,
			'endDate'   => null,
		);
		$weekNo = date('w', strtotime($checkData));
		// 週の初めの年月日を取得
		$result['startDate'] = date('Y/m/d', strtotime("-{$weekNo} day", strtotime($checkData)));
		// 週の最後の年月日を取得
		$daysLeft          = 6 - $weekNo;
		$result['endDate'] = date('Y/m/d', strtotime("+{$daysLeft} day", strtotime($checkData)));
		return $result;
	}

	/***********************************/
	//今週の合計
	/***********************************/
	private function GetThisWeekSumMoneyData($today){
		$money_today_week_arr = array();
		$nowWeekArray = $this->getWeekStartAndEndDate(date($today));
		$money_today_week_arr = DB::table('tbl_money')
			->where('name', $this->user->name)
			->wherebetween('buy_date',[$nowWeekArray,$nowWeekArray ] )
			->get();
		return $money_today_week_arr;
	}

	/***********************************/
	//金額の合計　
	/***********************************/
	private function GetSumMoney($money_sum_arr){
		$money_sum = 0;

		foreach($money_sum_arr as $key => $value){
			$money_sum =+ $money_sum_arr[$key]->price + $money_sum ;
		}
		//金額3桁区切り
		$money_sum = number_format($money_sum);
		return $money_sum;
	}

    /***********************************/
	//「カテゴリ」　数字→文字変換
	/***********************************/
	private function CategoryIntToString($money_arr,$category_arr){

		for( $x=0; $x< count($money_arr);$x++){
			for( $y=0; $y< count($category_arr);$y++){
				if( $money_arr[$x]->dai_category  == $category_arr[$y]->category_id){
					$money_arr[$x]->dai_category = $category_arr[$y]->category_name;
				}
			}
		}
		return $money_arr;
	}

    /***********************************/
	//年月プルダウン
	/***********************************/
	/*
	private function YearMonthPulldown(){
		$yearmonthPulldown = '';
		$yearmonthPulldown =  "<select id='ympicker'>";
		$yearmonthPulldown .=  "<option value='2020-07'>2020-07</option>";
		$yearmonthPulldown .=  "<option value='2020-08'>2020-08</option>";
		$yearmonthPulldown .=  "<option value='2020-09'>2020-09</option>";
		$yearmonthPulldown .=  "<option value='2020-10'>2020-10</option>";
		$yearmonthPulldown .=  "</select>";
//print_r($yearmonthPulldown);
		return $yearmonthPulldown;

	}
	*/

	/***********************************/
	//index画面
	/***********************************/
	public function index()
	{
		// アカウント情報を取得
	//	$user = \Auth::user();
		$user = $this->user;
		//購入情報一括取得
		$money_arr = $this->GetAllMoneyDate();

		/***********************************/
		//今月の合計
		/***********************************/
		$arr_money_sum =array();
		$money_sum = 0;

		$this_month = DATE('Y-m-');
		//月間購入データ
		$money_month_sum_arr = $this->GetThisMonthMoneyData($this_month);
		//月間合計購入金額
		$money_sum = $this->GetSumMoney($money_month_sum_arr);
		$arr_money_sum['money_month_sum'] = $money_sum;

		/***********************************/
		//今週の合計
		/***********************************/
		$money_week_sum = 0;
		$today = DATE('Y-m-d');

		//週間購入データ
		$money_today_week_arr = $this->GetThisWeekSumMoneyData($today);
		//週間合計購入金額
		$money_week_sum = $this->GetSumMoney($money_today_week_arr);
		$arr_money_sum['money_week_sum'] = $money_week_sum;

		/***********************************/
		//今日の合計
		/***********************************/
		$money_today_sum = 0;

		//本日購入データ
		$money_today_sum_arr = $this->GetTodayMoneyData($today);
		//本日合計購入金額
		$money_today_sum = $this->GetSumMoney($money_today_sum_arr);
		$arr_money_sum['money_today_sum'] = $money_today_sum;

		/***********************************/
		//記録数
		/***********************************/
		$arr_money_sum['kiroku_suu'] = $this->GetKirokusuuMoneyData();

		/***********************************/
		//記録日数
		/***********************************/
		$arr_money_sum['kiroku_nisuu'] = $this->GetKirokunisuuMoneyData();

		/***********************************/
		//連続記録
		/***********************************/
		$arr_money_sum['renzoku_kiroku'] = $this->GetRenzokukirokuMoneyData();

		/***********************************/
		//今月のカテゴリ毎の合計
		/***********************************/
		$arr_money_category_sum = $this->GetCategorySumMoneyData();

		// 取得した値をビュー「book/index」に渡す
	//	return view('money/index', compact('money_arr','money_month_sum','money_week_sum','money_today_sum') );
		return view('money/index', compact('money_arr','arr_money_sum','arr_money_category_sum') );
	}

	public function create(){
		// 現在日時
		$now = Carbon::now();
		$now_Ymd = date_format($now,'Y-m-d');
	    // 空の$Moneyを渡す
	    $money_arr = new Tbl_Money();
	    // 現在日時を渡す
	    $money_arr->buy_date = $now_Ymd;
	//    print_r($money_arr->buy_date);
	    // アカウント情報を取得
		$user = \Auth::user();
	    $money_arr->name = $user->name;

	    /***********************************/
		//カテゴリマスタ取得
		/***********************************/
		$category_arr = $this->MstCategory_arr();

	//    return view('money/create', compact('money_arr'));
	    return view('money/create', compact('money_arr','category_arr'))->with([
								    'default_buy_date' => $money_arr->buy_date,
								    ]);
	}

	public function store(Tbl_MoneyRequest $request){
	    $money_arr = new Tbl_Money();

	    $money_arr->buy_date = $request->buy_date;
	    $money_arr->name = $request->name;
	    $money_arr->item_name = $request->item_name;
	    $money_arr->dai_category = $request->dai_category;
	    $money_arr->price = $request->price;
	    $money_arr->store = $request->store;
	    $money_arr->memo = $request->memo;
	    $money_arr->save();

	    return redirect("/money");
	}

	//履歴一覧
	public function show(){
	//	public function show($this_month){
//$this_month = '2020-10';
		$month_arr = array();
		$all = Request::all();

		if($all){
			$temp = $all['month'];
			$last_month = date('Y-m', strtotime($temp.' -1 month'));
			$next_month = date('Y-m', strtotime($temp.' +1 month'));
			$this_month = $all['month'];
		}else{
			$last_month = date('Y-m', strtotime('-1 month'));;
			$next_month = date('Y-m', strtotime('+1 month'));;
			$this_month = DATE('Y-m');
		}

		$month_arr[0] = $last_month;
		$month_arr[1] = $this_month;
		$month_arr[2] = $next_month;

	    /***********************************/
		//今月購入情報
		/***********************************/
		$money_arr = $this->GetThisMonthMoneyData($this_month);
//print_r($money_arr);
	    /***********************************/
		//カテゴリマスタ取得
		/***********************************/
		$category_arr = $this->MstCategory_arr();
		//「カテゴリ」　数字→文字変換
		$money_arr = $this->CategoryIntToString($money_arr,$category_arr);

	    /***********************************/
		//年月プルダウン
		/***********************************/
	//	$yearmonthPulldown = $this->YearMonthPulldown();

		return view('money/show', compact('money_arr','category_arr','month_arr'));
	//	return view('money/show', compact('money_arr','arr_money_sum','arr_money_category_sum') );
	//  return view('money/show', ['money' => Money::findOrFail($id)]);
	}

	public function edit($id){
		// DBよりURIパラメータと同じIDを持つテーブルの情報を取得
		$money_arr = Tbl_Money::findOrFail($id);
	//	print_r($money_arr);
		/***********************************/
		//カテゴリマスタ取得
		/***********************************/
		$category_arr = $this->MstCategory_arr();
		//「yyyy-mm-dd」
		$money_arr->buy_date = substr($money_arr->buy_date, 0, 10);

		// 取得した値をビュー「money/edit」に渡す
	//	return view('money/edit', compact('money_arr','category_arr'));
		return view('money/edit', compact('money_arr','category_arr'))->with([
		        'default_id'        => $money_arr->id,
		        'default_item_name' => $money_arr->item_name,
				'default_price'     => $money_arr->price,
		        'default_buy_date'  => $money_arr->buy_date,
		        'default_memo'      => $money_arr->memo,
				'default_store'     => $money_arr->store,
		]);

	}

	public function update(Tbl_MoneyRequest $request, $id)
	{
		$money = Tbl_Money::findOrFail($id);
		$money->item_name   = $request->item_name;
		$money->dai_category  = $request->dai_category;
		$money->buy_date  = $request->buy_date;
		$money->price  = $request->price;
		$money->memo   = $request->memo;
		$money->store  = $request->store;
		$money->save();

		return redirect("/money/show");
	}

	public function destroy($id){
		$money = Tbl_Money::findOrFail($id);
		$money->delete();
		return redirect("/money/show");
	//	return redirect("/money");
	}


	//public function getUsers($id = 0){
	public function getData($yearmonth){

		$yearmonth2  = mb_substr($yearmonth,0,7);//年月の切り出し 2020-091
		$day_pull    = mb_substr($yearmonth,7,1);//日付プルダウンの切り出し

		//
		if($day_pull == 1){
			$column = 'buy_date';
		}elseif($day_pull == 2){
			$column = 'buy_date';
		}elseif($day_pull == 3){
			$column = 'created_at';
		}elseif($day_pull == 4){
			$column = 'created_at';
		}elseif($day_pull == 5){
			$column = 'price';
		}elseif($day_pull == 6){
			$column = 'price';
		}else{
			$column = 'buy_date';
		}

		if($day_pull % 2 == 0){
			$orderby = 'asc';
		}else{
			$orderby = 'desc';
		}


		$money_arr = array();
		$money_arr = DB::table('tbl_money')
		->where('name', $this->user->name)
		->where('buy_date','like', $yearmonth2 .'%')
	//	->orderBy('buy_date','desc')
		->orderBy($column,$orderby)
		->orderBy('id','desc')
		->get();

		//該当データが無しの時
		if(count($money_arr) == 0){
			$stdObj = new \stdClass();
			$money_arr[] = $stdObj;
		}

		//カテゴリマスタ取得
		$category_arr = $this->MstCategory_arr();
		//「カテゴリ」　数字→文字変換
		$money_arr = $this->CategoryIntToString($money_arr,$category_arr);

		//「yyyy-mm-dd」の形に成形
		$money_arr = $this->AdjustDateToyyyymmdd($money_arr);
		//日付から曜日を取得
		$money_arr = $this->GetDayOfTheWeeStringFromDate($money_arr);
	//	print_r($money_arr);
		//金額3桁区切り
		$money_arr = $this->AdjustPrice($money_arr);

	//	$userData['data'] = $money_arr;
		$money_arr = json_encode($money_arr);

		return $money_arr;
	}

	//履歴　週ごと Ajax
	public function AjaxGetDataWeekly($yearmonth){

	//	$yearmonth='2020-10';
		$yearmonth2  = mb_substr($yearmonth,0,7);//年月の切り出し 2020-091
	//	$day_pull    = mb_substr($yearmonth,7,1);//日付プルダウンの切り出し

		$money_arr = array();
		$money_arr = DB::table('tbl_money')
		->where('name', $this->user->name)
		->where('buy_date','like', $yearmonth2 .'%')
	//	->orderBy('buy_date','desc')
	//	->orderBy($column,$orderby)
		->orderBy('id','asc')
		->get();

		//該当データが無しの時
		if(count($money_arr) == 0){
			$stdObj = new \stdClass();
			$money_arr[] = $stdObj;
		}

		//カテゴリマスタ取得
		$category_arr = $this->MstCategory_arr();
		//「カテゴリ」　数字→文字変換
		$money_arr = $this->CategoryIntToString($money_arr,$category_arr);

		//「yyyy-mm-dd」の形に成形
		$money_arr = $this->AdjustDateToyyyymmdd($money_arr);
		//日付から曜日を取得
		$money_arr = $this->GetDayOfTheWeeStringFromDate($money_arr);
	//	print_r($money_arr);
		//金額3桁区切り
		$money_arr = $this->AdjustPrice($money_arr);

	//	$userData['data'] = $money_arr;
		$money_arr = json_encode($money_arr);

	//	return view('money/show_weekly');
	//	return view('money/show_weekly', compact('money_arr'));
		return $money_arr;

		}

		public function getDataWeekly(){

			return view('money/show_weekly');
		}



}
