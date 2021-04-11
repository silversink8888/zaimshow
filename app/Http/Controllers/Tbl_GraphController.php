<?php

namespace App\Http\Controllers;

//use Illuminate\Http\Request;
use Request;

use App\Http\Requests\Tbl_MoneyRequest;
use App\Tbl_Money;
use App\Tbl_Graph;
use App\Mst_category;
use Carbon\Carbon;
use App\Http\Middleware\Authenticate;
use Illuminate\Support\Facades\DB;
use DateTime;
use App\Attachment;
//use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Support\Str;

class Tbl_GraphController extends Controller{

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
	//月毎のカテゴリ合計
	/***********************************/
	public function SummaryGraphCategoryMonthSum($yearmonth2){
		$arr_money_category_sum = array();
		$money_month_category_sum = 0;
	//	$this_month = DATE('Y-m-');
		$this_month = $yearmonth2;

		$arr_money_category_sum = DB::table('tbl_money')
						->select('dai_category',DB::raw('SUM(price) as price'))
						->where('name', $this->user->name)
						/* 2021/03/17 Added by Suzuki */
						->where('buy_date','like', $this_month .'%')
						
						->groupBy('dai_category')
						->get();

		return $arr_money_category_sum;
	}


	/***********************************/
	//グラフ一覧画面　月ごと
	/***********************************/
	public function summary(){
	
		return view('money/summary');
		
	}

	/***********************************/
	//グラフ用の月毎の購入データ
	/***********************************/
	public function summary_graph_month($yearmonth){

		$yearmonth2  = mb_substr($yearmonth,0,7);//年月の切り出し 2020-091

		//今月のカテゴリ毎の合計
		$arr_money_category_sum = $this->SummaryGraphCategoryMonthSum($yearmonth2);
		//$arr_money_category_sum = json_encode($arr_money_category_sum);

		return $arr_money_category_sum;
	}

	/***********************************/
	//グラフ一覧画面　日ごと
	/***********************************/
	public function summary_daily(){
	
		return view('money/summary_daily');
		
	}


	/***********************************/
	//グラフ一覧画面　年ごと
	/***********************************/
	public function summary_yearly(){
	
		return view('money/summary_yearly');
		
	}



	/***********************************/
	//グラフ用の年ごとの購入データ
	/***********************************/
	public function summary_graph_year($yearmonth){

		//	$yearmonth='2020-10';
			$yearmonth2  = mb_substr($yearmonth,0,4);//年月の切り出し 2020-091
		//	$day_pull    = mb_substr($yearmonth,7,1);//日付プルダウンの切り出し
	
			$money_arr = array();
			$money_arr = DB::table('tbl_money')
			->where('name', $this->user->name)
			->where('buy_date','like', $yearmonth2 .'%')
			->orderBy('buy_date','asc')
		//	->orderBy($column,$orderby)
			->orderBy('id','asc')
			->get();
	
			//該当データが無しの時
			if(count($money_arr) == 0){
				$stdObj = new \stdClass();
				$money_arr[] = $stdObj;
			}
	
	
		//	$userData['data'] = $money_arr;
			$money_arr = json_encode($money_arr);
	
			return $money_arr;
	
	}

	/***********************************/
	//グラフ用の年ごとの購入データ
	/***********************************/
	public function summary_graph_allyear($yearmonth){

		//	$yearmonth='2020-10';
			$yearmonth2  = mb_substr($yearmonth,0,4);//年月の切り出し 2020-091
		//	$day_pull    = mb_substr($yearmonth,7,1);//日付プルダウンの切り出し
	
			$money_arr = array();
			$money_arr = DB::table('tbl_money')
			->where('name', $this->user->name)
		//	->where('buy_date','like', $yearmonth2 .'%')
		//	->orderBy('buy_date','asc')
		//	->orderBy($column,$orderby)
			->orderBy('id','asc')
			->get();
	
			//該当データが無しの時
			if(count($money_arr) == 0){
				$stdObj = new \stdClass();
				$money_arr[] = $stdObj;
			}
	
	
		//	$userData['data'] = $money_arr;
			$money_arr = json_encode($money_arr);
	
			return $money_arr;
	
	}	


	/***********************************/
	//グラフ一覧画面　週ごと
	/***********************************/
	public function summary_weekly(){
	
		return view('money/summary_weekly');
		
	}
	/***********************************/
	//グラフ用の年ごとの購入データ
	/***********************************/
	public function summary_graph_week($yearmonth){

		//	$yearmonth='2020-10';
			$yearmonth2  = mb_substr($yearmonth,0,7);//年月の切り出し 2020-091
		//	$day_pull    = mb_substr($yearmonth,7,1);//日付プルダウンの切り出し
	
			$money_arr = array();
			$money_arr = DB::table('tbl_money')
			->where('name', $this->user->name)
			->where('buy_date','like', $yearmonth2 .'%')
			->orderBy('buy_date','asc')
		//	->orderBy($column,$orderby)
			->orderBy('id','asc')
			->get();
	
			//該当データが無しの時
			if(count($money_arr) == 0){
				$stdObj = new \stdClass();
				$money_arr[] = $stdObj;
			}
	
	
		//	$userData['data'] = $money_arr;
			$money_arr = json_encode($money_arr);
	
			return $money_arr;
	
	}

}
