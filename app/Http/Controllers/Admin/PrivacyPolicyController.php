<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\PrivacyService;
use Illuminate\Http\Request;

class PrivacyPolicyController extends Controller
{

    public function index(PrivacyService $privacyService)
    {
        return $privacyService->index();
    }

    public function save(Request $request,PrivacyService $privacyService)
    {
        return $privacyService->save($request);
    }

}
