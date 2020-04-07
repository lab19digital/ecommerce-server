<?php

namespace Gernzy\Server\Packages\Stripe\Actions;

use \App;
use Gernzy\Server\Classes\ActionClass;
use Gernzy\Server\Exceptions\GernzyException;
use Gernzy\Server\Services\ActionInterface;

class StripeBeforeCheckout implements ActionInterface
{
    public function __construct()
    {
    }

    public function run(ActionClass $action)
    {
        // Get the data passed on from the event
        $data = $action->getOriginalData();

        // Get the cart service to interact with cart data
        $cartService = $data['cart_service'];

        // Use the cart service methods to interact with the cart
        $cartTotal = $cartService->getCartTotal();

        // Safety checks
        if (!isset($cartTotal) || $cartTotal <= 0) {
            throw new GernzyException(
                'The cart total has to be more than 0.',
                'Please make sure the charge amount is more than 0.'
            );
        }

        // Use the stripe service to interact with the api
        $stripeService = App::make('Stripe\StripeService');
        $secret = $stripeService->getSecret($cartTotal, 'usd');

        // Pass on the data for later use, note the secret should not be logged or stored
        $action->attachData(StripeBeforeCheckout::class, ['stripe_data' => $secret]);

        return $action;
    }
}
