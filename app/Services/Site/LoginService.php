<?php


namespace App\Services\Site;


use App\HomePage;
use App\Role;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class LoginService
{
    public function loginPage()
    {
        $data = HomePage::first();

        return view('site.login.login', compact('data'));
    }

    public function postLogin($request,$type)
    {
        $findUser = User::where('email',$request->email)->where('role_id',Role::where('name',$type)->first()->id)->first();
        if($findUser) {
            $credentials = $request->only('email', 'password');

            if ($request->remember_me) {
                $remember = true;
                if (Auth::attempt($credentials, $remember)) {
                    //save user status
                    $url = '';
//                $url = route('userDashboard');
                    $message = 'Login Successful';


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
                    $message = 'Login Successful.';

                    return response()->json(['result' => 'success', 'message' => $message,
                        'url' => $url
                    ], 200);


                } else {
                    return response()->json(['result' => 'error', 'message' => 'Invalid Credentials'], 200);
                }
            }
        }
        else{
            return response()->json(['result' => 'error', 'message' => 'Invalid Login Type'], 200);
        }

    }


    public function forgetPasswordForm()
    {
        return view('authentication.forget_password');
    }

    public function forgetPassword($request)
    {

        $user = User::where('email', $request->email)->first();

        if ($user) {
            $confirmation_code = Str::random(30);
            PasswordReset::insert(['email' => $request->email,
                'token' => $confirmation_code]);

            $user->adminSendPasswordResetNotification($confirmation_code);
            return response()->json(['result' => 'success', 'message' => 'We just emailed a link to reset your password'], 200);

        } else {
            return response()->json(['result' => 'error', 'message' => 'Email doest not exist!'], 200);
        }

    }

    public function resetPassword($token)
    {
        $data = PasswordReset::where('token', '=', $token)->first();

        if ($data) {
            PasswordReset::where('token', '=', $token)->delete();
            PasswordReset::where('email', '=', $data->email)->delete();

//            return redirect()->route('home')
//                ->with(['openUpdatePasswordForm' => 'updatePasswordModal', 'email' => $data->email]);
            return view('authentication.update_password',compact('data'));
        } else {
            return redirect()->route('userLogin')
                ->with(['error' => 'Your token has been expired. Please request again']);
        }

    }

    public function changePassword($request)
    {
        $user = User::where('email', '=', $request->email)->first();

        if ($user) {
            $user->password = Hash::make($request->password);
            $user->save();
            return response()->json(['result' => 'success', 'message' => 'Password successfully changed'], 200);
        } else {
            return response()->json(['result' => 'error', 'message' => 'Email is not found in database'], 200);
        }
    }

}
