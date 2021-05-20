@extends('layout.site-layout.index')

@section('title')
    Situation Detail
@endsection

@section('content')
    @include('layout.site-layout.header')

    <div class="wrapper" id="pg-historia">
        <div id="main-transition">
            <main>
                <section class="section section-1">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="capa">
                                <div class="container-img">
                                    <div class="imgs" data-aos="reveal-left">
                                        <img src="{{asset($situation->featured_image)}}" class=""/>
                                    </div>
                                </div>
                            </div>

                            <div class="container-content">
                                <div class="header-historia">
                                    <div class="row-1" data-aos="fadeIn">
                                        <div class="column-1">
                                            <span
                                                class="data">{{\Carbon\Carbon::parse($situation->date)->format('d.m.Y')}}</span>
                                        </div>

                                        <div class="column-2">
                                            <a class="btn-arrow no-phone" href="{{route('situation')}}">
                                                <span>Go back to situations</span><i><span></span></i>
                                            </a>

                                            <div class="selo">
                                                <img src="{{asset('front_site/images/selo-always-the-journey.svg')}}"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row-2" data-aos>
                                        @if(session()->get('language') == 'english')
                                            <div class="wrapper-mask-reverse">
                                                <span><h2>{{$situation->title_english}}</h2></span>
                                            </div>
                                            <div class="wrapper-mask-reverse">
                                                <span>
                                                    <h3>
                                                        {{$situation->tag_line_english}}
                                                    </h3>
                                                </span>
                                            </div>
                                        @elseif(session()->get('language') == 'russia')
                                            <div class="wrapper-mask-reverse">
                                                <span><h2>{{$situation->title_russia}}</h2></span>
                                            </div>
                                            <div class="wrapper-mask-reverse">
                                                <span>
                                                    <h3>
                                                        {{$situation->tag_line_russia}}
                                                    </h3>
                                                </span>
                                            </div>
                                        @elseif(session()->get('language') == 'french')
                                            <div class="wrapper-mask-reverse">
                                                <span><h2>{{$situation->title_french}}</h2></span>
                                            </div>
                                            <div class="wrapper-mask-reverse">
                                                <span>
                                                    <h3>
                                                        {{$situation->tag_line_french}}
                                                    </h3>
                                                </span>
                                            </div>
                                        @else
                                            <div class="wrapper-mask-reverse">
                                                <span><h2>{{$situation->title_english}}</h2></span>
                                            </div>
                                            <div class="wrapper-mask-reverse">
                                                <span>
                                                    <h3>
                                                        {{$situation->tag_line_english}}
                                                    </h3>
                                                </span>
                                            </div>
                                        @endif
                                    </div>
                                </div>
                                @if(session()->get('language') == 'english')
                                    {!! $situation->description_english !!}
                                @elseif(session()->get('language') == 'russia')
                                    {!! $situation->description_russia !!}
                                @elseif(session()->get('language') == 'french')
                                    {!! $situation->description_french !!}
                                @else
                                    {!! $situation->description_english !!}
                                @endif
                            </div>
                        </div>
                    </div>
                </section>

                <section class="section section-slider-historia">
                    <div id="slider-historia">
                        <div class="swiper-container">
                            <!-- Additional required wrapper -->
                            <div class="swiper-wrapper">
                                <!-- Slides -->
                                @foreach($situation->images as $image)
                                    <div class="swiper-slide">
                                        <a href="{{asset($image->image)}}"
                                           data-fancybox="gallery"
                                           data-type="image">
                                            <span>See photo</span>

                                            <div class="imgs">
                                                <img src="{{asset($image->image)}}"
                                                     data-caption=""
                                                     alt=""
                                                     class=""/>
                                            </div>
                                        </a>
                                    </div>
                                @endforeach


                            </div>
                        </div>
                        <div class="swiper-button-prev"><span></span></div>
                        <div class="swiper-button-next"><span></span></div>
                    </div>
                </section>
            </main>
        </div>

        @include('layout.site-layout.footer')

    </div>



@endsection
