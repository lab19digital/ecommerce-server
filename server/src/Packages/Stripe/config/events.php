<?php

use Gernzy\Server\Listeners\BeforeCheckout;
use Gernzy\Server\Packages\StripePackage\Actions\StripeBeforeCheckout;

// use ThirdParty\Stripe\Actions\StripeBeforeCheckout;

return [
    // Add listeners to the beforecheckout event
    BeforeCheckout::class => [
        StripeBeforeCheckout::class
    ],

];
