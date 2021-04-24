<?php


namespace App\Services\Site;


use App\AboutUs;
use App\Customer;
use App\HomePage;

class AboutService
{

    public function index()
    {
        $data = AboutUs::first();

        return view('site.about.about',compact('data'));
    }
}
