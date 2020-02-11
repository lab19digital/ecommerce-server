<?php

namespace Tests\Feature;

use Gernzy\Server\Models\Product;
use Gernzy\Server\Testing\TestCase;
use Illuminate\Foundation\Testing\WithFaker;

class CartTotalTest extends TestCase
{
    use WithFaker;

    public function setUp(): void
    {
        parent::setUp();

        // create products
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
    }

    protected $addToCartMutation = '
            mutation {
                addToCart(input: {
                        items: [
                            { product_id: 1, quantity: 5 },
                            { product_id: 2, quantity: 4 }
                            { product_id: 3, quantity: 4 }
                            { product_id: 4, quantity: 4 }
                        ]
                    }) {
                    cart {
                        items {
                            product_id
                            quantity
                        }
                    }
                }
            }
        ';

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testCartTotal()
    {
        $response = $this->graphQLWithSession($this->addToCartMutation);

        $response->assertDontSee('errors');

        $response->assertJsonStructure([
            'data' => [
                'addToCart' => [
                    'cart' => [
                        'items' =>
                        [
                            0 => ['product_id', 'quantity']
                        ]
                    ]
                ]
            ]
        ]);

        $result = $response->decodeResponseJson();


        $this->assertNotEmpty($result['data']['addToCart']['cart']['items'][0]);
    }
}
