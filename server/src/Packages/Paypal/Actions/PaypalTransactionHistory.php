<?php

namespace Gernzy\Server\Packages\Paypal\Actions;

use \App;
use Gernzy\Server\Classes\ActionClass;
use Gernzy\Server\Exceptions\GernzyException;
use Gernzy\Server\Services\ActionInterface;
use Illuminate\Support\Facades\Log;

class PaypalTransactionHistory implements ActionInterface
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
            $data['payment_method'] == 'paypal_standard'
        ) {
            $paymentMethod = $data['payment_method'];
            $orderTransactionId = $data['order_transaction_id'];
        } else {
            return $action;
        }

        $paypalService = App::make('Paypal\PaypalService');
        $providerName = $paypalService->providerName() ?? 'Paypal';
        $orderTransactionHistory = $paypalService->getTransactionHistory($orderTransactionId) ?? '';

        // Safety checks
        if (!isset($orderTransactionHistory)) {
            Log::error("The order Transaction History for Paypal is empty for transaction " . $orderTransactionId, ['package' => $providerName]);
            throw new GernzyException(
                "The order Transaction History for Paypal is empty for transaction " . $orderTransactionId,
                'Paypal'
            );
        }


        // Pass on the data for later use
        $action->attachData(PaypalTransactionHistory::class, $orderTransactionHistory);

        return $action;
    }
}
