<?php

namespace Gernzy\Server\Database\Seeds;

use Gernzy\Server\Actions\Helpers\Attributes;
use Gernzy\Server\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsSeeder extends Seeder
{


    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();
        for ($i = 0; $i < 100; $i++) {
            $this->helper();
            // $rand = rand(0, 20);
            // DB::table('gernzy_products')->insert([
            //     'title' => $faker->word(),
            //     'short_description' => $faker->sentence(),
            //     'status' => $rand > 5 ? 'IN_STOCK' : 'OUT_OF_STOCK',
            //     'published' => $rand > 5 ? 1 : 0,
            //     'price_cents' => $faker->numberBetween($min = 1000, $max = 9000),
            //     'price_currency' => 'USD', //$faker->currencyCode()
            // ]);
        }
    }

    public function helper()
    {
        $faker = \Faker\Factory::create();
        $rand = rand(0, 20);

        $product = new Product([
            'title' => $faker->word(),
            'price_cents' =>  $faker->numberBetween($min = 1000, $max = 9000),
            'price_currency' => "USD",
            'short_description' => $faker->sentence(),
            'long_description' => $faker->sentence(),
            'status' => $rand > 5 ? 'IN_STOCK' : 'OUT_OF_STOCK',
            'published' => $rand > 5 ? 1 : 0
        ]);

        $product->save();

        $categories = $faker->words();

        $createCategories = [];
        foreach ($categories as $category) {
            $createCategories[] = [
                'title' => $category
            ];
        }

        $product->categories()->createMany($createCategories);

        $meta =  [
            [
                'key' => $faker->word(),
                'value' => $faker->word()
            ],
            [
                'key' => $faker->word(),
                'value' => $faker->word()
            ]
        ];

        $sizes =  [
            [
                'size' => $faker->randomDigitNotNull,
            ],
            [
                'size' => $faker->randomDigitNotNull,
            ]
        ];

        $dimensions = [
            'width' => $faker->randomDigitNotNull,
            'height' => $faker->randomDigitNotNull,
        ];

        $weight = [
            'kg' => $faker->randomDigitNotNull,
            'lbs' => $faker->randomDigitNotNull,
        ];

        $prices = [
            [
                'currency' => $faker->currencyCode,
                'value' =>  $faker->randomDigitNotNull
            ],
            [
                'currency' => $faker->currencyCode,
                'value' =>  $faker->randomDigitNotNull
            ]
        ];

        $attributes = new Attributes();
        $attributes
            ->meta($meta)
            ->sizes($sizes)
            ->dimensions($dimensions)
            ->weight($weight)
            ->prices($prices);

        $product->attributes()->createMany(
            $attributes->toArray()
        );
    }
}
