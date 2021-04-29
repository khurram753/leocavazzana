<?php

namespace App;

use App\Shop\ProductVariation;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    protected $guarded = [];

    public function productVariation()
    {
        return $this->hasMany(ProductVariation::class);
    }

    public function productSize()
    {
        return $this->belongsToMany(Size::class,PivotProductVariationSize::class,'product_id','size_id')->withPivot('id','product_id','size_id');

    }

}
