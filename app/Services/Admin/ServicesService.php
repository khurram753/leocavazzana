<?php


namespace App\Services\Admin;


use App\Customer;
use App\Helpers\ImageUploadHelper;
use App\Portfolio;
use App\Service;
use App\ServiceImage;
use Illuminate\Support\Facades\DB;
use File;

class ServicesService
{
    public function index()
    {
        $data = Service::all();
        return view('admin.service.listing', compact('data'));
    }

    public function create()
    {
        return view('admin.service.create');
    }

    public function save($request)
    {
        DB::beginTransaction();
        try {
            $serviceSave = Service::create([
                'title_english'=>$request->title_english,'title_french'=>$request->title_french,
                'title_russia'=>$request->title_russia,
                'description_english'=>$request->description_english,'description_french'=>$request->description_french,
                'description_russia'=>$request->description_russia,

            ]);


        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['result' => 'error', 'message' => 'Error in saving record']);
        }

        try{
            $imageSave = array();
            if (isset($request->new_gallery) && sizeof($request->new_gallery) > 0) {
                foreach ($request->new_gallery as $gallery_image) {

                    $image = $gallery_image;
                    $ext = $image->getClientOriginalExtension();
                    $fileName = $image->getClientOriginalName();
                    $fileNameUpload = time() . "-" . $fileName;
                    $path = public_path('service_image/images/');
                    if (!file_exists($path)) {
                        File::makeDirectory($path, 0777, true);
                    }
                    $imageSave[] = ImageUploadHelper::saveImage($image, $fileNameUpload, 'service_image/images/');
                }

                foreach($imageSave as $image)
                {
                    $saveImage = ServiceImage::create(['service_id'=>$serviceSave->id,'image'=>$image]);
                }

            }
        }
        catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['result' => 'error', 'message' => 'Error in Saving Gallery Image: '.$e]);
        }


        DB::commit();
        return response()->json(['result' => 'success', 'message' => 'Record Save']);
    }

    public function edit($id)
    {
        $data = Service::find($id);

        if ($data) {
            return view('admin.service.edit', compact('data'));
        } else {
            return redirect()->back()->with('error', 'Record Not Found');
        }
    }

    public function update($request)
    {
        $data = Service::find($request->id);
        if ($data) {
            DB::beginTransaction();
            try {

                $data->title_english = $request->title_english;
                $data->title_french = $request->title_french;
                $data->title_russia = $request->title_russia;

                $data->description_english = $request->description_english;
                $data->description_french = $request->description_french;
                $data->description_russia = $request->description_russia;

                $data->save();

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
        $data = Service::find($request->id);

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


    public function saveGallery($request)
    {
        if ($request->has('image')) {
            $image = $request->image;
            $ext = $image->getClientOriginalExtension();
            $fileName = $image->getClientOriginalName();
            $fileNameUpload = time() . "-" . $fileName;
            $path = public_path('service/images/');
            if (!file_exists($path)) {
                File::makeDirectory($path, 0777, true);
            }

            $imageSave = ImageUploadHelper::saveImage($image, $fileNameUpload, 'service/images/');
            $save_image = $imageSave;
        }

        DB::beginTransaction();

        try{
            $save = ServiceImage::create(['service_id'=>$request->project_id,'image'=>$save_image]);
        }
        catch (Exception $e)
        {
            DB::rollBack();
            return response()->json(['result'=>'error','message'=>'Error in Saving Image: '.$e]);
        }

        DB::commit();
        return response()->json(['result'=>'success','message'=>'Image Saved','data'=>$save]);


    }

    public function deleteGallery($request)
    {
        $data = ServiceImage::find($request->id);
        if($data)
        {
            DB::beginTransaction();
            try{
                $data->delete();
            }
            catch(Exception $e)
            {
                DB::rollBack();
                return response()->json(['result'=>'error','message'=>'Error In Delete Image: '.$e]);
            }
            DB::commit();
            return response()->json(['result'=>'success','message'=>'Image Deleted']);
        }
        else{
            return response()->json(['result'=>'error','message'=>'Record Not Found']);
        }
    }
}
