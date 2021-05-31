<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Services\Site\PaymentGatewayService;
use App\Services\Site\ShopService;
use App\Shop;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    public function index(Request $request,ShopService $shopService)
    {
        return $shopService->index($request);
    }

    public function detail($id, ShopService $shopService)
    {
        return $shopService->detail($id);
    }

    public function createSession(Request $request,ShopService $shopService)
    {
        return $shopService->createSession($request);
    }


}
