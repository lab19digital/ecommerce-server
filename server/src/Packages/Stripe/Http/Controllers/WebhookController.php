<?php

namespace Gernzy\Server\Packages\Stripe\Http\Controllers;

use \App;
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
        $stripeService = App::make('Stripe\StripeService');
        $providerName = $stripeService->providerName() ?? 'Stripe';

        if (!$event = $stripeService->securityChecks($payload)) {
            Log::error("failed stripe security checks: " . $payload, ['package' => $providerName]);
            return response('Success', 400);
        }

        // Handle the event
        switch ($event->type) {
            case 'payment_intent.succeeded':
                // Then define and call a method to handle the successful payment intent.
                $stripeService->handleWebhookPaymentSucceededEvent($event);
                break;
            case 'payment_intent.payment_failed':
                Log::error("failed stripe event:  " . $event, ['package' => $providerName]);
                $stripeService->saveWebhookOtherEvents($event);
                break;
                // ... handle other event types
            default:
                // Unexpected event type
                $stripeService->saveWebhookOtherEvents($event);
                return response('Error', 500);
        }

        return response('Success', 200);
    }
}
