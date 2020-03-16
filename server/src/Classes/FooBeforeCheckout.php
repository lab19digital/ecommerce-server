<?php

namespace Gernzy\Server\Classes;

use Gernzy\Server\Services\ActionInterface;

class FooBeforeCheckout implements ActionInterface
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
