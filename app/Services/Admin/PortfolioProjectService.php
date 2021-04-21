<?php


namespace App\Services\Admin;


use App\Customer;
use App\Helpers\ImageUploadHelper;
use App\Portfolio;
use App\Project;
use App\ProjectImage;
use Carbon\Carbon;
use Carbon\Exceptions\Exception;
use Illuminate\Support\Facades\DB;
use File;

class PortfolioProjectService
{
    public function index()
    {
        $data = Project::all();
        return view('admin.portfolio_project.listing', compact('data'));
    }

    public function create()
    {
        $portfolio = Portfolio::all();
        return view('admin.portfolio_project.create',compact('portfolio'));
    }

    public function save($request)
    {
        DB::beginTransaction();
        try {
            if($request->has('featured_image')) {
                $image = $request->featured_image;
                $ext = $image->getClientOriginalExtension();
                $fileName = $image->getClientOriginalName();
                $fileNameUpload = time() . "-" . $fileName;
                $path = public_path('portfolio_project/images/');
                if (!file_exists($path)) {
                    File::makeDirectory($path, 0777, true);
                }

                $imageSave = ImageUploadHelper::saveImage($image, $fileNameUpload, 'portfolio_project/images/');
                $save_image = $imageSave;
            }

            $projectSave = Project::create(['featured_image' => $save_image,
                'name_english'=>$request->name_english,'name_french'=>$request->name_french,
                'name_russia'=>$request->name_russia,'portfolio_id'=>$request->portfolio_id,
                'description_english' => $request->description_english,
                'description_french' => $request->description_french,
                'description_russia' => $request->description_russia,
                'date' => Carbon::parse($request->date)->format('Y-m-d')

            ]);


        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['result' => 'error', 'message' => 'Error in Saving Record: '.$e]);
        }

        try{
            $imageSave = array();
            if (isset($request->new_gallery) && sizeof($request->new_gallery) > 0) {
                foreach ($request->new_gallery as $gallery_image) {

                    $image = $gallery_image;
                    $ext = $image->getClientOriginalExtension();
                    $fileName = $image->getClientOriginalName();
                    $fileNameUpload = time() . "-" . $fileName;
                    $path = public_path('portfolio_project/images/');
                    if (!file_exists($path)) {
                        File::makeDirectory($path, 0777, true);
                    }
                    $imageSave[] = ImageUploadHelper::saveImage($image, $fileNameUpload, 'portfolio_project/images/');
                }

                foreach($imageSave as $image)
                {
                    $saveImage = ProjectImage::create(['project_id'=>$projectSave->id,'image'=>$image]);
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
        $data = Project::find($id);

        if ($data) {
            $portfolio = Portfolio::all();
            return view('admin.portfolio_project.edit', compact('data','portfolio'));
        } else {
            return redirect()->back()->with('error', 'Record Not Found');
        }
    }

    public function update($request)
    {
        $data = Project::find($request->id);
        if ($data) {
            DB::beginTransaction();
            try {
                if($request->has('featured_image')) {
                    $image = $request->featured_image;
                    $ext = $image->getClientOriginalExtension();
                    $fileName = $image->getClientOriginalName();
                    $fileNameUpload = time() . "-" . $fileName;
                    $path = public_path('portfolio_project/images/');
                    if (!file_exists($path)) {
                        File::makeDirectory($path, 0777, true);
                    }

                    $imageSave = ImageUploadHelper::saveImage($image, $fileNameUpload, 'portfolio_project/images/');
                    $save_image = $imageSave;
                    $data->image = $save_image;
                }
                $data->name_english = $request->name_english;
                $data->name_french = $request->name_french;
                $data->name_russia = $request->name_russia;
                $data->portfolio_id = $request->portfolio_id;
                $data->description_english =  $request->description_english;
                $data->description_french =  $request->description_french;
                $data->description_russia =  $request->description_russia;
                $data->date =  Carbon::parse($request->date)->format('Y-m-d');

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
        $data = Project::find($request->id);

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
            $path = public_path('portfolio_project/images/');
            if (!file_exists($path)) {
                File::makeDirectory($path, 0777, true);
            }

            $imageSave = ImageUploadHelper::saveImage($image, $fileNameUpload, 'portfolio_project/images/');
            $save_image = $imageSave;
        }

        DB::beginTransaction();

        try{
            $save = ProjectImage::create(['project_id'=>$request->project_id,'image'=>$save_image]);
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
        $data = ProjectImage::find($request->id);
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
