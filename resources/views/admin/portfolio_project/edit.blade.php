@extends('layout.dashboard-layout.app')

@section('title')
    Edit Portfolio Project
@endsection

@section('style')
    <link rel="stylesheet" href="{{asset('admin/css/trumbowyg.min.css')}}">
@endsection

@section('body')

    <div class="content custom-dbhome">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-12 bh-mb">
                    <div class="breadcrumb-holder">
                        <h1 class="main-title float-left">Edit Portfolio Project</h1>
                        <ol class="breadcrumb float-right">
                            <li class="breadcrumb-item">Home</li>
                            <li class="breadcrumb-item active">Edit Portfolio Project</li>
                        </ol>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>

            <form method="post" id="updateProject">
                @csrf
                <input type="hidden" name="id" value="{{$data->id}}">
                <div class="row">

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                        <div class="form-group">
                            <div class="db-bannerIMG">

                                @if($data->featured_image)
                                    <img class="image_1" src="{{asset($data->featured_image)}}">
                                @else
                                    <img class="image_1" src="{{asset('admin/images/no_image.jpg')}}">
                                @endif

                            </div>
                            {{--                            <label for="exampleInputEmail1">Image 1</label>--}}
                            <input type="file" class="images_select" name="featured_image"
                                   onchange="readURL(this,'image_1');">

                        </div>


                    </div>

                    <div class="col-md-12">
                        <div class="form-group">

                            <label for="exampleInputEmail1"> Name English </label>
                            <input class="form-control" type="text" name="name_english"
                                   placeholder="Enter Name in English" value="{{$data->name_english}}"/>

                        </div>


                        <div class="form-group">

                            <label for="exampleInputEmail1"> Name Russia </label>
                            <input class="form-control" type="text" name="name_russia"
                                   placeholder="Enter Name in Russia" value="{{$data->name_russia}}">
                        </div>


                        <div class="form-group">

                            <label for="exampleInputEmail1"> Name French </label>
                            <input class="form-control" name="name_french" type="text"
                                   placeholder="Enter Name in French" value="{{$data->name_french}}">

                        </div>

                        <div class="form-group">

                            <label for="exampleInputEmail1"> Description in English </label>
                            <textarea class="form-control editor" name="description_english"
                                      placeholder="Enter Description in English"
                            >{{$data->description_english}}</textarea>

                        </div>


                        <div class="form-group">

                            <label for="exampleInputEmail1"> Description in Russia</label>
                            <textarea class="form-control editor" name="description_russia"
                                      placeholder="Enter Description in Russia"
                            >{{$data->description_russia}}</textarea>

                        </div>


                        <div class="form-group">

                            <label for="exampleInputEmail1"> Description in French </label>
                            <textarea class="form-control editor" name="description_french"
                                      placeholder="Enter Description in French"
                            >{{$data->description_french}}</textarea>

                        </div>

                        <div class="form-group">
                            <label for="exampleInputEmail1"> Select Portfolio </label>
                            <select class="form-control" name="portfolio_id">
                                <option value="" disabled selected>Select</option>
                                @foreach($portfolio as $record)
                                    <option value="{{$record->id}}" {{$record->id == $data->portfolio_id ? 'selected':''}}>{{$record->type_english}}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="form-group">

                            <label for="exampleInputEmail1"> Select Date </label>
                            <input class="form-control" id="datepicker" name="date" type="text"
                                   placeholder="Enter Date" value="{{\Carbon\Carbon::parse($data->date)->format('m/d/Y')}}">

                        </div>


                    </div>

                </div>

                <div class="row">
                    <div class="col-2">
                        <div class="form-group">

                            <label for="gallery-upload" class="gallery-uploadd">
                                <img src="{{asset('admin/images/no_image.jpg')}}"
                                     class="img-fluid no-image" alt="">
                            </label>
                            <input style="display:none;" type="file" class="form-control"
                                   id="gallery-upload"
                                   accept="image/png,image/jpeg,image/jpg">
                        </div>


                    </div>

                    <div class="col-10 product-image-preview">
                        <img class="image_upload_preview d-block">

                        @foreach($data->images as $image)
                            <span class="pip">
                                <img class="imageThumb" data-id="{{$image->id}}" src="{{asset($image->image)}}"
                                     id="{{$image->id}}" style="width: 100%">
                            </span>
                        @endforeach
                    </div>


                </div>


                <button class="btn btn-primary" type="button" id="createBtn">Update</button>


                <a href="{{route('portfolioProjectListing')}}">
                    <button class="btn btn-primary" type="button">Cancel</button>
                </a>

            </form>
        </div>

    </div>

@endsection


@section('script')



    <script src="{{asset('admin/js/trumbowyg.min.js')}}"></script>




    <script>

        var fileTypes = ['jpg', 'jpeg', 'png'];


        function imgToData(input) {
            var image_length = $('.pip').length + 1;
            // console.log(image_length);

            if (image_length < 12) {

                // console.log(image_length);
                if (input.files) {
                    var temp = image_length;
                    $.each(input.files, function (i, v) {

                        if (temp > 11) {
                            return false;
                        }
                        var n = i + 1;
                        var File = new FileReader();
                        var size = input.files[0].size;

                        if (size > 2000000) {
                            errorMsg('size of image must be less that 2mb');
                            return false;
                        } else {

                            File.onload = function (event) {

                                // var html = '<span class="pip">';
                                // html += '<img class="imageThumb" src=' + event.target.result + '  id=' + image_length + '  style="width: 100%" />';
                                // html += '</span>';
                                // globalFormData.append('new_gallery[]', input.files[i]);
                                // $(html).appendTo('.product-image-preview');

                                uploadImage(input.files[i],event.target.result);


                            };
                            temp++;

                            File.readAsDataURL(input.files[i]);

                            if (image_length >= 11) {
                                $('#gallery-upload').prop('disabled', true);
                            }
                        }
                    });
                } else {
                    $('#gallery-upload').prop('disabled', true);
                }

            }
        }

        function uploadImage(image, showImage) {
            var formData = new FormData();

            var data = image;
            var project_id = {{$data->id}};
            formData.append('_token', '{{ csrf_token() }}');
            formData.append('project_id', project_id);
            formData.append('image', data);


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
                url: '{{route("update-project-gallery")}}',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,


                success: function (response, status) {

                    if (response.result == 'success') {
                        $.unblockUI();

                        var html = '<span class="pip">';
                        html += '<img class="imageThumb" data-id="'+response.data.id+'" src=' + showImage + ' id="'+response.data.id+'"  style="width: 100%" />';
                        html += '</span>';
                        // globalFormData.append('new_gallery[]', input.files[i]);
                        $(html).appendTo('.product-image-preview');

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
        }


        var globalFormData = new FormData();

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


            $(document).on("click", ".pip", function () {
                // var image_length = $('.pip').length + 1;
                var data = $(this).children('img').data('id');
                var this_data = $(this);

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
                    url: '{{url('delete-portfolio-project-gallery?id=')}}' + data,
                    data: data,
                    type: 'GET',

                    success: function (response, status) {

                        if (response.result == 'success') {
                            $.unblockUI();
                            this_data.remove();
                            // image_length = image_length - 1;
                            // if (image_length < 6) {
                            //     $('#gallery-upload').prop('disabled', false);
                            // }
                            successMsg(response.message);
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

            $('#gallery-upload').change(function (event) {
                imgToData(this);
            });




            $("#datepicker").datepicker({
                changeMonth: true,
                changeYear: true
            });

            $('#createBtn').click(function () {


                // var data = $('#updateEmployee').serialize();
                var data = new FormData($('#updateProject')[0]);

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
                    url: '{{route("portfolioProjectUpdate")}}',
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false,

                    success: function (response, status) {

                        if (response.result == 'success') {
                            $.unblockUI();
                            successMsg(response.message);

                            setTimeout(function () {
                                    window.location.href = '{{route('portfolioProjectListing')}}'
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
