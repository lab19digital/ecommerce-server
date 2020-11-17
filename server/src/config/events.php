<?php

use Gernzy\Server\Listeners\BeforeCheckout;
use Gernzy\Server\Listeners\TransactionHistory;
use Gernzy\Server\Packages\Paypal\Actions\PaypalTransactionHistory;
use Gernzy\Server\Packages\Stripe\Actions\StripeTransactionHistory;

return [
    // Add listeners to the beforecheckout event
    BeforeCheckout::class => [
        StripeBeforeCheckout::class,
        PaypalBeforeCheckout::class
    ],
    TransactionHistory::class => [
        PaypalTransactionHistory::class,
        StripeTransactionHistory::class
    ]
];
