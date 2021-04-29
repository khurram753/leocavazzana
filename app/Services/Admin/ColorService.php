<?php

/**
 * Created by PhpStorm.
 * User: mkhur
 * Date: 3/31/2020
 * Time: 4:14 PM
 */

namespace App\Services\Admin;

//use App\Brand;

use App\Color;
use Illuminate\Support\Facades\Auth;

class ColorService
{

    public function index()
    {
        $data = Color::with('user')->orderBy('id','desc')->get();
        return view('admin.color.listing',compact('data'));
    }

    public function save($request)
    {
        if(Color::create($request->except('_token')
                +['created_by'=>Auth::user()->id]
            ))
        {
            return response()->json(['result'=>'success','message'=>'Color Save Successfully.']);
        }
        else{
            return response()->json(['result'=>'error','message'=>'Error in Saving Color.']);
        }
    }

    public function create()
    {
        $colors = Color::all();
        return view('admin.color.create',compact('colors'));
    }

    public function update($request)
    {
        $data = Color::find($request->id);

        if($data)
        {
            $data = $data->update($request->except('_token'));

            if($data)
            {
                return response()->json(['result'=>'success','message'=>'Color Updated Successfully.']);
            }
            else{
                return response()->json(['result'=>'error','message'=>'Error in Updating Color.']);
            }

        }
        else{
            return response()->json(['result'=>'error','message'=>'Record Not Found.']);
        }
    }

    public function edit($id)
    {
        $data = Color::find($id);
        if($data)
        {
//            $categories = Brand::where('id','!=',$data->id)->get();

            return view('admin.color.edit',compact('data'));
        }
        else{
            return redirect()->back()->with('error','Record Not Found.');
        }

    }

    public function delete($request)
    {
        $data = Color::find($request->id);

        if($data)
        {
            if($data->delete())
            {
                return response()->json(['result'=>'success','message'=>'Color Delete Successfully.']);
            }
            else{
                return response()->json(['result'=>'error','message'=>'Error in Deleting Color.']);
            }
        }
        else{
            return response()->json(['result'=>'error','message'=>'Record Not Found.']);
        }
    }

    public function changeStatus($request)
    {
        $data = Color::find($request->id);

        if($data)
        {
            if($data->status == '1')
            {
                $status = '0';
            }
            else{
                $status = '1';
            }

            $data->status = $status;

            if($data->save())
            {
                return response()->json(['result'=>'success','message'=>'Status Change Successfully.']);
            }
            else{
                return response()->json(['result'=>'error','message'=>'Error in Changing Color Status.']);
            }
        }
        else{
            return response()->json(['result'=>'error','message'=>'Record Not Found.']);
        }
    }
}
