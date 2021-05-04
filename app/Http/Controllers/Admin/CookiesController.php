<?php

namespace App\Http\Controllers\Admin;

use App\Cookie;
use App\Http\Controllers\Controller;
use App\Services\Admin\CookiesService;
use Illuminate\Http\Request;

class CookiesController extends Controller
{
    //
    public function index(CookiesService $cookiesService)
    {
        return $cookiesService->index();
    }

    public function update(Request $request,CookiesService $cookiesService)
    {
        return $cookiesService->update($request);
    }
}
