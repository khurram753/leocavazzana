<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\ColorService;
use Illuminate\Http\Request;

class ColorController extends Controller
{
    public function index(ColorService $colorService)
    {
        return $colorService->index();
    }

    public function create(ColorService $colorService)
    {
        return $colorService->create();
    }

    public function save(Request $request,ColorService $colorService)
    {
        $this->validate($request,[
            'name'=>'required'
        ]);
        return $colorService->save($request);
    }

    public function edit($id,ColorService $colorService)
    {
        return $colorService->edit($id);
    }

    public function update(Request $request,ColorService $colorService)
    {
        $this->validate($request,[
            'name'=>'required'
        ]);
        return $colorService->update($request);
    }

    public function delete(Request $request,ColorService $colorService)
    {
        return $colorService->delete($request);
    }

    public function changeStatus(Request $request,ColorService $colorService)
    {
        return $colorService->changeStatus($request);
    }
}
