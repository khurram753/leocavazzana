<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    //
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class,'created_by');
    }
}
