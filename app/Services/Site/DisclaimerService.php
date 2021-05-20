<?php


namespace App\Services\Site;


use App\AboutUs;
use App\Customer;
use App\Disclaimer;
use App\HomePage;

class DisclaimerService
{

    public function index()
    {
        $data = Disclaimer::first();

        return view('site.disclaimer.disclaimer',compact('data'));
    }
}
