<?php


namespace App\Services\Site;


use App\AboutUs;
use App\Customer;
use App\HomePage;
use App\Portfolio;
use App\Project;
use App\Service;
use http\Client;

class ServicesService
{

    public function index()
    {
        $data = HomePage::first();
        $services = Service::with('images')->get();
        $clients = Customer::all();

        return view('site.services.service',compact('data','services','clients'));
    }


}
