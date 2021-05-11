@extends('layout.site-layout.index')

@section('title')
    Forgot Password
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
                                    <h2>Forgot Password</h2>

                                </div>
                                <!-- tabs section start -->
                                <div class="main_tabs clearfix">

                                    <div class="tabs-stage">
                                        <div class="hide_login" id="tab-1">
                                            <form class="customerForm">
                                                @csrf

                                                <div class="form-af-be">
                                                    <input class="input1000" type="email" name="email" required>
                                                    <span class="focus-input1000" data-placeholder="Email"></span>
                                                </div>
                                                <button type="button" class="loginBtn">Send Email</button>
                                            </form>

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

            $('.loginBtn').click(function(){
                var data = $('.customerForm').serialize();
                showLoadingImage();
                $.ajax({
                    type: 'POST',
                    url: '{{route("userForgetPassword")}}',
                    data: data,

                    success: function (response, status) {
                        hideLoadingImage();
                        if (response.result == 'success') {
                            // $.unblockUI();
                            successMsg(response.message);
                            // alert(response.message);
                            window.location.href = '{{route('userLogin')}}';
                        } else if (response.result == 'error') {
                            // $.unblockUI();
                            errorMsg(response.message);
                            // alert(response.message);
                        }
                    },
                    error: function (data) {
                        hideLoadingImage();
                        $.each(data.responseJSON.errors, function (key, value) {
                            // $.unblockUI();
                            errorMsg(value);
                            // alert(value);
                        });
                    }

                });
            });

            $('.lendorLoginBtn').click(function(){
                var data = $('.lendorForm').serialize();
                showLoadingImage();
                $.ajax({
                    type: 'POST',
                    url: '{{route("lendorLogin")}}',
                    data: data,

                    success: function (response, status) {
                        hideLoadingImage();
                        if (response.result == 'success') {
                            // $.unblockUI();
                            successMsg(response.message);
                            // alert(response.message);
                            window.location.href = "{{route('home')}}";
                        } else if (response.result == 'error') {
                            // $.unblockUI();
                            errorMsg(response.message);
                            // alert(response.message);
                        }
                    },
                    error: function (data) {
                        hideLoadingImage();
                        $.each(data.responseJSON.errors, function (key, value) {
                            // $.unblockUI();
                            errorMsg(value);
                            // alert(value);
                        });
                    }

                });
            });




        });
    </script>
@endsection
