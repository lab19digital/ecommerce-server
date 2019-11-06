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

        return $this;
    }

    /**
     * Set's the object token
     *
     * @param string
     */
    public function setToken($token)
    {
        $this->token = $token;
        return $this;
    }

    /**
     * Set's the object sessionCurrency
     *
     * @param string
     */
    public function setSessionCurrency($sessionCurrency)
    {
        $this->sessionCurrency = $sessionCurrency;
        return $this;
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

        // TODO: Probably a good scenario for a singleton object
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

            // At this point there is no cached rate, and all variables are set so new up a currency object and convert price.
            // note that this makes the api call, thus caching the result afterwards reduces api usage
            $currencyConverter = CurrencyConverterFactory::create($sessionCurrency, $productCurrency);

            // Set the new converted price
            $result[$key]['price_cents'] = $currencyConverter->convertCurrency($productPriceCents);

            // Set the cache with the rate for the user
            if (isset($token)) {
                Cache::put($token, $currencyConverter->getRate(), 1800);
            }
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
