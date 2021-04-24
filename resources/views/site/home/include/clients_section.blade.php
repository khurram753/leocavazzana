<section class="section section-clientes-2">
    <div class="container-fluid">
        <div class="row row-1">
            <div class="col-12 column-1">
                <a
                    class="btn-arrow btn-arrow--brown btn-arrow--left btn-arrow--reverse btn-clientes-voltar"
                    href="javascript:void(0)">
                    <span>Go Back</span><i><span></span></i>
                </a>
            </div>
        </div>

        <div class="row row-2">
            <ul class="lista-marcas">
                @foreach($clients as $client)
                    <li>
                        <a href="javascript:void(0)" target="_blank" rel="noopener">
                            <div class="container-img">
                                <div class="imgs">
                                    <img class="" src="{{asset($client->image)}}" alt="Adidas"/>
                                </div>
                            </div>
                        </a>
                    </li>
                @endforeach


            </ul>
        </div>
    </div>
</section>
