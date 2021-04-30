<?php


namespace App\Services\Site;


use App\AboutUs;
use App\ContactUs;
use App\Helpers\ImageUploadHelper;
use App\HomePage;
use App\Notifications\ContactUsNotification;
use File;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;


class ContactUsService
{
    public function index()
    {
        $data = HomePage::first();
        return view('site.contact.contact', compact('data'));
    }


    public function sendEmail($request)
    {

        DB::beginTransaction();
        $contactUs = array('name' => $request->name, 'email' => $request->email,
            'company' => $request->company,
            'phone' => $request->telephone,
            'message' => $request->message);

        try{
            ContactUs::create($request->except('_token','message')+['description'=>$request->message]);
        }
        catch (\Exception $exception)
        {
            DB::rollBack();
            return response()->json(['result' => 'error', 'message' => 'Unable to save record.' . $exception]);
        }

        try {
            Notification::route('mail', env('MAIL_CLIENT'))->notify(new ContactUsNotification($contactUs));

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['result' => 'error', 'message' => 'Unable to send email.' . $e]);
        }

        DB::commit();
        return response()->json(['result' => 'success', 'message' => 'Email send to admin. Admin will get back to you']);

    }


}
