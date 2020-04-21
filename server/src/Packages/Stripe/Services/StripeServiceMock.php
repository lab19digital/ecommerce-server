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
        return [
            "id" => "pi_1Ga0rQBEW94QPQobjQI1ab43",
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
}
