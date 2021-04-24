<?php


namespace App\Services\Site;


use App\AboutUs;
use App\Customer;
use App\HomePage;
use App\Portfolio;
use App\Project;

class PortfolioService
{

    public function index()
    {
        $data = HomePage::first();
        $portfolios = Portfolio::all();

        return view('site.portfolio.portfolio',compact('data','portfolios'));
    }

    public function projectList($id)
    {
        $data = HomePage::first();
        $portfolio = Portfolio::find($id);

        $projects = array();
        if($portfolio)
        {
            $projects = $portfolio->project;
        }

        return view('site.portfolio.porfolio_projects',compact('data','projects','portfolio'));

    }

    public function projectDetail($id)
    {
        $data = HomePage::first();

        $project = Project::find($id);

        if($project)
        {
            return view('site.portfolio.portfolio_project_detail',compact('data','project'));

        }
        else{
            return redirect()->back()->with('error','Record Not Found');
        }
    }
}
