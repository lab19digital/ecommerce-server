<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\WithFaker;
use Lab19\Cart\Services\CurrencyConversionInterface;
use Lab19\Cart\Services\CurrencyConversionOpenexchangerates;
use Lab19\Cart\Testing\TestCase;

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
    public function testContractImplementation()
    {
        // Construct and pass the type of implementation.
        // In a controller it should be type hinted automatically throught the laravel service container
        // as it is bound in the register method of the cart service provider
        $currency = new ExampleObjectOrController(new CurrencyConversionOpenexchangerates('EUR'));
        dd($currency->index());
    }
}
