<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1"/>

    <title>@yield('title')</title>

@include('layout.site-layout.css')

<!-- BEGIN CSS for this page -->
@yield('style')
<!-- END CSS for this page -->

</head>

<body class="pg-loading">
<div id="loading-animation" class="flex-center"></div>

<div class="cursor-wrapper" id="wrapper-cursor">
    <div></div>
</div>

@yield('content')


@include('layout.site-layout.js')
<!-- END Java Script for this page -->
@yield('script')

</body>
</html>
