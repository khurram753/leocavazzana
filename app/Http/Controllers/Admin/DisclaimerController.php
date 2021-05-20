<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DisclaimerController extends Controller
{
    public function index(DisclaimerService $disclaimerService)
    {
        return $disclaimerService->index();
    }

    public function save(Request $request,DisclaimerService $disclaimerService)
    {
        return $disclaimerService->save($request);
    }
}
