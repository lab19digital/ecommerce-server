<?php

namespace Gernzy\Server\Actions;

use \App;
use Gernzy\Server\Actions\Helpers\Attributes;
use Gernzy\Server\Models\Image;
use Gernzy\Server\Models\Product;
use Illuminate\Support\Facades\Log;

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

        // To avoid duplicates delete existing categories and add new incoming categories
        $product->categories()->delete();
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

        // Update the images
        // $product->images()->delete();
        $images = json_decode($args["images"]);

        // Log::debug($images);


        // $imagesNew = [];

        foreach ($images as $image) {
            if ($image->id > 0) {
                $imageFind = Image::find($image->id);
                $imageFind->name = $image->name;
                $imageFind->url = $image->url;
                $imageFind->type = $image->type;
                $imageFind->save();
            } else {
                $imageNew = new Image(["name" => $image->name, "url" => $image->url, "type" => $image->type]);
                // $imageNew->save();
                $product->images()->save($imageNew);
            }

            // $imageNew = new Image(["name" => $image->name, "url" => $image->url, "type" => $image->type]);
            // if ($image->id > 0) {
            //     $imageNew->id = $image->id;
            // }
            // array_push($imagesNew, $imageNew);
        }

        // $images = $product->images()->saveMany($imagesNew);



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
            ->handleFixedPricesUpdate();
    }
}
