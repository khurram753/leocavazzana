<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactUsRequest;
use App\Services\Site\ContactUsService;
use Illuminate\Http\Request;

class ContactUsController extends Controller
{
    //
    public function index(ContactUsService $contactUsService)
    {
        return $contactUsService->index();
    }

    public function postContactUs(ContactUsRequest $request,ContactUsService $contactUsService)
    {
//        $this->validate($request,[
//            'name'=>'required'
//        ]);
//        $this->validate($request,[
//            'name' => 'required',
//            'phone' => 'required',
//            'email' => 'required|email',
//            'company' => 'required',
//            'message' => 'message'
//        ]);

        return $contactUsService->sendEmail($request);
    }
}
