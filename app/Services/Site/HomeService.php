<?php


namespace App\Services\Site;


use App\Customer;
use App\HomePage;

class HomeService
{

    public function index()
    {
        $data = HomePage::first();
        $clients  = Customer::all();

        return view('site.home.home',compact('data','clients'));
    }
}
