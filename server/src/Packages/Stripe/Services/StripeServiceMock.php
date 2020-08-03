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

    public function getSecret($paymentIntent)
    {
        return Str::random(12);
    }

    public function createPaymentIntent($amount, $currency)
    {
        /** Mock the payment intent create by  $intent = \Stripe\PaymentIntent::create([ */
        return [
            "id" => "pi_1GcXwpBEW94QPQobF8AyuYs4",
            "object" => "payment_intent",
            "amount" => 13681,
            "amount_capturable" => 0,
            "amount_received" => 0,
            "application" => null,
            "application_fee_amount" => null,
            "canceled_at" => null,
            "cancellation_reason" => null,
            "capture_method" => "automatic",
            "charges" => [
                "object" => "list",
                "data" => [],
                "has_more" => false,
                "url" => "/v1/charges?payment_intent=pi_1GT7uZBEW94QPQobBOoOAa0L"
            ],
            "client_secret" => "pi_1GT7uZBEW94QPQobBOoOAa0L_secret_ZHYVbPTJM6DKAAtUG8qCnCc7c",
            "confirmation_method" => "automatic",
            "created" => 1585752683,
            "currency" => "usd",
            "customer" => null,
            "description" => null,
            "invoice" => null,
            "last_payment_error" => null,
            "livemode" => false,
            "metadata" => [
                "integration_check" => "accept_a_payment"
            ],
            "next_action" => null,
            "on_behalf_of" => null,
            "payment_method" => null,
            "payment_method_options" => [
                "card" => [
                    "installments" => null,
                    "request_three_d_secure" => "automatic"
                ]
            ],
            "payment_method_types" => [
                "card"
            ],
            "receipt_email" => null,
            "review" => null,
            "setup_future_usage" => null,
            "shipping" => null,
            "statement_descriptor" => null,
            "statement_descriptor_suffix" => null,
            "status" => "requires_payment_method",
            "transfer_data" => null,
            "transfer_group" => null
        ];
    }

    public function handleWebhookPaymentSucceededEvent($event)
    {
        $stripeService = new StripeService();
        $stripeService->handleWebhookPaymentSucceededEvent($event);
    }

    public function securityChecks($payload)
    {
        /** Mock the event created by $event = \Stripe\Webhook::constructEvent(*/
        return json_decode('{
            "id": "evt_1GcXwqBEW94QPQobxFsGJSm7",
            "object": "event",
            "api_version": "2020-03-02",
            "created": 1587997720,
            "data": {
                "object": {
                    "id": "pi_1GcXwpBEW94QPQobF8AyuYs4",
                    "object": "payment_intent",
                    "amount": 2000,
                    "amount_capturable": 0,
                    "amount_received": 2000,
                    "application": null,
                    "application_fee_amount": null,
                    "canceled_at": null,
                    "cancellation_reason": null,
                    "capture_method": "automatic",
                    "charges": {
                        "object": "list",
                        "data": [
                            {
                                "id": "ch_1GcXwpBEW94QPQoboqJzr77i",
                                "object": "charge",
                                "amount": 2000,
                                "amount_refunded": 0,
                                "application": null,
                                "application_fee": null,
                                "application_fee_amount": null,
                                "balance_transaction": "txn_1GcXwqBEW94QPQobKoIaoYVG",
                                "billing_details": {
                                    "address": {
                                        "city": null,
                                        "country": null,
                                        "line1": null,
                                        "line2": null,
                                        "postal_code": null,
                                        "state": null
                                    },
                                    "email": null,
                                    "name": null,
                                    "phone": null
                                },
                                "calculated_statement_descriptor": "Stripe",
                                "captured": true,
                                "created": 1587997719,
                                "currency": "usd",
                                "customer": null,
                                "description": "(created by Stripe CLI)",
                                "destination": null,
                                "dispute": null,
                                "disputed": false,
                                "failure_code": null,
                                "failure_message": null,
                                "fraud_details": [],
                                "invoice": null,
                                "livemode": false,
                                "metadata": [],
                                "on_behalf_of": null,
                                "order": null,
                                "outcome": {
                                    "network_status": "approved_by_network",
                                    "reason": null,
                                    "risk_level": "normal",
                                    "risk_score": 50,
                                    "seller_message": "Payment complete.",
                                    "type": "authorized"
                                },
                                "paid": true,
                                "payment_intent": "pi_1GcXwpBEW94QPQobF8AyuYs4",
                                "payment_method": "pm_1GcXwpBEW94QPQobEEhZt6uY",
                                "payment_method_details": {
                                    "card": {
                                        "brand": "visa",
                                        "checks": {
                                            "address_line1_check": null,
                                            "address_postal_code_check": null,
                                            "cvc_check": null
                                        },
                                        "country": "US",
                                        "exp_month": 4,
                                        "exp_year": 2021,
                                        "fingerprint": "kBBAPzC0kRrZrukV",
                                        "funding": "credit",
                                        "installments": null,
                                        "last4": "4242",
                                        "network": "visa",
                                        "three_d_secure": null,
                                        "wallet": null
                                    },
                                    "type": "card"
                                },
                                "receipt_email": null,
                                "receipt_number": null,
                                "receipt_url": "https:\/\/pay.stripe.com\/receipts\/acct_1FqyBQBEW94QPQob\/ch_1GcXwpBEW94QPQoboqJzr77i\/rcpt_HAtkLjsKnwlMVl83OjooNVOy9iv33Mo",
                                "refunded": false,
                                "refunds": {
                                    "object": "list",
                                    "data": [],
                                    "has_more": false,
                                    "total_count": 0,
                                    "url": "\/v1\/charges\/ch_1GcXwpBEW94QPQoboqJzr77i\/refunds"
                                },
                                "review": null,
                                "shipping": {
                                    "address": {
                                        "city": "San Francisco",
                                        "country": "US",
                                        "line1": "510 Townsend St",
                                        "line2": null,
                                        "postal_code": "94103",
                                        "state": "CA"
                                    },
                                    "carrier": null,
                                    "name": "Jenny Rosen",
                                    "phone": null,
                                    "tracking_number": null
                                },
                                "source": null,
                                "source_transfer": null,
                                "statement_descriptor": null,
                                "statement_descriptor_suffix": null,
                                "status": "succeeded",
                                "transfer_data": null,
                                "transfer_group": null
                            }
                        ],
                        "has_more": false,
                        "total_count": 1,
                        "url": "\/v1\/charges?payment_intent=pi_1GcXwpBEW94QPQobF8AyuYs4"
                    },
                    "client_secret": "pi_1GcXwpBEW94QPQobF8AyuYs4_secret_vdpKpFGnbi7APDcc8rA9zE0mk",
                    "confirmation_method": "automatic",
                    "created": 1587997719,
                    "currency": "usd",
                    "customer": null,
                    "description": "(created by Stripe CLI)",
                    "invoice": null,
                    "last_payment_error": null,
                    "livemode": false,
                    "metadata": [],
                    "next_action": null,
                    "on_behalf_of": null,
                    "payment_method": "pm_1GcXwpBEW94QPQobEEhZt6uY",
                    "payment_method_options": {
                        "card": {
                            "installments": null,
                            "request_three_d_secure": "automatic"
                        }
                    },
                    "payment_method_types": [
                        "card"
                    ],
                    "receipt_email": null,
                    "review": null,
                    "setup_future_usage": null,
                    "shipping": {
                        "address": {
                            "city": "San Francisco",
                            "country": "US",
                            "line1": "510 Townsend St",
                            "line2": null,
                            "postal_code": "94103",
                            "state": "CA"
                        },
                        "carrier": null,
                        "name": "Jenny Rosen",
                        "phone": null,
                        "tracking_number": null
                    },
                    "source": null,
                    "statement_descriptor": null,
                    "statement_descriptor_suffix": null,
                    "status": "succeeded",
                    "transfer_data": null,
                    "transfer_group": null
                }
            },
            "livemode": false,
            "pending_webhooks": 2,
            "request": {
                "id": "req_kxxU7uCYsO7qAM",
                "idempotency_key": null
            },
            "type": "payment_intent.succeeded"
        }');
    }

    public function getStripeWebhookIPAdresses()
    {
        return [
            0 => "3.18.12.63",
            1 => "3.130.192.231",
            2 => "13.235.14.237",
            3 => "13.235.122.149",
            4 => "35.154.171.200",
            6 => "54.187.174.169",
            7 => "54.187.205.235",
            8 => "54.187.216.72",
            9 => "54.241.31.99",
            10 => "54.241.31.102",
            11 => "54.241.34.107"
        ];
    }

    public function providerName()
    {
        return 'Paypal';
    }


    public function logFile()
    {
        return '../paypalLog.txt';
    }
}
