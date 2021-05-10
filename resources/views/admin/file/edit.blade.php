@extends('layout.dashboard-layout.app')

@section('title')
    Edit File
@endsection


@section('body')

    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-12 bh-mb">
                    <div class="breadcrumb-holder">
                        <h1 class="main-title float-left">Edit File</h1>
                        <ol class="breadcrumb float-right">
                            <li class="breadcrumb-item">Home</li>
                            <li class="breadcrumb-item active">Edit File</li>
                        </ol>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>

            <form method="post" id="updateEmployee">
                @csrf
                <input type="hidden" name="id" value="{{$data->id}}">
                <div class="row">

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-dbhome">

                        <div class="form-group">
                            <div class="db-bannerIMG">

                                <img class="image_1" src="{{asset('admin/images/no_image.jpg')}}">

                            </div>
                            <label for="exampleInputEmail1">Upload a Document</label>
                            <input type="file" class="images_select" name="document"
                                   accept=".doc,.docx,.pdf" value="{{$data->document}}"
                                   onchange="readURL(this,'image_1');">

                        </div>


                    </div>


                </div>


                <button class="btn btn-primary" type="button" id="createBtn">Update</button>


                <a href="{{route('fileListing')}}">
                    <button class="btn btn-primary" type="button">Cancel</button>
                </a>

            </form>
        </div>

    </div>

@endsection


@section('script')

    {{--<script src="{{asset('site/js/moment.min.js')}}"></script>--}}

    {{--<script src="{{asset('site/js/daterangepicker.js')}}"></script>--}}

    <script>

        $(document).ready(function () {

            $('#createBtn').click(function () {




                var data = $('#updateEmployee').serialize();

                $.blockUI({
                    css: {
                        border: 'none',
                        padding: '15px',
                        backgroundColor: '#000',
                        '-webkit-border-radius': '10px',
                        '-moz-border-radius': '10px',
                        opacity: .5,
                        color: '#fff'
                    }
                });

                $.ajax({

                    type: 'POST',
                    url: '{{route("fileUpdate")}}',
                    data: data,

                    success: function (response, status) {

                        if (response.result == 'success') {
                            $.unblockUI();
                            successMsg(response.message);

                            setTimeout(function(){
                                    window.location.href='{{route('fileListing')}}'}
                                ,2000);
                        }
                        else if(response.result == 'error'){
                            $.unblockUI();
                            errorMsg(response.message);
                        }


                    },
                    error: function (data) {
                        $.each(data.responseJSON.errors, function (key, value) {
                            $.unblockUI();
                            errorMsg(value);
                        });
                    }


                });

            });




        });
    </script>

@endsection
