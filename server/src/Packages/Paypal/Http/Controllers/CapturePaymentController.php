<?php

namespace Gernzy\Server\Packages\Paypal\Http\Controllers;

use \App;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class CapturePaymentController extends BaseController
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
        $paypalService = App::make('Paypal\PaypalService');
        $response = $paypalService->capturePayment($payload->orderID);
        return response()->json($response, 200);
    }
}
