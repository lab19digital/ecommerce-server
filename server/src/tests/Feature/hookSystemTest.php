<?php

namespace Tests\Feature;

use Gernzy\Server\Listeners\BeforeCheckout;
use Gernzy\Server\Services\EventService;
use Gernzy\Server\Testing\TestCase;
use Illuminate\Foundation\Testing\WithFaker;

class GernzyHookSystemTest extends TestCase
{
    use WithFaker;

    public function setUp(): void
    {
        parent::setUp();
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testEventService()
    {
        // Actions listen to an Event, so when an event is triggered, an Action that is listening
        // to that event will also trigger

        // The third party developer will register Actions for an Event. These Actions will Listen
        // for the Event to fire and then execute.

        // Trigger the event through EventService
        $eventService = EventService::triggerEvent(BeforeCheckout::class);
    }
}
