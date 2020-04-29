<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use Gernzy\Server\Models\Order;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(Order::class, function (Faker $faker) {
    return [
        'cart_id' => $faker->randomNumber(),
        'currency_id' => $faker->randomNumber(),
        'status' => 'ORDER_PROCESSING',
        'agree_to_terms' => 1,
        'notes' => $faker->paragraph()
    ];
});
