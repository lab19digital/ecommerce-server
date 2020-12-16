<?php

namespace Gernzy\Server\Actions;

use \App;
use Gernzy\Server\Actions\Helpers\Attributes;
use Gernzy\Server\Models\Category;
use Gernzy\Server\Models\Image;
use Gernzy\Server\Models\Product;
use Gernzy\Server\Models\Tag;

use function GuzzleHttp\json_decode;

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
        if (isset($args["images"])) {
            $images = json_decode($args["images"]);
            $product->images()->detach();


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
        }


        /*Update tags*/
        // Detach all product tags (note this does not delete the tag from the tags table, only removed the association)
        if (isset($args["tags"])) {
            $tags = json_decode($args["tags"]);
            $product->tags()->detach();

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
        }

        /* variants */
        if ($variants = json_decode($args["variants"], true) ?? false) {
            foreach ($variants as $variant) {
                UpdateProduct::createVariant($product, $variant);
            }
        } elseif (count(json_decode($args["variants"], true)) <= 0) {
            $product->variants()->delete();
        }

        // Update featured image
        if (isset($args["featured_image"])) {
            $featuredImageNew = json_decode($args["featured_image"]);
            // If existing image then update, otherwise create
            if ($featuredImageNew->id >= 0) {
                $image = Image::findOrFail($featuredImageNew->id);
                $image->url = $featuredImageNew->url;
                $image->type = $featuredImageNew->type;
                $image->name = $featuredImageNew->name;
                $image->save();
            } else {
                $image = new Image(["name" => $featuredImageNew->name, "url" => $featuredImageNew->url, "type" => $featuredImageNew->type]);
                $image->save();
            }

            $attributes = new Attributes($product);
            $attributes->featuredImage($image);
            $product->attributes()->createMany(
                $attributes->toArray()
            );
        }

        // Product fixed prices
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

    public static function createVariant($parent, $args)
    {
        // First delete existing variants, to update with new incoming variants
        $parent->variants()->delete();

        $product = new Product($args);
        $product->fill($args);
        $product->parent_id = $parent->id;
        $product->save();

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
        if (isset($args["images"])) {
            $images = $args["images"];
            $product->images()->detach();


            // For each incoming image, if it already has an id, then update, otherwise create the new image and attach to product
            $imagesNew = [];
            foreach ($images as $image) {
                $image = (object)$image;
                // images from the front end with -1 as id will 'new' and needs to be created
                if ($image->id >= 0) {
                    $imageFind = Image::find($image->id);
                    $imageFind->name = $image->name;
                    $imageFind->url = $image->url;
                    $imageFind->type = $image->type;
                    $imagesNew[] = $imageFind;
                } else {
                    $imageNew = new Image(["name" => $image->name, "url" => $image->url, "type" => $image->type]);
                    $imagesNew[] = $imageNew;
                }
            }
            $product->images()->saveMany($imagesNew); // make the new association of images to the product


            // Update featured image
            if (isset($args["featured_image"])) {
                // If existing image then update, otherwise create
                $featuredImageNew = $args["featured_image"];
                if ($featuredImageNew["id"] >= 0) {
                    $image = Image::findOrFail($featuredImageNew["id"]);
                    $image->url = $featuredImageNew["url"];
                    $image->type = $featuredImageNew["type"];
                    $image->name = $featuredImageNew["name"];
                    $image->save();
                } else {
                    $image = new Image(["name" => $featuredImageNew["name"], "url" => $featuredImageNew["url"], "type" => $featuredImageNew["type"]]);
                    $image->save();
                }

                $attributes = new Attributes($product);
                $attributes->featuredImage($image);
                $product->attributes()->createMany(
                    $attributes->toArray()
                );
            }
        }
    }
}
