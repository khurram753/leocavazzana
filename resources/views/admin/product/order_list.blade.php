@extends('layout.dashboard-layout.app')

@section('title')
    Order Listing
@endsection

@section('style')
    <style>

        .blockUI{
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
                        <h1 class="main-title float-left">Order Listing</h1>
                        <ol class="breadcrumb float-right">
                            <li class="breadcrumb-item">Home</li>
                            <li class="breadcrumb-item active">Order Listing</li>
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
                                        <th>Product English Name</th>
                                        <th>Product French Name</th>
                                        <th>Product Russia Name</th>
                                        <th>Price</th>
                                        <th>User Name</th>
                                        <th>User Email</th>
                                        <th>Status</th>
                                        <th>City</th>
                                        <th>Postal Code</th>
                                        <th>Line 1</th>
                                        <th>Line 2</th>
                                        <th>Order Created Date</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    @foreach($data as $order)
                                        <tr>
                                            <td>{{$loop->iteration}}</td>
                                            <td>{{ucfirst($order->product->name_english)}}</td>
                                            <td>{{ucfirst($order->product->name_french)}}</td>
                                            <td>{{ucfirst($order->product->name_russia)}}</td>
                                            <td>${{$order->product->price}}</td>
                                            <td>{{$order->user->name}}</td>
                                            <td>{{$order->user->email}}</td>
                                            <td>{{$order->status}}</td>
                                            <td>{{$order->city}}</td>
                                            <td>{{$order->postal_code}}</td>
                                            <td>{{$order->line1}}</td>
                                            <td>{{$order->line2}}</td>
                                            <td>{{\Carbon\Carbon::parse($order->created_at)->format('Y-m-d')}}</td>

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
