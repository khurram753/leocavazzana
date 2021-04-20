<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\AboutUsService;
use Illuminate\Http\Request;

class AboutUsController extends Controller
{
    public function index(AboutUsService $aboutUsService)
    {
        return $aboutUsService->index();
    }

    public function save(Request $request,AboutUsService $aboutUsService)
    {
        return $aboutUsService->save($request);
    }

}
