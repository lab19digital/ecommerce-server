<?php

namespace Lab19\Cart\Services;

interface CurrencyConversionInterface
{
    /**
     * Get's a conversion rate by it's currency
     *
     * @param string
     */
    public function getRate();

    /**
     * Set's a conversion rate by it's currency
     *
     * @param int
     */
    public function setRate();

    /**
     * Set's a currecy in the cart session object
     *
     * @param int
     */
    public function setCartCurrency();

    /**
     * Set's a currecy in the cart session object
     *
     * @param int
     */
    public function convertCurrency($amount);
}
