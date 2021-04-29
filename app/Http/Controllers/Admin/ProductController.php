<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProductRequest;
use App\Services\Admin\ProductService;
use App\Services\Helper\Helper;
use App\Shop\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index(ProductService $productService)
    {
        return $productService->index();
    }

    public function create(ProductService $productService)
    {
        return $productService->create();
    }

    public function save(Request $request,ProductService $productService)
    {
        $this->validate($request,[
            'featured_image'=>'max:10000|mimes:jpeg,jpg,png',
            'name_english' => 'required',
            'name_french' => 'required',
            'name_russia' => 'required',
            'price' => 'required',
            'color_id' => 'required',
            'size_id.*' => 'required'
        ]);
        return $productService->save($request);
    }

    public function edit($id,ProductService $productService)
    {
        return $productService->edit($id);
    }

    public function update(Request $request,ProductService $productService)
    {
        $this->validate($request,[
            'featured_image'=>'max:10000|mimes:jpeg,jpg,png',
            'name_english' => 'required',
            'name_french' => 'required',
            'name_russia' => 'required',
            'price' => 'required',
            'color_id' => 'required',
            'size_id.*' => 'required'
        ]);

        return $productService->update($request);
    }

    public function delete(Request $request,ProductService $productService)
    {
        return $productService->delete($request);
    }

    public function changeStatus(Request $request,ProductService $productService)
    {
        return $productService->changeStatus($request);
    }

    public function getSubCategory(Request $request,ProductService $productService)
    {
        return $productService->getSubCategory($request);
    }

    public function deleteGallery($id,ProductService $productService)
    {
        return $productService->deleteGallery($id);
    }

    public function updateGallery(Request $request,ProductService $productService)
    {
        return $productService->updateGallery($request);
    }

    public function deleteVariation($id, ProductService $productService)
    {
        return $productService->deleteVariation($id);
    }

    public function listApi()
    {
        $data = Product::all();

        if(sizeof($data) > 0)
        {
            return response()->json(['result'=>'success','data'=>$data]);
        }
        else{
            return response()->json(['result'=>'success','message'=>'No Record to display']);
        }
    }

    public function saveProduct(Request $request)
    {
        $customMsgs = [
            'name.required' => 'Name is a required field',
            'description.required' => 'Description is a required field',
            'short_description.required' => 'Short Description is a required field',
        ];

        $validator = Validator::make($request->all(),
            [
                'name' => 'required',
                'description' => 'required',
                'short_description' => 'required',
            ],$customMsgs
        );



        if ($validator->fails()) {
            return response()->json(['result'=>'error','message'=>$validator->messages()->first()]);
        }

        try {
            Product::create(['name' => $request->name, 'description' => $request->description, 'short_description' => $request->short_description]);
            return response()->json(['result'=>'success','message'=>'Record Saved']);
        }
        catch (\Exception $e)
        {
            return response()->json(['result'=>'error','message'=>'Error arrived:'.$e]);
        }

    }
}
