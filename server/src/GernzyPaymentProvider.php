<?php

namespace Gernzy\Server;

use Gernzy\Server\Packages\Paypal\PaypalProvider;
use Gernzy\Server\Packages\Stripe\StripeProvider;
use Illuminate\Support\ServiceProvider;

class GernzyPaymentProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        // Register dependency packages
        $this->app->register(StripeProvider::class);
        $this->app->register(PaypalProvider::class);
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
    }
}
