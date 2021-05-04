<?php

namespace App\Http\Controllers\Site;

use App\Cookie;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CookieController extends Controller
{
    //
    public function index()
    {
        $data = Cookie::first();

        if (Session::get('language') == 'english') {
            return response()->json(['result' => 'success', 'data' => $data->description_english]);

        } elseif (Session::get('language') == 'french') {
            return response()->json(['result' => 'success', 'data' => $data->description_french]);

        } elseif (Session::get('language') == 'russia') {
            return response()->json(['result' => 'success', 'data' => $data->description_russia]);

        } else {
            return response()->json(['result' => 'success', 'data' => $data->description_english]);

        }

    }
}
