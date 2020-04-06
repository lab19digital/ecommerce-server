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
        // $data = $action->getOriginalData();

        $sessionService = App::make('Gernzy\SessionService');
        $cartService = App::make('Gernzy\ServerService');


        if (empty($sessionService->get())) {
            throw new GernzyException(
                'The session does not exist.',
                'Please make sure the token is valid.'
            );
        }

        $cartTotal = (int) $cartService->getCartTotal();

        if (!isset($cartTotal) || $cartTotal <= 0) {
            throw new GernzyException(
                'The cart total has to be more than 0.',
                'Please make sure the charge amount is more than 0.'
            );
        }

        $stripeService = App::make('Stripe\StripeService');
        $secret = $stripeService->getSecret($cartTotal, 'usd');

        $action->attachData(StripeBeforeCheckout::class, ['stripe_data' => $secret]);

        return $action;
    }
}
