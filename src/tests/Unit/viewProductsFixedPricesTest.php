<?php

use Lab19\Cart\Models\Product;
use Lab19\Cart\Models\ProductPrice;
use Lab19\Cart\Testing\TestCase;

/**
 * @group Products
 */
class TestViewProducts extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();
        $this->availableCount = 5;


        factory(Product::class, $this->availableCount)->create()->each(function ($product) {
            $productFixedPrice = new ProductPrice();
            $productFixedPrice->country_code = 'EUR';
            $productFixedPrice->price = '899.99';
            $product->fixedprices()->save($productFixedPrice);
            $product->save();
        });

        // factory(ProductPrice::class, $this->availableCount)->create()->each(function ($product_price) {
        //     $product = Product::find(1);
        //     $product_price->product()->save($product);
        //     $product_price->save();
        // });


        // $post->comments()->saveMany([
        //     new App\Comment(['message' => 'A new comment.']),
        //     new App\Comment(['message' => 'Another comment.']),
        // ]);
    }

    public function testGuestUserCanViewInStockProducts(): void
    {
        $product = Product::with('fixedprices')->find(1);
        foreach ($product->fixedprices as $fixedPrice) {
            print 'The price' . $fixedPrice;
        }
    }

    public function testGuestUserCanViewInStockProductsAlternative(): void
    {
        // Find fixed price and related product
        $productFixedPrice = ProductPrice::find(1);
        $product = $productFixedPrice->product;
        $this->assertNotEmpty($product->title);
    }
}
