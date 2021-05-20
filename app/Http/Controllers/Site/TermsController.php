<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Services\Site\TermsService;
use Illuminate\Http\Request;

class TermsController extends Controller
{

    public function index(TermsService $termsService)
    {
        return $termsService->index();
    }
}
