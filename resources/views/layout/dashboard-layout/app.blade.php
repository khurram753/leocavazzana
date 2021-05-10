<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex"/>
    @yield('tags')
    <title>@yield('title')</title>


    @include('layout.dashboard-layout.css')

<!-- BEGIN CSS for this page -->
    @yield('style')
<!-- END CSS for this page -->
    <!-- Favicons -->
    {{--  <link href="{{asset('front-side/images/Asset 2@4x-8.png')}}" rel="icon">--}}
    {{--    <link href="{{asset('front-side/images/apple-touch-icon.png')}}" rel="apple-touch-icon">--}}


</head>

<body class="adminbody">

<div id="main">


@if(Auth::user()->role_id == 1)
    @include('admin.header.top-navigation')
    @include('admin.header.sidebar')
@else
    @include('user.header.top-navigation')
    @include('user.header.sidebar')
@endif



<!-- End Navigation -->


    <!-- Left Sidebar -->
@if(Auth::user()->role_id == 1)
    @include('admin.header.sidebar')
@else
    @include('user.header.sidebar')
@endif

<!-- End Sidebar -->


    <div class="content-page">

        <!-- Start content -->
    @yield('body')
    <!-- END content -->

    </div>
    <!-- END content-page -->

    @if(Auth::user()->role_id == 1)
        @include('admin.footer.footer')
    @else
        @include('admin.footer.footer')
    @endif

</div>
<!-- END main -->
{{--@include('layout.script.activity_watcher')--}}
@include('layout.dashboard-layout.js')
<!-- END Java Script for this page -->
@yield('script')
</body>
</html>
