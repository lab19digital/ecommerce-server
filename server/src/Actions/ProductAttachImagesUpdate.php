<?php

namespace Gernzy\Server\Actions;

use Gernzy\Server\Models\Image;
use Gernzy\Server\Models\Product;

class ProductAttachImagesUpdate
{
    public static function handle(Int $productId, array $images): Product
    {
        $product = Product::findOrFail($productId);
        $images = Image::findMany($images);

        // Delete existing images and save new incoming images
        $product->images()->delete();
        $product->images()->saveMany($images);
        return $product;
    }
}
