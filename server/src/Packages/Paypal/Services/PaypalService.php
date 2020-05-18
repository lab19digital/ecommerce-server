<?php

namespace  Gernzy\Server\Packages\Paypal\Services;

use Gernzy\Server\Exceptions\GernzyException;
use Gernzy\Server\Models\OrderTransaction;
use Illuminate\Support\Facades\Log;

class PaypalService
{
    public function handleWebhookPaymentSucceededEvent($payload)
    {
        // Find the order transaction data
        $orderTransaction = OrderTransaction::where('transaction_data->paypal_data->result->id', $payload->result->id)->first();

        if (!isset($orderTransaction)) {
            Log::error('The transaction order data was not found for that successful payment.' + $payload->result->id);
            throw new GernzyException(
                'The transaction order data was not found for that successful payment.',
                ''
            );
        }

        /** Stripe may send the same event for succeeded multiple times. Thus check if the order status is already set to paid
         * and if not then continue with the flow
         */
        if ($orderTransaction->status === 'paid') {
            return;
        }

        // Update the status of the order transaction data to paid
        $orderTransaction->status = 'paid';

        // Remove the secret from event as it will be save in the database
        if (isset($payload->data->object->client_secret)) {
            $payload->data->object->client_secret = null;
        }

        // Add the stripe event data to the json column of transaction_data table
        $transaction_data = $orderTransaction->transaction_data;
        $transaction_data['paypal_payment_capture'] = $payload;

        $orderTransaction->transaction_data = $transaction_data;
        $orderTransaction->save();
    }
}
