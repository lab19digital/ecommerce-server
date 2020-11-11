<?php

namespace Gernzy\Server\Tests\Feature;

use Gernzy\Server\Models\OrderTransaction;
use Gernzy\Server\Packages\Paypal\Services\CaptureOrderPaypalMock;
use Gernzy\Server\Packages\Paypal\Services\PaypalService;
use Illuminate\Foundation\Testing\WithFaker;

class GernzyPaypaleOrderTransactionsTest extends PaypalTest
{
    use WithFaker;

    public $postData = '{
        "orderID": "81M70884VT025633W"
    }';

    public function mockPaypalCaptureOrder()
    {
        // Simulate paypal payment succesful event posted to gernzy webhook
        // public function call($method, $uri, $parameters = [], $cookies = [], $files = [], $server = [], $content = null)
        $mockPaypalCaptureOrder = $this->call(
            'POST',
            '/create-paypal-transaction',
            [],
            [],
            [],
            ['REMOTE_ADDR' => '10.1.0.1'],
            $this->postData
        );

        return $mockPaypalCaptureOrder;
    }



    public function setUp(): void
    {
        parent::setUp();
    }


    // For now this is tightly coupled to a package that has this route, so there must be a package that has this route configured
    public function testPaypalCapturePaymentDataAndFindOrderAndOrderTransaction()
    {
        // Set currency, add to cart, fire events and checkout (from PaymentGatewayTest test)
        $this->testPaypalPaymentGatewayProviderWithDifferentCurrency();

        // Now bind in the real service
        $this->app->bind('Paypal\PaypalService', PaypalService::class);

        // Mock the Paypal\CaptureOrderPaypal class, a function inside PaypalService::class
        $this->app->bind('Paypal\CaptureOrderPaypal', CaptureOrderPaypalMock::class);

        // Simulate paypal payment succesful event posted to gernzy webhook
        // public function call($method, $uri, $parameters = [], $cookies = [], $files = [], $server = [], $content = null)
        $response = $this->mockPaypalCaptureOrder();
        $response->assertStatus(200);

        $postDataObject = json_decode($this->postData);
        $orderTransaction = OrderTransaction::where('transaction_data->paypal_data->result->id', $postDataObject->orderID)->first();
        $this->assertNotEmpty($orderTransaction->transaction_data);
        $this->assertNotEmpty($orderTransaction->transaction_data['paypal_data']);
        $this->assertNotEmpty($orderTransaction->transaction_data['paypal_payment_capture']);
        $this->assertEquals($orderTransaction->status, 'paid');

        // Check the association
        $order = $orderTransaction->order;
        $this->assertNotEmpty($orderTransaction->id);
        $this->assertNotEmpty($order->id);

        return $orderTransaction;
    }


    public function testPaypalWebhookWithDataAndFindOrderAndOrderTransactionAndQueryOrderResult()
    {
        // Set currency, add to cart, fire events and checkout (from PaymentGatewayTest test)
        $this->testPaypalPaymentGatewayProviderWithDifferentCurrency();

        // Now bind in the real service
        $this->app->bind('Paypal\PaypalService', PaypalService::class);

        // Mock the Paypal\CaptureOrderPaypal class, a function inside PaypalService::class
        $this->app->bind('Paypal\CaptureOrderPaypal', CaptureOrderPaypalMock::class);

        // Simulate paypal payment succesful event posted to gernzy webhook
        // public function call($method, $uri, $parameters = [], $cookies = [], $files = [], $server = [], $content = null)
        $response = $this->mockPaypalCaptureOrder();
        $response->assertStatus(200);

        $postDataObject = json_decode($this->postData);
        $orderTransaction = OrderTransaction::where('transaction_data->paypal_data->result->id', $postDataObject->orderID)->first();
        $this->assertNotEmpty($orderTransaction->transaction_data);
        $this->assertNotEmpty($orderTransaction->transaction_data['paypal_data']);
        $this->assertNotEmpty($orderTransaction->transaction_data['paypal_payment_capture']);
        $this->assertEquals($orderTransaction->status, 'paid');

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
