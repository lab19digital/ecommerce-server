<?php

namespace Lab19\Cart\Services;

use Illuminate\Support\Facades\Cache;
use Lab19\Cart\Factories\CurrencyConverterFactory;

class CurrencyConversionManager
{

    protected $result;
    protected $sessionCurrency;
    protected $token;

    /*------------------Setters------------------*/
    /**
     * Set's the object result
     *
     * @param string
     */
    public function setResult($result)
    {
        $this->result = $result;
    }

    /**
     * Set's the object token
     *
     * @param string
     */
    public function setToken($token)
    {
        $this->token = $token;
    }


    /**
     * Set's the object sessionCurrency
     *
     * @param string
     */
    public function setSessionCurrency($sessionCurrency)
    {
        $this->sessionCurrency = $sessionCurrency;
    }


    /*------------------Getters------------------*/

    /**
     * Get's a conversion rate by it's currency
     *
     * @param string
     */
    public function fun()
    {
        return;
    }


    /*------------------Methods------------------*/
    /**
     * Convert between currency
     *
     * @param int
     */
    public function convertPrices()
    {
        $result = $this->result;
        $token = $this->token;
        $sessionCurrency = $this->sessionCurrency;

        foreach ($result as $key => $value) {
            $productCurrency = $result[$key]['price_currency']; //This becomes the base to convert from
            $productPriceCents = $result[$key]['price_cents'];

            if (!isset($productCurrency) && !isset($productPriceCents)) {
                continue;
            }

            // First try the cache for the rate
            $rate = Cache::get($token, null);

            if (isset($rate)) {
                // Convert according to the cached rate
                $result[$key]['price_cents'] = $this->convertCurrency($rate, $productPriceCents);

                continue;
            }

            print 'Should not reach this';

            // At this point there is no cached rate, and all variables are set so new up a currency object and convert price
            $currencyConverter = CurrencyConverterFactory::create($sessionCurrency, $productCurrency);

            // Set the new converted price
            $result[$key]['price_cents'] = $currencyConverter->convertCurrency($productPriceCents);
        }

        return $result;
    }

    /**
     * Convert between currency
     *
     * @param int
     */
    public function convertCurrency($rate, $amount)
    {
        return floor($amount * $rate);
    }
}
