<?php

namespace Lab19\Cart\Factories;

use Lab19\Cart\Services\CurrencyConversionOpenexchangerates;

class CurrencyConverterFactory
{
    public static function create($currency, $base)
    {
        $currencyObject = new CurrencyConversionOpenexchangerates($currency, $base);
        $currencyObject->setCurrency($currency);
        $currencyObject->setBaseCurrency($base);
        $currencyObject->setResponseFromOpenExhange(); //This function does the api call
        $currencyObject->setRate();
        return $currencyObject;
    }
}
