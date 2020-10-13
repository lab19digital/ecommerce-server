<?php

namespace Gernzy\Server\Database\Seeds;

use Gernzy\Server\Models\Order;
use Gernzy\Server\Services\SessionService;
use Illuminate\Database\Seeder;

// use Illuminate\Support\Facades\DB;

class OrdersSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(SessionService $sessionService)
    {
        for ($i = 0; $i < 10; $i++) {
            $faker = \Faker\Factory::create();

            $cartId = $faker->numberBetween(1, 10);
            $userId = $faker->numberBetween(1, 10);

            $order = new Order([
                "name" => $faker->name(),
                "email" => $faker->safeEmail,
                "telephone" => $faker->phoneNumber,
                "mobile" => $faker->phoneNumber,

                "shipping_address_line_1" => $faker->address,
                "shipping_address_line_2" => $faker->address,
                "shipping_address_postcode" => $faker->postcode,
                "shipping_address_state" => $faker->state,
                "shipping_address_country" => $faker->country,

                "billing_address_line_1" =>  $faker->address,
                "billing_address_line_2" =>  $faker->address,
                "billing_address_postcode" => $faker->postcode,
                "billing_address_state" => $faker->state,
                "billing_address_country" => $faker->country,

                "payment_method" => $faker->word(),
                "agree_to_terms" => $faker->boolean(),
                "notes" => $faker->sentence(),
            ]);

            // Associate the order to the user
            // and cart to the order
            $order->user_id = $userId;
            $order->cart_id = $cartId;
            $order->save();
        }
    }
}
