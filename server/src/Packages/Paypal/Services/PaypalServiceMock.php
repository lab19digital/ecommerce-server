<?php

namespace  Gernzy\Server\Packages\Paypal\Services;

/**
 * Mocking equivalent of StripeService
 */
class PaypalServiceMock implements PaypalServiceInterface
{
    public function __construct()
    {
    }

    public function createOrder($debug, $cartTotal, $sessionCurrency)
    {
        return json_decode('{
            "statusCode": 201,
            "result": {
                "id": "81M70884VT025633W",
                "intent": "CAPTURE",
                "purchase_units": [
                    {
                        "reference_id": "default",
                        "amount": {
                            "currency_code": "USD",
                            "value": "739.06"
                        },
                        "payee": {
                            "email_address": "sb-tqnno1669164@business.example.com",
                            "merchant_id": "KUMYYWAEFJ8KY"
                        }
                    }
                ],
                "create_time": "2020-05-19T09:34:35Z",
                "links": [
                    {
                        "href": "https://api.sandbox.paypal.com/v2/checkout/orders/81M70884VT025633W",
                        "rel": "self",
                        "method": "GET"
                    },
                    {
                        "href": "https://www.sandbox.paypal.com/checkoutnow?token=81M70884VT025633W",
                        "rel": "approve",
                        "method": "GET"
                    },
                    {
                        "href": "https://api.sandbox.paypal.com/v2/checkout/orders/81M70884VT025633W",
                        "rel": "update",
                        "method": "PATCH"
                    },
                    {
                        "href": "https://api.sandbox.paypal.com/v2/checkout/orders/81M70884VT025633W/capture",
                        "rel": "capture",
                        "method": "POST"
                    }
                ],
                "status": "CREATED"
            },
            "headers": [
                {
                    "Cache-Control": "max-age=0, no-cache, no-store, must-revalidate",
                    "Content-Length": "748",
                    "Content-Type": "application/json",
                    "Date": "Tue, 19 May 2020 09",
                    "Paypal-Debug-Id": "2ae3cdf6ecddf"
                }
            ]
        }
        ');
    }
}
