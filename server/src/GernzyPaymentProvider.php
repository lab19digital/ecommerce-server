<?php

namespace Gernzy\Server;

class GernzyPaymentProvider extends GernzyServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        // Register dependency packages
        if ($providers = config('payment_providers')) {
            foreach ($providers as $key => $value) {
                $this->app->register($value);
            }
        }

        $this->mergeConfigFrom(__DIR__ . '/config/payment_providers.php', 'payment_providers');
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->publishes([
            __DIR__ . '/config/payment_providers.php' => config_path('payment_providers.php'),
        ]);
    }
}
