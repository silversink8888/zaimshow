<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblMoneyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_money', function (Blueprint $table) {
		$table->increments('id');
		$table->string('name', 30);
		$table->string('dai_category', 20)->nullable();
		$table->string('chuu_category', 20)->nullable();
		$table->string('item_name', 20);
	//	$table->string('price', 20);
		$table->integer('price');
		$table->datetime('buy_date');
		$table->string('store', 20)->nullable();
		$table->string('memo', 20)->nullable();
		$table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_money');
    }
}
