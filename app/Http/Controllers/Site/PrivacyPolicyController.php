<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Services\Site\PrivacyPolicyService;
use Illuminate\Http\Request;

class PrivacyPolicyController extends Controller
{

    public function index(PrivacyPolicyService $privacyPolicyService)
    {
        return $privacyPolicyService->index();
    }
}
