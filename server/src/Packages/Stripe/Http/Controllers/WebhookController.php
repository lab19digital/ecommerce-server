<?php

namespace Gernzy\Server\Packages\Stripe\Http\Controllers;

use Gernzy\Server\Exceptions\GernzyException;
use Gernzy\Server\Models\OrderTransaction;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Log;

class WebhookController extends BaseController
{
    /**
     * Show the profile for the given user.
     *
     * @param  int  $id
     * @return View
     */
    public function index(Request $request)
    {
        $payload = $request->getContent();
        $event = null;

        try {
            $event = \Stripe\Event::constructFrom(
                json_decode($payload, true)
            );
        } catch (\UnexpectedValueException $e) {
            // Invalid payload
            return response('Error', 400);
        }




        // Handle the event
        switch ($event->type) {
            case 'payment_intent.succeeded':

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
                if (isset($event->data->object['client_secret'])) {
                    $event->data->object['client_secret'] = null;
                }

                // Add the stripe event data to the json column of transaction_data table
                $transaction_data = $orderTransaction->transaction_data;
                $transaction_data['stripe_payment_event'] = $event;

                $orderTransaction->transaction_data = $transaction_data;
                $orderTransaction->save();

                // Then define and call a method to handle the successful payment intent.
                // handlePaymentIntentSucceeded($paymentIntent);
                break;
            case 'payment_method.attached':
                $paymentMethod = $event->data->object; // contains a \Stripe\PaymentMethod
                // Then define and call a method to handle the successful attachment of a PaymentMethod.
                // handlePaymentMethodAttached($paymentMethod);
                break;
                // ... handle other event types
            default:
                // Unexpected event type
                return response('Error', 400);
        }


        return response('Success', 200);
    }
}
