<?php

namespace Gernzy\Server\Packages\StripePackage;

use Gernzy\Server\GernzyServiceProvider;
use Gernzy\Server\Listeners\BeforeCheckout;

class StripePackageProvider extends GernzyServiceProvider
{
    public $requiredEvents = [
        BeforeCheckout::class
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

        // Make cache config publishment optional by merging the config from the package.
        $this->mergeConfigFrom(__DIR__ . '/config/events.php', 'events');
    }

    /**
     * Boot runs after register, and after all packages have been registered.
     *
     * @return void
     */
    public function boot()
    {
        // Check if Events are configured
        $this->validateConfig();

        // Allow developers to override currency config
        $this->publishes([
            __DIR__ . '/config/events.php' => config_path('events.php'),
        ]);
    }
}
