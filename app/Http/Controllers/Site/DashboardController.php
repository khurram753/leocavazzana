<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Services\Site\DashboardService;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    //
    public function dashboard()
    {
        return view('user.dashboard.dashboard');
    }

    public function requestPage()
    {
        return view('user.create_request.create_request');
    }

    public function createRequest(Request $request,DashboardService $dashboardService)
    {
        $this->validate($request,[
           'message'=>'required',
           'document' => 'max:2000|mimes:jpeg,jpg,png,docx,docs,txt,pdf'
        ]);

        return $dashboardService->createRequest($request);
    }

    public function fileSection(DashboardService $dashboardService)
    {
        return $dashboardService->fileSection();
    }
}
