<?php

namespace Lab19\Cart\Actions;

use Lab19\Cart\Actions\Helpers\Attributes;
use Lab19\Cart\Factories\OpenExchangeRatesFactory;
use Lab19\Cart\Models\Category;
use Lab19\Cart\Models\Product;
use Lab19\Cart\Models\ProductFixedPrice;

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
            $convertedFixedPrices = array_map(function ($currencyCode) use ($productPrice, $productBaseCurrency) {
                $converter = OpenExchangeRatesFactory::create($currencyCode, $productBaseCurrency);
                $convertedPrice = $converter->convertCurrency($productPrice);

                return new ProductFixedPrice(['country_code' => $currencyCode, 'price' => $convertedPrice]);
            }, $fixCurrencies);

            $product->fixedPrices()->saveMany($convertedFixedPrices);
        }


        return $product;
    }
}
