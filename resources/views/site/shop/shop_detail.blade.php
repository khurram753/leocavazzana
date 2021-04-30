@extends('layout.site-layout.index')

@section('title')
    Shop
@endsection

@section('content')
    <div class="wrapper" id="pg-product">
        <div id="main-transition">
            <main>
                <section class="section flex-center" id="product">
                    <div class="container-fluid">
                        <div class="row flex-initial">
                            <div class="col-lg-3 col-md-4 offset-lg-1 col-12">
                                <div class="container-img">
                                    <img src="{{asset($product->featured_image)}}"
                                         data-aos="reveal-left"
                                         class="aos-animate"/>
                                </div>

                                <div class="container-text aos-animate" data-aos="fadeIn">
                                    @if(session()->get('language') == 'english')
                                        <h1 class="fs-60">{{$product->name_english}}</h1>
                                    @elseif(session()->get('language') == 'french')
                                        <h1 class="fs-60">{{$product->name_french}}</h1>
                                    @elseif(session()->get('language') == 'russia')
                                        <h1 class="fs-60">{{$product->name_russia}}</h1>
                                    @else
                                        <h1 class="fs-60">{{$product->name_english}}</h1>
                                    @endif
                                    <h2 class="fs-28"></h2>
                                    <p class="fs-28 my-30"></p>
                                </div>
                            </div>
                            <div class="col-lg-5 col-md-7 col-12 flex-center aos-animate"
                                 data-aos="">
                                <div class="column">
                                    <h3 class="title font font-2 fs-60 aos-animate"
                                        data-aos="fadeIn">
                                        <span>
                                            Are you interest in this picture? <br/>
                                            Leave me a message!
                                        </span>
                                    </h3>

                                    <form id="form-contato"
                                          class="row aos-animate"
                                          data-aos="fadeIn">
                                        <input type="hidden" name="assunto" value="[Loja] Observador - "/>
                                        <div class="container-input col-md-6">
                                            <label for="nome">Name</label>
                                            <input id="nome" name="nome" type="text" required=""/>
                                        </div>
                                        <div class="container-input col-md-6">
                                            <label for="email">E-mail</label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required=""/>
                                        </div>
                                        `

                                        <div class="container-textarea col-12">
                                            <textarea id="mensagem" name="mensagem"
                                                      placeholder="Send a message here..."></textarea>
                                        </div>
                                        <div class="container-submit col-12">
                                            <button class="bt-submit hide-on-submit">
                                                <i class="arrow-link-black"></i><span>Send</span>
                                            </button>
                                            <i class="icon-urso hide-on-submit"></i>
                                            <h3 id="feedback-contato"
                                                class="d-none bt-submit"
                                                data-aos="fadeInUp">

                                            </h3>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    </div>

@endsection
