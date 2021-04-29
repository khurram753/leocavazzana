<?php

namespace App;

use App\Shop\Color;
use App\Shop\PivotProductVariationSize;
use App\Shop\Product;
use App\Shop\ProductGallery;
use App\Shop\Size;
use Illuminate\Database\Eloquent\Model;

class ProductVariation extends Model
{
    protected $table = 'product_variations';

    protected $guarded = [];

    public function product()
    {
        return $this->belongsTo(Product::class,'product_id');
    }

    public function color()
    {
        return $this->belongsTo(Color::class,'color_id');
    }

    public function sizes()
    {
        return $this->belongsToMany(Size::class,PivotProductVariationSize::class,'product_variation_id','size_id')->withPivot('id','product_variation_id','size_id');
    }
}
