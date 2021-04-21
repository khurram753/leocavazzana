<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    //
    protected $guarded = [];

    public function images()
    {
        return $this->hasMany(ServiceImage::class,'service_id');
    }

}
