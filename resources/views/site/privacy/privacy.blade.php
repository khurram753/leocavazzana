@extends('layout.site-layout.index')

@section('title')
    Privacy Policy
@endsection

@section('content')
    @include('layout.site-layout.header')

    <div class="wrapper" id="pg-sobre">
        <div id="main-transition">
            <main>
                <section class="section section-1 about-main">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-4 column-1 flex-center">
                                <div>
                                    @if(session()->get('language') == 'english')
                                        {!! $data->description_english !!}
                                    @elseif(session()->get('language') == 'russia')
                                        {!! $data->description_russia !!}
                                    @elseif(session()->get('language') == 'french')
                                        {!! $data->description_french !!}
                                    @else
                                        {!! $data->description_english !!}
                                    @endif

                                    {{--                                    <h1 class="title split" data-aos>--}}
                                    {{--                                        Hey, I am<br/>--}}
                                    {{--                                        Leo Cavazzana!--}}
                                    {{--                                    </h1>--}}

                                    {{--                                    <div class="text" data-aos="fadeInUp">--}}
                                    {{--                                        Born in São Paulo, I was raised in the countryside. I'm an--}}
                                    {{--                                        economist by degree, but I found in photography a passion--}}
                                    {{--                                        that allows me to express different perspectives about--}}
                                    {{--                                        life. It all began while traveling in 2015 when I decided--}}
                                    {{--                                        to specialize in wildlife photography. In 2017 I began--}}
                                    {{--                                        working on commercial projects and ever since I have--}}
                                    {{--                                        created photos and videos for international brands with a--}}
                                    {{--                                        broad is various segments such as National Geographic, UN,--}}
                                    {{--                                        North Face, Volkswagen, natural reserves in Asia and--}}
                                    {{--                                        Africa and more. I believe that behind great content there--}}
                                    {{--                                        always is a great story. And every story has an essence.--}}
                                    {{--                                        My ultimate goal with photography is to capture and tell--}}
                                    {{--                                        those stories through my work.--}}
                                    {{--                                    </div>--}}

                                    <img
                                        data-aos="fadeInUp"
                                        class="selo"
                                        src="{{asset('front_site/images/selo-discover-new-experiences.svg')}}"
                                        alt="Discover new Experiences"
                                    />
                                </div>
                            </div>
                            <div class="col-lg-8 column-2">
                                <div class="container-img">
                                    <div class="imgs" data-aos="reveal-right">
                                        <img
                                            src="{{asset($data->image)}}"
                                            alt="About me"
                                            class=""
                                            alt="Leo Cavazzana"
                                        />
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
