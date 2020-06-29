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

    public function testThirdPartyPackagesDevUITools()
    {
        $file = __DIR__ . "/../../../composer.json";
        $file2 = __DIR__ . "/../../../composer.lock";
        $packages = json_decode(file_get_contents($file2), true)['packages'];
        $requirePackages = json_decode(file_get_contents($file), true)['require'];
        $requireDevPackages = json_decode(file_get_contents($file), true)['require-dev'];

        print  "\nrequire" . "\n";
        foreach ($packages as $package) {
            //print  $package['name'] . ": " . $package['version'];
        }

        foreach ($requirePackages as $key => $value) {
            //print  $key . ": " . $value . "\n";
        }

        print  "\nrequire-dev" . "\n";
        foreach ($requireDevPackages as $key => $value) {
            //print  $key . ": " . $value . "\n";
        }

        $this->assertNotEmpty($requirePackages);
        $this->assertNotEmpty($requireDevPackages);
    }

    public function testFirstPartyPackagesDevUITools()
    {
        $providers = config('app.providers');
    }
}
