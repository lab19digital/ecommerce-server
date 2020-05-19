<?php

namespace Gernzy\Server\Tests\Feature;

use Gernzy\Server\Models\OrderTransaction;
use Illuminate\Foundation\Testing\WithFaker;

class GernzyPaypaleOrderTransactionsTest extends PaypalTest
{
    use WithFaker;

    /** This is mock post data that stripe sends to a webhook endpoint for the "type": "payment_intent.succeeded" event*/
    public $postData = '...';

    public function mockPaypalCaptureOrder()
    {
        // Simulate stripe payment succesful event posted to gernzy webhook
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
    public function testWebhookWithDataAndFindOrderAndOrderTransaction()
    {
        // Set currency, add to cart, fire events and checkout (from PaymentGatewayTest test)
        $this->testPaymentGatewayProviderWithDifferentCurrency();

        // Simulate stripe payment succesful event posted to gernzy webhook
        // public function call($method, $uri, $parameters = [], $cookies = [], $files = [], $server = [], $content = null)
        $response = $this->mockPaypalCaptureOrder();

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
}
