<?php

/**
 * Created by PhpStorm.
 * User: mkhur
 * Date: 3/31/2020
 * Time: 4:14 PM
 */

namespace App\Services\Admin;


use App\Color;
use App\File;
use Illuminate\Support\Facades\Auth;

class FileService
{

    public function index()
    {
        $data = File::orderBy('id','desc')->get();
        return view('admin.file.listing',compact('data'));
    }

    public function save($request)
    {
        $fileName = time().'.'.$request->document->extension();

        $request->document->move(public_path('front_site/document/'), $fileName);

        $filePath = 'front_site/document/'.$fileName;

        if(File::create(['document'=>$filePath]))
        {
            return response()->json(['result'=>'success','message'=>'File Save Successfully.']);
        }
        else{
            return response()->json(['result'=>'error','message'=>'Error in Saving File.']);
        }
    }

    public function create()
    {
        return view('admin.file.create');
    }

    public function update($request)
    {
        $data = File::find($request->id);

        if($data)
        {
            $fileName = time().'.'.$request->document->extension();

            $request->document->move(public_path('front_site/document/'), $fileName);

            $filePath = 'front_site/document/'.$fileName;

            $data = $data->update(['document'=>$filePath]);

            if($data)
            {
                return response()->json(['result'=>'success','message'=>'File Updated Successfully.']);
            }
            else{
                return response()->json(['result'=>'error','message'=>'Error in Updating File.']);
            }

        }
        else{
            return response()->json(['result'=>'error','message'=>'Record Not Found.']);
        }
    }

    public function edit($id)
    {
        $data = File::find($id);
        if($data)
        {

            return view('admin.file.edit',compact('data'));
        }
        else{
            return redirect()->back()->with('error','Record Not Found.');
        }

    }

    public function delete($request)
    {
        $data = File::find($request->id);

        if($data)
        {
            if($data->delete())
            {
                return response()->json(['result'=>'success','message'=>'File Delete Successfully.']);
            }
            else{
                return response()->json(['result'=>'error','message'=>'Error in Deleting File.']);
            }
        }
        else{
            return response()->json(['result'=>'error','message'=>'Record Not Found.']);
        }
    }

//    public function changeStatus($request)
//    {
//        $data = Color::find($request->id);
//
//        if($data)
//        {
//            if($data->status == '1')
//            {
//                $status = '0';
//            }
//            else{
//                $status = '1';
//            }
//
//            $data->status = $status;
//
//            if($data->save())
//            {
//                return response()->json(['result'=>'success','message'=>'Status Change Successfully.']);
//            }
//            else{
//                return response()->json(['result'=>'error','message'=>'Error in Changing File Status.']);
//            }
//        }
//        else{
//            return response()->json(['result'=>'error','message'=>'Record Not Found.']);
//        }
//    }
}
