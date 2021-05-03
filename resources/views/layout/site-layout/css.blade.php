<style>
    /* -------------------------------------------------------------------------- */
    /*                              loading animation                             */
    /* -------------------------------------------------------------------------- */
    #loading-animation {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        /*z-index: -9999;*/
        background: #f4ede1;
        pointer-events: none;
        opacity: 0;

        z-index: 999;
        transition: all 0.3s ease-in-out;
    }

    #loading-animation video {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: auto;
    }

    @media only screen and (max-width: 767.98px) {
        #loading-animation video {
            width: 200%;
            height: auto;
            margin: auto;
        }

        #loading-animation svg {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0px) !important;
            width: 300% !important;
            height: 300% !important;
        }
    }

    .pg-loading #loading-animation {
        opacity: 1;
        pointer-events: none;
    }
    /* .pg-loading
  #header{
    position:fixed;
    z-index: 9999;

} */
</style>

<link href="{{asset('admin/css/bootstrap.min.css')}}" rel="stylesheet" type="text/css"/>
<link rel="stylesheet" href="{{asset('front_site/css/fonts.css')}}" />
<link rel="stylesheet" href="{{asset('front_site/css/main.css')}}" />

<script defer src="{{asset('front_site/js/libs.js')}}"></script>
<script defer src="{{asset('front_site/js/main.js')}}"></script>
