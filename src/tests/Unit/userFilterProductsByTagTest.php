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

        $tag = Tag::find(1);

        $product1 = Product::find(1);
        $product2 = Product::find(2);
        $product3 = Product::find(3);

        
        $product1->tag($tag);
        $product2->tag($tag);
        $product3->tag($tag);


        $response = $this->graphQL('
                query {
                    tag(id: 1) {
                        products {
                            id
                            title
                            short_description
                        }
                    }
                }
            ');

        $response->assertDontSee('errors');

        $result = $response->decodeResponseJson();

        print json_encode($result);

        $this->assertCount(3, $result['data']['tag']['products']);

        $this->assertTrue($product1->tags->contains('id', $tag->id));

        $response->assertJsonStructure([
            'data' => [
                'tag' => [
                    'products' => [
                        ['id', 'title', 'short_description']
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

        $product->tag($tag1);
        $product->tag($tag2);
        $product->tag($tag3);

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

    public function testQueryTagAndRetrieveProductsWithPagination(): void
    {

        $tag = Tag::find(1);

        $product1 = Product::find(1);
        $product2 = Product::find(2);
        $product3 = Product::find(3);

        
        $product1->tag($tag);
        $product2->tag($tag);
        $product3->tag($tag);


        $response = $this->graphQL('
                query {
                    tag(id: 1) {
                        products {
                            id
                            title
                            short_description
                        }
                    }
                }
            ');

        $response->assertDontSee('errors');

        $result = $response->decodeResponseJson();

        print json_encode($result);

        $this->assertCount(3, $result['data']['tag']['products']);

        $this->assertTrue($product1->tags->contains('id', $tag->id));

        $response->assertJsonStructure([
            'data' => [
                'tag' => [
                    'products' => [
                        ['id', 'title', 'short_description']
                    ]
                ]
            ]
        ]);
    }
}
