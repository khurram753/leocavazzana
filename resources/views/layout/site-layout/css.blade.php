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

@if(Request()->route()->getName() == 'aboutUs' || Request()->route()->getName() == 'privacy' || Request()->route()->getName() == 'disclaimer'
|| Request()->route()->getName() == 'terms' || Request()->route()->getName() == 'portfolio' || Request()->route()->getName() == 'situation' )
<style>
    .lang a, .lang li:nth-last-child(2):before{
        color: #fff !important;
    }
</style>
@endif

@if(Request()->route()->getName() == 'home' || Request()->route()->getName() == 'contactUs')
    <style>
      .main_logo{
          display: none !important;
      }
      .hc_logo{
          display: block !important;
      }
      body{
         background: rgba(29,29,28);
      }
      #bt-menu{
        --color:rgba(126,122,113) ;
    --color-active:rgba(126,122,113) ;
      }
      .login-btn{
        border: 2px solid rgba(126,122,113);
        color: rgba(126,122,113);
      }
      .header--mail span{
        color: rgba(126,122,113);
      }
      .lang li a, .lang li:nth-last-child(2):before{
        color: rgba(126,122,113) !important;
      }
      .lang a, .lang li:last-child:before{
        color: rgba(126,122,113);
      }
    </style>
@endif

