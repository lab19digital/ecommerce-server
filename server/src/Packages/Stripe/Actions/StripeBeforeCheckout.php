<?php

namespace Gernzy\Server\Packages\StripePackage\Actions;

use Gernzy\Server\Classes\ActionClass;
use Gernzy\Server\Services\ActionInterface;

class StripeBeforeCheckout implements ActionInterface
{
    public function __construct()
    {
    }

    public function run(ActionClass $action)
    {
        $data = $action->getOriginalData();

        $cart = $data[0];

        // $cart = $me->cart();
        // $itemsTotal = $cart->calcCartTotal();

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

        // Add some third party specific data
        // array_push($data, [
        //     'secret' => $cartTotal
        // ]);

        $action->attachData(StripeBeforeCheckout::class, ['cart' => $cart]);

        // return $action;
        return $action;
    }
}
