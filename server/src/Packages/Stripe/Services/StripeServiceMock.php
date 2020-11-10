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
            "id" => "pi_1HlvFtBEW94QPQobHccfQBjK",
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
        "id": "evt_1HlvFuBEW94QPQobpVgLNO1Q",
        "data": {
            "object": {
                "id": "pi_1HlvFtBEW94QPQobHccfQBjK",
                "amount": 2000,
                "object": "payment_intent",
                "review": null,
                "source": null,
                "status": "succeeded",
                "charges": {
                    "url": "/v1/charges?payment_intent=pi_1GcXwpBEW94QPQobF8AyuYs4",
                    "data": [
                        {
                            "id": "ch_1HlvFtBEW94QPQobfCjpvAPR",
                            "paid": true,
                            "order": null,
                            "amount": 2000,
                            "object": "charge",
                            "review": null,
                            "source": null,
                            "status": "succeeded",
                            "created": 1605008601,
                            "dispute": null,
                            "invoice": null,
                            "outcome": {
                                "type": "authorized",
                                "reason": null,
                                "risk_level": "normal",
                                "risk_score": 29,
                                "network_status": "approved_by_network",
                                "seller_message": "Payment complete."
                            },
                            "refunds": {
                                "url": "/v1/charges/ch_1HlvFtBEW94QPQobfCjpvAPR/refunds",
                                "data": [],
                                "object": "list",
                                "has_more": false,
                                "total_count": 0
                            },
                            "captured": true,
                            "currency": "usd",
                            "customer": null,
                            "disputed": false,
                            "livemode": false,
                            "metadata": [],
                            "refunded": false,
                            "shipping": {
                                "name": "Jenny Rosen",
                                "phone": null,
                                "address": {
                                    "city": "San Francisco",
                                    "line1": "510 Townsend St",
                                    "line2": null,
                                    "state": "CA",
                                    "country": "US",
                                    "postal_code": "94103"
                                },
                                "carrier": null,
                                "tracking_number": null
                            },
                            "application": null,
                            "description": "(created by Stripe CLI)",
                            "destination": null,
                            "receipt_url": "https://pay.stripe.com/receipts/acct_1FqyBQBEW94QPQob/ch_1HlvFtBEW94QPQobfCjpvAPR/rcpt_IMeZVaUfClmHfxs2kUdlueLz47LlVYT",
                            "failure_code": null,
                            "on_behalf_of": null,
                            "fraud_details": [],
                            "receipt_email": null,
                            "transfer_data": null,
                            "payment_intent": "pi_1GcXwpBEW94QPQobF8AyuYs4",
                            "payment_method": "pm_1HlvFtBEW94QPQobVdigM3JS",
                            "receipt_number": null,
                            "transfer_group": null,
                            "amount_captured": 2000,
                            "amount_refunded": 0,
                            "application_fee": null,
                            "billing_details": {
                                "name": null,
                                "email": null,
                                "phone": null,
                                "address": {
                                    "city": null,
                                    "line1": null,
                                    "line2": null,
                                    "state": null,
                                    "country": null,
                                    "postal_code": null
                                }
                            },
                            "failure_message": null,
                            "source_transfer": null,
                            "balance_transaction": "txn_1HlvFuBEW94QPQobzRhizLVc",
                            "statement_descriptor": null,
                            "application_fee_amount": null,
                            "payment_method_details": {
                                "card": {
                                    "brand": "visa",
                                    "last4": "4242",
                                    "checks": {
                                        "cvc_check": null,
                                        "address_line1_check": null,
                                        "address_postal_code_check": null
                                    },
                                    "wallet": null,
                                    "country": "US",
                                    "funding": "credit",
                                    "network": "visa",
                                    "exp_year": 2021,
                                    "exp_month": 11,
                                    "fingerprint": "kBBAPzC0kRrZrukV",
                                    "installments": null,
                                    "three_d_secure": null
                                },
                                "type": "card"
                            },
                            "statement_descriptor_suffix": null,
                            "calculated_statement_descriptor": "Stripe"
                        }
                    ],
                    "object": "list",
                    "has_more": false,
                    "total_count": 1
                },
                "created": 1605008601,
                "invoice": null,
                "currency": "usd",
                "customer": null,
                "livemode": false,
                "metadata": [],
                "shipping": {
                    "name": "Jenny Rosen",
                    "phone": null,
                    "address": {
                        "city": "San Francisco",
                        "line1": "510 Townsend St",
                        "line2": null,
                        "state": "CA",
                        "country": "US",
                        "postal_code": "94103"
                    },
                    "carrier": null,
                    "tracking_number": null
                },
                "application": null,
                "canceled_at": null,
                "description": "(created by Stripe CLI)",
                "next_action": null,
                "on_behalf_of": null,
                "client_secret": null,
                "receipt_email": null,
                "transfer_data": null,
                "capture_method": "automatic",
                "payment_method": "pm_1HlvFtBEW94QPQobVdigM3JS",
                "transfer_group": null,
                "amount_received": 2000,
                "amount_capturable": 0,
                "last_payment_error": null,
                "setup_future_usage": null,
                "cancellation_reason": null,
                "confirmation_method": "automatic",
                "payment_method_types": ["card"],
                "statement_descriptor": null,
                "application_fee_amount": null,
                "payment_method_options": {
                    "card": {
                        "network": null,
                        "installments": null,
                        "request_three_d_secure": "automatic"
                    }
                },
                "statement_descriptor_suffix": null
            }
        },
        "type": "payment_intent.succeeded",
        "object": "event",
        "created": 1605008602,
        "request": {
            "id": "req_KajJfMIF1LK2VR",
            "idempotency_key": null
        },
        "livemode": false,
        "api_version": "2020-03-02",
        "pending_webhooks": 1
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

    public function getTransactionHistory($orderTransactionId)
    {
        $stripeService = new StripeService();
        return $stripeService->getTransactionHistory($orderTransactionId);
    }
}
