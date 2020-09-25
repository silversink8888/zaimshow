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

//Route::get('book', 'MoneyController@index');
//Route::get('book/{id}', 'BookController@show');
//Route::get('money/{id}' , 'MoneyController@show');
//Route::resource('book', 'BookController');

//Route::get('money','Tbl_MoneyController@index');
//Route::get('money/create','Tbl_MoneyController@create');
//Route::post('money/store','Tbl_MoneyController@store');

Route::resource('money','Tbl_MoneyController');

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

//Route::get('aaa','Tbl_MoneyController@graph');

//Route::get('aaa', 'Tbl_MoneyController@getAddressByPostalCode');
//Route::get('/money/show', 'Tbl_MoneyController@index2'); // localhost:8000/
Route::get('/money/show/{selectedmonth}','Tbl_MoneyController@getData');

