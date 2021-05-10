<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Services\Site\LoginService;
use Illuminate\Http\Request;

class ForgetPasswordController extends Controller
{
    public function forgetPasswordForm(LoginService $loginService)
    {
        return $loginService->forgetPasswordForm();
    }

    public function forgetPassword(Request $request,LoginService $loginService)
    {
        $this->validate($request,[
            'email'=>'required|email'
        ]);
        return $loginService->forgetPassword($request);
    }

    public function resetPassword($token,LoginService $loginService)
    {
        return $loginService->resetPassword($token);
    }

    public function changePassword(Request $request,LoginService $loginService)
    {
        $this->validate($request,[
            'email'=>'required|email|exists:users',
            'password'=>'required|min:8|confirmed',
        ]);
        return $loginService->changePassword($request);
    }
}
