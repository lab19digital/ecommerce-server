<?php

namespace Gernzy\Server\Services;

class EventService
{
    public function __construct()
    {
    }

    // Gernzy will fire this event at certain points in code
    public static function triggerEvent($event)
    {
        print 'hello';
    }
}
