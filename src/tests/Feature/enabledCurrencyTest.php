<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\WithFaker;
use Lab19\Cart\Testing\TestCase;

class EnabledCurrencyTest extends TestCase
{
    use WithFaker;

    public function setUp(): void
    {
        parent::setUp();
    }

    public function testViewProductFixedPricesGraphql(): void
    {
        $response = $this->graphQL('
                query {
                    enabledCurrencies
                }
            ');

        $response->assertDontSee('errors');

        $result = $response->decodeResponseJson();

        $this->assertNotEmpty($result['data']['enabledCurrencies']);

        $response->assertJsonStructure([
            'data' => [
                'enabledCurrencies' => []
            ]
        ]);
    }
}
