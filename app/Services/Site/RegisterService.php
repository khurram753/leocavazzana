<?php


namespace App\Services\Site;


use App\HomePage;
use App\Role;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class RegisterService
{
    public function registerPage()
    {
        $data = HomePage::first();

        return view('site.login.register', compact('data'));
    }

    public function register($request,$type)
    {
        DB::beginTransaction();
        try{
            User::create($request->except('_token','type','password_confirmation','policyCheck',
                    'termsCheck','password')+['role_id'=>Role::where('name',$type)->first()->id,
                    'password'=>Hash::make($request->password)
                ]);
        }
        catch(Exception $e)
        {
            DB::rollBack();
            return response()->json(['result'=>'error','message'=>'Error Create in Saving Record']);
        }

        DB::commit();
        $credentials = $request->only('email', 'password');

        if ($request->remember_me) {
            $remember = true;
            if (Auth::attempt($credentials, $remember)) {
                //save user status
                $url = '';
//                $url = route('userDashboard');
                $message = 'Registration Successful';

                return response()->json(['result' => 'success', 'message' => $message,
                    'url' => $url
                ], 200);


            } else {
                return response()->json(['result' => 'error', 'message' => 'Invalid Credentials'], 200);
            }
        } else {
            if (Auth::attempt($credentials)) {


                $url = '';
//                $url = route('userDashboard');
                $message = 'Registration Successful.';

                return response()->json(['result' => 'success', 'message' => $message,
                    'url' => $url
                ], 200);


            } else {
                return response()->json(['result' => 'error', 'message' => 'Invalid Credentials'], 200);
            }
        }


    }

}
