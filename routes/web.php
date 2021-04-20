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

        Route::get('about-us','AboutUsController@index')->name('aboutUsManagement');
        Route::post('about-us-save','AboutUsController@save')->name('aboutUsSave');

        Route::get('portfolio-listing','PortfolioController@index')->name('portfolioListing');
        Route::get('portfolio-create','PortfolioController@create')->name('portfolioCreate');
        Route::post('portfolio-save','PortfolioController@save')->name('portfolioSave');
        Route::get('portfolio-edit/{id}','PortfolioController@edit')->name('portfolioEdit');
        Route::post('portfolio-update','PortfolioController@update')->name('portfolioUpdate');
        Route::post('portfolio-delete','PortfolioController@delete')->name('portfolioDelete');
//        Route::get('portfolio-change-status','PortfolioController@changeStatus')->name('portfolioStatus');



    });
});
