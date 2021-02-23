<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    // 参照させたいSQLのテーブル名を指定してあげる
    protected $table = 'attachments';
}
