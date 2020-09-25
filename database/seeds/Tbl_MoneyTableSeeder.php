<?php

use Illuminate\Database\Seeder;

class Tbl_MoneyTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
public function run()
{
    // テーブルのクリア
    DB::table('tbl_money')->truncate();

    // 初期データ用意（列名をキーとする連想配列）
    $money = [
              [
		//	'id' => '1111',
			'name' => 'suzuki',
			'item_name' => '本',
			'price' => '2000',
			'buy_date' => '2020-08-08',
			'memo' => 'メモ'
               ],

               [
		//	'id' => '1111',
			'name' => 'satoh',
			'item_name' => '食料',
			'price' => '5700',
			'buy_date' => '2020-08-10',
			'memo' => 'メモメモメモメモ'
               ]
             ];

    // 登録
    foreach($money as $money_value) {
      \App\Tbl_Money::create($money_value);
    }
}
}
