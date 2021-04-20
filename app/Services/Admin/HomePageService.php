<?php


namespace App\Services\Admin;


use App\Helpers\ImageUploadHelper;
use App\HomePage;
use File;


class HomePageService
{
    public function index()
    {
        $data = HomePage::first();
        return view('admin.home.home', compact('data'));
    }

    public function saveHomeContent($request)
    {
        $homepage = HomePage::find($request->id);

        if ($homepage) {

            if ($request->has('image_1')) {
                $image = $request->image_1;
                $ext = $image->getClientOriginalExtension();
                $fileName = $image->getClientOriginalName();
                $fileNameUpload = time() . "-" . $fileName;
                $path = public_path('home_page/images/');
                if (!file_exists($path)) {
                    File::makeDirectory($path, 0777, true);
                }

                $imageSave = ImageUploadHelper::saveImage($image, $fileNameUpload, 'home_page/images/');
                $save_image = $imageSave;

                $homepage->image_1 = $save_image;
            }


            if ($request->has('image_2')) {
                $image = $request->image_2;
                $ext = $image->getClientOriginalExtension();
                $fileName = $image->getClientOriginalName();
                $fileNameUpload = time() . "-" . $fileName;
                $path = public_path('home_page/images/');
                if (!file_exists($path)) {
                    File::makeDirectory($path, 0777, true);
                }

                $imageSave = ImageUploadHelper::saveImage($image, $fileNameUpload, 'home_page/images/');
                $save_image = $imageSave;

                $homepage->image_2 = $save_image;
            }

            if ($request->has('image_3')) {
                $image = $request->image_3;
                $ext = $image->getClientOriginalExtension();
                $fileName = $image->getClientOriginalName();
                $fileNameUpload = time() . "-" . $fileName;
                $path = public_path('home_page/images/');
                if (!file_exists($path)) {
                    File::makeDirectory($path, 0777, true);
                }

                $imageSave = ImageUploadHelper::saveImage($image, $fileNameUpload, 'home_page/images/');
                $save_image = $imageSave;

                $homepage->image_3 = $save_image;
            }

            if ($request->has('image_4')) {
                $image = $request->image_4;
                $ext = $image->getClientOriginalExtension();
                $fileName = $image->getClientOriginalName();
                $fileNameUpload = time() . "-" . $fileName;
                $path = public_path('home_page/images/');
                if (!file_exists($path)) {
                    File::makeDirectory($path, 0777, true);
                }

                $imageSave = ImageUploadHelper::saveImage($image, $fileNameUpload, 'home_page/images/');
                $save_image = $imageSave;

                $homepage->image_4 = $save_image;
            }

            if ($request->has('image_5')) {
                $image = $request->image_5;
                $ext = $image->getClientOriginalExtension();
                $fileName = $image->getClientOriginalName();
                $fileNameUpload = time() . "-" . $fileName;
                $path = public_path('home_page/images/');
                if (!file_exists($path)) {
                    File::makeDirectory($path, 0777, true);
                }

                $imageSave = ImageUploadHelper::saveImage($image, $fileNameUpload, 'home_page/images/');
                $save_image = $imageSave;

                $homepage->image_5 = $save_image;
            }

            if ($request->has('image_6')) {
                $image = $request->image_6;
                $ext = $image->getClientOriginalExtension();
                $fileName = $image->getClientOriginalName();
                $fileNameUpload = time() . "-" . $fileName;
                $path = public_path('home_page/images/');
                if (!file_exists($path)) {
                    File::makeDirectory($path, 0777, true);
                }

                $imageSave = ImageUploadHelper::saveImage($image, $fileNameUpload, 'home_page/images/');
                $save_image = $imageSave;

                $homepage->image_6 = $save_image;
            }


            $homepage->email = $request->email;
            $homepage->phone_number = $request->phone_number;
            $homepage->description_english = $request->description_english;
            $homepage->description_russia = $request->description_russia;
            $homepage->description_french = $request->description_french;

            $homepage->save();
            return response()->json(['result' => 'success', 'message' => 'Record Save Successfully']);
        } else {
            return response()->json(['result' => 'error', 'message' => 'Record Not Found']);
        }

    }


    public function deleteImages($request)
    {
        $homepage = HomePage::find($request->id);
        if ($homepage) {
            $type = explode(' ', $request->type);
            HomePage::where('id', $request->id)->update([$type[1] => null]);

            return response()->json(['result' => 'success', 'message' => 'Image Deleted Successfully']);
        } else {
            return response()->json(['result' => 'error', 'message' => 'Record Not Found']);
        }
    }
}
