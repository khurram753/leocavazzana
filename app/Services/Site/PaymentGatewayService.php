<?php


namespace App\Services\Site;


class PaymentGatewayService
{
    static function start($product)
    {
        require_once (app_path('Helpers/Direct_PHP/PaymentFormHelper.php'));
        include(app_path('Helpers/Direct_PHP/Config.php'));
        include(app_path('Helpers/Direct_PHP/ISOCurrencies.php'));
//        require_once ("PaymentFormHelper.php");
//        include ("Config.php");
//        include ("ISOCurrencies.php");

        $Width = 800;
        $BodyAttributes = "";
        $FormAttributes = "";
        $FormAction = "PaymentForm.php";

        include(app_path('Helpers/Direct_PHP/Templates/FormHeader.tpl'));

//        include ("Templates/FormHeader.tpl");

        $Amount = $product['price'];
        $CurrencyShort = "$";
        $OrderID = $product['name'];
        $OrderDescription = "A Test Order";

        if ($iclISOCurrencyList->getISOCurrency($CurrencyShort, $icISOCurrency))
        {
            $DisplayAmount = $icISOCurrency->getAmountCurrencyString($Amount, false);
        }

        $HashDigest = \PaymentFormHelper::calculateHashDigest(\PaymentFormHelper::generateStringToHash($Amount,
            $CurrencyShort,
            $OrderID,
            $OrderDescription,
            $SecretKey));

//        include ("Templates/StartHereForm.tpl");
//        include ("Templates/FormFooter.tpl");

//        include(app_path('Helpers/Direct_PHP/Templates/StartHereForm.tpl'));
//        include(app_path('Helpers/Direct_PHP/Templates/FormFooter.tpl'));

        return view('site.shop.paymentForm',compact('product','HashDigest'));

    }
}
