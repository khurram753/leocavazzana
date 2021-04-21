@extends('layout.dashboard-layout.app')

@section('title')
    Edit Service
@endsection


@section('body')

    <div class="content custom-dbhome">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-12 bh-mb">
                    <div class="breadcrumb-holder">
                        <h1 class="main-title float-left">Edit Service</h1>
                        <ol class="breadcrumb float-right">
                            <li class="breadcrumb-item">Home</li>
                            <li class="breadcrumb-item active">Edit Service</li>
                        </ol>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>

            <form method="post" id="updateEmployee">
                @csrf
                <input type="hidden" name="id" value="{{$data->id}}">
                <div class="row">


                    <div class="col-md-12">
                        <div class="form-group">

                            <label for="exampleInputEmail1"> Title English </label>
                            <input class="form-control" type="text" name="title_english" placeholder="Enter Title in English" value="{{$data->title_english}}"/>

                        </div>


                        <div class="form-group">

                            <label for="exampleInputEmail1"> Title Russia</label>
                            <input class="form-control" type="text" name="title_russia" placeholder="Enter Title in Russia" value="{{$data->title_russia}}">
                        </div>


                        <div class="form-group">

                            <label for="exampleInputEmail1"> Title French </label>
                            <input class="form-control" name="title_french" type="text" placeholder="Enter Title in French" value="{{$data->title_french}}">

                        </div>



                        <div class="form-group">

                            <label for="exampleInputEmail1"> Description English </label>
                            <textarea class="form-control editor"  name="description_english" placeholder="Enter Description in English">{{$data->description_english}}</textarea>

                        </div>


                        <div class="form-group">

                            <label for="exampleInputEmail1"> Description Russia</label>
                            <textarea class="form-control editor" name="description_russia" placeholder="Enter Description in Russia">{{$data->description_russia}}</textarea>
                        </div>


                        <div class="form-group">

                            <label for="exampleInputEmail1"> Description French </label>
                            <textarea class="form-control editor" name="description_french"  placeholder="Enter Description in French">{{$data->description_french}}</textarea>

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
                                   accept="image/png,image/jpeg,image/jpg" >
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


                <a href="{{route('serviceListing')}}">
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
                url: '{{route("update-service-gallery")}}',
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
                    url: '{{route("serviceUpdate")}}',
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false,

                    success: function (response, status) {

                        if (response.result == 'success') {
                            $.unblockUI();
                            successMsg(response.message);

                            setTimeout(function () {
                                    window.location.href = '{{route('serviceListing')}}'
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
                    url: '{{url('delete-service-gallery?id=')}}' + data,
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


        });


    </script>

@endsection
