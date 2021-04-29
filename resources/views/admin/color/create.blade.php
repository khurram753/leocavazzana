@extends('layout.dashboard-layout.app')

@section('title')
    Create Colour
@endsection



@section('body')

    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-12 bh-mb">
                    <div class="breadcrumb-holder">
                        <h1 class="main-title float-left">Create Colour</h1>
                        <ol class="breadcrumb float-right">
                            <li class="breadcrumb-item">Home</li>
                            <li class="breadcrumb-item active">Create Colour</li>
                        </ol>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>

            <form method="post" id="saveColourForm">
                @csrf
                <div class="row">

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Colour Name</label>
                            <input type="text" class="form-control datePicker" name="name" id="name"
                                   placeholder="Enter Name" onkeypress="return isCharacterKey(event)"
                                   maxlength="30">
                        </div>


                    </div>







                </div>


                <button class="btn btn-primary" type="button" id="createBtn">Create</button>


                <a href="{{route('colorListing')}}">
                    <button class="btn btn-primary" type="button">Cancel</button>
                </a>

            </form>
        </div>

    </div>

@endsection


@section('script')


    <script>

        $(document).ready(function () {

            $('#createBtn').click(function () {

                var flag = 0;

                if ($('#name').val() == '') {
                    flag = 1;
                    errorMsg('Colour Name is a Required Field');
                }

                if (flag != 0) {
                    return false;
                }


                var data = $('#saveColourForm').serialize();

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
                    url: '{{route("colorSave")}}',
                    data: data,

                    success: function (response, status) {

                        if (response.result == 'success') {
                            $.unblockUI();
                            successMsg(response.message);

                            setTimeout(function(){
                                window.location.href='{{route('colorListing')}}'}
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
