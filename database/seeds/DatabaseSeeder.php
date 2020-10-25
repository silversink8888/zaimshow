<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UserSeeder::class);
        // BooksTableSeederを読み込むように指定
        	$this->call(Tbl_MoneyTableSeeder::class);
       // 	$this->call(Mst_categoryTableSeeder::class);
    }
}
