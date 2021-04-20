<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\HomePageService;
use Illuminate\Http\Request;

class HomePageController extends Controller
{
    //
    public function index(HomePageService $homePageService)
    {
        return $homePageService->index();
    }

    public function saveHomeContent(Request $request,HomePageService $homePageService)
    {
        return $homePageService->saveHomeContent($request);
    }

    public function deleteImages(Request $request,HomePageService $homePageService)
    {
        return $homePageService->deleteImages($request);
    }
}
