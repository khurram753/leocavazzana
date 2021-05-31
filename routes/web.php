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

    Route::get('disclaimer-page','DisclaimerController@index')->name('disclaimer');
    Route::get('privacy-policy','PrivacyPolicyController@index')->name('privacy');
    Route::get('terms-condition','TermsController@index')->name('terms');


    Route::get('portfolio-page','PortfolioController@index')->name('portfolio');
    Route::get('projects/{id}','PortfolioController@projectList')->name('portfolioProjectList');
    Route::get('project-detail/{id}','PortfolioController@projectDetail')->name('portfolioProjectDetail');
    Route::get('service-page','ServiceController@index')->name('service');
    Route::get('case-studies','SituationController@index')->name('situation');
    Route::get('case-studies-detail/{id}','SituationController@detail')->name('situationDetail');
    Route::get('gear','ShopController@index')->name('shop');
    Route::get('gear/{id}','ShopController@detail')->name('shopDetail');


    Route::get('contact-us','ContactUsController@index')->name('contactUs');
    Route::post('send-email','ContactUsController@postContactUs')->name('contactUsEmail');

    Route::get('change-language','HomeController@changeLanguage')->name('changeLanguage');
    Route::get('cookies','CookieController@index')->name('getCookies');

    Route::get('login','LoginController@login')->name('userLogin');
    Route::post('customer-login','LoginController@customerLogin')->name('customerLogin');
    Route::post('lendor-login','LoginController@lendorLogin')->name('lendorLogin');

    Route::get('register','RegisterController@register')->name('userRegister');
    Route::post('customer-register','RegisterController@customerRegister')->name('customerRegister');
    Route::post('lendor-register','RegisterController@lendorRegister')->name('lendorRegister');

    Route::get('logout-user','LoginController@logout')->name('userLogout');

    Route::get('/forgot-password', 'ForgetPasswordController@forgetPasswordForm')->name('userForgetPasswordForm');
    Route::post('/forgot-password', 'ForgetPasswordController@forgetPassword')->name('userForgetPassword');

    Route::get('reset/password/{token}', 'ForgetPasswordController@resetPassword')->name('userResetPassword');
    Route::post('change-password', 'ForgetPasswordController@changePassword')->name('userChangePassword');

    Route::get('user-dashboard','DashboardController@dashboard')->name('userDashboard');

    Route::get('create-request','DashboardController@requestPage')->name('requestPage');
    Route::post('save-request','DashboardController@createRequest')->name('saveRequest');

    Route::get('file-section','DashboardController@fileSection')->name('fileSection');

    Route::post('create-stripe-session-for-products','ShopController@createSession')->name('createStripeSessionForProducts');


});

Route::namespace('Admin')->group(function () {
    Route::namespace("Authentication")->group(function () {
        Route::middleware('guest')->group(function () {
            Route::get('admin-login', 'LoginController@loginPage')->name('loginPage');
            Route::post('admin-login', 'LoginController@login')->name('loginUser');

            Route::get('/admin-forget-password', 'ForgetPasswordController@forgetPasswordForm')->name('forgetPasswordForm');
            Route::post('/admin-forget-password', 'ForgetPasswordController@forgetPassword')->name('forgetPassword');

            Route::get('admin-reset/password/{token}', 'ForgetPasswordController@resetPassword')->name('resetPassword');
            Route::post('admin-change-password', 'ForgetPasswordController@changePassword')->name('changePassword');

        });


        Route::middleware(['Admin','auth'])->group(function () {
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

        Route::get('disclaimer-management','DisclaimerController@index')->name('disclaimerManagement');
        Route::post('disclaimer-save','DisclaimerController@save')->name('disclaimerSave');

        Route::get('privacy-policy-management','PrivacyPolicyController@index')->name('privacyManagement');
        Route::post('privacy-policy-save','PrivacyPolicyController@save')->name('privacySave');

        Route::get('terms-condition-management','TermsController@index')->name('termsManagement');
        Route::post('terms-condition-save','TermsController@save')->name('termsSave');

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

        Route::get('case-studies-listing','SituationController@index')->name('situationListing');
        Route::get('case-studies-create','SituationController@create')->name('situationCreate');
        Route::post('case-studies-save','SituationController@save')->name('situationSave');
        Route::get('case-studies-edit/{id}','SituationController@edit')->name('situationEdit');
        Route::post('case-studies-update','SituationController@update')->name('situationUpdate');
        Route::post('case-studies-delete','SituationController@delete')->name('situationDelete');
        Route::post('update-case-studies-gallery', 'SituationController@saveGallery')->name('update-situation-gallery');
        Route::get('delete-case-studies-gallery', 'SituationController@deleteGallery')->name('delete-situation-gallery');


        Route::get('color-listing', 'ColorController@index')->name('colorListing');
        Route::get('create-color', 'ColorController@create')->name('colorCreate');
        Route::post('save-color', 'ColorController@save')->name('colorSave');
        Route::get('edit-color/{id}', 'ColorController@edit')->name('colorEdit');
        Route::post('update-color', 'ColorController@update')->name('colorUpdate');
        Route::post('color-delete', 'ColorController@delete')->name('colorDelete');
        Route::get('color-change-status', 'ColorController@changeStatus')->name('colorStatus');

        Route::get('size-listing', 'SizeController@index')->name('sizeListing');
        Route::get('create-size', 'SizeController@create')->name('sizeCreate');
        Route::post('save-size', 'SizeController@save')->name('sizeSave');
        Route::get('edit-size/{id}', 'SizeController@edit')->name('sizeEdit');
        Route::post('update-size', 'SizeController@update')->name('sizeUpdate');
        Route::post('size-delete', 'SizeController@delete')->name('sizeDelete');
        Route::get('size-change-status', 'SizeController@changeStatus')->name('sizeStatus');

        Route::get('product-listing', 'ProductController@index')->name('productListing');
        Route::get('create-product', 'ProductController@create')->name('productCreate');
        Route::post('save-product', 'ProductController@save')->name('productSave');
        Route::get('edit-product/{id}', 'ProductController@edit')->name('productEdit');
        Route::post('update-product', 'ProductController@update')->name('productUpdate');
        Route::post('product-delete', 'ProductController@delete')->name('productDelete');
        Route::get('product-change-status', 'ProductController@changeStatus')->name('productStatus');

        Route::get('order-listing','ProductController@orderListing')->name('orderListing');

        Route::get('change-cookie', 'CookiesController@index')->name('showCookie');
        Route::post('update-cookie', 'CookiesController@update')->name('cookieUpdate');

        Route::get('file-listing', 'FileController@index')->name('fileListing');
        Route::get('create-file', 'FileController@create')->name('fileCreate');
        Route::post('save-file', 'FileController@save')->name('fileSave');
        Route::get('edit-file/{id}', 'FileController@edit')->name('fileEdit');
        Route::post('update-file', 'FileController@update')->name('fileUpdate');
        Route::post('file-delete', 'FileController@delete')->name('fileDelete');


    });
});
