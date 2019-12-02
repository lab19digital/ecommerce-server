<?php

namespace Tests\Feature;

use \App;
use Illuminate\Foundation\Testing\WithFaker;
use Lab19\Cart\Testing\TestCase;

class GelocationTest extends TestCase
{
    use WithFaker;

    public function setUp(): void
    {
        parent::setUp();
    }


    // Helpers
    public function setupGeocodingSession()
    {
        // Create a session
        /** @var \Illuminate\Foundation\Testing\TestResponse $response */
        $response = $this->graphQL('
                mutation {
                    createSession {
                        token
                    }
                }
            ');

        $start = $response->decodeResponseJson();

        $token = $start['data']['createSession']['token'];

        // Set the session currency
        $response = $this->postGraphQL(['query' => '
                    mutation {
                        setSessionGeoLocation(input: {ip_address: "41.246.26.101"}) {
                            country_code
                        }
                    }
                ',], [
            'HTTP_Authorization' => 'Bearer ' . $token,
        ]);

        $response->assertDontSee('errors');

        $response->assertJsonStructure([
            'data' => [
                'setSessionGeoLocation' => [
                    'country_code',
                ],
            ],
        ]);

        return $token;
    }


    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testGeoLocation()
    {
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

        $result = $response->decodeResponseJson();

        $isoCode = $result['data']['setSessionGeoLocation']['country_code'];

        $this->assertTrue(isset($isoCode) && !empty($isoCode));

        $this->assertEquals($isoCode, 'ZA');
    }

    public function testDatabaseHasGeocodingSessionInformation()
    {
        $token = $this->setupGeocodingSession();

        $sessionService = App::make('Lab19\SessionService');

        $isoCode = $sessionService->get('geolocation');

        $this->assertDatabaseHas('cart_sessions', [
            'token' => $token,
        ]);

        $this->assertEquals($isoCode, 'ZA');
    }
}
