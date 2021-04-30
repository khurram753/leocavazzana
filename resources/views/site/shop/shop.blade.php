@extends('layout.site-layout.index')

@section('title')
    Shop
@endsection

@section('content')
    @include('layout.site-layout.header')

    <div class="wrapper" id="pg-loja">

        <div id="main-transition">

            <main>

                <section class="">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-2 aside col-md-3">
                                <i class="icon-mochila" data-aos="fadeIn"></i>

                                <div>
                                    <h1 data-aos class="fs-60">
                                        @if(session()->get('language') == 'english')
                                            <div class="wrapper-mask-reverse">
                                                <span>Shop</span>
                                            </div>
                                        @elseif(session()->get('language') == 'russia')
                                            <div class="wrapper-mask-reverse">
                                                <span>Магазин</span>
                                            </div>
                                        @elseif(session()->get('language') == 'french')
                                            <div class="wrapper-mask-reverse">
                                                <span>Boutique</span>
                                            </div>
                                        @else
                                            <div class="wrapper-mask-reverse">
                                                <span>Shop</span>
                                            </div>
                                        @endif
                                    </h1>


                                </div>

                                <div class="container-search" data-aos="fadeIn" data-search-set>
                                    <label for="">Search</label>
                                    <input type="search" class="search">
                                </div>
                            </div>

                            <div class="col-lg-10 col-md-9 column-produtos">
                                @if(sizeof($products) > 0)
                                    <ul class="products-list">


                                        @foreach($products as $product)
                                            @if(session()->get('language') == 'english')
                                                <li class="active" data-search="{{$product->name_english}}">
                                            @elseif(session()->get('language') == 'french')
                                                <li class="active" data-search="{{$product->name_french}}">
                                            @elseif(session()->get('language') == 'russia')
                                                <li class="active" data-search="{{$product->name_russia}}">
                                            @else
                                                <li class="active" data-search="{{$product->name_english}}">
                                                    @endif

                                                    <a href="{{route('shopDetail',['id'=>$product->id])}}" data-fancybox
                                                       data-type="iframe">
                                                        <div class="container-img " data-aos="reveal-left">
                                                            <div class="imgs">
                                                                <img src="{{asset($product->featured_image)}}"
                                                                     alt="Reykjavik" class=""/>
                                                            </div>

                                                        </div>
                                                        <div class="container-text" data-aos="fadeIn">
                                                            <div class="column-1">

                                                                @if(session()->get('language') == 'english')
                                                                    <h2> {{$product->name_english}}</h2>
                                                                    <strong>Buy</strong>

                                                                @elseif(session()->get('language') == 'french')
                                                                    <h2> {{$product->name_french}}</h2>
                                                                    <strong>Acheter</strong>

                                                                @elseif(session()->get('language') == 'russia')
                                                                    <h2>{{$product->name_russia}}</h2>
                                                                    <strong>Купить</strong>

                                                                @else
                                                                    <h2> {{$product->name_english}}</h2>
                                                                    <strong>Buy</strong>

                                                                @endif

                                                            </div>
                                                            <div class="column-2">

                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                @endforeach


                                    </ul>
                                @else

                                    <div id="no-results">
                                        <h1 class="fs-28">
                                            <div class="wrapper-mask-reverse">
                                                <span>No results found</span>
                                            </div>
                                        </h1>
                                    </div>
                                @endif

                            </div>
                        </div>
                    </div>
                </section>

            </main>


        </div>


        {{--@include('layout.site-layout.footer')--}}

    </div>

@endsection
