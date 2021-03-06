<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\TermsService;
use Illuminate\Http\Request;

class TermsController extends Controller
{
    public function index(TermsService $termsService)
    {
        return $termsService->index();
    }

    public function save(Request $request,TermsService $termsService)
    {
        return $termsService->save($request);
    }
}
