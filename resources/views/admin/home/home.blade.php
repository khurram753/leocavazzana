@extends('layout.dashboard-layout.app')

@section('title')
    Home Page Management
@endsection

@section('style')
    <link rel="stylesheet" href="{{asset('admin/css/trumbowyg.min.css')}}">
@endsection

@section('tags')
    <meta name="csrf-token" content="{{ csrf_token() }}"/>
@endsection

@section('body')

    <div class="content custom-dbhome">

        <div class="container-fluid">

            <div class="row">
                <div class="col-xl-12 bh-mb">
                    <div class="breadcrumb-holder">
                        <h1 class="main-title float-left">Home Page Management</h1>
                        <ol class="breadcrumb float-right">
                            <li class="breadcrumb-item">Home</li>
                            <li class="breadcrumb-item active">Home Page Management</li>
                        </ol>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
            <!-- end row -->

            <form method="post" id="saveContentForm">
                @csrf
                <input type="hidden" name="id" value="{{$data->id}}">
                <div class="row">

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                        <div class="form-group">
                            <div class="db-bannerIMG">
                                @if($data->image_1)
                                    <img class="images image_1" src="{{asset($data->image_1)}}">
                                    <div class="images image_1 db-imgovrly" data-id="{{$data->id}}"></div>

                                @else
                                    <img class="image_1" src="{{asset('admin/images/no_image.jpg')}}">
                                @endif
                            </div>
                            <label for="exampleInputEmail1">Image 1</label>
                            <input type="file" class="images_select" name="image_1"
                                   onchange="readURL(this,'image_1');">

                        </div>

                        <div class="form-group">
                            <div class="db-bannerIMG">
                                @if($data->image_2)
                                    <img class="images image_2" src="{{asset($data->image_2)}}">
                                    <div class="images image_2 db-imgovrly" data-id="{{$data->id}}"></div>

                                @else
                                    <img class="image_2" src="{{asset('admin/images/no_image.jpg')}}">
                                @endif
                            </div>
                            <label for="exampleInputEmail1">Image 2</label>
                            <input type="file" class="images_select" name="image_2"
                                   onchange="readURL(this,'image_2');">

                        </div>


                        <div class="form-group">
                            <div class="db-bannerIMG">
                                @if($data->image_3)
                                    <img class="images image_3" src="{{asset($data->image_3)}}">
                                    <div class="images image_3 db-imgovrly" data-id="{{$data->id}}"></div>
                                @else
                                    <img class="image_3" src="{{asset('admin/images/no_image.jpg')}}">
                                @endif
                            </div>
                            <label for="exampleInputEmail1">Image 3</label>
                            <input type="file" class="images_select" name="image_3"
                                   onchange="readURL(this,'image_3');">

                        </div>


                        <div class="form-group">
                            <div class="db-bannerIMG">
                                @if($data->image_4)
                                    <img class="images image_4" src="{{asset($data->image_4)}}">
                                    <div class="images image_4 db-imgovrly" data-id="{{$data->id}}"></div>
                                @else
                                    <img class="image_4" src="{{asset('admin/images/no_image.jpg')}}">
                                @endif
                            </div>
                            <label for="exampleInputEmail1">Image 4</label>
                            <input type="file" class="images_select" name="image_4"
                                   onchange="readURL(this,'image_4');">


                        </div>

                        <div class="form-group">
                            <div class="db-bannerIMG">
                                @if($data->image_5)
                                    <img class="images image_5" src="{{asset($data->image_5)}}">
                                    <div class="images image_5 db-imgovrly" data-id="{{$data->id}}"></div>
                                @else
                                    <img class="image_5" src="{{asset('admin/images/no_image.jpg')}}">
                                @endif
                            </div>
                            <label for="exampleInputEmail1">Image 5</label>
                            <input type="file" class="images_select" name="image_5"
                                   onchange="readURL(this,'image_5');">


                        </div>


                        <div class="form-group">
                            <div class="db-bannerIMG">
                                @if($data->image_6)
                                    <img class="image_6" src="{{asset($data->image_6)}}">
                                    <div class="images image_6 db-imgovrly" data-id="{{$data->id}}"></div>
                                @else
                                    <img class="image_6" src="{{asset('admin/images/no_image.jpg')}}">
                                @endif
                            </div>
                            <label for="exampleInputEmail1">Image 6</label>
                            <input type="file" name="image_6" class="images_select"
                                   onchange="readURL(this,'image_6');">


                        </div>


                        <div class="form-group">

                            <label for="exampleInputEmail1">Phone Number</label>
                            <input class="form-control" name="phone_number" type="text" placeholder="Enter Phone Number"
                                   value="{{$data->phone_number}}">

                        </div>

                        <div class="form-group">

                            <label for="exampleInputEmail1">Email </label>
                            <input class="form-control" name="email" type="email" placeholder="Enter Email"
                                   value="{{$data->email}}">

                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="form-group">

                            <label for="exampleInputEmail1">Short Description in English </label>
                            <textarea class="form-control editor" name="description_english" placeholder="Enter Short Description in English"
                                   >{{$data->description_english}}</textarea>

                        </div>


                        <div class="form-group">

                            <label for="exampleInputEmail1">Short Description in Russia</label>
                            <textarea class="form-control editor" name="description_russia" placeholder="Enter Short Description in Russia"
                                   >{{$data->description_russia}}</textarea>

                        </div>


                        <div class="form-group">

                            <label for="exampleInputEmail1">Short Description in French </label>
                            <textarea class="form-control editor" name="description_french" type="email" placeholder="Enter Short Description in French"
                                   >{{$data->description_french}}</textarea>

                        </div>


                    </div>


                </div>


                <button class="btn btn-primary" type="button" id="createBtn">Update</button>


            </form>


        </div>
        <!-- END container-fluid -->

    </div>

@endsection

@section('script')

    <script src="{{asset('admin/js/trumbowyg.min.js')}}"></script>

    <script>


        $(document).ready(function () {

            $('.editor').trumbowyg({
                semantic: {
                    'div': 'div' // Editor does nothing on div tags now
                },
                btns: [
                    ['viewHTML'],
                    ['undo', 'redo'], // Only supported in Blink browsers
                    ['formatting'],
                    ['strong', 'em', 'del'],
                    ['superscript', 'subscript'],
                    ['link'],
                    // ['insertImage'],
                    ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
                    ['unorderedList', 'orderedList'],
                    ['horizontalRule'],
                    ['removeformat'],
                    ['fullscreen']
                ]
            });



            $('#createBtn').click(function () {

                var data = new FormData($('#saveContentForm')[0]);

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
                    url: '{{route("saveHomePageContent")}}',
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false,

                    success: function (response, status) {

                        if (response.result == 'success') {
                            $.unblockUI();
                            successMsg(response.message);

                            setTimeout(function () {
                                    window.location.reload();
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

            $(document).on('click', '.images', function () {


                var id = $(this).data('id');
                var type = $(this).attr('class');
                var this_id = $(this);

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
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    type: 'POST',
                    url: '{{route("deleteHomePageImage")}}',
                    data: {'id': id, 'type': type},

                    success: function (response, status) {

                        if (response.result == 'success') {
                            $.unblockUI();
                            successMsg(response.message);

                            this_id.parents('div.form-group').find('input').removeAttr('src');
                            this_id.parents('div.form-group').find('input').val('');
                            window.location.reload();

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



