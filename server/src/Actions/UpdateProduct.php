<?php

namespace Gernzy\Server\Actions;

use \App;
use Gernzy\Server\Actions\Helpers\Attributes;
use Gernzy\Server\Models\Category;
use Gernzy\Server\Models\Product;

class UpdateProduct
{
    public static function handle(Int $id, array $args): Product
    {
        $product = Product::findOrFail($id);
        $product->fill($args);
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

        $attributes = new Attributes($product);
        $attributes
            ->meta($args['meta'] ?? [])
            ->sizes($args['sizes'] ?? [])
            ->dimensions($args['dimensions'] ?? [])
            ->weight($args['weight'] ?? [])
            ->prices($args['prices'] ?? []);

        // Update the attributes
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
