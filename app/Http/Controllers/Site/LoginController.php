<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Services\Site\LoginService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(LoginService $loginService)
    {
        return $loginService->loginPage();
    }

    public function customerLogin(Request $request,LoginService $loginService)
    {
        $this->validate($request,[
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);
        return $loginService->postLogin($request,'Customer');
    }

    public function lendorLogin(Request $request,LoginService $loginService)
    {
        $this->validate($request,[
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);
        return $loginService->postLogin($request,'Lendor');
    }

    public function logout()
    {
        Auth::logout();

        return redirect()->route('home');
    }
}
