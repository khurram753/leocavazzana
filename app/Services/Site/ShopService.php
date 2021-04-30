<?php


namespace App\Services\Site;


use App\AboutUs;
use App\Customer;
use App\HomePage;
use App\Product;
use App\Shop;
use phpDocumentor\Reflection\Types\Compound;

class ShopService
{

    public function index()
    {
        $data = HomePage::first();
        $products = Product::all();

        return view('site.shop.shop',compact('data','products'));
    }

    public function detail($id)
    {
        $product =  Product::find($id);
        if($product)
        {
            return view('site.shop.shop_detail',compact('product'));
        }
        else{
            return redirect()->back()->with('error','Record Not Found');
        }

    }
}
