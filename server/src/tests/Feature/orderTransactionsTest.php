<?php

namespace Gernzy\Server\Tests\Feature;

use Gernzy\Server\Models\Order;
use Gernzy\Server\Models\OrderTransaction;
use Gernzy\Server\Packages\Stripe\Services\StripeService;
use GuzzleHttp\Client;
use Illuminate\Foundation\Testing\WithFaker;
use Gernzy\Server\Tests\Feature\PaymentGatewayTest;

class GernzyOrderTransactionsTest extends PaymentGatewayTest
{
    use WithFaker;

    /** This is mock post data that stripe sends to a webhook endpoint for the "type": "payment_intent.succeeded" event*/
    public $postData = '{
        "id": "evt_1GcXm6BEW94QPQobIlnXORHv",
        "object": "event",
        "api_version": "2020-03-02",
        "created": 1587997054,
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
                  "id": "ch_1GcXm5BEW94QPQob6uaNureL",
                  "object": "charge",
                  "amount": 2000,
                  "amount_refunded": 0,
                  "application": null,
                  "application_fee": null,
                  "application_fee_amount": null,
                  "balance_transaction": "txn_1GcXm5BEW94QPQobXHGa8qCF",
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
                  "created": 1587997053,
                  "currency": "usd",
                  "customer": null,
                  "description": "(created by Stripe CLI)",
                  "destination": null,
                  "dispute": null,
                  "disputed": false,
                  "failure_code": null,
                  "failure_message": null,
                  "fraud_details": {
                  },
                  "invoice": null,
                  "livemode": false,
                  "metadata": {
                  },
                  "on_behalf_of": null,
                  "order": null,
                  "outcome": {
                    "network_status": "approved_by_network",
                    "reason": null,
                    "risk_level": "normal",
                    "risk_score": 48,
                    "seller_message": "Payment complete.",
                    "type": "authorized"
                  },
                  "paid": true,
                  "payment_intent": "pi_1GcXm5BEW94QPQob0p6yNpYK",
                  "payment_method": "pm_1GcXm5BEW94QPQobvT30HiSY",
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
                  "receipt_url": "https://pay.stripe.com/receipts/acct_1FqyBQBEW94QPQob/ch_1GcXm5BEW94QPQob6uaNureL/rcpt_HAtZ8EF9isKV5QBbFE1bvY3sIFCakIe",
                  "refunded": false,
                  "refunds": {
                    "object": "list",
                    "data": [
      
                    ],
                    "has_more": false,
                    "total_count": 0,
                    "url": "/v1/charges/ch_1GcXm5BEW94QPQob6uaNureL/refunds"
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
              "url": "/v1/charges?payment_intent=pi_1GcXm5BEW94QPQob0p6yNpYK"
            },
            "client_secret": "pi_1GcXm5BEW94QPQob0p6yNpYK_secret_9q6Ycg7HyalPMTOPYNCVE3X2S",
            "confirmation_method": "automatic",
            "created": 1587997053,
            "currency": "usd",
            "customer": null,
            "description": "(created by Stripe CLI)",
            "invoice": null,
            "last_payment_error": null,
            "livemode": false,
            "metadata": {
            },
            "next_action": null,
            "on_behalf_of": null,
            "payment_method": "pm_1GcXm5BEW94QPQobvT30HiSY",
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
        "pending_webhooks": 1,
        "request": {
          "id": "req_mCvlxkVk7vfp3f",
          "idempotency_key": null
        },
        "type": "payment_intent.succeeded"
      }';

    public function mockStripeWebhook()
    {
        // Simulate stripe payment succesful event posted to gernzy webhook
        // public function call($method, $uri, $parameters = [], $cookies = [], $files = [], $server = [], $content = null)
        $mockStripeWebhook = $this->call(
            'POST',
            '/receive-hook',
            [],
            [],
            [],
            ['REMOTE_ADDR' => '10.1.0.1'],
            $this->postData
        );

        return $mockStripeWebhook;
    }



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
            $orderTransaction->status = 'pending';
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

    // For now this is tightly coupled to a package that has this route, so there must be a package that has this route configured
    public function testWebhookWithDataAndFindOrderAndOrderTransaction()
    {
        // Set currency, add to cart, fire events and checkout (from PaymentGatewayTest test)
        $this->testPaymentGatewayProviderWithDifferentCurrency();

        // Simulate stripe payment succesful event posted to gernzy webhook
        // public function call($method, $uri, $parameters = [], $cookies = [], $files = [], $server = [], $content = null)
        $response = $this->mockStripeWebhook();

        $response->assertStatus(200);
        $this->assertEquals('Success', $response->getContent());

        $postDataObject = json_decode($this->postData);
        $orderTransaction = OrderTransaction::where('transaction_data->stripe_payment_intent->id', $postDataObject->data->object->id)->first();
        $this->assertNotEmpty($orderTransaction->transaction_data);
        $this->assertNotEmpty($orderTransaction->transaction_data['stripe_payment_intent']);
        $this->assertNotEmpty($orderTransaction->transaction_data['stripe_payment_event']);
        $this->assertEquals($orderTransaction->status, 'paid');

        // Check that the client secret is not present in the db
        $this->assertEmpty($orderTransaction->transaction_data['stripe_payment_intent']['client_secret']);
        $this->assertEmpty($orderTransaction->transaction_data['stripe_payment_event']['data']['object']['client_secret']);

        // Check the association
        $order = $orderTransaction->order;
        $this->assertNotEmpty($orderTransaction->id);
        $this->assertNotEmpty($order->id);

        return $orderTransaction;
    }

    public function testFunctionCheckAcceptedIpAddresses()
    {
        $stripeService = new StripeService();
        $this->assertTrue(in_array('3.18.12.63', $stripeService->getStripeWebhookIPAdresses()));
    }
}
