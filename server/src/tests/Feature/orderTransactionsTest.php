<?php

namespace Tests\Feature;

use Gernzy\Server\Models\Order;
use Gernzy\Server\Models\OrderTransaction;
use Gernzy\Server\Testing\TestCase;
use Illuminate\Foundation\Testing\WithFaker;

class GernzyOrderTransactionsTest extends TestCase
{
    use WithFaker;

    public $postData = [
        "id" => "evt_1Ga0rRBEW94QPQobcrCfezTK",
        "object" => "event",
        "api_version" => "2020-03-02",
        "created" => 1587393877,
        "data" => [
            "object" => [
                "id" => "pi_1Ga0rQBEW94QPQobjQI1ab43",
                "object" => "payment_intent",
                "amount" => 2000,
                "amount_capturable" => 0,
                "amount_received" => 2000,
                "application" => null,
                "application_fee_amount" => null,
                "canceled_at" => null,
                "cancellation_reason" => null,
                "capture_method" => "automatic",
                "charges" => [
                    "object" => "list",
                    "data" => [
                        [
                            "id" => "ch_1Ga0rQBEW94QPQobB4eLvbWv",
                            "object" => "charge",
                            "amount" => 2000,
                            "amount_refunded" => 0,
                            "application" => null,
                            "application_fee" => null,
                            "application_fee_amount" => null,
                            "balance_transaction" => "txn_1Ga0rRBEW94QPQob7IGAlWZr",
                            "billing_details" => [
                                "address" => [
                                    "city" => null,
                                    "country" => null,
                                    "line1" => null,
                                    "line2" => null,
                                    "postal_code" => null,
                                    "state" => null
                                ],
                                "email" => null,
                                "name" => null,
                                "phone" => null
                            ],
                            "calculated_statement_descriptor" => "Stripe",
                            "captured" => true,
                            "created" => 1587393876,
                            "currency" => "usd",
                            "customer" => null,
                            "description" => "(created by Stripe CLI)",
                            "destination" => null,
                            "dispute" => null,
                            "disputed" => false,
                            "failure_code" => null,
                            "failure_message" => null,
                            "fraud_details" => [],
                            "invoice" => null,
                            "livemode" => false,
                            "metadata" => [],
                            "on_behalf_of" => null,
                            "order" => null,
                            "outcome" => [
                                "network_status" => "approved_by_network",
                                "reason" => null,
                                "risk_level" => "normal",
                                "risk_score" => 45,
                                "seller_message" => "Payment complete.",
                                "type" => "authorized"
                            ],
                            "paid" => true,
                            "payment_intent" => "pi_1Ga0rQBEW94QPQobjQI1ab43",
                            "payment_method" => "pm_1Ga0rQBEW94QPQobNJ5Zu0Db",
                            "payment_method_details" => [
                                "card" => [
                                    "brand" => "visa",
                                    "checks" => [
                                        "address_line1_check" => null,
                                        "address_postal_code_check" => null,
                                        "cvc_check" => null
                                    ],
                                    "country" => "US",
                                    "exp_month" => 4,
                                    "exp_year" => 2021,
                                    "fingerprint" => "kBBAPzC0kRrZrukV",
                                    "funding" => "credit",
                                    "installments" => null,
                                    "last4" => "4242",
                                    "network" => "visa",
                                    "three_d_secure" => null,
                                    "wallet" => null
                                ],
                                "type" => "card"
                            ],
                            "receipt_email" => null,
                            "receipt_number" => null,
                            "receipt_url" => "https=>\/\/pay.stripe.com\/receipts\/acct_1FqyBQBEW94QPQob\/ch_1Ga0rQBEW94QPQobB4eLvbWv\/rcpt_H8HQhKkiZLl1eSRT1nYctXiJMFwsOgb",
                            "refunded" => false,
                            "refunds" => [
                                "object" => "list",
                                "data" => [],
                                "has_more" => false,
                                "total_count" => 0,
                                "url" => "\/v1\/charges\/ch_1Ga0rQBEW94QPQobB4eLvbWv\/refunds"
                            ],
                            "review" => null,
                            "shipping" => [
                                "address" => [
                                    "city" => "San Francisco",
                                    "country" => "US",
                                    "line1" => "510 Townsend St",
                                    "line2" => null,
                                    "postal_code" => "94103",
                                    "state" => "CA"
                                ],
                                "carrier" => null,
                                "name" => "Jenny Rosen",
                                "phone" => null,
                                "tracking_number" => null
                            ],
                            "source" => null,
                            "source_transfer" => null,
                            "statement_descriptor" => null,
                            "statement_descriptor_suffix" => null,
                            "status" => "succeeded",
                            "transfer_data" => null,
                            "transfer_group" => null
                        ]
                    ],
                    "has_more" => false,
                    "total_count" => 1,
                    "url" => "\/v1\/charges?payment_intent=pi_1Ga0rQBEW94QPQobjQI1ab43"
                ],
                "client_secret" => "pi_1Ga0rQBEW94QPQobjQI1ab43_secret_RP40cowwyfCMSLyRsW6rF1fJZ",
                "confirmation_method" => "automatic",
                "created" => 1587393876,
                "currency" => "usd",
                "customer" => null,
                "description" => "(created by Stripe CLI)",
                "invoice" => null,
                "last_payment_error" => null,
                "livemode" => false,
                "metadata" => [],
                "next_action" => null,
                "on_behalf_of" => null,
                "payment_method" => "pm_1Ga0rQBEW94QPQobNJ5Zu0Db",
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
                "shipping" => [
                    "address" => [
                        "city" => "San Francisco",
                        "country" => "US",
                        "line1" => "510 Townsend St",
                        "line2" => null,
                        "postal_code" => "94103",
                        "state" => "CA"
                    ],
                    "carrier" => null,
                    "name" => "Jenny Rosen",
                    "phone" => null,
                    "tracking_number" => null
                ],
                "source" => null,
                "statement_descriptor" => null,
                "statement_descriptor_suffix" => null,
                "status" => "succeeded",
                "transfer_data" => null,
                "transfer_group" => null
            ]
        ],
        "livemode" => false,
        "pending_webhooks" => 1,
        "request" => [
            "id" => "req_ldlVIzE1LWsUy7",
            "idempotency_key" => null
        ],
        "type" => "payment_intent.succeeded"
    ];


    public function setUp(): void
    {
        parent::setUp();
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testRelationshipsForOrderandOrderTransactions()
    {
        // Creat order and associate transaction
        factory(Order::class, 5)->create()->each(function ($order) {
            $orderTransaction = new OrderTransaction();
            $orderTransaction->order_id = $order->id;
            $orderTransaction->save();

            $order->orderTransaction()->save($orderTransaction);

            $order->save();
        });


        // Check the one to one relationship
        $order = OrderTransaction::find(rand(1, 5))->order;
        $orderTransaction = Order::find(rand(1, 5))->orderTransaction;
        $this->assertNotEmpty($orderTransaction->id);
        $this->assertNotEmpty($order->id);
    }

    // For now this is tightly coupled to a package that has this route
    public function testWebhookForPaymentGateway()
    {

        // $response = $this->post('/receive-hook', $this->postData);
        // $response = $this->post('/receive-hook', ['balh' => 'as foo']);

        $server = $this->transformHeadersToServerVars([]);
        $cookies = $this->prepareCookiesForRequest();

        // public function call($method, $uri, $parameters = [], $cookies = [], $files = [], $server = [], $content = null)

        $response = $this->call(
            'POST',
            '/receive-hook',
            ['lah' => 'blah'],
            $cookies,
            [],
            $server,
            // json_encode(['balh' => 'as foo'])
            json_encode($this->postData)
        );

        $response->assertStatus(200);
        $this->assertEquals('Success', $response->getContent());
    }
}
