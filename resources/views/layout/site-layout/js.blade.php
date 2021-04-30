<style>
    /* Center the loader */
    #loader {
        position: fixed;
        left: 50%;
        top: 50%;
        z-index: 1000;
        width: 120px;
        height: 120px;
        margin: -76px 0 0 -76px;
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid #3498db;
        -webkit-animation: spin 2s linear infinite;
        animation: spin 2s linear infinite;
    }
    .main_lodder{
        background: rgba(0,0,0,0.8);
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 1000;
        display: none;
    }
    @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    /* Add animation to "page content" */
    .animate-bottom {
        position: relative;
        -webkit-animation-name: animatebottom;
        -webkit-animation-duration: 1s;
        animation-name: animatebottom;
        animation-duration: 1s
    }

    @-webkit-keyframes animatebottom {
        from { bottom:-100px; opacity:0 }
        to { bottom:0px; opacity:1 }
    }

    @keyframes animatebottom {
        from{ bottom:-100px; opacity:0 }
        to{ bottom:0; opacity:1 }
    }

</style>



<link href="{{asset('custom/css/toastr.css')}}" rel="stylesheet">

<script src="{{asset('admin/js/jquery.min.js')}}"></script>
{{--<script src="{{asset('custom/js/jquery.blockUI.js')}}"></script>--}}
<script src="{{asset('custom/js/toastr.min.js')}}"></script>
<script src="{{asset('custom/js/keypress_functions.js')}}"></script>


<script>
    $(document).ready(function() {
        $('.changeLanguage').click(function(){
            var lang = $(this).data('lang');

            showLoadingImage();
            $.ajax({

                type: 'GET',
                url: '{{route("changeLanguage")}}',
                data: {data:lang},

                success: function (response, status) {
                    hideLoadingImage();
                    if (response.result == 'success') {
                        // $.unblockUI();
                        // successMsg(response.message);
                        // alert(response.message);
                        window.location.reload();
                    } else if (response.result == 'error') {
                        // $.unblockUI();
                        errorMsg(response.message);
                        // alert(response.message);
                    }
                },
                error: function (data) {
                    hideLoadingImage();
                    $.each(data.responseJSON.errors, function (key, value) {
                        // $.unblockUI();
                        errorMsg(value);
                        // alert(value);
                    });
                }


            });

        });
    });

    function showLoadingImage() {
        $(".main_lodder").show();
    }

    function hideLoadingImage() {
        $(".main_lodder").hide();
    }

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

