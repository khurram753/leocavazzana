@extends('layout.site-layout.index')

@section('title')
    Contact
@endsection

@section('content')
    @include('layout.site-layout.header')
<div class="wrapper" id="pg-contato">
    <div id="main-transition">
      <main>
        <section class="">
          <div class="container-fluid">
            <div class="row justify-content-center">
              <div class="col-md-6 col-lg-4">
                  <div class="login_leo">
                      <h2>Login</h2>
                      <p>Login to your account as:</p>
                  </div>
                  <!-- tabs section start -->
      <div class="main_tabs clearfix">
          <ul class="tabs-nav">
              <li class=""><a href="#tab-1" rel="nofollow">Ship Owner</a>
              </li>
              <li class="tab-active"><a href="#tab-2" rel="nofollow">Debt Provider</a>
              </li>
          </ul>
          <div class="tabs-stage">
              <div class="hide_login" id="tab-1">
                 <form action="">
                  <div class="form-af-be">
                      <input class="input1000" type="text" name="name" required>
                      <span class="focus-input1000" data-placeholder="Name"></span>
                  </div>
                  <div class="form-af-be">
                      <input class="input1000" type="text" name="email" required>
                      <span class="focus-input1000" data-placeholder="Email"></span>
                  </div>
                  <a class="forget_text" href="#"><span >I forgot my password</span></a>
                  <button>Login</button>
                 </form>
                 <p>New to Here? <a href="register.html">Create an account </a> Now </p>
              </div>
              <div class="hide_login" id="tab-2">
                  <form action="">
                      <div class="form-af-be">
                          <input class="input1000" type="text" name="name" required>
                          <span class="focus-input1000" data-placeholder="Name"></span>
                      </div>
                      <div class="form-af-be">
                          <input class="input1000" type="text" name="email" required>
                          <span class="focus-input1000" data-placeholder="Email"></span>
                      </div>
                      <a class="forget_text" href="#"><span >I forgot my password</span></a>
                      <button>Login</button>
                     </form>
                     <p>New to Here? <a href="register.html">Create an account </a> Now </p>
              </div>
          </div>
      </div>
      <!-- tabs section end -->
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>

    
  </div>
  @endsection

  @section('script')
  <script>
      $(document).ready(function () {
          $('.tabs-nav a').on('click', function(event) {
      event.preventDefault();
  
      $('.tab-active').removeClass('tab-active');
      $(this).parent().addClass('tab-active');
      $('.tabs-stage .hide_login').hide();
      $($(this).attr('href')).show();
  });
  
  $('.tabs-nav a:first').trigger('click');
  // 
  
  $('.tabs-navb a').on('click', function(event) {
    event.preventDefault();
  
    $('.tab-activeb').removeClass('tab-activeb');
    $(this).parent().addClass('tab-activeb');
    $('.tabs-stageb .hide_loginb').hide();
    $($(this).attr('href')).show();
  });
  
  $('.tabs-nav a:first').trigger('click');
  //
  
  
  $('.input1000').each(function () {
    $(this).on('blur', function () {
        if ($(this).val().trim() != "") {
            $(this).addClass('has-val');
        } else {
            $(this).removeClass('has-val');
        }
    })
  });
      });
  </script>
  @endsection