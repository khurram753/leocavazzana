<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    //
    protected $guarded = [];

    protected $table = 'portfolio';

    public function project()
    {
        return $this->hasMany(Project::class,'portfolio_id');
    }
}
