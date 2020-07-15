<?php

namespace Gernzy\Server;

use Gernzy\Server\Packages\Paypal\PaypalProvider;
use Gernzy\Server\Packages\Paypal\Services\PaypalService;
use Gernzy\Server\Packages\Stripe\Services\StripeService;
use Gernzy\Server\Packages\Stripe\StripeProvider;

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
        $this->app->register(StripeProvider::class);
        $this->app->register(PaypalProvider::class);

        // Dev tools
        $this->app->bind('Gernzy\PaymentProviderServices', function ($app) {
            return [StripeService::class, PaypalService::class];
        });
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
