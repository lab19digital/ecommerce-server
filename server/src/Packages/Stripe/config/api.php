<?php

use Gernzy\Server\Listeners\BeforeCheckout;

// use ThirdParty\Stripe\Actions\StripeBeforeCheckout;

return [
    // Add listeners to the beforecheckout event
    'stripe_sk_key' => env('STRIPE_SK_KEY', ''),

];
