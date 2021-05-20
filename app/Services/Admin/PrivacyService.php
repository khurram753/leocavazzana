<?php


namespace App\Services\Admin;


use App\AboutUs;
use App\Disclaimer;
use App\Helpers\ImageUploadHelper;
use App\HomePage;
use App\PrivacyPolicy;
use File;


class PrivacyService
{
    public function index()
    {
        $data = PrivacyPolicy::first();
        return view('admin.privacy.privacy', compact('data'));
    }

    public function save($request)
    {
        $aboutUs = PrivacyPolicy::find($request->id);

        if ($aboutUs) {

            if ($request->has('image')) {
                $image = $request->image;
                $ext = $image->getClientOriginalExtension();
                $fileName = $image->getClientOriginalName();
                $fileNameUpload = time() . "-" . $fileName;
                $path = public_path('privacy/images/');
                if (!file_exists($path)) {
                    File::makeDirectory($path, 0777, true);
                }

                $imageSave = ImageUploadHelper::saveImage($image, $fileNameUpload, 'privacy/images/');
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
