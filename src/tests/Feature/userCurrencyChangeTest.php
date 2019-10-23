<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\WithFaker;
use Lab19\Cart\Factories\CurrencyConverterFactory;
use Lab19\Cart\Services\CurrencyConversionInterface;
use Lab19\Cart\Testing\TestCase;

// just an example of how the controller in laravel may inject the CurrencyConverter dependency
class ExampleObjectOrController
{
    protected $currency;

    /**
     *  constructor.
     *
     * @param CurrencyConversionInterface $currency
     */
    public function __construct(CurrencyConversionInterface $currency)
    {
        $this->currency = $currency;
    }

    /**
     * Get rate.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->currency->getRate();
    }
}


class CurrencyConversionTest extends TestCase
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
    public function testContractImplementationThroughController()
    {
        // Construct and pass the type of implementation.
        // In a controller it should be type hinted automatically throught the laravel service container
        // as it is bound in the register method of the cart service provider
        // I'm using a factory pattern to create the object
        $currency = new ExampleObjectOrController(CurrencyConverterFactory::create('EUR', 'USD'));

        $this->assertTrue(null !== $currency->index() && !empty($currency->index()));
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testContractImplementation()
    {
        // Construct and pass the type of implementation.
        // In a controller it should be type hinted automatically throught the laravel service container
        // as it is bound in the register method of the cart service provider
        // I'm using a factory pattern to create the object
        $currency = CurrencyConverterFactory::create('EUR', 'USD');

        $this->assertTrue(null !== $currency->convertCurrency(10) && !empty($currency->convertCurrency(10)));
    }
}
