<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class favorites extends Model
{
    //
    protected $fillable = ['user_id', 'id_gif'];
}
