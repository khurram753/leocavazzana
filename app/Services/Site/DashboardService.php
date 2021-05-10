<?php


namespace App\Services\Site;


use App\File;
use App\Request;
use Illuminate\Support\Facades\Auth;

class DashboardService
{
    public function createRequest($request)
    {
        $filePath = null;
        if($request->has('document'))
        {
            $fileName = time().'.'.$request->document->extension();

            $request->document->move(public_path('front_site/document/'), $fileName);

            $filePath = 'front_site/document/'.$fileName;
        }

        try{
            Request::create(['message'=>$request->message,
                'document'=>$filePath,'lendor_id'=>Auth::user()->id]);

            return response()->json(['result'=>'success','message'=>'Request Generated and Send to Admin']);

        }
        catch (Exception $e)
        {
            return response()->json(['result'=>'error','message'=>'Error came in uploading the document']);
        }

    }

    public function fileSection()
    {
        $data = File::all();

        return view('user.file.listing',compact('data'));
    }
}
