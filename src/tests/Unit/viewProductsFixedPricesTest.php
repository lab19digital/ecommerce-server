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

        factory(Product::class, $this->availableCount)->create();

        $product = Product::find(1);
        $product->fixedprices()->saveMany([
            new ProductPrice(['country_code' => 'EUR', 'price' => '100.99',]),
            new ProductPrice(['country_code' => 'ZAR', 'price' => '140.99',]),
            new ProductPrice(['country_code' => 'AED', 'price' => '155.99',])
        ]);
    }

    public function testSavingOneToManyFixedPricesEloquent(): void
    {
        $product = Product::find(1);
        $productFixedPrice = new ProductPrice();
        $productFixedPrice->country_code = 'EUR';
        $productFixedPrice->price = '899.99';
        $product->fixedprices()->save($productFixedPrice);
        $result = $product->save();
        $this->assertTrue($result);
    }

    public function testRetrievingOneToManyFixedPricesList(): void
    {
        $product = Product::with('fixedprices')->find(1);
        foreach ($product->fixedprices as $fixedPrice) {
            $this->assertNotEmpty($fixedPrice);
        }
    }

    public function testRetrievingOneToManyProduct(): void
    {
        // Find fixed price and related product
        $productFixedPrice = ProductPrice::find(1);
        $product = $productFixedPrice->product;
        $this->assertNotEmpty($product->title);
    }
}
