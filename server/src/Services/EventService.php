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
        $actions = config('events.' . $event);
        if (empty($actions)) {
            return;
        }

        // This is a placeholder object that acts as a data store, as the various third parties
        // interact with the data for this event. This object will be passed along to every action that is
        // registered for the event.
        $actionDataHolder = new ActionClass();

        // Loop through all the actions found, and call appropriate methods
        foreach ($actions as $action) {
            // This meta is keeping the name of each action that has interacted with the event.
            $actionDataHolder->setMeta($action);

            // Fire up the actual action
            $actionInstance = new $action();

            // Call the run function which receive the actionDataHolder and returns the modified version
            $actionDataHolder = $actionInstance->run($actionDataHolder);
        }

        // if (!$action->preventDefault()) {
        //     // Do some default behaviour, e.g. redirecting to thank you page
        // } else {
        //     // Nothing happens
        // }
    }
}
