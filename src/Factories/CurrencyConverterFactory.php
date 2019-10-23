<?php
namespace Lab19\Cart\Factories;

use Lab19\Cart\Services\CurrencyConversionOpenexchangerates;

class CurrencyConverterFactory
{
    public static function create($currency, $base)
    {
        $currencyObject = new CurrencyConversionOpenexchangerates($currency, $base);
        $currencyObject->setResponseFromOpenExhange();
        $currencyObject->setRate();
        return $currencyObject;
    }
}
