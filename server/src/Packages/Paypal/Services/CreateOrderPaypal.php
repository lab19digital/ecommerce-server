<?php

namespace  Gernzy\Server\Packages\Paypal\Services;

use Illuminate\Support\Facades\Log;

/**I can only access PayPalCheckoutSdk\Orders\OrdersCreateRequest;
 *  when installing sdk in the laravel install, not this gernzy package
 */

use PayPalCheckoutSdk\Orders\OrdersCreateRequest;

class CreateOrderPaypal
{

    // 2. Set up your server to receive a call from the client
    /**
     *This is the sample function to create an order. It uses the
     *JSON body returned by buildRequestBody() to create an order.
     */
    public static function createOrder($debug = false, $cartTotal, $sessionCurrency)
    {
        $request = new OrdersCreateRequest();
        $request->prefer('return=representation');
        $request->body = self::buildRequestBody($cartTotal, $sessionCurrency);
        // 3. Call PayPal to set up a transaction
        $client = PayPalClient::client();
        $response = $client->execute($request);

        $paypalService = App::make('Paypal\PaypalService');
        $providerName = $paypalService->providerName() ?? 'Paypal';


        if ($debug || $response->statusCode != 201) {
            Log::debug("Status Code: {$response->statusCode}\n", ['package' => $providerName]);
            Log::debug("Status: {$response->result->status}\n", ['package' => $providerName]);
            Log::debug("Order ID: {$response->result->id}\n", ['package' => $providerName]);
            Log::debug("Intent: {$response->result->intent}\n", ['package' => $providerName]);
            Log::debug("Links:\n", ['package' => $providerName]);
            foreach ($response->result->links as $link) {
                Log::debug("\t{$link->rel}: {$link->href}\tCall Type: {$link->method}\n", ['package' => $providerName]);
            }

            // To Log::debug() the whole response body, uncomment the following line
            Log::debug(json_encode($response->result, JSON_PRETTY_PRINT), ['package' => $providerName]);
        }

        // 4. Return a successful response to the client.
        return $response;
    }

    /**
     * Setting up the JSON request body for creating the order with minimum request body. The intent in the
     * request body should be "AUTHORIZE" for authorize intent flow.
     *
     */
    private static function buildRequestBody($cartTotal, $sessionCurrency)
    {
        return [
            'intent' => 'CAPTURE',
            'application_context' =>
            [
                'return_url' => 'https://example.com/return',
                'cancel_url' => 'https://example.com/cancel'
            ],
            'purchase_units' =>
            [
                0 =>
                [
                    'amount' =>
                    [
                        'currency_code' => $sessionCurrency,
                        'value' => ($cartTotal / 100)
                    ]
                ]
            ]
        ];
    }
}
