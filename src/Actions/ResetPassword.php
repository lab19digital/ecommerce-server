<?php

namespace Lab19\Cart\Actions;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Lab19\Cart\Models\PasswordResets;
use Lab19\Cart\Models\User;

class ResetPassword
{
    public static function handle($args): User
    {
        // Get the records from the cart_password_resets table and compute the difference in time to see if token has expired
        $resetRecord =  PasswordResets::where('email', $args['email'])->firstOrFail();
        $createdAtTime = Carbon::parse($resetRecord->created_at);
        $timeDiff = $createdAtTime->diffInHours(Carbon::now());

        // Check if created less than 24 hours ago
        if ($timeDiff > 24) {
            $resetRecord->delete();
            return false;
        }

        // Check the record and compare the token from the args to the one in the table and return email, then delete the record
        if (Hash::check($args['token'], $resetRecord->token)) {
            $email = $resetRecord->email;
            $resetRecord->delete();
        }

        // Check that email exists
        if (empty($email)) {
            return false;
        }

        // Update the User's record with the new ID
        $user = User::where('email', $email)->firstOrFail();
        $user->password = Hash::make($args['password']);
        $user->setRememberToken(Str::random(60));
        $user->save();

        return $user;
    }
}
