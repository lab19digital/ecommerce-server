<?php

namespace Lab19\Cart\Services;

class CurrencyConversionOpenexchangerates implements CurrencyConversionInterface
{
    public $currency;
    public $rate;
    public $baseCurrency;
    public $timestamp;
    public $api_response;
    public const API_BASE_PATH = "https://openexchangerates.org/api/";


    /*------------------Setters------------------*/
    /**
     * Set's the object currency
     *
     * @param string
     */
    public function setCurrency($currency = '')
    {
        $this->currency = $currency;
    }

    /**
     * This function makes the api request to open exchange api. It then sets the response to
     * the api_response object property. It reads the api token from the env file.
     *
     * @param string
     */
    public function setResponseFromOpenExhange()
    {
        $token = env('currency_api_token', '');

        // Make sure the token and base currency is available
        if (!isset($token) && !isset($this->baseCurrency)) {
            return null;
        }

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
        if (!isset($this->currency) || !isset($this->api_response)) {
            return null;
        }

        $currency = $this->currency;
        $api_response = $this->api_response;
        $this->rate = $api_response->rates->$currency;
    }


    /**
     * Set's the object base currency
     *
     * @param string
     */
    public function setBaseCurrency($baseCurrency = '')
    {
        $this->baseCurrency = $baseCurrency;
    }


    /*------------------Getters------------------*/

    /**
     * Get's a conversion rate by it's currency
     *
     * @param string
     */
    public function getRate()
    {
        return $this->rate;
    }


    /*------------------Methods------------------*/
    /**
     * Convert between currency
     *
     * @param int
     */
    public function convertCurrency($amount)
    {
        return floor($amount * $this->rate);
    }
}
