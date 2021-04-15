<?php


namespace App\Helpers;


use Illuminate\Support\Facades\Input;
use Image;

class ImageUploadHelper
{

    public static function saveImage($image,$fileNameUpload,$path)
    {
        Image::make($image)->save($path . $fileNameUpload);

        return $path.$fileNameUpload;
    }

}
