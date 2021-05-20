<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Services\Site\DisclaimerService;
use Illuminate\Http\Request;

class DisclaimerController extends Controller
{

    public function index(DisclaimerService $disclaimerService)
    {
        return $disclaimerService->index();
    }
}
