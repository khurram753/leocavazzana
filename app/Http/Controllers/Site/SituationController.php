<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Services\Site\SituationService;
use Illuminate\Http\Request;

class SituationController extends Controller
{
    //
    public function index(SituationService $situationService)
    {
        return $situationService->index();
    }

    public function detail($id,SituationService $situationService)
    {
        return $situationService->detail($id);
    }
}
