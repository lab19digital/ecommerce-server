<?php

namespace Gernzy\Server\Database\Seeds;

use Gernzy\Server\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

// use Illuminate\Support\Facades\DB;

class AdminClientSeeder extends Seeder
{
    protected $foo = [];

    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $userName = 'admin';
        $email = 'admin@gernzy.com';
        $password = Str::random(12);

        // The admin client may already exist, so I am doing a firstOr to check if exist and if not create admin client
        $user = User::where('email', $email)->firstOr(function () use ($userName, $email, $password) {
            $user = User::create([
                'name' => $userName,
                'email' => $email,
                'is_admin' => true,
                'password' => Hash::make($password)
            ]);

            print " ******************** 
            \n\e[32m Admin client successfully created.  \e[39m
            \n Username: " . $user->name . " 
            \n Email: " . $user->email . "
            \n Password: " . $password . "  
            \n ******************** \n";
        });

        if (!empty($user)) {
            print " ******************** 
            \n\e[33m Admin client already exists.  \e[39m
            \n Username: " . $user->name . " 
            \n Email: " . $user->email . "
            \n Password: *******" . "  
            \n ******************** \n";
        }
    }
}
