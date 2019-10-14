<?php

namespace Lab19\Cart\Actions;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Lab19\Cart\Models\PasswordResets;
use Lab19\Cart\Models\User;

class ResetPassword
{
    public static function handle($args): User
    {
        // Get the records from the cart_password_resets table
        $resetRecord =  PasswordResets::where('email', $args['email'])->firstOrFail();

        // Check the record and compare the token from the args to the one in the table and return email, then delete the record
        if (Hash::check($args['token'], $resetRecord->token)) {
            $email = $resetRecord->email;
            $resetRecord->delete();
        }

        // Check that email exists
        if (empty($email)) {
            return false;
        }

        $user = User::where('email', $email)->firstOrFail();
        $user->password = Hash::make($args['password']);
        $user->setRememberToken(Str::random(60));
        $user->save();
        
        return $user;
    }
}
