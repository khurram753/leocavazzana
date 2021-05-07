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
                          <h2>Register</h2>
                          <p>Create your account as:</p>
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
                      <div class="main_tabsb clearfix">
                          <ul class="tabs-navb">
                              <li class="tab-activeb"><a href="#tab-1b" rel="nofollow">1</a>
                              </li>
                              <li class=""><a href="#tab-2b" rel="nofollow">2</a>
                              </li>
                              <li class=""><a href="#tab-3b" rel="nofollow">3</a>
                              </li>
                          </ul>
                      </div>
                      <div class="tabs-stageb">
                          <div class="hide_loginb" id="tab-1b">
                              <form action="">
                                  <div class="form-af-be">
                                      <input class="input1000" type="text" name="name" required>
                                      <span class="focus-input1000" data-placeholder="First Name"></span>
                                  </div>
                                  <div class="form-af-be">
                                      <input class="input1000" type="text" name="lname" required>
                                      <span class="focus-input1000" data-placeholder="Last Name"></span>
                                  </div>
                                  <div class="form-af-be">
                                      <input class="input1000" type="text" name="Phone" required>
                                      <span class="focus-input1000" data-placeholder="Phone"></span>
                                  </div>
                                  <button>Next</button>
                                 </form>
                          </div>
                          <div class="hide_loginb" id="tab-2b">
                              <form action="">
                                  <div class="form-af-be">
                                      <input class="input1000" type="text" name="name" required>
                                      <span class="focus-input1000" data-placeholder="Company"></span>
                                  </div>
                                  <div class="form-af-be">
                                      <input class="input1000" type="text" name="lname" required>
                                      <span class="focus-input1000" data-placeholder="Position"></span>
                                  </div>
                                  <div class="form-af-be">
                                      <input class="input1000" type="text" name="Phone" required>
                                      <span class="focus-input1000" data-placeholder="Street"></span>
                                  </div>
                                  <div class="form-af-be">
                                      <input class="input1000" type="text" name="Phone" required>
                                      <span class="focus-input1000" data-placeholder="Postal Code"></span>
                                  </div>
                                  <div class="form-af-be">
                                      <input class="input1000" type="text" name="Phone" required>
                                      <span class="focus-input1000" data-placeholder="City"></span>
                                  </div>
                                  <div class="form-af-be">
                                      <input class="input1000" type="text" name="Phone" required>
                                      <span class="focus-input1000" data-placeholder="Country"></span>
                                  </div>
                                  <button>Next</button>
                                 </form>
                          </div>
                          <div class="hide_loginb" id="tab-3b">
                              <form action="">
                                  <div class="form-af-be">
                                      <input class="input1000" type="email" name="name" required>
                                      <span class="focus-input1000" data-placeholder="Email"></span>
                                  </div>
                                  <div class="form-af-be">
                                      <input class="input1000" type="password" name="lname" required>
                                      <span class="focus-input1000" data-placeholder="Password"></span>
                                  </div>
                                  <div class="form-af-be">
                                      <input class="input1000" type="password" name="Phone" required>
                                      <span class="focus-input1000" data-placeholder="Password Confirmation"></span>
                                  </div>
                                  <div class="form-af-be">
                                      <select class="input1000"required>
                                          <option value="1"></option>
                                          <option value="2">one</option>
                                          <option value="3">two</option>
                                      </select>
                                      <span class="focus-input1000" data-placeholder="How did you hear about us?"></span>
                                  </div>
                                  <label class="container_cDDk">I agree to the <a href="#">privacy policy</a>
                                      <input type="checkbox">
                                      <span class="checkmark_cDDk">
                                          <span class="checkmark_hover"></span>
                                      </span>
                                  </label>
                                  <label class="container_cDDk">I agree to the <a href="#">terms and condition</a>
                                      <input type="checkbox">
                                      <span class="checkmark_cDDk">
                                          <span class="checkmark_hover"></span>
                                      </span>
                                  </label>
                                  <button>Register</button>
                                 </form>
                          </div>
                      </div>
                         <p>Already have an account? <a href="#">Login </a> now </p>
                  </div>
                  <div class="hide_login" id="tab-2">
                      <div class="main_tabsb clearfix">
                          <ul class="tabs-navb">
                              <li class="tab-activeb"><a href="#tab-1bb" rel="nofollow">1</a>
                              </li>
                              <li class=""><a href="#tab-2bb" rel="nofollow">2</a>
                              </li>
                              <li class=""><a href="#tab-3bb" rel="nofollow">3</a>
                              </li>
                          </ul>
                      </div>
                      <div class="tabs-stageb">
                          <div class="hide_loginb" id="tab-1bb">
                              <form action="">
                                  <div class="form-af-be">
                                      <input class="input1000" type="text" name="name" required>
                                      <span class="focus-input1000" data-placeholder="First Name"></span>
                                  </div>
                                  <div class="form-af-be">
                                      <input class="input1000" type="text" name="lname" required>
                                      <span class="focus-input1000" data-placeholder="Last Name"></span>
                                  </div>
                                  <div class="form-af-be">
                                      <input class="input1000" type="text" name="Phone" required>
                                      <span class="focus-input1000" data-placeholder="Phone"></span>
                                  </div>
                                  <button>Next</button>
                                 </form>
                          </div>
                          <div class="hide_loginb" id="tab-2bb">
                              <form action="">
                                  <div class="form-af-be">
                                      <input class="input1000" type="text" name="name" required>
                                      <span class="focus-input1000" data-placeholder="Company"></span>
                                  </div>
                                  <div class="form-af-be">
                                      <input class="input1000" type="text" name="lname" required>
                                      <span class="focus-input1000" data-placeholder="Position"></span>
                                  </div>
                                  <div class="form-af-be">
                                      <input class="input1000" type="text" name="Phone" required>
                                      <span class="focus-input1000" data-placeholder="Street"></span>
                                  </div>
                                  <div class="form-af-be">
                                      <input class="input1000" type="text" name="Phone" required>
                                      <span class="focus-input1000" data-placeholder="Postal Code"></span>
                                  </div>
                                  <div class="form-af-be">
                                      <input class="input1000" type="text" name="Phone" required>
                                      <span class="focus-input1000" data-placeholder="City"></span>
                                  </div>
                                  <div class="form-af-be">
                                      <input class="input1000" type="text" name="Phone" required>
                                      <span class="focus-input1000" data-placeholder="Country"></span>
                                  </div>
                                  <button>Next</button>
                                 </form>
                          </div>
                          <div class="hide_loginb" id="tab-3bb">
                              <form action="">
                                  <div class="form-af-be">
                                      <input class="input1000" type="email" name="name" required>
                                      <span class="focus-input1000" data-placeholder="Email"></span>
                                  </div>
                                  <div class="form-af-be">
                                      <input class="input1000" type="password" name="lname" required>
                                      <span class="focus-input1000" data-placeholder="Password"></span>
                                  </div>
                                  <div class="form-af-be">
                                      <input class="input1000" type="password" name="Phone" required>
                                      <span class="focus-input1000" data-placeholder="Password Confirmation"></span>
                                  </div>
                                  <div class="form-af-be">
                                      <select class="input1000"required>
                                          <option value="1"></option>
                                          <option value="2">one</option>
                                          <option value="3">two</option>
                                      </select>
                                      <span class="focus-input1000" data-placeholder="How did you hear about us?"></span>
                                  </div>
                                  <label class="container_cDDk">I agree to the <a href="#">privacy policy</a>
                                      <input type="checkbox">
                                      <span class="checkmark_cDDk">
                                          <span class="checkmark_hover"></span>
                                      </span>
                                  </label>
                                  <label class="container_cDDk">I agree to the <a href="#">terms and condition</a>
                                      <input type="checkbox">
                                      <span class="checkmark_cDDk">
                                          <span class="checkmark_hover"></span>
                                      </span>
                                  </label>
                                  <button>Register</button>
                                 </form>
                          </div>
                      </div>
                         <p>Already have an account? <a href="#">Login </a> now </p>
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