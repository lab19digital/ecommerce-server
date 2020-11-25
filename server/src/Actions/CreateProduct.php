<?php

namespace Gernzy\Server\Actions;

use \App;
use Gernzy\Server\Actions\Helpers\Attributes;
use Gernzy\Server\Models\Category;
use Gernzy\Server\Models\Product;

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

        // Product details
        $productPrice = $args['price_cents'] ?? false;
        $productBaseCurrency = $args['price_currency'] ?? false;
        $fixCurrencies = $args['fixprices'] ?? false;

        if (!$fixCurrencies || !$productPrice || !$productBaseCurrency) {
            return $product;
        }

        // Use FixPricesService to map over $fixCurrencies and fix the price for the product in that currency
        // and pass the resultant array to the save many function

        return (App::make('Gernzy\FixPricesService'))
            ->setProduct($product)
            ->setFixCurrencies($fixCurrencies)
            ->setProductPrice($productPrice)
            ->setProductBaseCurrency($productBaseCurrency)
            ->handleFixedPrices();
    }
}
