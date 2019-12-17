<?php

namespace Lab19\Cart\Actions;

use \App;
use Lab19\Cart\Actions\Helpers\Attributes;
use Lab19\Cart\Models\Category;
use Lab19\Cart\Models\Product;
use Lab19\Cart\Models\ProductFixedPrice;
use Lab19\Cart\Services\ExhangeRatesManager;

class CreateProduct
{
    public static function handle($args): Product
    {
        $product = new Product([
            'title' => $args['title'],
            'price_cents' => $args['price_cents'] ?? "",
            'price_currency' => $args['price_currency'] ?? "",
            'short_description' => $args['short_description'] ?? "",
            'long_description' => $args['long_description'] ?? "",
            'status' => 'IN_STOCK',
            'published' => 0
        ]);

        $product->save();

        $categories = $args['categories'] ?? [];

        $createCategories = [];
        foreach ($categories as $category) {
            if (isset($category['id'])) {
                $cat = Category::find($category['id']);
                if ($cat) {
                    $product->categories()->attach($cat);
                }
            } elseif (isset($category['title'])) {
                $createCategories[] = [
                    'title' => $category['title']
                ];
            }
        }

        $product->categories()->createMany($createCategories);

        $attributes = new Attributes();
        $attributes
            ->meta($args['meta'] ?? [])
            ->sizes($args['sizes'] ?? [])
            ->dimensions($args['dimensions'] ?? [])
            ->weight($args['weight'] ?? [])
            ->prices($args['prices'] ?? []);

        $product->attributes()->createMany(
            $attributes->toArray()
        );

        // Create fixed prices if specified in the arguments
        $productPrice = $args['price_cents'] ?? false;
        $productBaseCurrency = $args['price_currency'] ?? false;
        $fixCurrencies = $args['fixprices'] ?? false;

        if ($fixCurrencies && $productPrice && $productBaseCurrency) {

            // Map over each currency provided and fix the price for the product in that currency
            $convertedFixedPrices = array_map(function ($currencyCode) use ($productPrice, $productBaseCurrency) {

                // Use the Exhange Rate manager object to convert the prices
                $converter = (App::make(ExhangeRatesManager::class))
                    ->setPrices([0 => ['price_currency' =>  $productBaseCurrency, 'price_cents' => $productPrice]])
                    ->setTargetCurrency($currencyCode)
                    ->convertPrices();

                return new ProductFixedPrice(['country_code' => $currencyCode, 'price' => $converter[0]['price_cents']]);
            }, $fixCurrencies);

            // Create latavel relationship for the products fixed prices in the specified currencies
            $product->fixedPrices()->saveMany($convertedFixedPrices);
        }


        return $product;
    }
}
