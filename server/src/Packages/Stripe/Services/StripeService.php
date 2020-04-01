<?php

namespace  Gernzy\Server\Packages\Stripe\Services;

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
        \Stripe\Stripe::setApiKey(config('api.stripe_sk_key'));

        $intent = \Stripe\PaymentIntent::create([
            'amount' => $amount,
            'currency' => $currency,
            // Verify your integration in this guide by including this parameter
            'metadata' => ['integration_check' => 'accept_a_payment'],
        ]);

        if (isset($intent->client_secret)) {
            return $intent->client_secret;
        }

        return $intent;
    }
}
