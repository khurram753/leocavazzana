<?php


namespace App\Services\Admin;


use App\Customer;
use App\Helpers\ImageUploadHelper;
use App\Portfolio;
use App\Service;
use App\ServiceImage;
use App\Situation;
use App\SituationImage;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use File;

class SituationService
{
    public function index()
    {
        $data = Situation::all();
        return view('admin.situation.listing', compact('data'));
    }

    public function create()
    {
        return view('admin.situation.create');
    }

    public function save($request)
    {
        DB::beginTransaction();

        try {
            $save_image = null;
            if($request->has('featured_image')) {
                $image = $request->featured_image;
                $ext = $image->getClientOriginalExtension();
                $fileName = $image->getClientOriginalName();
                $fileNameUpload = time() . "-" . $fileName;
                $path = public_path('situation_image/images/');
                if (!file_exists($path)) {
                    File::makeDirectory($path, 0777, true);
                }

                $imageSave = ImageUploadHelper::saveImage($image, $fileNameUpload, 'situation_image/images/');
                $save_image = $imageSave;
            }


            $serviceSave = Situation::create([
                'title_english'=>$request->title_english,'title_french'=>$request->title_french,
                'title_russia'=>$request->title_russia,
                'description_english'=>$request->description_english,'description_french'=>$request->description_french,
                'description_russia'=>$request->description_russia,
                'tag_line_english'=>$request->tag_line_english,'tag_line_french'=>$request->tag_line_french,
                'tag_line_russia'=>$request->tag_line_russia,
                'featured_image' => $save_image,
                'date'=>Carbon::parse($request->date)->format('Y-m-d')
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
                    $path = public_path('situation_image/images/');
                    if (!file_exists($path)) {
                        File::makeDirectory($path, 0777, true);
                    }
                    $imageSave[] = ImageUploadHelper::saveImage($image, $fileNameUpload, 'situation_image/images/');
                }

                foreach($imageSave as $image)
                {
                    $saveImage = SituationImage::create(['situation_id'=>$serviceSave->id,'image'=>$image]);
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
        $data = Situation::find($id);

        if ($data) {
            return view('admin.situation.edit', compact('data'));
        } else {
            return redirect()->back()->with('error', 'Record Not Found');
        }
    }

    public function update($request)
    {
        $data = Situation::find($request->id);
        if ($data) {
            DB::beginTransaction();
            try {

                if($request->has('featured_image')) {
                    $image = $request->featured_image;
                    $ext = $image->getClientOriginalExtension();
                    $fileName = $image->getClientOriginalName();
                    $fileNameUpload = time() . "-" . $fileName;
                    $path = public_path('situation_image/images/');
                    if (!file_exists($path)) {
                        File::makeDirectory($path, 0777, true);
                    }

                    $imageSave = ImageUploadHelper::saveImage($image, $fileNameUpload, 'situation_image/images/');
                    $save_image = $imageSave;
                    $data->featured_image = $save_image;
                }

                $data->title_english = $request->title_english;
                $data->title_french = $request->title_french;
                $data->title_russia = $request->title_russia;

                $data->description_english = $request->description_english;
                $data->description_french = $request->description_french;
                $data->description_russia = $request->description_russia;

                $data->tag_line_english = $request->tag_line_english;
                $data->tag_line_french = $request->tag_line_french;
                $data->tag_line_russia = $request->tag_line_russia;

                $data->date = Carbon::parse($request->date)->format('Y-m-d');



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
        $data = Situation::find($request->id);

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
            $path = public_path('situation_image/images/');
            if (!file_exists($path)) {
                File::makeDirectory($path, 0777, true);
            }

            $imageSave = ImageUploadHelper::saveImage($image, $fileNameUpload, 'situation_image/images/');
            $save_image = $imageSave;
        }

        DB::beginTransaction();

        try{
            $save = SituationImage::create(['situation_id'=>$request->project_id,
                'image'=>$save_image]);
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
        $data = SituationImage::find($request->id);
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
