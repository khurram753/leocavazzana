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
<script src="{{asset('admin/js/bootstrap.min.js')}}"></script>


<script>
    $(document).ready(function() {
        // cookies
        getCookies();

        //  $(window).on('load', function(){
        //     $('.cookies_main').show();
        // });

        $("#cookiedontAcceptBtn") .click(function(){
            $(".cookies_detailPOP") .hide();
        });
        $("#cookiedontAcceptBtn") .click(function(){
            $(".dont_acceptmian") .show();
        })
        // cookies end
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


    function getCookies() {
        $.ajax({
            type: 'GET',
            url: '{{route("getCookies")}}',

            success: function (response, status) {

                if (response.result == 'success') {

                    $('.cookie_terms_conditions').html(response.data);
                } else if (response.result == 'error') {
                }
            }
        });
    }


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


<!-- js -->
<script>

    // if you want to see a cookie, delete 'seen-cookiePopup' from cookies first.

    $(document).ready(function ($) {
        // Get CookieBox
        var cookieBox = document.getElementsByClassName('cookies_main_show');
        // Get the <span> element that closes the cookiebox
        var closeCookieBox = document.getElementsByClassName("cookieAcceptBtn");
        // closeCookieBox.onclick = function() {
        //     $(cookieBox).css('display','none');
        // };
        $('#cookieAcceptBtn').click(function () {
            $('.cookies_main').css('display', 'none');
        });
    });

    (function () {

        /**
         * Set cookie
         *
         * @param string name
         * @param string value
         * @param int days
         * @param string path
         * @see http://www.quirksmode.org/js/cookies.html
         */
        function createCookie(name, value, days, path) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            } else expires = "";
            document.cookie = name + "=" + value + expires + "; path=" + path;
        }

        function readCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        // Set/update cookie
        var cookieExpiry = 30;
        var cookiePath = "/";

        // document.getElementById("cookieAcceptBtn").addEventListener('click', function () {
        //     createCookie('seen-cookiePopup', 'yes', cookieExpiry, cookiePath);
        // });
        $('#cookieAcceptBtn').click(function () {
            createCookie('seen-cookiePopup', 'yes', cookieExpiry, cookiePath);
        });

        var cookiePopup = readCookie('seen-cookiePopup');
        if (cookiePopup != null && cookiePopup == 'yes') {
            $('.cookies_main').css('display', 'none');
        } else {
            $('.cookies_main').css('display', 'block');
            $('.cookies_detailPOP').css('display', 'block');
        }
    })();


</script>
<script>
    $(document).ready(function () {


        $(".Bacceptnot").click(function () {
            $(".cookies_detailPOP").hide();
            $(".dont_acceptmian").show();


        });

    });
</script>
