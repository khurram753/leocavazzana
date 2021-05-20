<?php


namespace App\Services\Admin;


use App\AboutUs;
use App\Helpers\ImageUploadHelper;
use App\HomePage;
use File;


class DisclaimerService
{
    public function index()
    {
        $data = AboutUs::first();
        return view('admin.about.about', compact('data'));
    }

    public function save($request)
    {
        $aboutUs = AboutUs::find($request->id);

        if ($aboutUs) {

            if ($request->has('image')) {
                $image = $request->image;
                $ext = $image->getClientOriginalExtension();
                $fileName = $image->getClientOriginalName();
                $fileNameUpload = time() . "-" . $fileName;
                $path = public_path('about_us/images/');
                if (!file_exists($path)) {
                    File::makeDirectory($path, 0777, true);
                }

                $imageSave = ImageUploadHelper::saveImage($image, $fileNameUpload, 'about_us/images/');
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
