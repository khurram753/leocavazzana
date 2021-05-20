<?php


namespace App\Services\Site;


use App\AboutUs;
use App\Customer;
use App\Disclaimer;
use App\HomePage;
use App\PrivacyPolicy;

class PrivacyPolicyService
{

    public function index()
    {
        $data = PrivacyPolicy::first();

        return view('site.privacy.privacy',compact('data'));
    }
}
