<?php

use Gernzy\Server\Packages\Paypal\PaypalProvider;
use Gernzy\Server\Packages\Stripe\StripeProvider;

return [
    'Stripe' => StripeProvider::class,
    'Paypal' => PaypalProvider::class
];
