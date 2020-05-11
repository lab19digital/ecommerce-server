<?php

namespace Gernzy\Server\Packages\Paypal\Http\Controllers;

use Gernzy\Server\Exceptions\GernzyException;
use Gernzy\Server\Packages\Paypal\Services\CreateOrder;
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
        return 'brrrr';
    }

    public function handleTransaction(Request $request)
    {
        /**
         *This is the driver function that invokes the createOrder function to create
         *a sample order.
         */

        // $content = json_decode($request->getContent(), true);
        // if (!isset($content['userToken']) && empty($content['userToken'])) {
        //     throw new GernzyException(
        //         'No user token provided.',
        //         'Please provide a valid user token.'
        //     );
        // }

        // $token = $content['userToken'];

        // $response = CreateOrder::createOrder();
        // return json_encode($response);
    }
}
