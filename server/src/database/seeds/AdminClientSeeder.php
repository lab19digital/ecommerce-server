<?php

namespace Gernzy\Server\Database\Seeds;

use Gernzy\Server\Models\User;
use Illuminate\Database\Seeder;
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
        $faker = \Faker\Factory::create();
        $admin = factory(User::class)->create();
        $admin->email = $faker->unique()->email;
        $admin->is_admin = 1;
        $admin->password = Str::random(12);
        $admin->save();

        // DB::table('gernzy_users')->insert([
        //     'name' => $faker->word(),
        //     'email' => $faker->sentence(),
        //     'is_admin' => true,
        //     'password' => 'encode'
        // ]);
    }
}
