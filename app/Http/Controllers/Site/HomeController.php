<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Services\Site\HomeService;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    //
    public function index(HomeService $homeService)
    {
        return $homeService->index();
    }
}
