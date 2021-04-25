@extends('layout.site-layout.index')

@section('title')
    Situation
@endsection

@section('content')
    @include('layout.site-layout.header')


    <div class="wrapper" id="pg-historias">
        <div id="main-transition">
            <main>
                <section class="section-1">
                    <div class="container-fluid container-1 pr-0">
                        <div class="row">
                            <div class="col-lg-2 aside">
                                <i class="icon-barraca" data-aos="fadeIn"></i>

                                <div>
                                    <h1 data-aos class="fs-60 split">
                                        @if(session()->get('language') == 'english')
                                            Situation
                                        @elseif(session()->get('language') == 'russia')
                                            Ситуация
                                        @elseif(session()->get('language') == 'french')
                                            Situation
                                        @else
                                            Situation
                                        @endif
                                    </h1>
                                    <h2 data-aos="fadeIn" class="fs-24 fw-300 mt-20">
                                        @if(session()->get('language') == 'english')
                                            Photography stories, expeditions, behind the scenes and tutorials.
                                            Everything in one place.
                                        @elseif(session()->get('language') == 'russia')
                                            Фоторепортажи, экспедиции, кулуары и уроки. Все в одном месте.
                                        @elseif(session()->get('language') == 'french')
                                            Histoires photographiques, expéditions, coulisses et tutoriels. Tout en un
                                            seul endroit.
                                        @else
                                            Photography stories, expeditions, behind the scenes and tutorials.
                                            Everything in one place.
                                        @endif
                                    </h2>
                                </div>

                                <div class="container-search" data-aos="fadeIn">
                                    <label for="">Search</label>
                                    <input type="search" class="search"/>
                                </div>
                            </div>

                            <div class="col-lg-10 column-carousel">
                                <div id="carousel">
                                    <div class="swiper-container">
                                        <!-- Additional required wrapper -->
                                        <div class="swiper-wrapper">
                                            <!-- Slides -->

                                            @foreach($situations as $key => $situation)
                                                <div class="swiper-slide active"
                                                 data-search="A night on the beach l Tulum 18.09.20 Visitamos a reserva natural de Sian Ka&#039;an, e nos sentimos em casa.">
                                                <a href="{{route('situationDetail',['id'=>$situation->id])}}" data-aos="fadeIn" data-aos-onload>
                                                    <div class="container-title">
                                                        <div class="titles">
                                                            @if(session()->get('language') == 'english')
                                                                <h2>{{$situation->title_english}}</h2>
                                                                <h3>
                                                                    {{$situation->tag_line_english}}
                                                                </h3>
                                                            @elseif(session()->get('language') == 'russia')
                                                                <h2>{{$situation->title_russia}}</h2>
                                                                <h3>
                                                                    {{$situation->tag_line_russia}}
                                                                </h3>
                                                            @elseif(session()->get('language') == 'french')
                                                                <h2>{{$situation->title_french}}</h2>
                                                                <h3>
                                                                    {{$situation->tag_line_french}}
                                                                </h3>
                                                            @else
                                                                <h2>{{$situation->title_english}}</h2>
                                                                <h3>
                                                                    {{$situation->tag_line_english}}
                                                                </h3>
                                                            @endif
                                                        </div>
                                                        <div class="date">
                                                            <h2>{{\Carbon\Carbon::parse($situation->date)->format('d.m.Y')}}</h2>
                                                        </div>
                                                    </div>
                                                    <div class="container-img" data-aos="reveal-left" data-aos-onload>
                                                        <div class="imgs">
                                                            <img
                                                                src="{{asset($situation->featured_image)}}"
                                                                class=""
                                                                alt="A night on the beach l Tulum"/>
                                                        </div>
                                                    </div>

                                                    <div class="container-text" data-aos="fadeIn" data-aos-onload>
                                                        <p></p>
                                                        <a href="{{route('situationDetail',['id'=>$situation->id])}}"><h2 class="link-underlined">See more</h2></a>
                                                    </div>
                                                </a>
                                            </div>
                                            @endforeach


                                        </div>
                                    </div>
                                    <div id="no-results">
                                        <h1 class="fs-28">
                                            <div class="wrapper-mask-reverse">
                                                <span>No results found</span>
                                            </div>
                                        </h1>
                                    </div>
                                    <div class="navigation active">
                                        <div class="navigation-container" data-aos="reveal-left">
                                            <div class="swiper-button-prev"><span></span></div>
                                            <div class="spacer"></div>
                                            <div class="swiper-button-next"><span></span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>


    </div>


@endsection
