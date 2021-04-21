<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\PortfolioProjectService;
use Illuminate\Http\Request;

class PortfolioProjectController extends Controller
{
    public function index(PortfolioProjectService $portfolioProjectService)
    {
        return $portfolioProjectService->index();
    }

    public function create(PortfolioProjectService $portfolioProjectService)
    {
        return $portfolioProjectService->create();
    }

    public function save(Request $request,PortfolioProjectService $portfolioProjectService)
    {
        $this->validate($request,[
            'featured_image' => 'image|max:1000|mimes:jpeg,jpg,png'
        ]);

        return $portfolioProjectService->save($request);
    }


    public function edit($id,PortfolioProjectService $portfolioProjectService)
    {
        return $portfolioProjectService->edit($id);
    }

    public function update(Request $request,PortfolioProjectService $portfolioProjectService)
    {
        $this->validate($request,[
            'featured_image' => 'image|max:1000|mimes:jpeg,jpg,png'
        ]);

        return $portfolioProjectService->update($request);
    }

    public function delete(Request $request,PortfolioProjectService $portfolioProjectService)
    {
        return $portfolioProjectService->delete($request);
    }

    public function saveGallery(Request $request,PortfolioProjectService $portfolioProjectService)
    {
        return $portfolioProjectService->saveGallery($request);
    }

    public function deleteGallery(Request $request,PortfolioProjectService $portfolioProjectService)
    {
        return $portfolioProjectService->deleteGallery($request);
    }
}
