<?php

namespace  Stripe\Services;

class StripeService
{
    public function __construct()
    {
    }

    public function getSecret($amount, $currency)
    {
        // Set your secret key. Remember to switch to your live secret key in production!
        // See your keys here: https://dashboard.stripe.com/account/apikeys
        // This should live in .env through config
        // \Stripe\Stripe::setApiKey('put key from env');

        // $intent = \Stripe\PaymentIntent::create([
        //     'amount' => 1099,
        //     'currency' => 'usd',
        //     // Verify your integration in this guide by including this parameter
        //     'metadata' => ['integration_check' => 'accept_a_payment'],
        // ]);
    }
}
