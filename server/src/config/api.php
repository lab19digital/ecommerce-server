<?php

return [
    // Add listeners to the beforecheckout event
    'stripe_sk_key' => env('STRIPE_SK_KEY', ''),
    'stripe_endpoint_secret' => env('STRIPE_ENDPOINT_SECRET', ''),

];
