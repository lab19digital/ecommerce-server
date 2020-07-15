<?php

namespace  Gernzy\Server\Packages\Paypal\Services;

use Illuminate\Support\Facades\Log;
use PayPalCheckoutSdk\Orders\OrdersCaptureRequest;

class CaptureOrderPaypal
{

    // 2. Set up your server to receive a call from the client
    /**
     *This function can be used to capture an order payment by passing the approved
     *order ID as argument.
     *
     *@param orderId
     *@param debug
     *@returns
     */
    public static function captureOrder($orderId, $debug = false)
    {
        $request = new OrdersCaptureRequest($orderId);

        // 3. Call PayPal to capture an authorization
        $client = PayPalClient::client();
        $response = $client->execute($request);

        $paypalService = App::make('Paypal\PaypalService');
        $providerName = $paypalService->providerName() ?? 'Paypal';

        // 4. Save the capture ID to your database. Implement logic to save capture to your database for future reference.
        if ($debug || $response->statusCode != 201) {
            Log::debug("Status Code: {$response->statusCode}\n", ['package' => $providerName]);
            Log::debug("Status: {$response->result->status}\n", ['package' => $providerName]);
            Log::debug("Order ID: {$response->result->id}\n", ['package' => $providerName]);
            Log::debug("Links:\n", ['package' => $providerName]);
            foreach ($response->result->links as $link) {
                Log::debug("\t{$link->rel}: {$link->href}\tCall Type: {$link->method}\n", ['package' => $providerName]);
            }
            Log::debug("Capture Ids:\n", ['package' => $providerName]);
            foreach ($response->result->purchase_units as $purchase_unit) {
                foreach ($purchase_unit->payments->captures as $capture) {
                    Log::debug("\t{$capture->id}", ['package' => $providerName]);
                }
            }
            // To print the whole response body, uncomment the following line
            Log::debug(json_encode($response->result, JSON_PRETTY_PRINT), ['package' => $providerName]);
        }

        return $response;
    }
}
