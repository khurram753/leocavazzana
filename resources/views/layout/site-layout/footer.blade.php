<footer id="footer">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 flex-between assinaturas">
                <span style="border-bottom: 1px solid white;padding-top: 10px">

                    @if(session()->get('language') == 'english')
                        The information presented throughout the website is for informational
                        purposes only, therefore it is neither contractually binding nor does it
                        constitute or should be construed as investment advice .© 2020 by CEDRUS OÜ.
                        All rights reserved. Company No: 14673091 CEDRUS will not conduct regulated
                        finance and will work with approved partners where necessary if advice needs
                        to be given. Our services are limited to commercial finance and are for UHNW
                        professional clientele only. Your data is precious to us and are kept
                        securely; we are registered with the Information Commissioners Office Reg.
                        No: ZA454831 . We comply with full GDPR requirements and you have the right
                        to request what data may be held by yourself at anytime

                    @elseif(session()->get('language') == 'french')
                        Les informations présentées sur le site Web sont à titre informatif uniquement, elles ne sont
                        donc ni contractuelles, ni ne constituent ou ne doivent être interprétées comme des conseils en
                        investissement. © 2020 par CEDRUS OÜ. Tous les droits sont réservés. Numéro d'entreprise:
                        14673091 CEDRUS ne mènera pas de financement réglementé et travaillera avec des partenaires
                        agréés si nécessaire si des conseils doivent être donnés. Nos services sont limités au
                        financement commercial et s'adressent uniquement à la clientèle professionnelle de UHNW. Vos
                        données nous sont précieuses et sont conservées en toute sécurité; nous sommes enregistrés
                        auprès du Bureau des commissaires à l'information Reg. Non: ZA454831. Nous nous conformons à
                        toutes les exigences du RGPD et vous avez le droit de demander quelles données peuvent être
                        détenues par vous-même à tout moment

                    @elseif(session()->get('language') == 'russia')
                        Информация, представленная на веб-сайте, предназначена только для информационных целей, поэтому
                        она не является обязательной для исполнения контрактом, не является и не должна рассматриваться
                        как инвестиционный совет. © 2020 by CEDRUS OÜ. Все права защищены. Номер компании: 14673091
                        CEDRUS не будет осуществлять регулируемое финансирование и будет работать с утвержденными
                        партнерами при необходимости, если потребуется консультация. Наши услуги ограничиваются
                        коммерческим финансированием и предназначены только для профессиональных клиентов UHNW. Ваши
                        данные ценны для нас и надежно хранятся; мы зарегистрированы в Управлении уполномоченных по
                        информации Рег. №: ZA454831. Мы полностью соблюдаем требования GDPR, и вы имеете право в любое
                        время запросить, какие данные могут храниться у вас.
                    @else
                        The information presented throughout the website is for informational
                        purposes only, therefore it is neither contractually binding nor does it
                        constitute or should be construed as investment advice .© 2020 by CEDRUS OÜ.
                        All rights reserved. Company No: 14673091 CEDRUS will not conduct regulated
                        finance and will work with approved partners where necessary if advice needs
                        to be given. Our services are limited to commercial finance and are for UHNW
                        professional clientele only. Your data is precious to us and are kept
                        securely; we are registered with the Information Commissioners Office Reg.
                        No: ZA454831 . We comply with full GDPR requirements and you have the right
                        to request what data may be held by yourself at anytime
                    @endif
                </span>
                @if(session()->get('language') == 'english')
                    <span style="padding-top: 10px">
                        <a href="{{route('terms')}}" rel="noopener">
                            <span class="fw-bold">TERMS AND CONDITIONS</span>
                        </a>&bull;
                        <a href="{{route('privacy')}}" rel="noopener">
                            <span class="fw-bold">PRIVACY POLICY</span>
                        </a>&bull;
                        <a href="{{route('disclaimer')}}" rel="noopener">
                            <span class="fw-bold">DISCLAIMER</span>
                        </a>
                    </span>
                @elseif(session()->get('language') == 'french')
                    <span style="padding-top: 10px">
                        <a href="{{route('terms')}}" rel="noopener">
                            <span class="fw-bold">Termes et conditions</span>
                        </a>&bull;
                        <a href="{{route('privacy')}}" rel="noopener">
                            <span class="fw-bold">Politique de confidentialité</span>
                        </a>&bull;
                        <a href="{{route('disclaimer')}}" rel="noopener">
                            <span class="fw-bold">Avertissement</span>
                        </a>
                    </span>
                @elseif(session()->get('language') == 'russia')
                    <span style="padding-top: 10px">
                        <a href="{{route('terms')}}" rel="noopener">
                            <span class="fw-bold">Сроки и условия</span>
                        </a>&bull;
                        <a href="{{route('privacy')}}" rel="noopener">
                            <span class="fw-bold">Политика конфиденциальности</span>
                        </a>&bull;
                        <a href="{{route('disclaimer')}}" rel="noopener">
                            <span class="fw-bold">Отказ от ответственности</span>
                        </a>
                    </span>

                @else

                    <span style="padding-top: 10px">
                        <a href="{{route('terms')}}" rel="noopener">
                            <span class="fw-bold">TERMS AND CONDITIONS</span>
                        </a>&bull;
                        <a href="{{route('privacy')}}" rel="noopener">
                            <span class="fw-bold">PRIVACY POLICY</span>
                        </a>&bull;
                        <a href="{{route('disclaimer')}}" rel="noopener">
                            <span class="fw-bold">DISCLAIMER</span>
                        </a>
                    </span>
                @endif
            </div>
        </div>
    </div>
</footer>
