<?php

namespace App\Http\Controllers\Admin\Authentication;

use App\Http\Controllers\Controller;
use App\Http\Requests\Register\RegisterRequest;
use App\Services\Admin\Registration\RegistrationService;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{


    public function registerPage(RegistrationService $registrationService)
    {
        return $registrationService->registerPage();
    }

    public function register(RegisterRequest $request, RegistrationService $registrationService)
    {

       return $registrationService->register($request);

    }

}
