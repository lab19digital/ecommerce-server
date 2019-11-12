<?php

namespace Lab19\Cart\Factories;

use Lab19\Cart\Services\Openexchangerates;

class OpenexchangeratesFactory
{
    public static function create($currency, $base)
    {
        $currencyObject = new Openexchangerates($currency, $base);
        $currencyObject->setCurrency($currency);
        $currencyObject->setBaseCurrency($base);
        $currencyObject->setResponseFromOpenExchange(); //This function does the api call
        $currencyObject->setRate();
        return $currencyObject;
    }
}
