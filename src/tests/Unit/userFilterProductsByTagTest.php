<?php

use Lab19\Cart\Testing\TestCase;
use Lab19\Cart\Models\Product;

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

        factory(Tag::class, 10)->create();
    }

    public function testUserShouldBeAbleToFilterProductsByTag(): void
    {

        $response = $this->graphQL('
                query {
                    filterProductsByTag(count:7, page:2, input: {keyword : "pod"} ) {
                        data {
                            id
                            title
                        }
                        paginatorInfo {
                            currentPage
                            lastPage
                        }
                    }
                }
            ');

        $response->assertDontSee('errors');

        $result = $response->decodeResponseJson();

        $this->assertCount(4, $result['data']['products']['data']);

        $response->assertJsonStructure([
            'data' => [
                'products' => [
                    'data' => [
                        ['id', 'title'],
                    ]
                ]
            ]
        ]);
    }

}
