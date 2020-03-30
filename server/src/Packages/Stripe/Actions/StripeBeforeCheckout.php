<?php

namespace Gernzy\Server\Packages\ExamplePackage\Actions;

use Gernzy\Server\Classes\ActionClass;
use Gernzy\Server\Services\ActionInterface;
use Illuminate\Support\Str;

class ExampleBeforeCheckout implements ActionInterface
{
    public function __construct()
    {
    }

    public function run(ActionClass $action)
    {
        $data = $action->getOriginalData();

        // $me = $data->getUser();

        // $me = $sessionService->getUser();
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

        // // Add some third party specific data
        // array_push($data, [
        //     'example_token' => Str::random(12),
        //     'example_date' => date("Y-m-d H:i:s")
        // ]);

        // $action->attachData(ExampleBeforeCheckout::class, $data);

        // return $action;
        return 'hello from package' . $data;
    }
}
