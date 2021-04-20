<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\CustomerService;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    //
    public function index(CustomerService $customerService)
    {
        return $customerService->index();
    }

    public function create(CustomerService $customerService)
    {
        return $customerService->create();
    }

    public function save(Request $request,CustomerService $customerService)
    {
        $this->validate($request,[
           'image' => 'required|image|max:1000|mimes:jpeg,jpg,png'
        ]);

        return $customerService->save($request);
    }


    public function edit($id,CustomerService $customerService)
    {
        return $customerService->edit($id);
    }

    public function update(Request $request,CustomerService $customerService)
    {
        $this->validate($request,[
            'image' => 'required|image|max:1000|mimes:jpeg,jpg,png'
        ]);

        return $customerService->update($request);
    }

    public function delete(Request $request,CustomerService $customerService)
    {
        return $customerService->delete($request);
    }
}
