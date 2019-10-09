<?php

namespace Lab19\Cart\Http\controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class ResetPasswordController extends BaseController
{
    public function index()
    {
        // Return the view with the reset password form that submits to graphql with new password and token
    }

    public function resetPassword(Request $request)
    {
    }
}
