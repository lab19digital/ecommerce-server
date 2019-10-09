<?php

namespace Lab19\Cart\Http\controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Lab19\Cart\Models\Passwords;
use Lab19\Cart\Models\User;

class ResetPasswordController extends BaseController
{
    public function index()
    {
        # code...
    }

    public function resetPassword(Request $request)
    {
        $passWordReset = Passwords::where('email', $request->email)->firstOrFail();

        if (Hash::check($request->token, $passWordReset->token)) {
            $user = User::where('email', $request->email)->firstOrFail();
            $user->password = Hash::make($request->password);
            $user->setRememberToken(Str::random(60));
            $user->save();
            return response('success', 200);
        }
    }
}
