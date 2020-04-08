<?php

namespace Gernzy\Server\Packages\Stripe\Actions;

use \App;
use Gernzy\Server\Classes\ActionClass;
use Gernzy\Server\Exceptions\GernzyException;
use Gernzy\Server\Services\ActionInterface;
use Gernzy\Server\Services\ExhangeRatesManager;

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
        $sessionService = $data['session_service'];

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

        // Check if the user has chosen a specific currency and then convert the cart total
        $session = $sessionService->raw();
        $sessionCurrency = config('currency.default_currency.iso_code');

        if (isset($session['data']['currency']) && !empty($session['data']['currency'])) {
            $sessionCurrency = $session['data']['currency'];

            // Convert cart total if different currency has been chosen
            $data = [
                'cart' => (object) ['cart_total' => $cartTotal]
            ];

            $convertedTotal = App::make(ExhangeRatesManager::class)
                ->setPrices($data)
                ->setTargetCurrency($sessionCurrency)
                ->convertPrices();

            $cartTotal = $convertedTotal['cart']->cart_total;
        }

        // Use the stripe service to interact with the api
        $stripeService = App::make('Stripe\StripeService');
        $secret = $stripeService->getSecret($cartTotal, $sessionCurrency);

        // Pass on the data for later use, note the secret should not be logged or stored
        $action->attachData(StripeBeforeCheckout::class, ['stripe_data' => $secret]);

        return $action;
    }
}
