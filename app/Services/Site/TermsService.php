<?php


namespace App\Services\Site;


use App\AboutUs;
use App\Customer;
use App\HomePage;
use App\TermsCondition;

class TermsService
{

    public function index()
    {
        $data = TermsCondition::first();

        return view('site.terms.terms',compact('data'));
    }
}
