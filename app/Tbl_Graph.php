<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tbl_Graph extends Model
{
    // 参照させたいSQLのテーブル名を指定してあげる
    protected $table = 'tbl_money';

}
