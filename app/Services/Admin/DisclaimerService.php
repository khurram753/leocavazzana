<?php


namespace App\Services\Admin;


use App\AboutUs;
use App\Disclaimer;
use App\Helpers\ImageUploadHelper;
use App\HomePage;
use File;


class DisclaimerService
{
    public function index()
    {
        $data = Disclaimer::first();
        return view('admin.disclaimer.disclaimer', compact('data'));
    }

    public function save($request)
    {
        $aboutUs = Disclaimer::find($request->id);

        if ($aboutUs) {

            if ($request->has('image')) {
                $image = $request->image;
                $ext = $image->getClientOriginalExtension();
                $fileName = $image->getClientOriginalName();
                $fileNameUpload = time() . "-" . $fileName;
                $path = public_path('disclaimer/images/');
                if (!file_exists($path)) {
                    File::makeDirectory($path, 0777, true);
                }

                $imageSave = ImageUploadHelper::saveImage($image, $fileNameUpload, 'disclaimer/images/');
                $save_image = $imageSave;

                $aboutUs->image = $save_image;
            }

            $aboutUs->description_english = $request->description_english;
            $aboutUs->description_russia = $request->description_russia;
            $aboutUs->description_french = $request->description_french;

            $aboutUs->save();
            return response()->json(['result' => 'success', 'message' => 'Record Save Successfully']);
        } else {
            return response()->json(['result' => 'error', 'message' => 'Record Not Found']);
        }

    }

}
