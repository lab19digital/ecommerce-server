<?php

namespace Gernzy\Server;

use Gernzy\Server\Packages\Paypal\PaypalProvider;
use Gernzy\Server\Packages\Stripe\StripeProvider;
use Gernzy\Server\Services\SessionService;

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

        // Bind services
        $this->app->bind('Gernzy\PaymentService', SessionService::class);
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
