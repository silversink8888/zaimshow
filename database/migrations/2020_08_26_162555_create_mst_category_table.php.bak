<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoryDaiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mst_category', function (Blueprint $table) {
	        $table->increments('id');
	        $table->string('category_id', 30);
	        $table->string('category_name', 30);
	        $table->string('category_display', 10);
	 //       $table->boolean('category_enabled');
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
        Schema::dropIfExists('mst_category');
    }
}
