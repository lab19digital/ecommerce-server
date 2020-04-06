<?php

namespace Tests\Feature;

use Gernzy\Server\Listeners\BeforeCheckout;
use Gernzy\Server\Packages\Stripe\Actions\StripeBeforeCheckout;
use Gernzy\Server\Packages\Stripe\Services\StripeService;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\Unit\TestCheckoutTest;

class PaymentGatewayTest extends TestCheckoutTest
{
    use WithFaker;

    public function setUp(): void
    {
        parent::setUp();
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testBasicStripe()
    {
        // Set your secret key. Remember to switch to your live secret key in production!
        // See your keys here: https://dashboard.stripe.com/account/apikeys
        // \Stripe\Stripe::setApiKey('from_env');


        // $intent = \Stripe\PaymentIntent::create([
        //     'amount' => 1099,
        //     'currency' => 'usd',
        //     // Verify your integration in this guide by including this parameter
        //     'metadata' => ['integration_check' => 'accept_a_payment'],
        // ]);


        // $this->assertNotEmpty($intent);
    }

    public function testPaymentGatewayProvider()
    {

        // 1. Register service provider
        $this->app->bind('Stripe\StripeService', StripeService::class);

        // 2. Registe event mapping
        config(['events.' . BeforeCheckout::class => [StripeBeforeCheckout::class,]]);


        // Create session, Add product to cart,  Create checkout
        $this->testUserCanCheckoutWithItemsInCart();
        $this->assertNotEmpty($this->result);

        $eventData = json_decode($this->result['data']['checkout']['event_data']);


        // Check for stripe secret
        $this->assertNotEmpty($eventData[0]->data->stripe_data);
    }
}
