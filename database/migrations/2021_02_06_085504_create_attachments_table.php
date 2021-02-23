<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttachmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attachments', function (Blueprint $table) {
            $table->id();
            $table->string('buy_no',32)->comment('買い物番号');
            $table->string('name')->comment('アカウント名');
            $table->string('path')->comment('ファイルパス');
            $table->string('key')->comment('キー');
            $table->string('other1',32)->nullable()->comment('その他1');
            $table->string('other2',32)->nullable()->comment('その他2');
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
        Schema::dropIfExists('attachments');
    }
}
