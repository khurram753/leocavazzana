@extends('layout.site-layout.index')

@section('title')
    Gear
@endsection

@section('tags')
    <meta name="csrf-token" content="{{ csrf_token() }}"/>
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
                                                <span>Gear</span>
                                            </div>
                                        @elseif(session()->get('language') == 'russia')
                                            <div class="wrapper-mask-reverse">
                                                <span>Механизм</span>
                                            </div>
                                        @elseif(session()->get('language') == 'french')
                                            <div class="wrapper-mask-reverse">
                                                <span>Équipement</span>
                                            </div>
                                        @else
                                            <div class="wrapper-mask-reverse">
                                                <span>Gear</span>
                                            </div>
                                        @endif
                                    </h1>


                                </div>

                                {{--                                <div class="container-search" data-aos="fadeIn" data-search-set>--}}
                                {{--                                    <label for="">Search</label>--}}
                                {{--                                    <input type="search" class="search">--}}
                                {{--                                </div>--}}
                            </div>

                            <div class="col-lg-10 col-md-9 column-produtos">
                                @if(sizeof($products) > 0)
                                    <ul class="products-list">


                                        @foreach($products as $product)
                                            @if(session()->get('language') == 'english')
                                                <li class="active" data-search="{{$product->name_english}}"
                                                    data-filter="{{$product->name_english}}">
                                            @elseif(session()->get('language') == 'french')
                                                <li class="active" data-search="{{$product->name_french}}"
                                                    data-filter="{{$product->name_french}}">
                                            @elseif(session()->get('language') == 'russia')
                                                <li class="active" data-search="{{$product->name_russia}}"
                                                    data-filter="{{$product->name_russia}}">
                                            @else
                                                <li class="active" data-search="{{$product->name_english}}"
                                                    data-filter="{{$product->name_english}}">
                                                    @endif

                                                    <a href="javascript:void(0)" data-fancybox class="buyCourseBtn"
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
                                                                    <button class="buyCourseBtn" type="button"
                                                                            data-id="{{$product->id}}">
                                                                        Buy
                                                                    </button>
                                                                    {{--                                                                    <strong>Buy</strong>--}}

                                                                @elseif(session()->get('language') == 'french')
                                                                    <h2> {{$product->name_french}}</h2>
                                                                    {{--                                                                    <strong>Acheter</strong>--}}
                                                                    <button class="buyCourseBtn" type="button"
                                                                            data-id="{{$product->id}}">
                                                                        Acheter
                                                                    </button>

                                                                @elseif(session()->get('language') == 'russia')
                                                                    <h2>{{$product->name_russia}}</h2>
                                                                    {{--                                                                    <strong>Купить</strong>--}}
                                                                    <button class="buyCourseBtn" type="button"
                                                                            data-id="{{$product->id}}">
                                                                        Acheter
                                                                    </button>

                                                                @else
                                                                    <h2> {{$product->name_english}}</h2>
                                                                    {{--                                                                    <strong>Buy</strong>--}}

                                                                    @auth
                                                                        <a class="buyCourseBtn"
                                                                           href="javascript:void(0)"
                                                                           data-id="{{$product->id}}">
                                                                            Buy
                                                                        </a>
                                                                    @else
                                                                        <a class="buyCourseBtn"
                                                                           href="{{route('userLogin')}}"
                                                                           data-id="{{$product->id}}">
                                                                            Buy
                                                                        </a>
                                                                    @endauth

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


        @include('layout.site-layout.footer')

    </div>

@endsection


@section('script')
    @auth
        <script src="https://js.stripe.com/v3/"></script>

        <script>
            $(document).ready(function () {
                $('.buyCourseBtn').click(function (e) {
                    e.preventDefault();
                    var stripe = Stripe('{{env('STRIPE_KEY')}}');

                    var data = $(this).data('id');

                    showLoadingImage();


                    $.ajax({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        method: 'POST',
                        url: '{{route('createStripeSessionForProducts')}}',
                        data: {product_id: data},
                        success: function (response, status) {
                            if (response.result == 'success') {
                                hideLoadingImage();
                                return stripe.redirectToCheckout({sessionId: response.data});

                            } else if (response.result == 'error') {
                                hideLoadingImage();
                                errorMsg(response.message);
                            }
                        },
                        error: function (data) {
                            $.each(data.responseJSON.errors, function (key, value) {
                                hideLoadingImage();
                                errorMsg(value);
                            });
                        }

                    });


                });

            });
        </script>
    @endauth
@endsection

