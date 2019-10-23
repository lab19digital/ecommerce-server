<?php

namespace Lab19\Cart\Services;

class CurrencyConversionOpenexchangerates implements CurrencyConversionInterface
{
    protected $currency;
    protected $rate;
    protected $base;

    /**
     *  constructor.
     *
     * @param CurrencyConversionInterface $currency
     */
    public function __construct($currency, $base = 'USD')
    {
        $this->currency = $currency;
        $this->base = $base;
        $this->setRate();
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
     * Set's a conversion rate by it's currency
     *
     * @param int
     */
    public function setRate()
    {
        $endpoint = "https://openexchangerates.org/api/latest.json?app_id=" . env('currency_api_token', '');
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $endpoint);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $output = curl_exec($ch);
        curl_close($ch);
        $output = json_decode($output);
        $currency = $this->currency;
        $this->rate = $output->rates->$currency;
    }

    /**
     * Set the cart currency
     *
     * @param int
     */
    public function setCartCurrency()
    {
    }
}
