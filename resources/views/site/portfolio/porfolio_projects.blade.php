@extends('layout.site-layout.index')

@section('title')
    Portfolio Projects
@endsection

@section('content')
    @include('layout.site-layout.header')

    <div class="wrapper" id="pg-projetos">
        <div id="main-transition">
            <main>
                <section class="section-1 section">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-3 column-1">
                                <a href="portfolio.html"
                                   class="btn-arrow btn-arrow--left btn-arrow--reverse btn-arrow-larger no-phone">
                                    <i class="arrow"><span></span></i> <span>Go Back</span>
                                </a>

                                <header data-aos>
                                    @if(session()->get('language') == 'english')
                                        <h2 class="fs-60 split">{{$portfolio->type_english}}</h2>
                                    @elseif(session()->get('language') == 'russia')
                                        <h2 class="fs-60 split">{{$portfolio->type_russia}}</h2>
                                    @elseif(session()->get('language') == 'french')
                                        <h2 class="fs-60 split">{{$portfolio->type_french}}</h2>
                                    @else
                                        <h2 class="fs-60 split">{{$portfolio->type_english}}</h2>
                                    @endif


                                </header>
                                <i class="icon-estrada"></i>
                            </div>
                            <div class="col-lg-9 column-2">
                                <div id="carousel">
                                    <div class="swiper-container">
                                        <!-- Additional required wrapper -->
                                        <div class="swiper-wrapper">
                                            <!-- Slides -->

                                            @foreach($projects as $project)
                                                <div class="swiper-slide">
                                                    <a href="{{route('portfolioProjectDetail',['id'=>$project->id])}}" data-aos>
                                                        <div class="container-img">
                                                            <span class="ver-projeto">See project</span>

                                                            <div class="imgs"
                                                                 data-aos="reveal-left"
                                                                 data-aos-onload>
                                                                <img
                                                                    src="{{asset($project->featured_image)}}"
                                                                    alt="Iceland"
                                                                    class=""/>
                                                            </div>
                                                        </div>
                                                        <div class="container-text">
                                                            @if(session()->get('language') == 'english')
                                                                <h2 data-aos="reveal-down"
                                                                    data-aos-delay="300"
                                                                    data-aos-onload>
                                                                        {{$project->name_english}}, {{\Carbon\Carbon::parse($project->date)->format('Y')}}
                                                                </h2>
                                                            @elseif(session()->get('language') == 'russia')
                                                                <h2 data-aos="reveal-down"
                                                                    data-aos-delay="300"
                                                                    data-aos-onload>
                                                                    {{$project->name_russia}}, {{\Carbon\Carbon::parse($project->date)->format('Y')}}
                                                                </h2>
                                                            @elseif(session()->get('language') == 'french')
                                                                <h2 data-aos="reveal-down"
                                                                    data-aos-delay="300"
                                                                    data-aos-onload>
                                                                    {{$project->name_french}}, {{\Carbon\Carbon::parse($project->date)->format('Y')}}
                                                                </h2>
                                                            @else
                                                                <h2 data-aos="reveal-down"
                                                                    data-aos-delay="300"
                                                                    data-aos-onload>
                                                                    {{$project->name_english}}, {{\Carbon\Carbon::parse($project->date)->format('Y')}}
                                                                </h2>
                                                            @endif
                                                        </div>
                                                    </a>
                                                </div>
                                            @endforeach

                                        </div>
                                    </div>
                                    <div class="navigation">
                                        <div class="swiper-button-prev"><span></span></div>
                                        <div class="spacer"></div>
                                        <div class="swiper-button-next"><span></span></div>
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
