<?php

/**
 * Created by PhpStorm.
 * User: mkhur
 * Date: 3/31/2020
 * Time: 4:14 PM
 */

namespace App\Services\Admin;


use App\Size;
use Illuminate\Support\Facades\Auth;

class SizeService
{

    public function index()
    {
        $data = Size::with('user')->orderBy('id','desc')->get();
        return view('admin.size.listing',compact('data'));
    }

    public function save($request)
    {
        if(Size::create($request->except('_token')
                +['created_by'=>Auth::user()->id]
            ))
        {
            return response()->json(['result'=>'success','message'=>'Size Save Successfully.']);
        }
        else{
            return response()->json(['result'=>'error','message'=>'Error in Saving Size.']);
        }
    }

    public function create()
    {
        $sizes = Size::all();
        return view('admin.size.create',compact('sizes'));
    }

    public function update($request)
    {
        $data = Size::find($request->id);

        if($data)
        {
            $data = $data->update($request->except('_token'));

            if($data)
            {
                return response()->json(['result'=>'success','message'=>'Size Updated Successfully.']);
            }
            else{
                return response()->json(['result'=>'error','message'=>'Error in Updating Size.']);
            }

        }
        else{
            return response()->json(['result'=>'error','message'=>'Record Not Found.']);
        }
    }

    public function edit($id)
    {
        $data = Size::find($id);
        if($data)
        {
//            $categories = Brand::where('id','!=',$data->id)->get();

            return view('admin.size.edit',compact('data'));
        }
        else{
            return redirect()->back()->with('error','Record Not Found.');
        }

    }

    public function delete($request)
    {
        $data = Size::find($request->id);

        if($data)
        {
            if($data->delete())
            {
                return response()->json(['result'=>'success','message'=>'Size Delete Successfully.']);
            }
            else{
                return response()->json(['result'=>'error','message'=>'Error in Deleting Size.']);
            }
        }
        else{
            return response()->json(['result'=>'error','message'=>'Record Not Found.']);
        }
    }

    public function changeStatus($request)
    {
        $data = Size::find($request->id);

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
                return response()->json(['result'=>'error','message'=>'Error in Changing Size Status.']);
            }
        }
        else{
            return response()->json(['result'=>'error','message'=>'Record Not Found.']);
        }
    }
}
