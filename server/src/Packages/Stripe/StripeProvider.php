<?php

namespace Gernzy\Server\Packages\Stripe;

use Gernzy\Server\GernzyServiceProvider;
use Gernzy\Server\Listeners\BeforeCheckout;
use Gernzy\Server\Packages\Stripe\Services\StripeService;

class StripeProvider extends GernzyServiceProvider
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
        // Bind services
        $this->app->bind('Stripe\StripeService', StripeService::class);

        // Make cache config publishment optional by merging the config from the package.
        $this->mergeConfigFrom(__DIR__ . '/config/events.php', 'events');
        $this->mergeConfigFrom(__DIR__ . '/config/api.php', 'api');
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

        // Allow developers to override currency config
        $this->publishes([
            __DIR__ . '/config/api.php' => config_path('api.php'),
        ]);

        $this->loadRoutesFrom(__DIR__ . '/Http/routes/web.php');

        $this->loadViewsFrom(__DIR__ . '/Resources/views', 'Stripe\Payment');
    }
}
