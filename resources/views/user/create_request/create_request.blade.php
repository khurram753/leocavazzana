@extends('layout.dashboard-layout.app')

@section('title')
    Request
@endsection


@section('tags')
    <meta name="csrf-token" content="{{ csrf_token() }}"/>
@endsection

@section('body')

    <div class="content ">

        <div class="container-fluid">

            <div class="row">
                <div class="col-xl-12 bh-mb">
                    <div class="breadcrumb-holder">
                        <h1 class="main-title float-left">Request</h1>
                        <ol class="breadcrumb float-right">
                            <li class="breadcrumb-item">Home</li>
                            <li class="breadcrumb-item active">Request</li>
                        </ol>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
            <!-- end row -->

            <form method="post" id="saveContentForm">
                @csrf
                <div class="row">

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 custom-dbhome">

                        <div class="form-group">
                            <div class="db-bannerIMG">

                                <img class="image_1" src="{{asset('admin/images/no_image.jpg')}}">

                            </div>
                            <label for="exampleInputEmail1">Upload a Document</label>
                            <input type="file" class="images_select" name="document"
                                   accept=".doc,.docx,.pdf"
                                   onchange="readURL(this,'image_1');">

                        </div>




                    </div>

                    <div class="col-md-12">

                        <div class="form-group">

                            <label for="exampleInputEmail1"> Message </label>
                            <textarea class="form-control editor" name="message" placeholder="Enter Short Description in English"></textarea>

                        </div>



                    </div>


                </div>


                <button class="btn btn-primary" type="button" id="createBtn">Send</button>


            </form>


        </div>
        <!-- END container-fluid -->

    </div>

@endsection

@section('script')



    <script>


        $(document).ready(function () {



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
                    url: '{{route("saveRequest")}}',
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

        var fileTypes = ['docx','pdf','txt','doc'];


        function readURL(input, className) {


            if (input.files && input.files[0]) {
                var reader = new FileReader();

                var size = input.files[0].size;

                var extension = input.files[0].name.split('.').pop().toLowerCase(),  //file extension from input file
                    isSuccess = fileTypes.indexOf(extension) > -1;
                if (extension != 'jfif' || extension != 'pdf' || extension != 'jpg' || extension != 'jpeg') {
                    if (isSuccess && size <= 2000000) {
                        // if(extension == 'jpg' || extension == 'jpeg' || extension == 'png') {
                            reader.onload = function (e) {
                                $('.' + className).attr('src', '{{asset('custom/images/file_icon.png')}}');
                            };
                        // }

                        reader.readAsDataURL(input.files[0]);
                        // $('#image_upload_preview').show();

                    } else {
                        errorMsg('You can only upload docx,pdf,txt,doc files and size of document should not greater than 2MB');
                        // $("#image").val('');
                        $('.' + className).parents('div.form-group').find('input').val('');
                        // $('#image_upload_preview').hide();
                        $('.' + className).removeAttr('src');
                        return false;
                    }
                } else {
                    errorMsg('You can only upload docx,pdf,txt or doc files');
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



