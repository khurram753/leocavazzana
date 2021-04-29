@extends('layout.dashboard-layout.app')

@section('title')
    Create Product
@endsection



@section('body')

    <div class="content custom-dbhome">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-12 bh-mb">
                    <div class="breadcrumb-holder">
                        <h1 class="main-title float-left">Create Product</h1>
                        <ol class="breadcrumb float-right">
                            <li class="breadcrumb-item">Home</li>
                            <li class="breadcrumb-item active">Create Product</li>
                        </ol>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>

            <form method="post" id="saveProductForm">
                @csrf
                <div class="row">

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                        <div class="form-group">
                            <div class="db-bannerIMG">

                                <img class="image_1" src="{{asset('admin/images/no_image.jpg')}}">

                            </div>
                            {{--                            <label for="exampleInputEmail1">Image 1</label>--}}
                            <input type="file" class="images_select" name="featured_image"
                                   onchange="readURL(this,'image_1');">

                        </div>

                    </div>

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">


                        <div class="form-group">
                            <label for="exampleInputEmail1">Product Name In English</label>
                            <input type="text" class="form-control" name="name_english"
                                   placeholder="Enter Name In English"
                                   maxlength="30">
                        </div>


                        <div class="form-group">
                            <label for="exampleInputEmail1">Product Name In French</label>
                            <input type="text" class="form-control" name="name_french"
                                   placeholder="Enter Name In French"
                                   maxlength="30">
                        </div>


                        <div class="form-group">
                            <label for="exampleInputEmail1">Product Name In Russia</label>
                            <input type="text" class="form-control" name="name_russia"
                                   placeholder="Enter Name In Russia"
                                   maxlength="30">
                        </div>


                        <div class="form-group">
                            <label for="exampleInputEmail1">Product Price</label>
                            <input type="text" class="form-control" name="price"
                                   placeholder="Enter Price">
                        </div>

                        <div class="form-group">
                            <label for="exampleInputEmail1">Color</label>
                            <select name="color_id" class="form-control">
                                <option value="" selected disabled>Select</option>
                                @foreach($colors as $color)
                                    <option value="{{$color->id}}">{{$color->name}}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="exampleInputEmail1">Size</label>
                            <select name="size_id[]" multiple id="size_id" class="form-control">
                                @foreach($sizes as $size)
                                    <option value="{{$size->id}}">{{$size->name}}</option>
                                @endforeach
                            </select>
                        </div>


                    </div>


                </div>
                <button class="btn btn-primary" type="button" id="createBtn">Create</button>


                <a href="{{route('productListing')}}">
                    <button class="btn btn-primary" type="button">Cancel</button>
                </a>

            </form>

        </div>

    </div>


@endsection

@section('script')

    <script>

        $(document).ready(function () {
            $('#size_id').select2();

            $('#createBtn').click(function () {


                // var data = $('#employeeForm').serialize();
                var data = new FormData($('#saveProductForm')[0]);

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
                    url: '{{route("productSave")}}',
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false,

                    success: function (response, status) {

                        if (response.result == 'success') {
                            $.unblockUI();
                            successMsg(response.message);

                            setTimeout(function () {
                                    window.location.href = '{{route('productListing')}}'
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




