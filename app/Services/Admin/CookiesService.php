<?php


namespace App\Services\Admin;

use App\Cookie;
use Illuminate\Support\Facades\DB;

class CookiesService
{
    public function index()
    {
        $data = Cookie::first();
        return view('admin.cookies.create', compact('data'));
    }

    public function update($request)
    {
        DB::beginTransaction();
        $data = Cookie::find($request->id);
        if ($data) {
            try {
                $data->update(['description_english' => $request->description_english,
                    'description_french' => $request->description_french,
                    'description_russia' => $request->description_russia]);

                DB::commit();
                return response()->json(['result' => 'success', 'message' => 'Record Update']);
            } catch (Exception $e) {
                DB::rollBack();
                return response()->json(['result' => 'error', 'message' => 'Error in Update Data' . $e]);
            }
        } else {
            return response()->json(['result' => 'error', 'message' => 'Record Not Found']);
        }
    }


}
