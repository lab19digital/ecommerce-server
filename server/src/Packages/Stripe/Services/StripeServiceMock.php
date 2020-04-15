<?php

namespace  Gernzy\Server\Packages\Stripe\Services;

use Illuminate\Support\Str;

/**
 * Mocking equivalent of StripeService
 */
class StripeServiceMock implements ServiceInterface
{
    public function __construct()
    {
    }

    public function getSecret($amount, $currency)
    {
        return Str::random(12);
    }
}
