@extends('layout.site-layout.index')

@section('title')
    Portfolio
@endsection

@section('content')
    @include('layout.site-layout.header')

    <div class="wrapper" id="pg-portfolio">

        <div id="main-transition">


            <main>

                <section class="section-1 section">
                    <div class="container-fluid">
                        <div class="row">

                            @foreach($portfolios as $key => $portfolio)
                                <div class="col-lg-4 column-{{$key+1}}">
                                    <a href="{{route('portfolioProjectList',['id'=>$portfolio->id])}}">
                                        <div class="overflow-hidden">
                                            <div class="container-img" data-aos="reveal-left">
                                                <div class="imgs">
                                                    <img src="{{asset($portfolio->image)}}" alt="Viagens" class=""/>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="container-text" data-aos>
                                            <h2 class="split1">
                                                @if(session()->get('language') == 'english')
                                                    {{$portfolio->type_english}}
                                                @elseif(session()->get('language') == 'french')
                                                    {{$portfolio->type_french}}
                                                @elseif(session()->get('language') == 'russia')
                                                    {{$portfolio->type_russia}}
                                                @else
                                                    {{$portfolio->type_english}}
                                                @endif
                                            </h2>
{{--                                            <p class="portfolio_detail">Here is the project detais</p>--}}
                                            <div class="wrapper-mask-reverse">
                                                <span class="link-hover" data-letter="See projects">
                                                     @if(session()->get('language') == 'english')
                                                        See Projects
                                                    @elseif(session()->get('language') == 'french')
                                                        Voir les projets
                                                    @elseif(session()->get('language') == 'russia')
                                                        Посмотреть проекты
                                                    @else
                                                        See Projects
                                                    @endif
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            @endforeach


{{--                            <div class="col-lg-4 column-2">--}}
{{--                                <a href="projects.html">--}}
{{--                                    <div class="overflow-hidden">--}}
{{--                                        <div class="container-img" data-aos="reveal-left">--}}
{{--                                            <div class="imgs">--}}
{{--                                                <img src="images/jettaa.jpg" alt="Viagens" class=""/>--}}
{{--                                            </div>--}}
{{--                                        </div>--}}


{{--                                    </div>--}}
{{--                                    <div class="container-text" data-aos>--}}
{{--                                        <h2 class="split2">--}}
{{--                                            Commercial Projects--}}

{{--                                        </h2>--}}
{{--                                        <p class="portfolio_detail">Here is the project detais</p>--}}
{{--                                        <div class="wrapper-mask-reverse"><span class="link-hover"--}}
{{--                                                                                data-letter="See projects">See projects</span>--}}
{{--                                        </div>--}}
{{--                                    </div>--}}
{{--                                </a>--}}
{{--                            </div>--}}
{{--                            <div class="col-lg-4 column-3">--}}
{{--                                <a href="projects.html">--}}
{{--                                    <div class="overflow-hidden">--}}
{{--                                        <div class="container-img" data-aos="reveal-left">--}}
{{--                                            <div class="imgs">--}}
{{--                                                <img src="images/portfolio2.jpg" alt="Viagens" class=""/>--}}
{{--                                            </div>--}}
{{--                                        </div>--}}
{{--                                    </div>--}}
{{--                                    <div class="container-text" data-aos>--}}
{{--                                        <h2 class="split3">--}}
{{--                                            Ventures Projects--}}

{{--                                        </h2>--}}
{{--                                        <p class="portfolio_detail">Here is the project detais</p>--}}
{{--                                        <div class="wrapper-mask-reverse"><span class="link-hover"--}}
{{--                                                                                data-letter="See projects">See projects</span>--}}
{{--                                        </div>--}}
{{--                                    </div>--}}
{{--                                </a>--}}
{{--                            </div>--}}
                        </div>
                    </div>
                </section>

            </main>


        </div>


        @include('layout.site-layout.footer')


    </div>


@endsection
