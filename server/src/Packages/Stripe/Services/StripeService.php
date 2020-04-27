<?php

namespace  Gernzy\Server\Packages\Stripe\Services;

use Gernzy\Server\Exceptions\GernzyException;
use Gernzy\Server\Models\OrderTransaction;
use Illuminate\Support\Facades\Log;

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

    public function handleWebhookPaymentSucceededEvent($event)
    {

        // Find the order transaction data
        $paymentIntent = $event->data->object; // contains a \Stripe\PaymentIntent
        $orderTransaction = OrderTransaction::where('transaction_data->stripe_payment_intent->id', $paymentIntent->id)->first();

        if (!isset($orderTransaction)) {
            throw new GernzyException(
                'The transaction order data was not found for that successful payment.',
                ''
            );

            Log::error('The transaction order data was not found for that successful payment.' + $paymentIntent);
        }

        // Update the status of the order transaction data to paid
        $orderTransaction->status = 'paid';

        // Remove the secret from event as it will be save in the database
        if (isset($event->data->object->client_secret)) {
            $event->data->object->client_secret = null;
        }

        // Add the stripe event data to the json column of transaction_data table
        $transaction_data = $orderTransaction->transaction_data;
        $transaction_data['stripe_payment_event'] = $event;

        $orderTransaction->transaction_data = $transaction_data;
        $orderTransaction->save();
    }

    public function securityChecks($payload)
    {
        $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];

        // Set your secret key. Remember to switch to your live secret key in production!
        // See your keys here: https://dashboard.stripe.com/account/apikeys
        \Stripe\Stripe::setApiKey(config('api.stripe_sk_key'));

        // If you are testing your webhook locally with the Stripe CLI you
        // can find the endpoint's secret by running `stripe listen`
        // Otherwise, find your endpoint's secret in your webhook settings in the Developer Dashboard
        $endpoint_secret = config('api.stripe_endpoint_secret');

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload,
                $sig_header,
                $endpoint_secret
            );
        } catch (\UnexpectedValueException $e) {
            // Invalid payload
            return false;
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            // Invalid signature
            return false;
        }

        return $event;
    }
}
