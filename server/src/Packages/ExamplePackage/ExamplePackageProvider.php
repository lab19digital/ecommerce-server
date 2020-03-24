<?php

namespace Gernzy\Server\Packages\ExamplePackage;

use Gernzy\Server\Exceptions\GernzyException;
use Gernzy\Server\GernzyServiceProvider;
use Gernzy\Server\Listeners\BeforeCheckout;
use Gernzy\Server\Packages\ExamplePackage\Actions\ExampleBeforeCheckout;

class ExamplePackageProvider extends GernzyServiceProvider
{
    public $requiredEvents = [
        BeforeCheckout::class
    ];

    public $requiredActions = [
        ExampleBeforeCheckout::class
    ];

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('foo', function ($app) {
            // return new Bar();
        });
    }

    /**
     * Boot runs after register, and after all packages have been registered.
     *
     * @return void
     */
    public function boot()
    {
        // Now check if the correct Action is mapped to the listener
        $actions = config('events.' . BeforeCheckout::class);

        $action_exists = in_array(ExampleBeforeCheckout::class, $actions);

        if (!$action_exists) {
            throw new GernzyException(
                'The Action does not exist.',
                'Please make sure the file exists in src/Listeners and the event is mapped in config/events.php.'
            );
        }
    }
}
