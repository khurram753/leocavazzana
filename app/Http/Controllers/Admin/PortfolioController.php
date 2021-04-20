<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\PortfolioService;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function index(PortfolioService $portfolioService)
    {
        return $portfolioService->index();
    }

    public function create(PortfolioService $portfolioService)
    {
        return $portfolioService->create();
    }

    public function save(Request $request,PortfolioService $portfolioService)
    {
        $this->validate($request,[
            'image' => 'image|max:1000|mimes:jpeg,jpg,png'
        ]);

        return $portfolioService->save($request);
    }


    public function edit($id,PortfolioService $portfolioService)
    {
        return $portfolioService->edit($id);
    }

    public function update(Request $request,PortfolioService $portfolioService)
    {
        $this->validate($request,[
            'image' => 'image|max:1000|mimes:jpeg,jpg,png'
        ]);

        return $portfolioService->update($request);
    }

    public function delete(Request $request,PortfolioService $portfolioService)
    {
        return $portfolioService->delete($request);
    }
}
