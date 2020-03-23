<?php

namespace Gernzy\Server\Packages\ExamplePackage;

use Illuminate\Support\ServiceProvider;

class ExamplePackageProvider extends ServiceProvider
{
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
        // Example check if corresponding Event listener exists
        $events = config(['events']);
    }
}
