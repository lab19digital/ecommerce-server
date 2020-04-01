<?php

namespace Stripe\Actions;

use Gernzy\Server\Classes\ActionClass;
use Gernzy\Server\Services\ActionInterface;

class StripeBeforeCheckout implements ActionInterface
{
    public function __construct()
    {
    }

    public function run(ActionClass $action)
    {
        $data = $action->getOriginalData();

        // ...
        // ...

        $action->attachData(StripeBeforeCheckout::class, ['stripe_data' => $data]);

        return $action;
    }
}
