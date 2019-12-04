<?php

use Lab19\Cart\Models\Product;
use Lab19\Cart\Testing\TestCase;

/**
 * @group Products
 */
class TestViewProducts extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();
        $this->availableCount = 100;

        factory(Product::class, $this->availableCount + 10)->create()->each(function ($product) {
            $product->fixedprices()->save($product);
            $product->save();
        });

        // $post->comments()->saveMany([
        //     new App\Comment(['message' => 'A new comment.']),
        //     new App\Comment(['message' => 'Another comment.']),
        // ]);
    }

    public function testGuestUserCanViewInStockProducts(): void
    {
        $brand = Pro::find(1);
        $products = $brand->products;
    }
}
