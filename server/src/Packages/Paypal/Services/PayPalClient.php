<?php

namespace  Gernzy\Server\Packages\Paypal\Services;

use Gernzy\Server\Exceptions\GernzyException;
use PayPalCheckoutSdk\Core\PayPalHttpClient;
use PayPalCheckoutSdk\Core\ProductionEnvironment;
use PayPalCheckoutSdk\Core\SandboxEnvironment;

$debug = config('app.debug');
if ($debug) {
    ini_set('error_reporting', E_ALL); // or error_reporting(E_ALL);
    ini_set('display_errors', '1');
    ini_set('display_startup_errors', '1');
}


class PayPalClient
{
    /**
     * Returns PayPal HTTP client instance with environment that has access
     * credentials context. Use this instance to invoke PayPal APIs, provided the
     * credentials have access.
     */
    public static function client()
    {
        return new PayPalHttpClient(self::environment());
    }

    /**
     * Set up and return PayPal PHP SDK environment with PayPal access credentials.
     * This sample uses SandboxEnvironment. In production, use LiveEnvironment.
     */
    public static function environment()
    {
        $env = config("api.environment") ?: "development";
        $clientId = config("api.paypal_client_id") ?: "";
        $clientSecret = config("api.paypal_client_secret") ?: "";

        if ($env == 'production') {
            return new ProductionEnvironment($clientId, $clientSecret);
        } elseif ($env == 'development') {
            return new SandboxEnvironment($clientId, $clientSecret);
        } else {
            throw new GernzyException(
                'The environment has not been defined.',
                'Please define if environment is development or production'
            );
        }
    }
}
