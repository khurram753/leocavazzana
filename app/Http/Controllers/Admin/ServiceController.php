<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\ServicesService;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index(ServicesService $servicesService)
    {
        return $servicesService->index();
    }

    public function create(ServicesService $servicesService)
    {
        return $servicesService->create();
    }

    public function save(Request $request,ServicesService $servicesService)
    {
        $this->validate($request,[
            'new_gallery.*' => 'image|max:1000|mimes:jpeg,jpg,png'
        ]);

        return $servicesService->save($request);
    }


    public function edit($id,ServicesService $servicesService)
    {
        return $servicesService->edit($id);
    }

    public function update(Request $request,ServicesService $servicesService)
    {
//        $this->validate($request,[
//            'image' => 'image|max:1000|mimes:jpeg,jpg,png'
//        ]);

        return $servicesService->update($request);
    }

    public function delete(Request $request,ServicesService $servicesService)
    {
        return $servicesService->delete($request);
    }
}
