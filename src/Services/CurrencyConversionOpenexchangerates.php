<?php

namespace Lab19\Cart\Services;

class CurrencyConversionOpenexchangerates implements CurrencyConversionInterface
{
    protected $currency;
    protected $rate;
    protected $baseCurrency;
    protected $timestamp;
    protected $api_response;
    protected const API_BASE_PATH = "https://openexchangerates.org/api/";

    /**
     *  constructor.
     *
     * @param CurrencyConversionInterface $currency
     */
    public function __construct($currency, $baseCurrency)
    {
        $this->currency = $currency;
        $this->baseCurrency = $baseCurrency;
    }

    /**
     * Get's a conversion rate by it's currency
     *
     * @param string
     */
    public function getRate()
    {
        return $this->rate;
    }

    /**
     * Get response
     *
     * @param string
     */
    public function setResponseFromOpenExhange()
    {
        $token = env('currency_api_token', '');
        $endpoint = self::API_BASE_PATH . "latest.json?app_id=" . $token . "&base=" . $this->baseCurrency;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $endpoint);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($ch);
        curl_close($ch);
        $output = json_decode($output);
        $this->api_response = $output;
    }

    /**
     * Set's a conversion rate by it's currency
     *
     * @param int
     */
    public function setRate()
    {
        if (isset($currency) || isset($api_response)) {
            return null;
        }

        $currency = $this->currency;
        $api_response = $this->api_response;
        $this->rate = $api_response->rates->$currency;
    }

    /**
     * Set the cart currency
     *
     * @param int
     */
    public function setCartCurrency()
    {
        $cart = resolve('Lab19\CartService');
        return $cart;
    }


    /**
     * Convert between currency
     *
     * @param int
     */
    public function convertCurrency($amount)
    {
        return $amount * $this->rate;
    }
}
