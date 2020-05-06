<?php

namespace Gernzy\Server\Packages\Paypal\Actions;

use \App;
use Gernzy\Server\Classes\ActionClass;
use Gernzy\Server\Exceptions\GernzyException;
use Gernzy\Server\Services\ActionInterface;
use Gernzy\Server\Services\ExhangeRatesManager;

class PaypalBeforeCheckout implements ActionInterface
{
    public function __construct()
    {
    }

    public function run(ActionClass $action)
    {
        // Get the data passed on from the event
        $data = $action->getOriginalData();

        // Check if stripe was chosen as payment provider
        if (isset($data['payment_method']) && $data['payment_method'] == 'paypal_standard') {
            $payment_method = $data['payment_method'];
        } else {
            return $action;
        }

        $sessionService = $data['session_service'];
        $cartService = $data['cart_service'];
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
        $paypalService = App::make('Paypal\PaypalService');
        // $paymentIntent = $paypalService->createPaymentIntent($cartTotal, $sessionCurrency);
        // $secret = $paypalService->getSecret($paymentIntent);

        // Remove the secret from transaction_data as it will be save in the database
        // $paymentIntent['client_secret'] = null;

        // Pass on the data for later use, note the secret should not be logged or stored
        $action->attachData(PaypalBeforeCheckout::class, [
            'paypal_secret' => '$secret',
            'redirect_url' => url("/payment-paypal"),
            'transaction_data' => ['paypal_payment_intent' => '$paymentIntent']
        ]);

        return $action;
    }
}
