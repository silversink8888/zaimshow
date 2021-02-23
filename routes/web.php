<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//一覧画面
Route::get('money','Tbl_MoneyController@index');

//入力画面
Route::get('money/create','Tbl_MoneyController@create');

//入力処理
Route::post('money','Tbl_MoneyController@store');
//Route::post('money','Tbl_MoneyController@upload');

//編集画面
Route::get('money/{id}/edit','Tbl_MoneyController@edit');
//編集処理
Route::POST('money/{id}','Tbl_MoneyController@update');

//削除処理
Route::get('money/delete/{id}','Tbl_MoneyController@destroy');

//履歴　日ごと
//Route::get('/money/show', 'Tbl_MoneyController@index2'); // localhost:8000/
Route::get('money/show/{selectedmonth}','Tbl_MoneyController@getData');

//履歴　週ごと Ajax
Route::get('money/show_weekly_for_ajax/{selectedmonth}','Tbl_MoneyController@AjaxGetDataWeekly');
// Route::get('money/show_weekly/{selectedmonth}','Tbl_MoneyController@getData');

//履歴　週ごと
Route::get('money/show_weekly/','Tbl_MoneyController@getDataWeekly');

//履歴画面
Route::get('money/show','Tbl_MoneyController@show');

//Route::resource('money','Tbl_MoneyController');

Route::get('/', function () {
    return view('welcome');
});


//Route::get('/index','PostController@index')->name('index');

//Route::post('/store','PostController@store')->name('store');



//ログインチェック
Auth::routes();
Route::get('/home', 'HomeController@index')->name('home');


