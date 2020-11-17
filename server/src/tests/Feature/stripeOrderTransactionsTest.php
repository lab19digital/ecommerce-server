<?php

namespace Gernzy\Server\Tests\Feature;

use Gernzy\Server\Models\OrderTransaction;
use Gernzy\Server\Packages\Stripe\Services\StripeService;
use GuzzleHttp\Client;
use Illuminate\Foundation\Testing\WithFaker;

class GernzyStripeOrderTransactionsTest extends PaymentGatewayTest
{
    use WithFaker;

    /** This is mock post data that stripe sends to a webhook endpoint for the "type": "payment_intent.succeeded" event*/
    public $postData = '{
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
                    "url": "/v1/charges?payment_intent=pi_1HlvFtBEW94QPQobHccfQBjK",
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
                            "payment_intent": "pi_1HlvFtBEW94QPQobHccfQBjK",
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


    // For now this is tightly coupled to a package that has this route, so there must be a package that has this route configured
    public function testStripeWebhookWithDataAndFindOrderAndOrderTransaction()
    {
        // Set currency, add to cart, fire events and checkout (from PaymentGatewayTest test)
        $this->testPaymentGatewayProviderWithDifferentCurrency();

        // Simulate stripe payment succesful event posted to gernzy webhook
        // public function call($method, $uri, $parameters = [], $cookies = [], $files = [], $server = [], $content = null)
        $response = $this->mockStripeWebhook();

        $response->assertStatus(200);
        $this->assertEquals('Success', $response->getContent());


        $postDataObject = json_decode($this->postData);
        // payment_intent.succeeded_evt_1GcXm6BEW94QPQobIlnXORHv


        $orderTransaction = OrderTransaction::where('transaction_data->stripe_payment_intent->id', $postDataObject->data->object->id)->first();
        $this->assertNotEmpty($orderTransaction->transaction_data);
        $this->assertNotEmpty($orderTransaction->transaction_data['stripe_payment_intent']);
        $this->assertNotEmpty($orderTransaction->transaction_data[$postDataObject->type . "_" . $postDataObject->id]);
        $this->assertEquals($orderTransaction->status, 'paid');

        // Check that the client secret is not present in the db
        $this->assertEmpty($orderTransaction->transaction_data['stripe_payment_intent']['client_secret']);
        $this->assertEmpty($orderTransaction->transaction_data[$postDataObject->type . "_" . $postDataObject->id]['data']['object']['client_secret']);

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


    public function testStripeWebhookWithDataAndFindOrderAndOrderTransactionAndQueryOrderResult()
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
        $this->assertNotEmpty($orderTransaction->transaction_data[$postDataObject->type . "_" . $postDataObject->id]);
        $this->assertEquals($orderTransaction->status, 'paid');

        // Check that the client secret is not present in the db
        $this->assertEmpty($orderTransaction->transaction_data['stripe_payment_intent']['client_secret']);
        $this->assertEmpty($orderTransaction->transaction_data[$postDataObject->type . "_" . $postDataObject->id]['data']['object']['client_secret']);

        // Check the association
        $order = $orderTransaction->order;
        $this->assertNotEmpty($orderTransaction->id);
        $this->assertNotEmpty($order->id);


        $this->graphQLCreateAccountWithSession('order@example.com', 'password');
        /** @var \Illuminate\Foundation\Testing\TestResponse $response */
        $response = $this->graphQLWithSession('
        {
            order(id:1){
              id
              name
              email
              telephone
              shipping_address_line_1
              shipping_address_line_2
              shipping_address_postcode
              shipping_address_state
              shipping_address_country
              billing_address_line_1
              billing_address_line_2
              billing_address_postcode
              billing_address_state
              billing_address_country
              payment_method
              agree_to_terms
              notes
              created_at
              orderTransaction {
                id
                order_id
                status
                transaction_data
                payment_method
              }
            }
        }
    ');

        $result = $response->decodeResponseJson();

        $response->assertDontSee('errors');

        $response->assertJsonStructure([
      'data' => [
        'order' => [
          'id',
          'name',
          'email',
          'telephone',
          'shipping_address_line_1',
          'shipping_address_line_2',
          'shipping_address_postcode',
          'shipping_address_state',
          'shipping_address_country',
          'billing_address_line_1',
          'billing_address_line_2',
          'billing_address_postcode',
          'billing_address_state',
          'billing_address_country',
          'payment_method',
          'agree_to_terms',
          'notes',
          'created_at',
          'orderTransaction' => [
            'id',
            'order_id',
            'status',
            'transaction_data',
            'payment_method',
          ]
        ],
      ],
    ]);

        return $orderTransaction;
    }
}
