@extends('layout.dashboard-layout.app')

@section('title')
    File Listing
@endsection

@section('style')
    <style>

        .blockUI {
            z-index: 1060 !important;
        }

    </style>
@endsection

@section('body')

    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-12 bh-mb">
                    <div class="breadcrumb-holder">
                        <h1 class="main-title float-left">File Listing</h1>
                        <ol class="breadcrumb float-right">
                            <li class="breadcrumb-item">Home</li>
                            <li class="breadcrumb-item active">File Listing</li>
                        </ol>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>

            <div class="row">

                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                    <div class="card mb-3">


                        <div class="card-body">

                            <div class="table-responsive">

                                <table class="table table-bordered" id="data_table">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
{{--                                        <th>Created By</th>--}}
{{--                                        <th>Status</th>--}}
                                        <th>Action</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                        @foreach($data as $files)
                                            <tr>
                                                <td>{{$loop->iteration}}</td>
                                                <td>{{$files->document}}</td>
                                                <td>

                                                    <a title="change-status"
                                                       target="_blank"
                                                       href="{{asset($files->document)}}">
                                                        <i class="fas fa-eye"></i></a>


                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>

                                </table>


                            </div>

                        </div>


                    </div>


                </div>

            </div>
        </div>
    </div>



@endsection


@section('script')


    <script src="{{asset('admin/js/dataTable.js')}}"></script>



    <script>


        $(document).on('ready', function () {

            $('#data_table').DataTable();



        });


    </script>

@endsection
