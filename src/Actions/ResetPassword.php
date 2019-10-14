<?php

namespace Lab19\Cart\Actions;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Lab19\Cart\Exceptions\GernzyException;
use Lab19\Cart\Models\PasswordResets;
use Lab19\Cart\Models\User;

class ResetPassword
{
    public static function handle($args): User
    {
        // Get the records from the cart_password_resets table and compute the difference in time to see if token has expired
        $resetRecord =  PasswordResets::where('email', $args['email'])->first();
        if ($resetRecord === null) {
            throw new GernzyException(
                'The provided email does not exist.',
                'Please resubmit a password reset request.'
            );
        }

        $createdAtTime = Carbon::parse($resetRecord->created_at);
        $timeDiff = $createdAtTime->diffInHours(Carbon::now());

        // Check if created less than 24 hours ago
        if ($timeDiff > 24) {
            $resetRecord->delete();
            throw new GernzyException(
                'Token expired',
                'The token has expired, please resubmit a password reset request.'
            );
        }

        // Check the record and compare the token from the args to the one in the table and return email, then delete the record
        if (!Hash::check($args['token'], $resetRecord->token)) {
            throw new GernzyException(
                'Token mismatch',
                'The token does not match our records, please resubmit a password reset request.'
            );
            $resetRecord->delete();
        }

        // Update the User's record with the new ID
        $user = User::where('email', $resetRecord->email)->firstOrFail();
        $user->password = Hash::make($args['password']);
        $user->setRememberToken(Str::random(60));
        $user->save();

        return $user;
    }
}
