<?php

use Gernzy\Server\Listeners\BeforeCheckout;
use Gernzy\Server\Listeners\TransactionHistory;
use Gernzy\Server\Packages\Paypal\Actions\PaypalTransactionHistory;

return [
    // Add listeners to the beforecheckout event
    BeforeCheckout::class => [
        PaypalBeforeCheckout::class
    ],
    TransactionHistory::class => [
        PaypalTransactionHistory::class,
    ]
];
