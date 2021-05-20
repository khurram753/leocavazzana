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
                                {{-- <i class="icon-lamparina" data-aos="fadeIn"></i> --}}

                                <h1 data-aos class="fs-60 split">Contact!
                                    <br>
                                    <p style="font-size: 12px; line-height: 2">
                                        @if(session()->get('language') == 'english')
                                            To help us best serve your inquiry, we recommend that you first describe the
                                            issue you’re having before telling us what you want to achieve. You may also
                                            email or call us to make an appointment. Our general response time is one
                                            business day.

                                            Please note your data is precious to us, for further information on how we
                                            handle case data, please see our Privacy Policy.
                                        @elseif(session()->get('language') == 'french')
                                            Pour nous aider à mieux répondre à votre demande, nous vous recommandons de décrire d'abord le problème que vous rencontrez avant de nous dire ce que vous souhaitez réaliser. Vous pouvez également nous envoyer un e-mail ou nous appeler pour prendre rendez-vous. Notre délai de réponse général est d'un jour ouvrable.

                                            Veuillez noter que vos données nous sont précieuses, pour plus d'informations sur la façon dont nous traitons les données de cas, veuillez consulter notre politique de confidentialité.
                                        @elseif(session()->get('language') == 'russia')
                                            Чтобы помочь нам наилучшим образом обработать ваш запрос, мы рекомендуем сначала описать проблему, с которой вы столкнулись, прежде чем сообщать нам, чего вы хотите достичь. Вы также можете написать нам по электронной почте или позвонить, чтобы записаться на прием. Обычно мы отвечаем за один рабочий день.

                                            Обратите внимание, что ваши данные очень важны для нас. Для получения дополнительной информации о том, как мы обрабатываем данные по делам, ознакомьтесь с нашей Политикой конфиденциальности.
                                        @else
                                            To help us best serve your inquiry, we recommend that you first describe the
                                            issue you’re having before telling us what you want to achieve. You may also
                                            email or call us to make an appointment. Our general response time is one
                                            business day.

                                            Please note your data is precious to us, for further information on how we
                                            handle case data, please see our Privacy Policy.
                                        @endif
                                    </p>
                                </h1>


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


        @include('layout.site-layout.footer')
    </div>

@endsection

@section('script')
    {{--    <script src="http://malsup.github.io/jquery.blockUI.js"></script>--}}

    <script>

        $(document).ready(function () {

            $('.sendMessage').click(function () {

                var data = $('.contactUsForm').serialize();
                // $('.sendMessage').css('display','none');
                showLoadingImage();
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
                        hideLoadingImage();
                        if (response.result == 'success') {
                            // $.unblockUI();

                            successMsg(response.message);
                            // alert(response.message);
                            window.location.reload();
                        } else if (response.result == 'error') {
                            // $.unblockUI();
                            // hideLoadingImage();
                            errorMsg(response.message);
                            $('.sendMessage').css('display', 'block');
                            // alert(response.message);
                        }
                    },
                    error: function (data) {
                        $.each(data.responseJSON.errors, function (key, value) {
                            // $.unblockUI();
                            hideLoadingImage();
                            errorMsg(value);
                            $('.sendMessage').css('display', 'block');
                            // alert(value);
                        });
                    }


                });

            });


        });
    </script>
@endsection
