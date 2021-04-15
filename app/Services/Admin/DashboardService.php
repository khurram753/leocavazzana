<?php


namespace App\Services\Admin;


use App\News;
use App\Project;
use App\UserDetail;

class DashboardService
{
    public function index()
    {
        $projectCount = Project::count();
        $blogCount = News::count();
        return view('admin.dashboard.dashboard',compact('projectCount','blogCount'));
    }
}
