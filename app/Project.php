<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    //
    protected $guarded = [];

    public function portfolio()
    {
        return $this->belongsTo(Portfolio::class,'portfolio_id');
    }

    public function images()
    {
        return $this->hasMany(ProjectImage::class,'project_id');
    }
}
