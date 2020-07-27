<?php

namespace Gernzy\Server\Tests\Feature;

use \App;
use Gernzy\Server\Testing\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\File;

class GernzyDevDebugUITest extends TestCase
{
    use WithFaker;


    public function setUp(): void
    {
        parent::setUp();

        // Mock local mode
        config(['app.env' => 'local']);
    }

    public function getMockFilePath()
    {
        return __DIR__ . "/laravelMock.log";
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

        $inspectorService = App::make('Gernzy\InspectorService');
        $composerFileDetails = $inspectorService->composerPackages(
            $file2,
            $file
        );

        $this->assertNotEmpty($composerFileDetails);
        $this->assertIsArray($composerFileDetails);
        $this->assertArrayHasKey('require_packages', $composerFileDetails);
        $this->assertArrayHasKey('require_dev_packages', $composerFileDetails);
    }

    public function testPaymentProvidersInfo()
    {
        $stripeService = App::make('Stripe\StripeService');
        $paypalService = App::make('Paypal\PaypalService');

        $publishableProviders = App::make('Gernzy\PublishableProviders');

        $this->assertNotEmpty($stripeService->providerName());
        $this->assertNotEmpty($stripeService->logFile());

        $this->assertNotEmpty($paypalService->providerName());
        $this->assertNotEmpty($paypalService->logFile());

        $this->assertNotEmpty($publishableProviders);
    }

    public function testViewLogContents()
    {
        // Mock log file contents
        $composerFile = File::get($this->getMockFilePath());

        // Test service
        $inspectorService = App::make('Gernzy\InspectorService');
        $parsed = $inspectorService->parseLogFile($composerFile);

        $this->assertNotEmpty($parsed);
        $this->assertIsArray($parsed);
    }

    public function testSearchViewLogContents()
    {
        // Test service
        $inspectorService = App::make('Gernzy\InspectorService');

        $incomingFileNames = ['laravel.log'];
        $keyword = 'stripe';
        $filePaths = [$this->getMockFilePath()];
        $result = $inspectorService->searchLogFile($incomingFileNames, $keyword, $filePaths);

        $this->assertNotEmpty($result);
        $this->assertIsArray($result);
        $this->assertContains('laravel.log', $result);
    }
}
