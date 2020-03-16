<?php

namespace Tests\Feature;

use Gernzy\Server\Classes\BarBeforeCheckout;
use Gernzy\Server\Classes\FooBeforeCheckout;
use Gernzy\Server\Classes\StripeBeforeCheckout;
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
     * Actions listen to an Event, so when an event is triggered, an Action that is listening
     * to that event will also trigger. The third party developer will register Actions for an Event. These Actions will Listen
     * for the Event to fire and then execute.
     *
     * @return void
     */
    public function testEventService()
    {
        // Set actions for event at run time, for testing purposes
        config(['events.' . BeforeCheckout::class => [StripeBeforeCheckout::class, FooBeforeCheckout::class, BarBeforeCheckout::class]]);

        // Trigger the event somewhere in code through EventService
        $eventService = EventService::triggerEvent(BeforeCheckout::class);

        // All the actions that we're called
        $actions = $eventService->getMeta();

        // Prepare array for essertContains (flatten array)
        $actions = array_column($actions, 'action');

        $this->assertContains(StripeBeforeCheckout::class, $actions, "testArray doesn't contains value as value");
        $this->assertContains(FooBeforeCheckout::class, $actions, "testArray doesn't contains value as value");
        $this->assertContains(BarBeforeCheckout::class, $actions, "testArray doesn't contains value as value");
    }
}
