<?php

namespace Gernzy\Server\Database\Seeds;

use Faker\Generator as Faker;
use Gernzy\Server\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

// use Illuminate\Support\Facades\DB;

class CustomerSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        $userName = $faker->name;
        $email = $faker->email;
        $password = $faker->password;

        $user = User::create([
            'name' => $userName,
            'email' => $email,
            'is_admin' => false,
            'password' => Hash::make($password)
        ]);

        print " ******************** 
        \n\e[32m Admin client successfully created.  \e[39m
        \n Username: " . $user->name . " 
        \n Email: " . $user->email . "
        \n Password: " . $password . "  
        \n ******************** \n";
    }
}
