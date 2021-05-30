<?php

require_once (app_path('Helpers/Direct_PHP/PaymentFormHelper.php'));
include(app_path('Helpers/Direct_PHP/Config.php'));

//	require_once ("PaymentFormHelper.php");
//	include ("Config.php");

//dd($request->all());
//	foreach ($_POST as $field => $value)
//	{
//		$$field = $value;
//	}

	$ResetFormVariables = false;
	$SuppressFormDisplay = false;
	$BodyAttributes = "";
	$FormAttributes = "";
	$FormAction = "PaymentForm.php";

	// Is this a postback?
	if (!isset($FormMode))
	{
		// need to check the integrity of the variables
		// coming from the shopping cart
		if (!isset($request->ShoppingCartAmount) &&
			!isset($request->ShoppingCartCurrencyShort) &&
			!isset($request->ShoppingCartOrderID) &&
			!isset($request->ShoppingCartOrderDescription) &&
			!isset($request->ShoppingCartHashDigest))
		{
			$NextFormMode = "PAYMENT_FORM";
			$Message = "No input variables passed";
			$SuppressFormDisplay = true;
		}
		else
		{
			$aVariables["Amount"] = "";
			$aVariables["CurrencyShort"] = "";
			$aVariables["OrderID"] = "";
			$aVariables["OrderDescription"] = "";

			if (isset($request->ShoppingCartAmount))
			{
				$aVariables["Amount"] = $request->ShoppingCartAmount;
			}
			if (isset($request->ShoppingCartCurrencyShort))
			{
				$aVariables["CurrencyShort"] = $request->ShoppingCartCurrencyShort;
			}
			if (isset($request->ShoppingCartOrderID))
			{
				$aVariables["OrderID"] = $request->ShoppingCartOrderID;
			}
			if (isset($request->ShoppingCartOrderDescription))
			{
				$aVariables["OrderDescription"] = $request->ShoppingCartOrderDescription;
			}
			if (!isset($request->ShoppingCartHashDigest))
			{
				$ShoppingCartHashDigest = "";
			}


			if (PaymentFormHelper::checkIntegrityOfIncomingVariables("SHOPPING_CART_CHECKOUT", $aVariables, $request->ShoppingCartHashDigest, $SecretKey))
			{
				$ResetFormVariables = true;
				$NextFormMode = "PAYMENT_FORM";
				$Amount = $request->ShoppingCartAmount;
				$CurrencyShort = $request->ShoppingCartCurrencyShort;
				$OrderID = $request->ShoppingCartOrderID;
				$OrderDescription = $request->ShoppingCartOrderDescription;

				dd();
			}
			else
			{
				$NextFormMode = "PAYMENT_FORM";
				$Message = "Variable tampering detected";
				$SuppressFormDisplay = true;
			}
		}
	}
	else
	{
		// do we try to process the payment?
		switch ($FormMode)
		{
			case "PAYMENT_FORM":
				// have just come from a payment form - try to process the payment
				// need to check the integrity of the variables coming back
				// from the payment form
				$aVariables["Amount"] = "";
				$aVariables["CurrencyShort"] = "";
				$aVariables["OrderID"] = "";
				$aVariables["OrderDescription"] = "";

				if (isset($Amount))
				{
					$aVariables["Amount"] = $Amount;
				}
				if (isset($CurrencyShort))
				{
					$aVariables["CurrencyShort"] = $CurrencyShort;
				}
				if (isset($OrderID))
				{
					$aVariables["OrderID"] = $OrderID;
				}
				if (isset($OrderDescription))
				{
					$aVariables["OrderDescription"] = $OrderDescription;
				}
				if (!isset($HashDigest))
				{
					$HashDigest = "";
				}

				if (PaymentFormHelper::checkIntegrityOfIncomingVariables("PAYMENT_FORM_POSTBACK", $aVariables, $HashDigest, $SecretKey))
				{
					include ("ProcessPayment.php");
				}
				else
				{
                    dd('def');
					$NextFormMode = "PAYMENT_FORM";
					$Message = "Variable tampering detected";
					$SuppressFormDisplay = true;
				}
				break;
			case "RESULTS":
				$ResetFormVariables = true;
				$NextFormMode = "PAYMENT_FORM";
				break;
			case "THREE_D_SECURE":
				// have just come from a payment form - try to process the payment
				// need to check the integrity of the variables coming from the
				// 3DS form
				$aVariables["PaRES"] = "";
				$aVariables["CrossReference"] = "";

				if (isset($PaRES))
				{
					$aVariables["PaRES"] = $PaRES;
				}
				if (isset($CrossReference))
				{
					$aVariables["CrossReference"] = $CrossReference;
				}
				if (!isset($ShoppingCartHashDigest))
				{
					$ShoppingCartHashDigest = "";
				}
				if (PaymentFormHelper::checkIntegrityOfIncomingVariables("THREE_D_SECURE", $aVariables, $ShoppingCartHashDigest, $SecretKey))
				{
                    include(app_path('Helpers/Direct_PHP/ThreeDSecureAuthentication.php'));

//                    include ("ThreeDSecureAuthentication.php");
				}
				else
				{
                    dd('efg');
					$NextFormMode = "PAYMENT_FORM";
					$Message = "Variable tampering detected";
					$SuppressFormDisplay = true;
				}
				break;
		}
	}

	// Reset the form variables if required
	if ($ResetFormVariables == true)
	{
		$CardName = "";
		$CardNumber = "";
		$ExpiryDateMonth = "";
		$ExpiryDateYear = "";
		$StartDateMonth = "";
		$StartDateYear = "";
		$IssueNumber = "";
		$CV2 = "";
		$Address1 = "";
		$Address2 = "";
		$Address3 = "";
		$Address4 = "";
		$City = "";
		$State = "";
		$PostCode = "";
		$CountryShort = "";
	}
?>
