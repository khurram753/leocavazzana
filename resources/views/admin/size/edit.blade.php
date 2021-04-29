@extends('layout.dashboard-layout.app')

@section('title')
    Edit Size
@endsection



@section('body')

    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-12 bh-mb">
                    <div class="breadcrumb-holder">
                        <h1 class="main-title float-left">Edit Size</h1>
                        <ol class="breadcrumb float-right">
                            <li class="breadcrumb-item">Home</li>
                            <li class="breadcrumb-item active">Edit Size</li>
                        </ol>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>

            <form method="post" id="updateSizeForm">
                @csrf
                <input type="hidden" name="id" value="{{$data->id}}">
                <div class="row">

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Name</label>
                            <input type="text" class="form-control datePicker" name="name" id="name"
                                   placeholder="Enter Size Name" onkeypress="return isCharacterKey(event)"
                                   maxlength="20" value="{{$data->name}}">
                        </div>




                    </div>


                </div>


                <button class="btn btn-primary" type="button" id="updateBtn">Update</button>


                <a href="{{route('sizeListing')}}">
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

            $('#updateBtn').click(function () {

                var flag = 0;

                if ($('#name').val() == '') {
                    flag = 1;
                    errorMsg('Size Name is a Required Field');
                }

                if (flag != 0) {
                    return false;
                }


                var data = $('#updateSizeForm').serialize();

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
                    url: '{{route("sizeUpdate")}}',
                    data: data,

                    success: function (response, status) {

                        if (response.result == 'success') {
                            $.unblockUI();
                            successMsg(response.message);

                            setTimeout(function(){
                                    window.location.href='{{route('sizeListing')}}'}
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

            $('#name').keydown(function(event) {
                if (event.ctrlKey==true && (event.which == '118' || event.which == '86')) {
//                    alert('thou. shalt. not. PASTE!');
                    event.preventDefault();
                }
            });



        });
    </script>

@endsection
