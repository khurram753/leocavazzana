<?php

/**
 * Created by PhpStorm.
 * User: mkhur
 * Date: 3/31/2020
 * Time: 4:14 PM
 */

namespace App\Services\Admin;


use App\Helpers\ImageUploadHelper;
use App\Color;
use App\Order;
use App\PivotProductVariationSize;
use App\Product;
use App\ProductVariation;
use App\Size;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use File;
use Image;

class ProductService
{

    public function index()
    {
        $data = Product::orderBy('id', 'desc')->get();
        return view('admin.product.listing', compact('data'));
    }

    public function save($request)
    {
        $imageSave = null;
        if ($request->has('featured_image')) {

            $image = $request->featured_image;
            $ext = $image->getClientOriginalExtension();
            $fileName = $image->getClientOriginalName();
            $fileNameUpload = time() . "-" . $fileName;
            $path = public_path('product/images/');
            if (!file_exists($path)) {
                File::makeDirectory($path, 0777, true);
            }
            $imageSave = ImageUploadHelper::saveImage($image, $fileNameUpload, 'product/images/');
        }


        DB::beginTransaction();

        try {


            $productCreate = Product::create(
                $request->except('_token', 'size_id', 'featured_image') + ['featured_image' => $imageSave]);


        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['result' => 'error', 'message' => 'Error in Creating Product' . $e]);

        }


        try {
            if (sizeof($request->size_id) > 0) {
                foreach ($request->size_id as $size) {
                    PivotProductVariationSize::create(['product_id' => $productCreate->id,
                        'size_id' => $size]);
                }

            }

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['result' => 'error', 'message' => 'Error in Saving Product Category' . $e]);
        }


        DB::commit();
        return response()->json(['result' => 'success', 'message' => 'Product Save Successfully.']);

    }

    public function create()
    {
        $sizes = Size::all();
        $colors = Color::all();
        return view('admin.product.create', with(compact('colors', 'sizes')));
    }

    public function edit($id)
    {
        $data = Product::find($id);
        if ($data) {

            $sizes = Size::all();
            $colors = Color::all();

//            dd($data->productSize->pluck('id')->toArray());
            $selectSizeArray = $data->productSize->pluck('id')->toArray();

            return view('admin.product.edit', compact('data', 'selectSizeArray', 'colors', 'sizes'));
        } else {
            return redirect()->back()->with('error', 'Record Not Found.');
        }

    }

    public function update($request)
    {

        $data = Product::find($request->id);

        if ($data) {
            $imageSave = null;
            if ($request->has('featured_image')) {

                $image = $request->featured_image;
                $ext = $image->getClientOriginalExtension();
                $fileName = $image->getClientOriginalName();
                $fileNameUpload = time() . "-" . $fileName;
                $path = public_path('product/images/');
                if (!file_exists($path)) {
                    File::makeDirectory($path, 0777, true);
                }
                $imageSave = ImageUploadHelper::saveImage($image, $fileNameUpload, 'product/images/');
            }


            DB::beginTransaction();

            try {

                if ($imageSave) {
                    $productCreate = $data->update(
                        $request->except('_token', 'id','size_id', 'featured_image') + ['featured_image' => $imageSave]);
                } else {
                    $productCreate = $data->update(
                        $request->except('_token', 'id', 'size_id', 'featured_image'));
                }

            } catch (\Exception $e) {
                DB::rollback();
                return response()->json(['result' => 'error', 'message' => 'Error in Update Product' . $e]);

            }


            try {
                PivotProductVariationSize::where('product_id', $request->id)->delete();
                if (sizeof($request->size_id) > 0) {
                    foreach ($request->size_id as $size) {
                        PivotProductVariationSize::create(['product_id' => $request->id,
                            'size_id' => $size]);
                    }

                }

            } catch (\Exception $e) {
                DB::rollback();
                return response()->json(['result' => 'error', 'message' => 'Error in Update Product Size' . $e]);
            }


            DB::commit();
            return response()->json(['result' => 'success', 'message' => 'Product Update Successfully.']);

        } else {
            return response()->json(['result' => 'error', 'message' => "Product not Found"]);
        }


    }

    public function changeStatus($request)
    {
        $data = Product::find($request->id);

        if ($data) {
            if ($data->status == 'active') {
                $status = 'deactive';
            } else {
                $status = 'active';
            }

            $data->status = $status;

            if ($data->save()) {
                return response()->json(['result' => 'success', 'message' => 'Status Change Successfully.']);
            } else {
                return response()->json(['result' => 'error', 'message' => 'Error in Changing Product Status.']);
            }
        } else {
            return response()->json(['result' => 'error', 'message' => 'Record Not Found.']);
        }
    }

    public function getSubCategory($request)
    {
        $category = Category::find($request->id);

        if ($category) {
            $categories = Category::where('parent_id', $request->id)->get();

            return response()->json(['result' => 'success', 'message' => 'Category Found', 'data' => $categories]);
        } else {
            return response()->json(['result' => 'error', 'message' => 'No Sub-Category Found']);
        }

    }

    public function deleteGallery($id)
    {
        $gallery = ProductGallery::find($id);
        if ($gallery) {
            if (File::exists(public_path($gallery->images))) {
                File::delete(public_path($gallery->images));
            }
            $gallery->delete();
            return response()->json(['result' => 'success', 'message' => 'Gallery image deleted.']);

        } else {
            return response()->json(['result' => 'error', 'message' => 'Record Not Found']);
        }

    }

    public function updateGallery($request)
    {
        $data = Product::find($request->product_id);
        if ($data) {

            if ($request->has('image')) {
                $image = $request->image;
                $ext = $image->getClientOriginalExtension();
                $fileName = $image->getClientOriginalName();
                $fileNameUpload = time() . "-" . $fileName;
                $path = public_path('product/gallery_images/');
                if (!file_exists($path)) {
                    File::makeDirectory($path, 0777, true);
                }
                $galleryImage = ImageUploadHelper::saveImage($image, $fileNameUpload, 'product/gallery_images/');

                ProductGallery::create(['images' => $galleryImage,
                    'product_id' => $request->product_id,
                    'type' => $request->type]);

                return response()->json(['result' => 'success', 'message' => 'Gallery Image Uploaded']);

            } else {
                return response()->json(['result' => 'error', 'message' => 'Image Not Found']);
            }
        } else {
            return response()->json(['result' => 'error', 'message' => 'Record Not Found']);
        }
    }

    public function deleteVariation($id)
    {
        $productVariation = ProductVariation::find($id);
        if ($productVariation) {
            if ($productVariation->delete()) {
                return response()->json(['result' => 'success', 'message' => 'Variation Deleted']);
            } else {
                return response()->json(['result' => 'error', 'message' => 'Product Variation not Deleted']);
            }
        } else {
            return response()->json(['result' => 'error', 'message' => 'Record not Found']);
        }
    }

    public function delete($request)
    {
        $data = Product::find($request->id);

        if ($data) {
            try {
                $data->delete();
            } catch (\Exception $e) {
                return response()->json(['result' => 'error', 'message' => 'Error came:' . $e]);
            }
            return response()->json(['result' => 'success', 'message' => 'Product Deleted']);
        } else {
            return response()->json(['result' => 'error', 'message' => 'Record not Found']);
        }
    }

    public function orderList()
    {
        $data = Order::orderBy('id','desc')->get();

        return view('admin.product.order_list',compact('data'));
    }

}
