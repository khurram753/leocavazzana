@extends('layout.site-layout.index')

@section('title')
    Service
@endsection

@section('content')
    @include('layout.site-layout.header')

    <div class="wrapper" id="pg-servicos">
        <div id="main-transition">
            <main>
                <section class="section section-servicos">
                    <div class="container-fluid">
                        <div class="row row-servicos">
                            <ul class="lista-servicos">

                                @foreach($services as $key => $service)
                                    <li class="lista-item">
                                        <div class="linha-item" data-aos="scaleY" data-aos-delay="600"></div>
                                        <div class="container-item">
                                            <div class="container-content">
                                                <div class="column-1">
                                                    <div class="content-text">
                                                        <h2 class="title split{{$key+1}}" data-aos>
                                                            <span class="number">{{$key + 1}}</span>
                                                            @if(session()->get('language') == 'english')
                                                                {{$service->title_english}}
                                                            @elseif(session()->get('language') == 'russia')
                                                                {{$service->title_russia}}
                                                            @elseif(session()->get('language') == 'french')
                                                                {{$service->title_french}}
                                                            @else
                                                                {{$service->title_english}}
                                                            @endif

                                                        </h2>
                                                        <div class="text">
                                                            <p>
                                                                @if(session()->get('language') == 'english')
                                                                    {{$service->description_english}}
                                                                @elseif(session()->get('language') == 'russia')
                                                                    {{$service->description_russia}}
                                                                @elseif(session()->get('language') == 'french')
                                                                    {{$service->description_french}}
                                                                @else
                                                                    {{$service->description_english}}
                                                                @endif
                                                            </p>

                                                        </div>
                                                    </div>
                                                    <a class="link-01 link-underlined"
                                                       href="javascript:void(0)">
                                                        <span>Contact</span>
                                                    </a>
                                                </div>

                                                <div class="column-2">
                                                    <div id="galeria-servicos-0{{$key + 1}}">
                                                        <div class="mask-slider">
                                                            <div class="swiper-container"
                                                                 data-aos="reveal-left"
                                                                 data-aos-onload>
                                                                <!-- Additional required wrapper -->
                                                                <div class="swiper-wrapper">
                                                                    @foreach($service->images as $image)
                                                                        <div class="swiper-slide">
                                                                            <div class="imgs">
                                                                                <img class=""
                                                                                     src="{{asset($image->image)}}"/>
                                                                            </div>
                                                                        </div>
                                                                    @endforeach


                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="swiper-button-prev"><span></span></div>
                                                        <div class="swiper-button-next"><span></span></div>
                                                        <div class="swiper-pagination"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                @endforeach


                            </ul>
                        </div>
                    </div>
                </section>
            </main>

            <section class="section section-clientes">
                <div class="container-fluid">
                    <div class="row">
                        <div class="column-1">
                            <h2>Clients</h2>
                        </div>

                        <ul class="lista-marcas">
                            @foreach($clients->take(12) as $client)
                                <li>
                                    <a href="javascrip:void(0)" target="_blank" rel="noopener">
                                        <div class="container-img">
                                            <img src="{{asset($client->image)}}"/>
                                        </div>
                                    </a>
                                </li>
                            @endforeach

                        </ul>

                        <div class="column-3">
                            <a
                                class="btn-arrow btn-arrow--brown btn-arrow--top btn-clientes"
                                href="javascript:void(0)"
                            ><span>See all</span> <i><span></span></i
                                ></a>
                        </div>
                    </div>
                </div>
            </section>

            @include('site.home.include.clients_section')
        </div>

    </div>



@endsection
