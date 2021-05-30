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
        $FormAction = route('showPaymentForm');

        include(app_path('Helpers/Direct_PHP/Templates/FormHeader.tpl'));

//        include ("Templates/FormHeader.tpl");

        $Amount = $product['price'];
        $CurrencyShort = "$";
        $OrderID = $product['name'];
        $OrderDescription = "abc";

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

    public function paymentFormFile($request)
    {

        include (app_path('Helpers/Direct_PHP/PreProcessPaymentForm.php'));

//        include ("PreProcessPaymentForm.php");

        $Width = 800;
        include (app_path("Helpers/Direct_PHP/Templates/FormHeader.tpl"));

        switch ($NextFormMode)
        {
            case "RESULTS":
                if (isset($DuplicateTransaction) != true)
                {
                    $DuplicateTransaction = false;
                }
                if ($TransactionSuccessful == false)
                {
                    $MessageClass = "ErrorMessage";
                }
                else
                {
                    $MessageClass = "SuccessMessage";
                }
                include (app_path("Helpers/Direct_PHP/Templates/FinalResultsPanel.tpl"));

//                include ("Templates/FinalResultsPanel.tpl");
                break;
            case "THREE_D_SECURE":
                $SiteSecureBaseURL = PaymentFormHelper::getSiteSecureBaseURL();
                include (app_path("Helpers/Direct_PHP/Templates/3DSIFrame.tpl"));

//                include ("Templates/3DSIFrame.tpl");
                break;
            case "PAYMENT_FORM":
                if (isset($Message) == true &&
                    $Message != "")
                {
                    include (app_path("Helpers/Direct_PHP/Templates/ProcessingErrorResultsPanel.tpl"));

//                    include ("Templates/ProcessingErrorResultsPanel.tpl");
                }

                if ($SuppressFormDisplay == false)
                {

                    include(app_path('Helpers/Direct_PHP/ISOCountries.php'));
                    include(app_path('Helpers/Direct_PHP/ISOCurrencies.php'));

//                    include ("ISOCountries.php");
//                    include ("ISOCurrencies.php");

                    if ($iclISOCurrencyList->getISOCurrency($CurrencyShort, $icISOCurrency))
                    {
                        $szDisplayAmount = $icISOCurrency->getAmountCurrencyString($Amount);
                    }

                    $szHashDigest = \PaymentFormHelper::calculateHashDigest(PaymentFormHelper::generateStringToHash($Amount,
                        $CurrencyShort,
                        $OrderID,
                        $OrderDescription,
                        $SecretKey));

                    $lilExpiryDateMonthList = \PaymentFormHelper::createExpiryDateMonthListItemList($ExpiryDateMonth);
                    $lilExpiryDateYearList = \PaymentFormHelper::createExpiryDateYearListItemList($ExpiryDateYear);
                    $lilStartDateMonthList = \PaymentFormHelper::createStartDateMonthListItemList($StartDateMonth);
                    $lilStartDateYearList = \PaymentFormHelper::createStartDateYearListItemList($StartDateYear);

                    $lilISOCountryList = \PaymentFormHelper::createISOCountryListItemList($CountryShort, $iclISOCountryList);

                    include(app_path('Helpers/Direct_PHP/Templates/PaymentForm.tpl'));

//                    include ("Templates/PaymentForm.tpl");
                }
                break;
        }
        include(app_path('Helpers/Direct_PHP/Templates/FormFooter.tpl'));

//        include ("Templates/FormFooter.tpl");
    }
}
