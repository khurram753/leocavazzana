
<link href="{{asset('custom/css/toastr.css')}}" rel="stylesheet">


<script src="{{asset('admin/js/jquery.min.js')}}"></script>
<script src="{{asset('admin/js/jquery.blockUI.js')}}"></script>
<script src="{{asset('custom/js/toastr.min.js')}}"></script>
<script src="{{asset('custom/js/keypress_functions.js')}}"></script>


<script>
    // $(document).ready(function() {
    //     $(".rate_select2").select2();
    // });


    function successMsg(_msg){
        window.toastr.success(_msg);
    }

    function errorMsg(_msg){
        window.toastr.error(_msg);
    }

    function warningMsg(_msg){
        window.toastr.warning(_msg);
    }


    @if(Session::has('success'))
        successMsg('{{Session::get("success")}}');
    @endif

    @if(Session::has('error'))
        errorMsg("{{Session::get('error')}}");
    @endif

</script>

