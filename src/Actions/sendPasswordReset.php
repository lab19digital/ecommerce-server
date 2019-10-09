<?php

namespace Lab19\Cart\Actions;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Password;
use Lab19\Cart\Models\Passwords;
use Lab19\Cart\Models\User;
use Lab19\Cart\Notifications\GernzyResetPassword;

class SendPasswordReset
{
    public static function handle($email): User
    {
        // Find the user
        $user = User::where('email', $email)->first();

        // Generate token
        $token = Password::broker()->createToken($user);

        Passwords::create([
            'email' => $user->email,
            'token' => Hash::make($token),
            'created_at' => Carbon::now(),
        ]);

        $user->notify(new GernzyResetPassword($token));

        return $user;
    }
}
