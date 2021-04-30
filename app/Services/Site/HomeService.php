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

    public function changeLanguage($request)
    {
        if($request->data == 'eng')
        {
            $request->session()->put('language', 'english');
        }
        elseif($request->data == 'french')
        {
            $request->session()->put('language', 'french');

        }
        elseif($request->data == 'rus')
        {
            $request->session()->put('language', 'russia');

        }

        return response()->json(['result'=>'success']);

    }
}
