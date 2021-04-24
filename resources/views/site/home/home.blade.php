@extends('layout.site-layout.index')

@section('title')
    Home
@endsection

@section('content')
    @include('layout.site-layout.header')

    <div class="wrapper" id="pg-home">
        <div id="main-transition">
            <main>
                <section class="section-1 section">
                    <div class="container-fluid">
                        <div class="row">
                            {!! $data->description_english !!}
                            {{--                            <div class="col-lg-3 column-1">--}}
                            {{--                                <i class="icon-tree" data-aos="fadeIn"></i>--}}

                            {{--                                <header data-aos>--}}
                            {{--                                    <h2 class="fs-85">--}}
                            {{--                                        <div class="wrapper-mask-reverse">--}}
                            {{--                                            <span>Freeland</span>--}}
                            {{--                                        </div>--}}
                            {{--                                        <div class="wrapper-mask-reverse">--}}
                            {{--                                            <span>Photographer</span>--}}
                            {{--                                        </div>--}}
                            {{--                                    </h2>--}}
                            {{--                                    <h3 class="fs-22 pt-45">--}}
                            {{--                                        <div class="wrapper-mask-reverse">--}}
                            {{--                                            <span>Hello, I’m Leo Cavazzana! Travel &</span>--}}
                            {{--                                        </div>--}}
                            {{--                                        <div class="wrapper-mask-reverse">--}}
                            {{--                                            <span>Commercial Photographer from Brazil. </span>--}}
                            {{--                                        </div>--}}
                            {{--                                    </h3>--}}
                            {{--                                </header>--}}
                            {{--                            </div>--}}
                            <div class="col-lg-8 pos-relative">
                                <div id="fullbanner" class="overflow-hidden">
                                    <div class="swiper-container" data-aos="reveal-right">
                                        <!-- Additional required wrapper -->
                                        <div class="swiper-wrapper">
                                            <!-- Slides -->

                                            @if($data->image_1)
                                                <div class="swiper-slide">
                                                    <div class="imgs">
                                                        <img class=""
                                                             src="{{asset($data->image_1)}}"
                                                             alt="A Casa"
                                                        />
                                                    </div>
                                                </div>
                                            @endif
                                            @if($data->image_2)
                                                <div class="swiper-slide">
                                                    <div class="imgs">
                                                        <img class=""
                                                             src="{{asset($data->image_2)}}"
                                                             alt="A Casa"
                                                        />
                                                    </div>
                                                </div>
                                            @endif
                                            @if($data->image_3)
                                                <div class="swiper-slide">
                                                    <div class="imgs">
                                                        <img class=""
                                                             src="{{asset($data->image_3)}}"
                                                             alt="A Casa"
                                                        />
                                                    </div>
                                                </div>
                                            @endif
                                            @if($data->image_4)
                                                <div class="swiper-slide">
                                                    <div class="imgs">
                                                        <img class=""
                                                             src="{{asset($data->image_4)}}"
                                                             alt="A Casa"
                                                        />
                                                    </div>
                                                </div>
                                            @endif
                                            @if($data->image_5)
                                                <div class="swiper-slide">
                                                    <div class="imgs">
                                                        <img class=""
                                                             src="{{asset($data->image_5)}}"
                                                             alt="A Casa"
                                                        />
                                                    </div>
                                                </div>
                                            @endif
                                            @if($data->image_6)
                                                <div class="swiper-slide">
                                                    <div class="imgs">
                                                        <img class=""
                                                             src="{{asset($data->image_6)}}"
                                                             alt="A Casa"
                                                        />
                                                    </div>
                                                </div>
                                            @endif

                                        </div>
                                    </div>
                                </div>

                                <div class="ready-for-everywhere">
                                    <img
                                        src="{{asset('front_site')}}/images/ready-for-everywhere.svg"
                                        class=""
                                        alt="From Brazil, Ready for Everywhere"
                                        data-aos="reveal-left"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="row row-2">
                            <div class="col-lg-3">
                                <a href="javascript:void(0)" class="btn-arrow btn-clientes">
                                    <span><strong>Clients</strong></span
                                    ><i><span></span></i>
                                </a>
                            </div>
                            <div class="col-lg-8 flex-between">
                                <a href="tel:+{{$data->phone_number}}" class="strong-hover tel-footer"
                                ><span data-letter="+{{$data->phone_number}}"
                                    >+{{$data->phone_number}}</span
                                    ></a
                                >

                                <span class="copyright">All rights reserved © 2021</span>
                            </div>
                        </div>
                    </div>
                </section>

                <ul class="redes-sociais">
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
            </main>

            @include('site.home.include.clients_section')

        </div>

{{--        @include('layout.site-layout.footer')--}}
    </div>


@endsection
