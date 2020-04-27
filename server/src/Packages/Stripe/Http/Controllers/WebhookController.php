<?php

namespace Gernzy\Server\Packages\Stripe\Http\Controllers;

use \App;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

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
        $stripeService = App::make('Stripe\StripeService');

        if (!$event = $stripeService->securityChecks($payload)) {
            return response('Success', 400);
        }

        // Handle the event
        switch ($event->type) {
            case 'payment_intent.succeeded':
                // Then define and call a method to handle the successful payment intent.
                $stripeService->handleWebhookPaymentSucceededEvent($event);

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
