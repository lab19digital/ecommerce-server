<?php

use Lab19\Cart\Testing\TestCase;
use Lab19\Cart\Models\Product;
use Lab19\Cart\Models\Tag;

/**
 * @group Products
 */
class TestFilterProducts extends TestCase
{

    public function setUp(): void
    {
        parent::setUp();
        $this->availableCount = 11;

        factory(Product::class, $this->availableCount)->create()->each(function ($product) {
            $product->status = 'IN_STOCK';
            $product->title = 'Coffee pod';
            $product->published = 1;
            $product->save();
        });

        factory(Product::class, $this->availableCount + 10)->create()->each(function ($product) {
            $product->status = 'OUT_OF_STOCK';
            $product->save();
        });


        factory(Tag::class, 20)->create()->each(function ($tag) {
            $tag->save();
        });
        
    }

    public function testUserShouldBeAbleToFilterProductsByTag(): void
    {

        $response = $this->graphQL('
                query {
                    tags {
                        name
                    }
                }
            ');

        $response->assertDontSee('errors');

        $result = $response->decodeResponseJson();

        print json_encode($result);

        // $this->assertCount(4, $result['data']['products']['data']);

        // $response->assertJsonStructure([
        //     'data' => [
        //         'products' => [
        //             'data' => [
        //                 ['id', 'title'],
        //             ]
        //         ]
        //     ]
        // ]);
    }

}