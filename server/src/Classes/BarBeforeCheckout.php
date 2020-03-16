<?php

namespace Gernzy\Server\Classes;

use Gernzy\Server\Services\ActionInterface;

class BarBeforeCheckout implements ActionInterface
{
    public function __construct()
    {
    }

    public function run(ActionClass $action)
    {
        $data = $action->getOriginalData();
        $mod = $action->getModifiedData();
        $action->eventPreventDefault();
        return $action;
    }
}
