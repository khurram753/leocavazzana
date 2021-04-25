<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', function () {
//    return view('site.home.home');
//})->name('home');

Route::namespace("Site")->group(function () {
    Route::get('/','HomeController@index')->name('home');
    Route::get('about-us','AboutController@index')->name('aboutUs');
    Route::get('portfolio-page','PortfolioController@index')->name('portfolio');
    Route::get('projects/{id}','PortfolioController@projectList')->name('portfolioProjectList');
    Route::get('project-detail/{id}','PortfolioController@projectDetail')->name('portfolioProjectDetail');
    Route::get('service-page','ServiceController@index')->name('service');
    Route::get('situation','SituationController@index')->name('situation');
    Route::get('situation-detail/{id}','SituationController@detail')->name('situationDetail');
});

Route::namespace('Admin')->group(function () {
    Route::namespace("Authentication")->group(function () {
        Route::middleware('guest')->group(function () {
            Route::get('login', 'LoginController@loginPage')->name('loginPage');
            Route::post('login', 'LoginController@login')->name('loginUser');

            Route::get('/forget-password', 'ForgetPasswordController@forgetPasswordForm')->name('forgetPasswordForm');
            Route::post('/forget-password', 'ForgetPasswordController@forgetPassword')->name('forgetPassword');

            Route::get('reset/password/{token}', 'ForgetPasswordController@resetPassword')->name('resetPassword');
            Route::post('change-password', 'ForgetPasswordController@changePassword')->name('changePassword');

        });


        Route::middleware(['Admin', 'auth'])->group(function () {
            Route::get('/logout', "LogoutController@logout")->name('logoutUser');

        });
    });



    Route::middleware(['Admin', 'auth'])->group(function () {
        Route::get('admin-dashboard','DashboardController@index')->name('adminDashboard');

        Route::get('home-page','HomePageController@index')->name('homePage');
        Route::post('home-content-save','HomePageController@saveHomeContent')->name('saveHomePageContent');
        Route::post('home-content-delete','HomePageController@deleteImages')->name('deleteHomePageImage');


        Route::get('customer-listing','CustomerController@index')->name('customerListing');
        Route::get('customer-create','CustomerController@create')->name('customerCreate');
        Route::post('customer-save','CustomerController@save')->name('customerSave');
        Route::get('customer-edit/{id}','CustomerController@edit')->name('customerEdit');
        Route::post('customer-update','CustomerController@update')->name('customerUpdate');
        Route::post('customer-delete','CustomerController@delete')->name('customerDelete');
        Route::get('customer-change-status','CustomerController@changeStatus')->name('customerStatus');

        Route::get('about-us-management','AboutUsController@index')->name('aboutUsManagement');
        Route::post('about-us-save','AboutUsController@save')->name('aboutUsSave');

        Route::get('portfolio-listing','PortfolioController@index')->name('portfolioListing');
        Route::get('portfolio-create','PortfolioController@create')->name('portfolioCreate');
        Route::post('portfolio-save','PortfolioController@save')->name('portfolioSave');
        Route::get('portfolio-edit/{id}','PortfolioController@edit')->name('portfolioEdit');
        Route::post('portfolio-update','PortfolioController@update')->name('portfolioUpdate');
        Route::post('portfolio-delete','PortfolioController@delete')->name('portfolioDelete');
//        Route::get('portfolio-change-status','PortfolioController@changeStatus')->name('portfolioStatus');

        Route::get('portfolio-project-listing','PortfolioProjectController@index')->name('portfolioProjectListing');
        Route::get('portfolio-project-create','PortfolioProjectController@create')->name('portfolioProjectCreate');
        Route::post('portfolio-project-save','PortfolioProjectController@save')->name('portfolioProjectSave');
        Route::get('portfolio-project-edit/{id}','PortfolioProjectController@edit')->name('portfolioProjectEdit');
        Route::post('portfolio-project-update','PortfolioProjectController@update')->name('portfolioProjectUpdate');
        Route::post('portfolio-project-delete','PortfolioProjectController@delete')->name('portfolioProjectDelete');
        Route::post('update-portfolio-project-gallery', 'PortfolioProjectController@saveGallery')->name('update-project-gallery');
        Route::get('delete-portfolio-project-gallery', 'PortfolioProjectController@deleteGallery')->name('delete-project-gallery');

        Route::get('service-listing','ServiceController@index')->name('serviceListing');
        Route::get('service-create','ServiceController@create')->name('serviceCreate');
        Route::post('service-save','ServiceController@save')->name('serviceSave');
        Route::get('service-edit/{id}','ServiceController@edit')->name('serviceEdit');
        Route::post('service-update','ServiceController@update')->name('serviceUpdate');
        Route::post('service-delete','ServiceController@delete')->name('serviceDelete');
        Route::post('update-service-gallery', 'ServiceController@saveGallery')->name('update-service-gallery');
        Route::get('delete-service-gallery', 'ServiceController@deleteGallery')->name('delete-service-gallery');

        Route::get('situation-listing','SituationController@index')->name('situationListing');
        Route::get('situation-create','SituationController@create')->name('situationCreate');
        Route::post('situation-save','SituationController@save')->name('situationSave');
        Route::get('situation-edit/{id}','SituationController@edit')->name('situationEdit');
        Route::post('situation-update','SituationController@update')->name('situationUpdate');
        Route::post('situation-delete','SituationController@delete')->name('situationDelete');
        Route::post('update-situation-gallery', 'SituationController@saveGallery')->name('update-situation-gallery');
        Route::get('delete-situation-gallery', 'SituationController@deleteGallery')->name('delete-situation-gallery');



    });
});
