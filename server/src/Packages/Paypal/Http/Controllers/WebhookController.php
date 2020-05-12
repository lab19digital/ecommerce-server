<?php

namespace Gernzy\Server\Packages\Paypal\Http\Controllers;

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
    }
}
