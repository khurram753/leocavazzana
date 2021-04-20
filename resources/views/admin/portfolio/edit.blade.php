@extends('layout.dashboard-layout.app')

@section('title')
    Edit Customer
@endsection


@section('body')

    <div class="content custom-dbhome">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-12 bh-mb">
                    <div class="breadcrumb-holder">
                        <h1 class="main-title float-left">Edit Customer</h1>
                        <ol class="breadcrumb float-right">
                            <li class="breadcrumb-item">Home</li>
                            <li class="breadcrumb-item active">Edit Customer</li>
                        </ol>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>

            <form method="post" id="updateEmployee">
                @csrf
                <input type="hidden" name="id" value="{{$data->id}}">
                <div class="row">

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                        <div class="form-group">
                            <div class="db-bannerIMG">

                                @if($data->image)
                                    <img class="images image_1" src="{{asset($data->image)}}">
{{--                                    <div class="images image_1 db-imgovrly" data-id="{{$data->id}}"></div>--}}

                                @else
                                    <img class="image_1" src="{{asset('admin/images/no_image.jpg')}}">
                                @endif
                            </div>
                            {{--                            <label for="exampleInputEmail1">Image 1</label>--}}
                            <input type="file" class="images_select" name="image"
                                   onchange="readURL(this,'image_1');">

                        </div>


                    </div>

                    <div class="col-md-12">
                        <div class="form-group">

                            <label for="exampleInputEmail1"> Type English </label>
                            <input class="form-control" value="{{$data->type_english}}"  type="text" name="type_english" placeholder="Enter Type in English"/>

                        </div>


                        <div class="form-group">

                            <label for="exampleInputEmail1"> Type Russia</label>
                            <input class="form-control" value="{{$data->type_russia}}" type="text" name="type_russia" placeholder="Enter Type in Russia">
                        </div>


                        <div class="form-group">

                            <label for="exampleInputEmail1"> Type French </label>
                            <input class="form-control" value="{{$data->type_french}}"  name="type_french" type="text" placeholder="Enter Type in French">

                        </div>


                    </div>
                </div>


                <button class="btn btn-primary" type="button" id="createBtn">Update</button>


                <a href="{{route('portfolioListing')}}">
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


                // var data = $('#updateEmployee').serialize();
                var data = new FormData($('#updateEmployee')[0]);

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
                    url: '{{route("portfolioUpdate")}}',
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false,

                    success: function (response, status) {

                        if (response.result == 'success') {
                            $.unblockUI();
                            successMsg(response.message);

                            setTimeout(function () {
                                    window.location.href = '{{route('portfolioListing')}}'
                                }
                                , 2000);
                        } else if (response.result == 'error') {
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

        var fileTypes = ['jpg', 'jpeg', 'png'];


        function readURL(input, className) {


            if (input.files && input.files[0]) {
                var reader = new FileReader();

                var size = input.files[0].size;

                var extension = input.files[0].name.split('.').pop().toLowerCase(),  //file extension from input file
                    isSuccess = fileTypes.indexOf(extension) > -1;
                if (extension != 'jfif') {
                    if (isSuccess && size <= 1000000) {
                        reader.onload = function (e) {
                            $('.' + className).attr('src', e.target.result);
                        };

                        reader.readAsDataURL(input.files[0]);
                        // $('#image_upload_preview').show();

                    } else {
                        errorMsg('You can only upload png,jpg or jpeg files and size of flag should not greater than 1MB');
                        // $("#image").val('');
                        $('.' + className).parents('div.form-group').find('input').val('');
                        // $('#image_upload_preview').hide();
                        $('.' + className).removeAttr('src');
                        return false;
                    }
                } else {
                    errorMsg('You can only upload png,jpg or jpeg files');
                    // $("#image").val('');
                    // $('#image_upload_preview').hide();
                    // $('#image_upload_preview').removeAttr('src');

                    // $("#image").val('');
                    $('.' + className).parents('div.form-group').find('input').val('');
                    // $('#image_upload_preview').hide();
                    $('.' + className).removeAttr('src');
                    return false;
                }
            }
        }
    </script>

@endsection
