@extends('layout.site-layout.index')

@section('title')
    Register
@endsection

@section('content')
    @include('layout.site-layout.header')
    <div class="wrapper" id="pg-contato">
        <div id="main-transition">
            <main>
                <section class="">
                    <div class="container-fluid">
                        <div class="row justify-content-center">
                            <div class="col-md-6 col-lg-4">
                                <div class="login_leo">
                                    <h2>Register</h2>
                                    <p>Create your account as:</p>
                                </div>
                                <!-- tabs section start -->
                                <div class="main_tabs clearfix">
                                    <ul class="tabs-nav">
                                        <li class="">
                                            <a href="#tab-1" rel="nofollow">Customer</a>
                                        </li>
                                        <li class="tab-active">
                                            <a href="#tab-2" rel="nofollow">Lendor</a>
                                        </li>
                                    </ul>
                                    <div class="tabs-stage">
                                        <div class="hide_login" id="tab-1">
                                            <div class="main_tabsb clearfix">
                                                <ul class="tabs-navb">
                                                    <li class="tab-activeb">
                                                        {{--                                                        <a href="#tab-1b" rel="nofollow">1</a>--}}
{{--                                                        <a href="javascript:void(0)" rel="nofollow">--}}
                                                            <span>1</span>
{{--                                                        </a>--}}
                                                    </li>
                                                    <li class="">
                                                        {{--                                                        <a href="#tab-2b" rel="nofollow">2</a>--}}
{{--                                                        <a href="javascript:void(0)" rel="nofollow">--}}
                                                            <span>2</span>
{{--                                                        </a>--}}
                                                    </li>
                                                    <li class="">
                                                        {{--                                                        <a href="#tab-3b" rel="nofollow">3</a>--}}
{{--                                                        <a href="javascript:void(0)" rel="nofollow">--}}
                                                            <span>3</span>
{{--                                                        </a>--}}
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="tabs-stageb">
                                                @include('site.login.include.customerSteps')
                                            </div>
                                            <p>Already have an account? <a href="{{route('userLogin')}}">Login </a> now </p>
                                        </div>
                                        <div class="hide_login" id="tab-2">
                                            <div class="main_tabsb clearfix">
                                                <ul class="tabs-navb">
                                                    <li class="tab-activeb">
                                                        {{--                                                        <a href="#tab-1bb" rel="nofollow">1</a>--}}
                                                        {{--                                                        <a href="javascript:void(0)" rel="nofollow">--}}
                                                        1
                                                        {{--                                                        </a>--}}
                                                    </li>
                                                    <li class="">
                                                        {{--                                                        <a href="#tab-2bb" rel="nofollow">2</a>--}}
                                                        {{--                                                        <a href="javascript:void(0)" rel="nofollow">--}}
                                                        2
                                                        {{--                                                        </a>--}}
                                                    </li>
                                                    <li class="">
                                                        {{--                                                        <a href="#tab-3bb" rel="nofollow">3</a>--}}
                                                        {{--                                                        <a href="javascript:void(0)" rel="nofollow">--}}
                                                        3
                                                        {{--                                                        </a>--}}
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="tabs-stageb">
                                                @include('site.login.include.lendorSteps')
                                            </div>
                                            <p>Already have an account? <a href="{{route('userLogin')}}">Login </a> now </p>
                                        </div>
                                    </div>
                                </div>
                                <!-- tabs section end -->
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    </div>
@endsection

@section('script')
    <script>
        $(document).ready(function () {
            $('.tabs-nav a').on('click', function (event) {
                event.preventDefault();

                $('.tab-active').removeClass('tab-active');
                $(this).parent().addClass('tab-active');
                $('.tabs-stage .hide_login').hide();
                $($(this).attr('href')).show();
            });

            $('.tabs-nav a:first').trigger('click');
//

            $('.tabs-navb a').on('click', function (event) {
                event.preventDefault();

                $('.tab-activeb').removeClass('tab-activeb');
                $(this).parent().addClass('tab-activeb');
                $('.tabs-stageb .hide_loginb').hide();
                $($(this).attr('href')).show();
            });

            $('.tabs-nav a:first').trigger('click');
//


            $('.input1000').each(function () {
                $(this).on('blur', function () {
                    if ($(this).val().trim() != "") {
                        $(this).addClass('has-val');
                    } else {
                        $(this).removeClass('has-val');
                    }
                })
            });

            $('.step1Next').click(function () {

                var flag = 0;

                if($('.lendor_first_name').val() == '')
                {
                    flag = 1;
                    errorMsg('First Name is a Required Field');
                }
                if($('.lendor_last_name').val() == '')
                {
                    flag = 1;
                    errorMsg('Last Name is a Required Field');
                }
                if($('.lendor_phone').val() == '')
                {
                    flag = 1;
                    errorMsg('Phone Number is a Required Field');
                }

                if(flag == 0)
                {
                    $('.lendorStep1').css('display','none');
                    $('.lendorStep2').css('display','block');
                }


            });

            $('.step2Next').click(function () {


                var flag = 0;

                if($('.lendor_company').val() == '')
                {
                    flag = 1;
                    errorMsg('Company is a Required Field');
                }
                if($('.lendor_position').val() == '')
                {
                    flag = 1;
                    errorMsg('Position is a Required Field');
                }
                if($('.lendor_street').val() == '')
                {
                    flag = 1;
                    errorMsg('Street is a Required Field');
                }
                if($('.lendor_postal_code').val() == '')
                {
                    flag = 1;
                    errorMsg('Postal Code is a Required Field');
                }
                if($('.lendor_city').val() == '')
                {
                    flag = 1;
                    errorMsg('City is a Required Field');
                }
                if($('.lendor_country').val() == '')
                {
                    flag = 1;
                    errorMsg('Country is a Required Field');
                }

                if(flag == 0) {
                    $('.lendorStep2').css('display', 'none');
                    $('.lendorStep3').css('display', 'block');
                }
            });

            $('.finishLendorRegisterBtn').click(function () {
                var data = $('.lendorSteps').serialize();

                showLoadingImage();
                $.ajax({

                    type: 'POST',
                    url: '{{route("lendorRegister")}}',
                    data: data,

                    success: function (response, status) {
                        hideLoadingImage();
                        if (response.result == 'success') {
                            successMsg(response.message);
                            window.location.href = "{{route('home')}}";
                        } else if (response.result == 'error') {
                            errorMsg(response.message);
                        }
                    },
                    error: function (data) {
                        hideLoadingImage();
                        $.each(data.responseJSON.errors, function (key, value) {
                            errorMsg(value);
                        });
                    }


                });
            });


            $('.step1CustomerNext').click(function () {

                var flag = 0;

                if($('.first_name').val() == '')
                {
                    flag = 1;
                    errorMsg('First Name is a Required Field');
                }
                if($('.last_name').val() == '')
                {
                    flag = 1;
                    errorMsg('Last Name is a Required Field');
                }
                if($('.phone').val() == '')
                {
                    flag = 1;
                    errorMsg('Phone Number is a Required Field');
                }

                if(flag == 0)
                {
                    $('.customerStep1').css('display','none');
                    $('.customerStep2').css('display','block');
                }


            });

            $('.step2CustomerNext').click(function () {


                var flag = 0;

                if($('.company').val() == '')
                {
                    flag = 1;
                    errorMsg('Company is a Required Field');
                }
                if($('.position').val() == '')
                {
                    flag = 1;
                    errorMsg('Position is a Required Field');
                }
                if($('.street').val() == '')
                {
                    flag = 1;
                    errorMsg('Street is a Required Field');
                }
                if($('.postal_code').val() == '')
                {
                    flag = 1;
                    errorMsg('Postal Code is a Required Field');
                }
                if($('.city').val() == '')
                {
                    flag = 1;
                    errorMsg('City is a Required Field');
                }
                if($('.country').val() == '')
                {
                    flag = 1;
                    errorMsg('Country is a Required Field');
                }

                if(flag == 0) {
                    $('.customerStep2').css('display', 'none');
                    $('.customerStep3').css('display', 'block');
                }
            });

            $('.finishCustomerRegisterBtn').click(function () {
                var data = $('.customerSteps').serialize();

                showLoadingImage();
                $.ajax({

                    type: 'POST',
                    url: '{{route("customerRegister")}}',
                    data: data,

                    success: function (response, status) {
                        hideLoadingImage();
                        if (response.result == 'success') {
                            successMsg(response.message);
                            window.location.href = "{{route('home')}}";
                        } else if (response.result == 'error') {
                            errorMsg(response.message);
                        }
                    },
                    error: function (data) {
                        hideLoadingImage();
                        $.each(data.responseJSON.errors, function (key, value) {
                            errorMsg(value);
                        });
                    }


                });
            });

        });
    </script>
@endsection
