<?php

namespace  Gernzy\Server\Packages\Paypal\Services;

/**
 * Mocking equivalent of StripeService
 */
class CaptureOrderPaypalMock
{
    public static function captureOrder($orderId, $debug = false)
    {
        return json_decode('{"result" : {"id" : "81M70884VT025633W"}}');
    }
}
