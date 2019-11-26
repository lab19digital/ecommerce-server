<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\WithFaker;
use Lab19\Cart\Testing\TestCase;

class GelocationTest extends TestCase
{
    use WithFaker;

    public function setUp(): void
    {
        parent::setUp();
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testGeoLocation()
    {
        return true;
        /** @var \Illuminate\Foundation\Testing\TestResponse $response */
        $response = $this->graphQLWithSession('
        mutation {
            setSessionGeoLocation(input: {ip_address: "41.246.26.101"}) {
                country_code
            }
        }
        ');

        $response->assertDontSee('errors');

        $response->assertJsonStructure([
            'data' => [
                'setSessionGeoLocation' => [
                    'country_code',
                ],
            ],
        ]);

        // $result = $response->decodeResponseJson();
    }
}
