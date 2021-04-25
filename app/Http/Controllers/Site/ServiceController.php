<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Services\Site\ServicesService;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    //
    public function index(ServicesService $servicesService)
    {
        return $servicesService->index();
    }
}
