<?php

namespace  Gernzy\Server\Packages\Paypal\Services;

interface PaypalServiceInterface
{
    /**
     * Return a secret from Stripe
     *
     * @param string
     */
    public function createOrder($debug, $cartTotal, $sessionCurrency);
}
