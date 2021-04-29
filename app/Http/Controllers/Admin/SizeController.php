<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\SizeService;
use Illuminate\Http\Request;

class SizeController extends Controller
{
    public function index(SizeService $sizeService)
    {
        return $sizeService->index();
    }

    public function create(SizeService $sizeService)
    {
        return $sizeService->create();
    }

    public function save(Request $request,SizeService $sizeService)
    {
        $this->validate($request,[
            'name'=>'required'
        ]);
        return $sizeService->save($request);
    }

    public function edit($id,SizeService $sizeService)
    {
        return $sizeService->edit($id);
    }

    public function update(SizeRequest $request,SizeService $sizeService)
    {
        $this->validate($request,[
            'name'=>'required'
        ]);
        return $sizeService->update($request);
    }

    public function delete(Request $request,SizeService $sizeService)
    {
        return $sizeService->delete($request);
    }

    public function changeStatus(Request $request,SizeService $sizeService)
    {
        return $sizeService->changeStatus($request);
    }
}
