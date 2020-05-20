<?php

use Gernzy\Server\Listeners\BeforeCheckout;
use Paypal\Server\Actions\PaypalBeforeCheckout;

return [
    // Add listeners to the beforecheckout event
    BeforeCheckout::class => [
        PaypalBeforeCheckout::class
    ],

];
