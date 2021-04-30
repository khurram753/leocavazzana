<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Services\Site\ShopService;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    public function index(ShopService $shopService)
    {
        return $shopService->index();
    }

    public function detail($id, ShopService $shopService)
    {
        return $shopService->detail($id);
    }
}
