<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddBuyNoToTblMoneyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tbl_money', function (Blueprint $table) {
            //
            $table->string('buy_no',32);  //カラム追加
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tbl_money', function (Blueprint $table) {
            //
            $table->dropColumn('buy_no');  //カラムの削除
        });
    }
}
