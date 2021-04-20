<?php


namespace App\Services\Admin;


use App\Customer;
use App\Helpers\ImageUploadHelper;
use App\Portfolio;
use Illuminate\Support\Facades\DB;
use File;

class PortfolioService
{
    public function index()
    {
        $data = Portfolio::all();
        return view('admin.portfolio.listing', compact('data'));
    }

    public function create()
    {
        return view('admin.portfolio.create');
    }

    public function save($request)
    {
        DB::beginTransaction();
        try {
            if($request->has('image')) {
                $image = $request->image;
                $ext = $image->getClientOriginalExtension();
                $fileName = $image->getClientOriginalName();
                $fileNameUpload = time() . "-" . $fileName;
                $path = public_path('portfolio/images/');
                if (!file_exists($path)) {
                    File::makeDirectory($path, 0777, true);
                }

                $imageSave = ImageUploadHelper::saveImage($image, $fileNameUpload, 'portfolio/images/');
                $save_image = $imageSave;
            }
            Portfolio::create(['image' => $save_image,
                'type_english'=>$request->type_english,'type_french'=>$request->type_french,
                'type_russia'=>$request->type_russia]);

            DB::commit();
            return response()->json(['result' => 'success', 'message' => 'Record Save']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['result' => 'error', 'message' => 'Error in saving record']);
        }

    }

    public function edit($id)
    {
        $data = Portfolio::find($id);

        if ($data) {
            return view('admin.portfolio.edit', compact('data'));
        } else {
            return redirect()->back()->with('error', 'Record Not Found');
        }
    }

    public function update($request)
    {
        $data = Portfolio::find($request->id);
        if ($data) {
            DB::beginTransaction();
            try {
                if($request->has('image')) {
                    $image = $request->image;
                    $ext = $image->getClientOriginalExtension();
                    $fileName = $image->getClientOriginalName();
                    $fileNameUpload = time() . "-" . $fileName;
                    $path = public_path('portfolio/images/');
                    if (!file_exists($path)) {
                        File::makeDirectory($path, 0777, true);
                    }

                    $imageSave = ImageUploadHelper::saveImage($image, $fileNameUpload, 'portfolio/images/');
                    $save_image = $imageSave;
                    $data->image = $save_image;
                }
                $data->type_english = $request->type_english;
                $data->type_french = $request->type_french;
                $data->type_russia = $request->type_russia;

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
        $data = Portfolio::find($request->id);

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
