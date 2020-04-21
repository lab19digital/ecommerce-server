<?php

namespace  Gernzy\Server\Packages\Stripe\Services;

use Gernzy\Server\Exceptions\GernzyException;

class StripeService implements ServiceInterface
{
    public function __construct()
    {
    }

    public function getSecret($paymentIntent)
    {
        if (isset($paymentIntent->client_secret)) {
            return $paymentIntent->client_secret;
        }

        throw new GernzyException(
            'The response did not include a secret.',
            'Please recreate the intent.'
        );
    }

    public function createPaymentIntent($amount, $currency)
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

        return $intent;
    }
}
