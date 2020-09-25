<?php

use Illuminate\Database\Seeder;

class Mst_categoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // テーブルのクリア
	    DB::table('mst_category')->truncate();

/*
	'15' => 'その他'
*/

    // 初期データ用意（列名をキーとする連想配列）
    $mst_category = [
              [
			'id' => '1',
			'category_id' => '01',
			'category_name' => '食品',
			'category_display' => '1'
               ],

              [
			'id' => '2',
			'category_id' => '02',
			'category_name' => '美容・衣類',
			'category_display' => '1'
               ],

              [
			'id' => '3',
			'category_id' => '03',
			'category_name' => '日用雑貨',
			'category_display' => '1'
               ],

              [
			'id' => '4',
			'category_id' => '04',
			'category_name' => '通信費',
			'category_display' => '1'
               ],

              [
			'id' => '5',
			'category_id' => '05',
			'category_name' => 'エンタメ',
			'category_display' => '1'
               ],

              [
			'id' => '6',
			'category_id' => '06',
			'category_name' => '住居',
			'category_display' => '1'
               ],

              [
			'id' => '7',
			'category_id' => '07',
			'category_name' => '交通費',
			'category_display' => '1'
               ],

              [
			'id' => '8',
			'category_id' => '08',
			'category_name' => '交際費',
			'category_display' => '1'
               ],

              [
			'id' => '9',
			'category_id' => '09',
			'category_name' => '教育・教養',
			'category_display' => '1'
               ],

              [
			'id' => '10',
			'category_id' => '10',
			'category_name' => '医療・保険',
			'category_display' => '1'
               ],

              [
			'id' => '11',
			'category_id' => '11',
			'category_name' => '水道・光熱',
			'category_display' => '1'
               ],

              [
			'id' => '12',
			'category_id' => '12',
			'category_name' => '車',
			'category_display' => '1'
               ],

              [
			'id' => '13',
			'category_id' => '13',
			'category_name' => '税金',
			'category_display' => '1'
               ],

              [
			'id' => '14',
			'category_id' => '14',
			'category_name' => '大型出費',
			'category_display' => '1'
               ],

              [
			'id' => '15',
			'category_id' => '15',
			'category_name' => 'その他',
			'category_display' => '1'
               ]


             ];

    // 登録
    foreach($mst_category as $value) {
      \App\Mst_category::create($value);
    }
}
}
