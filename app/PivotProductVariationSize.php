<?php

namespace App;

use App\Shop\ProductVariation;
use App\Shop\Size;
use Illuminate\Database\Eloquent\Model;

class PivotProductVariationSize extends Model
{
    protected $table = "pivot_product_sizes";

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class,'created_by');
    }

    public function product()
    {
        return $this->belongsTo(Product::class,'product_id');
    }

    public function productSize()
    {
        return $this->belongsTo(Size::class,'size_id');
    }
}
