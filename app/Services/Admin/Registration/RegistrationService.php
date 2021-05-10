<?php


namespace App\Services\Admin\Registration;


use App\Http\Requests\LoginRequest;
use App\Notifications\ForgetPassword;
use App\Notifications\RegisterNotification;
use App\PasswordReset;
use App\Role;
use App\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;

class RegistrationService
{

    public function loginPage()
    {
        return view('authentication.login');

    }

    public function login($request)
    {

        $credentials = $request->only('email', 'password');

        if ($request->remember_me) {
            $remember = true;
            if (Auth::attempt($credentials, $remember)) {
                //save user status
                $url = '';
                if (Auth::user()->role->name == 'Admin') {
                    $url = route('adminDashboard');
                    $message = 'Login Successful';
                }
                else if (Auth::user()->role->name == 'User') {
                    $url = route('userDashboard');
                    $message = 'Login Successful.';
                }
                else if (Auth::user()->role->name == 'SuperAdmin') {
//                    $url = route('userProfile');
                    $message = 'Login Successful.';
                }

                return response()->json(['result' => 'success', 'message' => $message,
                    'data' => Auth::user()->role_id, 'url' => $url
                ], 200);


            }
            else {
                return response()->json(['result' => 'error', 'message' => 'Invalid Credentials'], 200);
            }
        }
        else {
            if (Auth::attempt($credentials)) {
                $url = '';
                if (Auth::user()->role->name == 'Admin') {
                    $url = route('adminDashboard');
                    $message = 'Login Successful';
                } else if (Auth::user()->role->name == 'User') {
                    $url = route('userDashboard');
                    $message = 'Login Successful.';
                }
                else if (Auth::user()->role->name == 'SuperAdmin') {
//                    $url = route('userProfile');
                    $message = 'Login Successful.';
                }

                return response()->json(['result' => 'success', 'message' => $message,
                    'data' => Auth::user()->role_id, 'url' => $url
                ], 200);


            } else {
                return response()->json(['result' => 'error', 'message' => 'Invalid Credentials'], 200);
            }
        }

    }

    public function registerPage()
    {
        return view('authentication.registeration');

    }

    public function register($request)
    {
        DB::beginTransaction();

        try {
//            $user = User::create($request->except('_token', 'password', 'password_confirmation') +
//                ['password' => Hash::make($request->password),
//                    'join_date' => Carbon::now()->format('Y-m-d'),
//                    'role_id' => 2]);

            $user = new User();

            $user->email = $request->email;
            $user->name = $request->name;
            $user->role_id = Role::where('name','Admin')->first()->id;
            $user->password = Hash::make($request->password);

            $user->save();

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['result' => 'error', 'message' => 'Unable to save record.' . $e]);
        }

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {

//            try {
//                Notification::route('mail', env('MAIL_CLIENT'))->notify(new RegisterNotification($user));
//
//            } catch (\Exception $e) {
//                DB::rollBack();
//                return response()->json(['result' => 'error', 'message' => 'Unable to send email.' . $e]);
//            }

            DB::commit();
            return response()->json(['result' => 'success',
                'message' => 'User Registered Successfully.'], 200);

        } else {
            DB::rollBack();
            return response()->json(['result' => 'error', 'message' => 'Some Error Occur.'], 200);
        }

    }

    public function forgetPasswordForm()
    {
        return view('authentication.forget_password');
    }

    public function forgetPassword($request)
    {

        $user = User::where('email', $request->email)->where('role_id',1)->first();

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

    public function logout()
    {
        $url = 'home';
        Auth::logout();
        return redirect()->route($url);
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
            return redirect()->route('loginPage')
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
