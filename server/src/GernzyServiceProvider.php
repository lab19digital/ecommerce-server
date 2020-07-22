<?php

namespace Gernzy\Server;

use Fruitcake\Cors\CorsServiceProvider as CorsServiceProvider;
use Gernzy\Server\App\View\Components\Cart as CartComponent;
use Gernzy\Server\App\View\Components\Checkout as CheckoutComponent;
use Gernzy\Server\App\View\Components\ErrorAlert as ErrorAlertComponent;
use Gernzy\Server\App\View\Components\LineItems as LineItemsComponent;
use Gernzy\Server\App\View\Components\Product as ProductComponent;
use Gernzy\Server\App\View\Components\SuccessAlert as SuccessAlertComponent;
use Gernzy\Server\Exceptions\GernzyException;
use Gernzy\Server\Models\Cart;
use Gernzy\Server\Observers\CartObserver;
use Gernzy\Server\Services\CartService;
use Gernzy\Server\Services\CurrencyConversionInterface;
use Gernzy\Server\Services\GeolocationInterface;
use Gernzy\Server\Services\GeolocationService;
use Gernzy\Server\Services\InspectorService;
use Gernzy\Server\Services\MaxmindGeoIP2;
use Gernzy\Server\Services\OpenExchangeRates;
use Gernzy\Server\Services\OrderService;
use Gernzy\Server\Services\SessionService;
use Gernzy\Server\Services\UserService;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;
use Nuwave\Lighthouse\LighthouseServiceProvider;

class GernzyServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        // Register dependency packages
        $this->app->register(LighthouseServiceProvider::class);
        $this->app->register(CorsServiceProvider::class);

        // Register core packages
        $this->app->register(AuthServiceProvider::class);
        $this->app->register(GernzyPaymentProvider::class);

        // Some configuration needs to be overriden by the cart
        // plugin, rather than from within the Laravel app itself
        // This needs to happen before the Lighthouse provider registration
        // or there's a rather cryptic "Server error" returned.
        // This happens because it won't be able to find a "schema.graphql" file.
        $this->app['config']->set('lighthouse.namespaces', []);
        $this->app['config']->set('lighthouse.schema.register', __DIR__ . '/GraphQL/schema/schema.graphql');

        $middleware = $this->app['config']->get('lighthouse.route.middleware') ?? [];

        $this->app['config']->set('lighthouse.route.middleware', array_merge($middleware, [

            // Add CORS dependency package to middleware
            \Fruitcake\Cors\HandleCors::class,
            // Add cart middleware
            \Gernzy\Server\Middleware\CartMiddleware::class,
        ]));


        // Implement our default binding of the geolocation conversion interface
        // GeolocationService
        $this->app->bind(
            GeolocationInterface::class,
            MaxmindGeoIP2::class
        );

        // Implement our default binding of the currency converion interface
        $this->app->bind(
            CurrencyConversionInterface::class,
            OpenExchangeRates::class
        );

        // Bind services
        $this->app->bind('Gernzy\SessionService', SessionService::class);
        $this->app->bind('Gernzy\UserService', UserService::class);
        $this->app->bind('Gernzy\OrderService', OrderService::class);
        $this->app->bind('Gernzy\ServerService', CartService::class);
        $this->app->bind('Gernzy\GeolocationService', GeolocationService::class);
        $this->app->bind('Gernzy\InspectorService', InspectorService::class);

        $this->app->bind('GuzzleHttp\Client', function ($app, array $parameters) {
            return new Client([
                'base_uri' => $parameters['baseUri'],
                'timeout' => 2.0,
            ]);
        });

        $directives = [
            'Gernzy\\Server\\GraphQL\\Directives',
        ];

        $this->app['config']->set('lighthouse.namespaces.directives', $directives);

        // Make mail config publishment optional by merging the config from the package.
        $this->mergeConfigFrom(__DIR__ . '/config/mail.php', 'mail');
        $this->mergeConfigFrom(__DIR__ . '/config/cache.php', 'cache');
        $this->mergeConfigFrom(__DIR__ . '/config/db.php', 'db');
        $this->mergeConfigFrom(__DIR__ . '/config/currency.php', 'currency');
        $this->mergeConfigFrom(__DIR__ . '/config/events.php', 'events');
        $this->mergeConfigFrom(__DIR__ . '/config/api.php', 'api');

        // Inspector info
        $this->app->bind('Gernzy\PublishableProviders', function ($app) {
            return $this->publishableProviders();
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->loadMigrationsFrom(__DIR__ . '/database/migrations');

        // Allow developers to override config
        $this->publishes([
            __DIR__ . '/config/mail.php' => config_path('mail.php'),
        ]);

        $this->publishes([
            __DIR__ . '/config/cache.php' => config_path('cache.php'),
        ]);

        $this->publishes([
            __DIR__ . '/config/currency.php' => config_path('currency.php'),
        ]);

        $this->publishes([
            __DIR__ . '/config/api.php' => config_path('api.php'),
        ]);


        $this->loadRoutesFrom(__DIR__ . '/Http/routes/web.php');

        $this->loadViewsFrom(__DIR__ . '/resources/views', 'Gernzy\Server');

        // Register observable for the cart model
        Cart::observe(CartObserver::class);

        // Register blade components
        Blade::component('gernzy-product', ProductComponent::class);
        Blade::component('gernzy-cart', CartComponent::class);
        Blade::component('gernzy-checkout', CheckoutComponent::class);
        Blade::component('gernzy-line-items', LineItemsComponent::class);
        Blade::component('gernzy-success-alert', SuccessAlertComponent::class);
        Blade::component('gernzy-error-alert', ErrorAlertComponent::class);
    }

    public function validateConfig()
    {
        // Get events from config
        $events = config('events');

        foreach ($this->requiredEvents as $event) {
            // Check if config has values and the appropriate Event is present
            if (empty($events) || !array_key_exists($event, $events) || !class_exists($event)) {
                throw new GernzyException(
                    'The Event listener does not exist.',
                    'Please make sure the file exists in src/Listeners and the event is mapped in config/events.php.'
                );
            }
        }
    }
}
