<?php

namespace App\Http\Controllers\Admin\Authentication;

use App\Http\Controllers\Controller;
use App\Services\Admin\Registration\RegistrationService;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    //
    public function logout(RegistrationService $registrationService)
    {
        return $registrationService->logout();
    }
}
