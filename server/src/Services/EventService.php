<?php

namespace Gernzy\Server\Services;

use Gernzy\Server\Classes\ActionClass;

class EventService
{
    public function __construct()
    {
    }

    public static function triggerEvent($event)
    {
        // Lookup the event in config, and get action to set off
        $actionDataHolder = new ActionClass();
        $actions = config('events.' . $event);
        foreach ($actions as $action) {
            $actionInstance = new $action();
            $actionDataHolder = $actionInstance->run($actionDataHolder);
        }

        // if (!$action->preventDefault()) {
        //     // Do some default behaviour, e.g. redirecting to thank you page
        // } else {
        //     // Nothing happens
        // }
    }
}
