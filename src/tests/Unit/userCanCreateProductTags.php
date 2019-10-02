<?php

use Lab19\Cart\Models\Product;
use Lab19\Cart\Models\Tag;
use Lab19\Cart\Testing\TestCase;

/**
 * @group Products
 */
class TestFilterProducts extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();
        $this->availableCount = 11;


        factory(Tag::class, $this->availableCount)->create()->each(function ($tag) {
            $tag->save();
        });


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
    }


    public function testOnlyAdminsCanCreateTag(): void
    {
        factory(Product::class, 4)->create()->each(function ($product) {
            $product->addTag(1);
            $product->save();
        });


        $response = $this->graphQL('
        query {
            productsByTag(count:10, page:1, tag: 1) {
                data {
                    id
                    title
                    short_description
                    status
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

        $this->assertCount(4, $result['data']['productsByTag']['data']);

        $response->assertJsonStructure([
            'data' => [
                'productsByTag' => [
                    'data' => [
                        ['id', 'title', 'short_description', 'status']
                    ]
                ]
            ]
        ]);
    }
}
