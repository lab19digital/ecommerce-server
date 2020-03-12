<?php

namespace Gernzy\Server\Services;

use Gernzy\Server\Classes\ActionClass;

interface ActionInterface
{
    /**
     * Sample function
     *
     * @param string
     */
    public function run(ActionClass $action);
}
