<?php

namespace Gernzy\Server\Tests\Feature;

use Gernzy\Server\Listeners\BeforeCheckout;
use Gernzy\Server\Models\OrderTransaction;
use Gernzy\Server\Packages\Paypal\Actions\PaypalBeforeCheckout;
use Gernzy\Server\Packages\Paypal\Services\PaypalService;
use Gernzy\Server\Packages\Paypal\Services\PaypalServiceMock;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\Unit\TestCheckoutTest;

class PaypalTest extends TestCheckoutTest
{
    use WithFaker;

    public function setUp(): void
    {
        parent::setUp();
    }

    public function testPaypalPaymentGatewayProvider()
    {
        // Change the payment method property of the form submission data
        $vars = ['$payment_method' => 'paypal_standard'];
        $this->checkoutMutation = strtr($this->checkoutMutation, $vars);

        // 1. Register service provider (mocking)
        // $this->app->bind('Paypal\PaypalService', PaypalService::class);
        $this->app->bind('Paypal\PaypalService', PaypalServiceMock::class);

        // 2. Registe event mapping
        config(['events.' . BeforeCheckout::class => [PaypalBeforeCheckout::class,]]);

        // Create session, Add product to cart,  Create checkout
        $this->testUserCanCheckoutWithItemsInCart();
        $this->assertNotEmpty($this->result);

        $eventData = json_decode($this->result['data']['checkout']['event_data']);

        // Check for Paypal data
        $this->assertNotEmpty($eventData[0]->data->transaction_data->paypal_data->result->id);


        $orderTransaction = OrderTransaction::find(1);
        $this->assertNotEmpty($orderTransaction->transaction_data);
        $this->assertNotEmpty($orderTransaction->transaction_data['paypal_data']);
        $this->assertEquals($orderTransaction->status, 'pending');
        $this->assertEquals($orderTransaction->payment_method, 'paypal_standard');
    }

    public function testPaypalPaymentGatewayProviderWithDifferentCurrency()
    {
        // Change the payment method property of the form submission data
        $vars = ['$payment_method' => 'paypal_standard'];
        $this->checkoutMutation = strtr($this->checkoutMutation, $vars);

        // Set the session currency
        $query = '
                mutation {
                    setSessionCurrency(input: {
                        currency: "EUR"
                    }){
                        currency
                    }
                }
            ';

        $response = $this->graphQLWithSession($query);

        // 1. Register service provider (mocking)
        // $this->app->bind('Paypal\PaypalService', PaypalService::class);
        $this->app->bind('Paypal\PaypalService', PaypalServiceMock::class);

        // 2. Registe event mapping
        config(['events.' . BeforeCheckout::class => [PaypalBeforeCheckout::class,]]);

        // Create session, Add product to cart,  Create checkout
        $this->testUserCanCheckoutWithItemsInCart();
        $this->assertNotEmpty($this->result);

        $eventData = json_decode($this->result['data']['checkout']['event_data']);

        // Check for Paypal data
        $this->assertNotEmpty($eventData[0]->data->transaction_data->paypal_data->result->id);

        $orderTransaction = OrderTransaction::find(1);
        $this->assertNotEmpty($orderTransaction->transaction_data);
        $this->assertNotEmpty($orderTransaction->transaction_data['paypal_data']);
        $this->assertEquals($orderTransaction->status, 'pending');
        $this->assertEquals($orderTransaction->payment_method, 'paypal_standard');
    }
}
