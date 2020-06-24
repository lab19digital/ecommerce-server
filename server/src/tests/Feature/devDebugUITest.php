<?php

namespace Gernzy\Server\Tests\Feature;

use Gernzy\Server\Testing\TestCase;
use Illuminate\Foundation\Testing\WithFaker;

class GernzyDevDebugUITest extends TestCase
{
    use WithFaker;

    public function setUp(): void
    {
        parent::setUp();

        // Mock local mode
        config(['app.env' => 'local']);
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testDevUIRoute()
    {
        $this->withoutMiddleware();

        $response = $this->get('/inspector');
        $response->assertStatus(200);
        $response->assertSuccessful();

        $this->assertStringContainsString('div', $response->content());
    }
}
