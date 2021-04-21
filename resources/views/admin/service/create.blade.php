@extends('layout.dashboard-layout.app')

@section('title')
    Create Service
@endsection


@section('body')

    <div class="content custom-dbhome">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-12 bh-mb">
                    <div class="breadcrumb-holder">
                        <h1 class="main-title float-left">Create Service</h1>
                        <ol class="breadcrumb float-right">
                            <li class="breadcrumb-item">Home</li>
                            <li class="breadcrumb-item active">Create Service</li>
                        </ol>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>

            <form method="post" id="employeeForm">
                @csrf
                <div class="row">


                    <div class="col-md-12">
                        <div class="form-group">

                            <label for="exampleInputEmail1"> Title English </label>
                            <input class="form-control" type="text" name="title_english" placeholder="Enter Title in English"/>

                        </div>


                        <div class="form-group">

                            <label for="exampleInputEmail1"> Title Russia</label>
                            <input class="form-control" type="text" name="title_russia" placeholder="Enter Title in Russia">
                        </div>


                        <div class="form-group">

                            <label for="exampleInputEmail1"> Title French </label>
                            <input class="form-control" name="title_french" type="text" placeholder="Enter Title in French">

                        </div>



                        <div class="form-group">

                            <label for="exampleInputEmail1"> Description English </label>
                            <textarea class="form-control editor"  name="description_english" placeholder="Enter Description in English"></textarea>

                        </div>


                        <div class="form-group">

                            <label for="exampleInputEmail1"> Description Russia</label>
                            <textarea class="form-control editor" name="description_russia" placeholder="Enter Description in Russia"></textarea>
                        </div>


                        <div class="form-group">

                            <label for="exampleInputEmail1"> Description French </label>
                            <textarea class="form-control editor" name="description_french"  placeholder="Enter Description in French"></textarea>

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
                    </div>


                </div>



                <button class="btn btn-primary" type="button" id="createBtn">Create</button>


                <a href="{{route('serviceListing')}}">
                    <button class="btn btn-primary" type="button">Cancel</button>
                </a>

            </form>
        </div>

    </div>

@endsection


@section('script')


    <script>

        var fileTypes = ['jpg', 'jpeg', 'png'];


        function imgToData(input) {
            var image_length = $('.pip').length + 1;
            console.log(image_length);

            if (image_length < 5) {

                // console.log(image_length);
                if (input.files) {
                    var temp = image_length;
                    $.each(input.files, function (i, v) {

                        if (temp > 4) {
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

                                var html = '<span class="pip">';
                                html += '<img class="imageThumb" src=' + event.target.result + '  id=' + image_length + '  style="width: 100%" />';
                                html += '</span>';
                                globalFormData.append('new_gallery[]', input.files[i]);
                                $(html).appendTo('.product-image-preview');


                            };
                            temp++;

                            File.readAsDataURL(input.files[i]);

                            if (image_length >= 4) {
                                $('#gallery-upload').prop('disabled', true);
                            }
                        }
                    });
                } else {
                    $('#gallery-upload').prop('disabled', true);
                }

            }
        }


        var globalFormData = new FormData();


        $(document).ready(function () {

            $('#createBtn').click(function () {


                // var data = $('#employeeForm').serialize();
                // var data = new FormData($('#employeeForm')[0]);
                var data = new FormData($('#employeeForm')[0]);

                for (var pair of data.entries()) {
                    globalFormData.append(pair[0], pair[1]);

                }



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
                    url: '{{route("serviceSave")}}',
                    data: globalFormData,
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

                var files = globalFormData.getAll("new_gallery[]");
                var index = $(this).index();
                globalFormData.delete("new_gallery[]");
                $.each(files, function (i, v) {
                    if (index != i) {
                        globalFormData.append("new_gallery[]", v);
                    }

                });

                $(this).remove();
                var image_length = $('.pip').length + 1;
                image_length = image_length - 1;
                if (image_length < 5) {
                    $('#gallery-upload').prop('disabled', false);

                }
            });

            $('#gallery-upload').change(function (event) {
                imgToData(this);
            });


        });




    </script>

@endsection
