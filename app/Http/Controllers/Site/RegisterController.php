<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Services\Site\RegisterService;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function register(RegisterService $registerService)
    {
        return $registerService->registerPage();
    }

    public function lendorRegister(Request $request, RegisterService $registerService)
    {
        $this->validate($request, [
            'first_name' => 'required',
            'last_name' => 'required',
            'phone' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed',
            'company' => 'required',
            'street' =>  'required',
            'city' =>  'required',
            'country' =>  'required',
            'position' =>  'required',
            'postal_code' =>  'required',
            'hear_about' =>  'required',
            'policyCheck' => 'required',
            'termsCheck' => 'required'
        ]);

        return $registerService->register($request,'Lendor');
    }


    public function customerRegister(Request $request, RegisterService $registerService)
    {
        $this->validate($request, [
            'first_name' => 'required',
            'last_name' => 'required',
            'phone' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed',
            'company' => 'required',
            'street' =>  'required',
            'city' =>  'required',
            'country' =>  'required',
            'position' =>  'required',
            'postal_code' =>  'required',
            'hear_about' =>  'required',
            'policyCheck' => 'required',
            'termsCheck' => 'required'
        ]);

        return $registerService->register($request,'Customer');
    }
}
