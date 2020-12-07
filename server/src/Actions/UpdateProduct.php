<?php

namespace Gernzy\Server\Actions;

use \App;
use Gernzy\Server\Actions\Helpers\Attributes;
use Gernzy\Server\Models\Image;
use Gernzy\Server\Models\Product;
use Gernzy\Server\Models\Tag;

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

        /*Update images*/
        // Detach all product images (note this does not delete the image from the images table, only removed the association)
        $product->images()->detach();
        $images = json_decode($args["images"]);

        // For each incoming image, if it already has an id, then update, otherwise create the new image and attach to product
        $imagesNew = [];
        foreach ($images as $image) {

            // images from the front end with -1 as id will 'new' and needs to be created
            if ($image->id >= 0) {
                $imageFind = Image::find($image->id);
                $imageFind->name = $image->name;
                $imageFind->url = $image->url;
                $imageFind->type = $image->type;
                array_push($imagesNew, $imageFind);
            } else {
                $imageNew = new Image(["name" => $image->name, "url" => $image->url, "type" => $image->type]);
                array_push($imagesNew, $imageNew);
            }
        }
        $product->images()->saveMany($imagesNew); // make the new association of images to the product

        /*Update tags*/
        // Detach all product tags (note this does not delete the tag from the tags table, only removed the association)
        $product->tags()->detach();
        $tags = json_decode($args["tags"]);

        // For each incoming tag, if it already has an id, then update, otherwise create the new tag and attach to product
        $tagsNew = [];
        foreach ($tags as $tag) {

            // tags from the front end with -1 as id will 'new' and needs to be created
            if ($tag->id >= 0) {
                $tagFind = Tag::find($tag->id);
                $tagFind->name = $tag->name;
                array_push($tagsNew, $tagFind);
            } else {
                $tagNew = new Tag(["name" => $tag->name]);
                array_push($tagsNew, $tagNew);
            }
        }
        $product->tags()->saveMany($tagsNew); // make the new association of tags to the product


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
