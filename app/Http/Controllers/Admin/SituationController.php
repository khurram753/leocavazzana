<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\SituationService;
use Illuminate\Http\Request;

class SituationController extends Controller
{
    public function index(SituationService $situationService)
    {
        return $situationService->index();
    }

    public function create(SituationService $situationService)
    {
        return $situationService->create();
    }

    public function save(Request $request,SituationService $situationService)
    {
        $this->validate($request,[
            'new_gallery.*' => 'image|max:1000|mimes:jpeg,jpg,png'
        ]);

        return $situationService->save($request);
    }


    public function edit($id,SituationService $situationService)
    {
        return $situationService->edit($id);
    }

    public function update(Request $request,SituationService $situationService)
    {
//        $this->validate($request,[
//            'new_gallery.*' => 'image|max:1000|mimes:jpeg,jpg,png'
//        ]);

        return $situationService->update($request);
    }

    public function delete(Request $request,SituationService $situationService)
    {
        return $situationService->delete($request);
    }

    public function saveGallery(Request $request,SituationService $situationService)
    {
        return $situationService->saveGallery($request);
    }

    public function deleteGallery(Request $request,SituationService $situationService)
    {
        return $situationService->deleteGallery($request);
    }
}
