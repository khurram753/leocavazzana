<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Situation extends Model
{
    //
    protected $guarded = [];

    public function images()
    {
        return $this->hasMany(SituationImage::class,'situation_id');
    }
}
