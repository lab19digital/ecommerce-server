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

    public function testQueryTagAndRetrieveProducts(): void
    {

        factory(Product::class, 100)->create()->each(function ($product) {
            $product->addTag(1);
            $product->save();
        });


        $response = $this->graphQL('
                query {
                    tag(id: 1) {
                        products(count: 10, page: 1) {
                            data {
                                id
                                title
                                short_description
                            }
                            paginatorInfo {
                                currentPage
                                lastPage
                            }
                        }
                    }
                }
            ');

        $response->assertDontSee('errors');

        $result = $response->decodeResponseJson();

        print json_encode($result);

        $this->assertCount(10, $result['data']['tag']['products']['data']);

        $response->assertJsonStructure([
            'data' => [
                'tag' => [
                    'products' => [
                        'data' => [
                            ['id', 'title', 'short_description']
                        ]
                    ]
                ]
            ]
        ]);
    }

    public function testQueryProductAndRetrieveTags(): void
    {

        $product = Product::find(1);

        $tag1 = Tag::find(1);
        $tag2 = Tag::find(2);
        $tag3 = Tag::find(3);

        $product->addTag($tag1);
        $product->addTag($tag2);
        $product->addTag($tag3);

        $response = $this->graphQL('
                query {
                    product(id: 1) {
                        tags {
                            id
                            name
                        }
                    }
                }
            ');

        $response->assertDontSee('errors');

        $result = $response->decodeResponseJson();

        print json_encode($result);

        $this->assertCount(3, $result['data']['product']['tags']);

        $this->assertTrue($product->tags->contains('id', $tag1->id));

        $response->assertJsonStructure([
            'data' => [
                'product' => [
                    'tags' => [
                        ['id', 'name']
                    ]
                ]
            ]
        ]);
    }

    public function testQueryTags(): void
    {
        $response = $this->graphQL('
                query {
                    tags {
                        id
                        name
                    }
                }
            ');

        $response->assertDontSee('errors');

        $result = $response->decodeResponseJson();

        print json_encode($result);

        $response->assertJsonStructure([
            'data' => [
                'tags' => [
                    ['id', 'name']
                ]
            ]
        ]);
    }
}
