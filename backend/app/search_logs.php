<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class search_logs extends Model
{
    //
    protected $table = 'search_log';

    protected $fillable = ['user_id', 'search_log'];
}
