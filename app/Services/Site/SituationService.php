<?php


namespace App\Services\Site;


use App\HomePage;
use App\Situation;

class SituationService
{
    public function index()
    {
        $data = HomePage::first();
        $situations = Situation::all();

        return view('site.situation.situation',compact('data','situations'));
    }

    public function detail($id)
    {
        $data = HomePage::first();
        $situation = Situation::find($id);

        if($situation)
        {
            return view('site.situation.situation_detail',compact('data','situation'));

        }
        else{
            return redirect()->back()->with('error','Record Not Found');
        }
    }
}
