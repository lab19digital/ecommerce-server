<?php

namespace Gernzy\Server\Packages\Paypal\Http\Controllers;

use Gernzy\Server\Packages\Paypal\Services\CreateOrder;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Log;

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
        return 'brrrr';
    }

    public function handleTransaction(Request $request)
    {
        /**
         *This is the driver function that invokes the createOrder function to create
         *a sample order.
         */
        $response = CreateOrder::createOrder(false);
        Log::debug(json_encode($response, JSON_PRETTY_PRINT));
        return json_encode($response);
        // if (!count(debug_backtrace())) {
        //     return CreateOrder::createOrder(true);
        // }
    }
}
