<?php

namespace Gernzy\Server\Packages\Stripe\Actions;

use \App;
use Gernzy\Server\Classes\ActionClass;
use Gernzy\Server\Exceptions\GernzyException;
use Gernzy\Server\Services\ActionInterface;
use Illuminate\Support\Facades\Log;

class StripeTransactionHistory implements ActionInterface
{
    public function __construct()
    {
    }

    public function run(ActionClass $action)
    {
        // Get the data passed on from the event
        $data = $action->getOriginalData();

        // Check if paypal was chosen as payment provider
        if (
            isset($data['payment_method']) &&
            isset($data['order_transaction_id']) &&
            $data['payment_method'] == 'stripe_standard'
        ) {
            $paymentMethod = $data['payment_method'];
            $orderTransactionId = $data['order_transaction_id'];
        } else {
            return $action;
        }

        $stripeService = App::make('Stripe\StripeService');
        $providerName = $stripeService->providerName() ?? 'Stripe';
        $orderTransactionHistory = $stripeService->getTransactionHistory($orderTransactionId) ?? '';

        // Safety checks
        if (!isset($orderTransactionHistory)) {
            Log::error("The order Transaction History for Stripe is empty for transaction " . $orderTransactionId, ['package' => $providerName]);
            throw new GernzyException(
                "The order Transaction History for Stripe is empty for transaction " . $orderTransactionId,
                'Stripe'
            );
        }


        // Pass on the data for later use
        $action->attachData(StripeTransactionHistory::class, $orderTransactionHistory);

        return $action;
    }
}
