@extends('layout.dashboard-layout.app')

@section('title')
    Cookie
@endsection

@section('style')
    <link rel="stylesheet" href="{{asset('admin/css/trumbowyg.min.css')}}">
@endsection

@section('body')

    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-12 bh-mb">
                    <div class="breadcrumb-holder">
                        <h1 class="main-title float-left">Cookie Management</h1>
                        <ol class="breadcrumb float-right">
                            <li class="breadcrumb-item">Home</li>
                            <li class="breadcrumb-item active">Cookie Management</li>
                        </ol>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>

            <form method="post" id="employeeForm">
                @csrf
                <input type="hidden" name="id" value="{{$data->id}}">
                <div class="row">

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Description English</label>
                            <textarea type="text" class="form-control editor" name="description_english"
                                      placeholder="Enter Description In English">{{$data->description_english ? $data->description_english:''}}</textarea>
                        </div>

                        <div class="form-group">
                            <label for="exampleInputEmail1">Description Russia</label>
                            <textarea type="text" class="form-control editor" name="description_russia"
                                      placeholder="Enter Description In Russia">{{$data->description_russia ? $data->description_russia:''}}</textarea>
                        </div>

                        <div class="form-group">
                            <label for="exampleInputEmail1">Description French</label>
                            <textarea type="text" class="form-control editor" name="description_french"
                                      placeholder="Enter Description In French">{{$data->description_french ? $data->description_french:''}}</textarea>
                        </div>

                    </div>


                </div>


                <button class="btn btn-primary" type="button" id="createBtn">Update</button>


{{--                <a href="{{route('employeeListing')}}">--}}
{{--                    <button class="btn btn-primary" type="button">Cancel</button>--}}
{{--                </a>--}}

            </form>
        </div>

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
                    ['insertImage'],
                    ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
                    ['unorderedList', 'orderedList'],
                    ['horizontalRule'],
                    ['removeformat'],
                    ['fullscreen']
                ]
            });



            $('#createBtn').click(function () {

                var data = new FormData($('#employeeForm')[0]);

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
                    url: '{{route("cookieUpdate")}}',
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false,

                    success: function (response, status) {

                        if (response.result == 'success') {
                            $.unblockUI();
                            successMsg(response.message);
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



    </script>

@endsection
