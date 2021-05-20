@extends('layout.site-layout.index')

@section('title')
    Portfolio Project Detail
@endsection

@section('content')
    @include('layout.site-layout.header')

    <div class="wrapper" id="pg-projeto">
        <div id="main-transition">
            <main>
                <section class="section-1 section">
                    <div class="container-fluid">
                        <div class="row row-1">
                            <div class="col-lg-4 column-1">
                                <div id="first-slide">
                                    <div class="swiper-container">
                                        <!-- Additional required wrapper -->
                                        <div class="swiper-wrapper">
                                            <!-- Slides -->

                                            <div class="swiper-slide">
                                                <a data-aos-onload
                                                   href="{{asset($project->featured_image)}}"
                                                   data-fancybox
                                                   data-type="image">
                                                    <div class="container-img">
                                                        <div class="imgs"
                                                             data-aos="reveal-left"
                                                             data-aos-onload>

                                                            <img src="{{asset($project->featured_image)}}"
                                                                 alt=""
                                                                 class=""
                                                                 style="transition-duration: 0s"/>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>

                                            @foreach($project->images as $project_image)

                                                <div class="swiper-slide">
                                                    <a data-aos-onload
                                                       href="{{asset($project_image->image)}}"
                                                       data-fancybox
                                                       data-type="image">

                                                        <div class="container-img">
                                                            <div class="imgs" data-aos="reveal-left" data-aos-onload>
                                                                <img src="{{asset($project_image->image)}}"
                                                                     alt=""
                                                                     class=""
                                                                     style="transition-duration: 0s"/>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            @endforeach


                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-8 column-2">
                                <header data-aos class="flex-between">
                                    @if(session()->get('language') == 'english')
                                        {!! $project->description_english !!}
                                    @elseif(session()->get('language') == 'russia')
                                        {!! $project->description_russia !!}
                                    @elseif(session()->get('language') == 'french')
                                        {!! $project->description_french !!}
                                    @else
                                        {!! $project->description_english !!}
                                    @endif
                                    <div class="col-lg-2 column-aves" data-aos="fadeIn">
                                        <i class="icon-aves"></i>
                                    </div>
                                </header>

                                <div id="slides">
                                    <div class="swiper-container">
                                        <!-- Additional required wrapper -->
                                        <div class="swiper-wrapper">
                                            <!-- Slides -->

                                            @foreach($project->images as $project_image)
                                                <div class="swiper-slide">
                                                    <div class="container-img">
                                                        <div class="imgs"
                                                             data-aos="reveal-left"
                                                             data-aos-onload>
                                                            <img src="{{asset($project_image->image)}}"
                                                                 alt=""
                                                                 class=""
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            @endforeach


                                        </div>
                                    </div>

                                    <div class="navigation" data-aos="fadeIn">
                                        <div class="swiper-button-prev">
                                            <span></span>
                                        </div>
                                        <div class="spacer"></div>
                                        <div class="swiper-button-next">
                                            <span></span>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex-end" data-aos="fadeIn">
                                    <a href="{{route('portfolioProjectList',['id'=>$project->portfolio->id])}}"
                                       class="btn-arrow">
                                        <span>Go back to projects </span><i><span></span></i>
                                    </a>
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
