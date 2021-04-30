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
                        <div class="row">
                            <div class="col-lg-2 aside">
                                <i class="icon-lamparina" data-aos="fadeIn"></i>

                                <h1 data-aos class="fs-60 split">Contact!</h1>

                                <ul class="redes-sociais" data-aos="fadeIn">
                                    <li>
                                        <a
                                            href="https://www.instagram.com/leocavazzana/"
                                            class="icon-instagram"
                                            target="_blank"
                                            rel="noopener"
                                        ><span>Instagram</span></a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.facebook.com/leonardocavazzana"
                                            class="icon-facebook"
                                            target="_blank"
                                            rel="noopener"
                                        ><span>Facebook</span></a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.youtube.com/user/leocavacana/"
                                            target="_blank"
                                            rel="noopener"
                                            class="icon-youtube"
                                        ><span>YouTube</span></a
                                        >
                                    </li>
                                </ul>
                            </div>

                            <div class="col-lg-7 column-contato">
                                <div></div>
                                <form id="form-contato" class="row contactUsForm" data-aos="fadeIn">
                                    @csrf
                                    <div class="container-input col-md-6">
                                        <label for="nome">Name</label>
                                        <input id="nome" name="name" type="text" required/>
                                    </div>
                                    <div class="container-input col-md-6">
                                        <label for="tel">Phone</label>
                                        <input id="tel" name="phone" type="text"
                                               onkeypress="return isPhoneNumber(event)"/>
                                    </div>
                                    <div class="container-input col-md-6">
                                        <label for="empresa">Company</label>
                                        <input id="empresa" name="company" type="text"/>
                                    </div>
                                    <div class="container-input col-md-6">
                                        <label for="email">E-mail</label>
                                        <input id="email" name="email" type="email" required/>
                                    </div>

                                    <div class="container-textarea col-12">
                                        <textarea id="mensagem" name="message" required
                                                  placeholder="Send a message here..."></textarea>
                                    </div>
                                    <div class="container-submit col-12">
                                        <button type="button" class="sendMessage">
                                            <i class="arrow-link-black"></i>
                                            <span>Send</span>
                                        </button>
                                        <h3 id="feedback-contato"
                                            class="d-none bt-submit"
                                            data-aos="fadeInUp">
                                        </h3>
                                    </div>
                                </form>
                                <div class="email-tel" data-aos="fadeIn">
                                    <a href="mailto:{{$data->email}}">
                                        <span>{{$data->email}}</span></a>
                                    <br/>
                                    <a href="tel:+{{$data->phone_number}}">
                                        <span>+{{$data->phone_number}}</span></a>
                                </div>
                            </div>
                            <div class="col-lg-3 aside-img">
                                <div class="container-img">
                                    <div class="imgs" data-aos="reveal-right">
                                        <img src="{{asset('front_site/images/image-contato.jpg')}}"
                                             class=""
                                             alt="Montanha"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>

        {{--        @include('layout.site-layout.footer')--}}
    </div>

@endsection

@section('script')
{{--    <script src="http://malsup.github.io/jquery.blockUI.js"></script>--}}

    <script>

        $(document).ready(function () {

            $('.sendMessage').click(function () {

                var data = $('.contactUsForm').serialize();

                // $.blockUI({
                //     css: {
                //         border: 'none',
                //         padding: '15px',
                //         backgroundColor: '#000',
                //         '-webkit-border-radius': '10px',
                //         '-moz-border-radius': '10px',
                //         opacity: .5,
                //         color: '#fff'
                //     }
                // });
                $.ajax({

                    type: 'POST',
                    url: '{{route("contactUsEmail")}}',
                    data: data,

                    success: function (response, status) {

                        if (response.result == 'success') {
                            // $.unblockUI();
                            successMsg(response.message);
                            // alert(response.message);
                            window.location.reload();
                        } else if (response.result == 'error') {
                            // $.unblockUI();
                            errorMsg(response.message);
                            // alert(response.message);
                        }
                    },
                    error: function (data) {
                        $.each(data.responseJSON.errors, function (key, value) {
                            // $.unblockUI();
                            errorMsg(value);
                            // alert(value);
                        });
                    }


                });

            });


        });
    </script>
@endsection
