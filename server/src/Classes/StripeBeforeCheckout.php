<?php

namespace Gernzy\Server\Classes;

use Gernzy\Server\Services\ActionInterface;
use Illuminate\Support\Str;

class StripeBeforeCheckout implements ActionInterface
{
    public function __construct()
    {
    }

    public function run(ActionClass $action)
    {
        $data = $action->getOriginalData();

        array_push($data, [
            'coupon' => Str::random(12),
            'date' => date("Y-m-d H:i:s")
        ]);

        $action->attachData(StripeBeforeCheckout::class, $data);

        $mod = $action->getModifiedData();

        $action->eventPreventDefault();

        return $action;
    }
}
