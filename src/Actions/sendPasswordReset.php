<?php

namespace Lab19\Cart\Actions;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Lab19\Cart\Models\PasswordResets;
use Lab19\Cart\Models\User;
use Lab19\Cart\Notifications\GernzyResetPassword;

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

        // Do not indicate that the user does not exist
        // The empty user object is returned, because User.php requires a returned User instance.
        // TODO:Check if the empty user return is a good pattern
        if ($user === null) {
            $empty = new User();
            return $empty;
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
