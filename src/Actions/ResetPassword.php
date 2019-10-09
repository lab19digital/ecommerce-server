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
        $records =  PasswordResets::get();

        foreach ($records as $record) {
            if (Hash::check($args['token'], $record->token)) {
                $email = $record->email;
                break;
            }
        }

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
