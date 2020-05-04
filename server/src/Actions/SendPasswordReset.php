<?php

namespace Gernzy\Server\Actions;

use Gernzy\Server\Exceptions\GernzyException;
use Gernzy\Server\Models\PasswordResets;

use Gernzy\Server\Models\User;
use Gernzy\Server\Notifications\GernzyResetPassword;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class SendPasswordReset
{
    public static function handle($email): User
    {
        $resetRecord = PasswordResets::where('email', '=', $email)->first();

        // Delete reset record if already exists
        if ($resetRecord !== null) {
            $resetRecord->delete();
        }

        $user = User::where('email', $email)->first();

        // User not found in the database
        if (!isset($user) || empty($user)) {
            throw new GernzyException(
                'Password reset.',
                'Error occured.'
            );
        }

        $token = Password::broker()->createToken($user);
        PasswordResets::create([
            'email' => $user->email,
            'token' => Hash::make($token),
            'created_at' => Carbon::now(),
        ]);

        $user->notify(new GernzyResetPassword($token));

        return $user;
    }
}
