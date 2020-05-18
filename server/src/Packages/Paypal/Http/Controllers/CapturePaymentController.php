<?php

namespace Gernzy\Server\Packages\Paypal\Http\Controllers;

use \App;
use Gernzy\Server\Packages\Paypal\Services\CaptureOrder;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class WebhookController extends BaseController
{
    /**
     * Show the profile for the given user.
     *
     * @param  int  $id
     * @return View
     */
    public function index(Request $request)
    {
        $payload = json_decode($request->getContent());

        if (!$response = CaptureOrder::captureOrder($payload->orderID, false)) {
            return response()->json(['error' => 'Server error'], 400);
        }

        $paypalService = App::make('Paypal\PaypalService');

        $paypalService->capturePayment($response);

        return response()->json($response, 200);
    }
}
