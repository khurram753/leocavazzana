<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Services\Site\PortfolioService;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function index(PortfolioService $portfolioService)
    {
        return $portfolioService->index();
    }

    public function projectList($id,PortfolioService $portfolioService)
    {
        return $portfolioService->projectList($id);
    }

    public function projectDetail ($id,PortfolioService $portfolioService)
    {
        return $portfolioService->projectDetail($id);
    }
}
