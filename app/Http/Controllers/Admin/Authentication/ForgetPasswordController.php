<?php

namespace App\Http\Controllers\Admin\Authentication;

use App\Http\Controllers\Controller;
use App\Http\Requests\Register\ForgetPasswordRequest;
use App\Http\Requests\Register\UpdatePasswordRequest;
use App\Mail\ForgetPasswordEmail;
use App\Services\Admin\Registration\RegistrationService;


class ForgetPasswordController extends Controller
{
    public function forgetPasswordForm(RegistrationService $registrationService)
    {
        return $registrationService->forgetPasswordForm();
    }

    public function forgetPassword(ForgetPasswordRequest $request,RegistrationService $registrationService)
    {
        return $registrationService->forgetPassword($request);
    }

    public function resetPassword($token,RegistrationService $registrationService)
    {
        return $registrationService->resetPassword($token);
    }

    public function changePassword(UpdatePasswordRequest $request,RegistrationService $registrationService)
    {
        return $registrationService->changePassword($request);
    }


}
