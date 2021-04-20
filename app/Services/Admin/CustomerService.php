<?php


namespace App\Services\Admin;


use App\Customer;
use App\Helpers\ImageUploadHelper;
use Illuminate\Support\Facades\DB;
use File;

class CustomerService
{
    public function index()
    {
        $data = Customer::all();
        return view('admin.customer.listing', compact('data'));
    }

    public function create()
    {
        return view('admin.customer.create');
    }

    public function save($request)
    {
        DB::beginTransaction();
        try {
            $image = $request->image;
            $ext = $image->getClientOriginalExtension();
            $fileName = $image->getClientOriginalName();
            $fileNameUpload = time() . "-" . $fileName;
            $path = public_path('customer/images/');
            if (!file_exists($path)) {
                File::makeDirectory($path, 0777, true);
            }

            $imageSave = ImageUploadHelper::saveImage($image, $fileNameUpload, 'customer/images/');
            $save_image = $imageSave;

            Customer::create(['image' => $save_image]);

            DB::commit();
            return response()->json(['result' => 'success', 'message' => 'Record Save']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['result' => 'error', 'message' => 'Error in saving record']);
        }

    }

    public function edit($id)
    {
        $data = Customer::find($id);

        if ($data) {
            return view('admin.customer.edit', compact('data'));
        } else {
            return redirect()->back()->with('error', 'Record Not Found');
        }
    }

    public function update($request)
    {
        $data = Customer::find($request->id);
        if ($data) {
            DB::beginTransaction();
            try {
                $image = $request->image;
                $ext = $image->getClientOriginalExtension();
                $fileName = $image->getClientOriginalName();
                $fileNameUpload = time() . "-" . $fileName;
                $path = public_path('customer/images/');
                if (!file_exists($path)) {
                    File::makeDirectory($path, 0777, true);
                }

                $imageSave = ImageUploadHelper::saveImage($image, $fileNameUpload, 'customer/images/');
                $save_image = $imageSave;

                $data->update(['image' => $save_image]);

                DB::commit();
                return response()->json(['result' => 'success', 'message' => 'Record Update']);
            } catch (\Exception $e) {
                DB::rollBack();
                return response()->json(['result' => 'error', 'message' => 'Error in update record: ' . $e]);
            }
        } else {
            return response()->json(['result' => 'error', 'message' => 'Record Not Found']);
        }
    }

    public function delete($request)
    {
        $data = Customer::find($request->id);

        if ($data) {
            DB::beginTransaction();

            try {
                $data->delete();
                DB::commit();
                return response()->json(['result' => 'success', 'message' => 'Record Delete']);
            } catch (\Exception $e) {
                DB::commit();
                return response()->json(['result' => 'error', 'message' => 'Error in Record Delete: '.$e]);
            }
        } else {
            return response()->json(['result' => 'error', 'message' => 'Record Not Found']);

        }
    }
}
