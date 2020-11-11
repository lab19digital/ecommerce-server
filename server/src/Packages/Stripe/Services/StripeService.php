<?php

namespace  Gernzy\Server\Packages\Stripe\Services;

use \App;
use Carbon\Carbon;
use Gernzy\Server\Exceptions\GernzyException;
use Gernzy\Server\Models\OrderTransaction;
use Gernzy\Server\Services\PaymentProviderInterface;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class StripeService implements ServiceInterface, PaymentProviderInterface
{
    public function __construct()
    {
    }

    public function getSecret($paymentIntent)
    {
        if (isset($paymentIntent->client_secret)) {
            return $paymentIntent->client_secret;
        }

        Log::error("Stripe The response did not include a secret.", ['package' => $this->providerName()]);
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
            Log::error('The transaction order data was not found for that successful payment stripe.' . $paymentIntent->id, ['package' => $this->providerName()]);
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
        if (isset($event->data->object->client_secret)) {
            $event->data->object->client_secret = null;
        }

        // Add the stripe event data to the json column of transaction_data table
        $transaction_data = $orderTransaction->transaction_data;
        $transaction_data[$event->type . "_" . $event->id] = $event;

        $orderTransaction->transaction_data = $transaction_data;
        $orderTransaction->save();
    }

    public function saveWebhookOtherEvents($event)
    {

        // Find the order transaction data
        $paymentIntent = $event->data->object; // contains a \Stripe\PaymentIntent
        $orderTransaction = OrderTransaction::where('transaction_data->stripe_payment_intent->id', $paymentIntent->id)->first();

        if (!isset($orderTransaction)) {
            Log::error('The transaction order data was not found for that successful payment stripe.' . $paymentIntent->id, ['package' => $this->providerName()]);
            throw new GernzyException(
                'The transaction order data was not found for that successful payment.',
                ''
            );
        }

        // Remove the secret from event as it will be save in the database
        if (isset($event->data->object->client_secret)) {
            $event->data->object->client_secret = null;
        }

        // Add the stripe event data to the json column of transaction_data table
        $transaction_data = $orderTransaction->transaction_data;
        $transaction_data[$event->type . "_" . $event->id] = $event;

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
            Log::debug('Invalid payload stripe.', ['package' => $this->providerName()]);
            return false;
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            // Invalid signature
            Log::debug('Invalid signature stripe.', ['package' => $this->providerName()]);
            return false;
        }

        // Now check IP address of the request is from stripe. Note this won't work behind a proxy server
        $ipAddresses = $this->getStripeWebhookIPAdresses();
        if (!in_array($_SERVER['REMOTE_ADDR'], $ipAddresses)) {
            Log::debug('Invalid IP address stripe.', ['package' => $this->providerName()]);
            return false;
        }

        return $event;
    }

    public function getStripeWebhookIPAdresses()
    {
        //Save stripe info for 24 hours for performance.
        $stripe_webhooks_ips = Cache::remember('stripe_webhooks_ips', 1440, function () {
            $client = resolve('GuzzleHttp\Client', ['baseUri' => 'https://stripe.com/files/ips/']);
            $response = $client->request('GET', 'ips_webhooks.json');
            $response = json_decode($response->getBody(), true);

            return $response['WEBHOOKS'];
        });

        return $stripe_webhooks_ips;
    }

    public function providerName()
    {
        return 'Stripe';
    }


    public function logFile()
    {
        return '../stripeLog.txt';
    }

    // $provider, $status, $amount, $date
    public function getTransactionHistory($orderTransactionId): array
    {
        $orderTransaction = OrderTransaction::find($orderTransactionId);
        $returnData = [];

        foreach ($orderTransaction->transaction_data as $key => $event) {
            if (!isset($event["type"])) {
                continue;
            }
            if ($event["type"] == "payment_intent.succeeded") {
                $eventData = $event['data']['object'];
                $provider = $orderTransaction->payment_method;
                $amount = $eventData["amount"] ?? "unknown";
                $status = $eventData["status"] ?? "unknown";
                $date = Carbon::createFromTimestamp($eventData["created"]) ?? "unknown";

                $returnObj = App::make('Gernzy\PaymentHistory')
                    ->setProvider($provider)
                    ->setStatus($status)
                    ->setAmount($amount)
                    ->setDate($date);

                array_push($returnData, $returnObj);
            } elseif ($event["type"] == "payment_intent.payment_failed") {
                $eventData = $event['data']['object'];
                $provider = $orderTransaction->payment_method;
                $status = $eventData['last_payment_error']['code'];
                $error_message = $eventData['last_payment_error']['message'];
                $date = Carbon::createFromTimestamp($eventData["created"]);

                $returnObj = App::make('Gernzy\PaymentHistory')
                    ->setProvider($provider)
                    ->setStatus($status)
                    ->setAmount("none")
                    ->setDate($date)
                    ->setDate($error_message);

                array_push($returnData, $returnObj);
            }
        }
        return $returnData;
    }
}
