<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\WithFaker;
use Lab19\Cart\Factories\OpenexchangeratesFactory;
use Lab19\Cart\Models\Product;
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

        $this->availableCount = 11;

        $this->productPricesArray = factory(Product::class, $this->availableCount)->create();
    }

    // Helper functions
    public function createSession()
    {
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

        return $token;
    }

    public function setSessionCurency($token)
    {
        $response = $this->postGraphQL(['query' => '
                mutation {
                    setSessionCurrency(input: {
                        currency: "EUR"
                    }){
                        currency
                    }
                }
            '], [
            'HTTP_Authorization' => 'Bearer ' . $token,
        ]);

        $response->assertDontSee('errors');

        $response->assertJsonStructure([
            'data' => [
                'setSessionCurrency' => [
                    'currency',
                ],
            ],
        ]);
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
        $currency = new ExampleObjectOrController(OpenexchangeratesFactory::create('EUR', 'USD'));

        $this->assertTrue(null !== $currency->index());
        $this->assertTrue(!empty($currency->index()));
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testContractImplementation()
    {
        $currency = OpenexchangeratesFactory::create('EUR', 'USD');

        $this->assertTrue(null !== $currency->convertCurrency(10) && !empty($currency->convertCurrency(10)));
    }

    public function testSetCartCurrencySession(): void
    {
        $this->withoutExceptionHandling();

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

        $response = $this->postGraphQL(['query' => '
                mutation {
                    setSessionCurrency(input: {
                        currency: "EUR"
                    }){
                        currency
                    }
                }
            '], [
            'HTTP_Authorization' => 'Bearer ' . $token,
        ]);

        $response->assertDontSee('errors');

        $response->assertJsonStructure([
            'data' => [
                'setSessionCurrency' => [
                    'currency',
                ],
            ],
        ]);
    }

    public function testGuestUserCanViewInStockProductsWithChosenCurrency(): void
    {
        // Create a session
        $token = $this->createSession();

        // Set the session currency
        $this->setSessionCurency($token);

        $response = $this->graphQL('
                query {
                    products(count:10, input: {token: "' . $token . '"} ) {
                        data {
                            id
                            title
                            price_cents
                            price_currency
                        }
                        paginatorInfo {
                            currentPage
                            lastPage
                        }
                    }
                }
            ');

        $response->assertDontSee('errors');

        $result = $response->decodeResponseJson();

        $this->assertTrue(!empty($result['data']['products']['data']));

        $response->assertJsonStructure([
            'data' => [
                'products' => [
                    'data' => [
                        ['id', 'title'],
                    ],
                ],
            ],
        ]);
    }

    public function testProductPricesAreConverted(): void
    {
        $originalPrices = $this->productPricesArray->map(function ($item, $key) {
            return ['id' => $item->id, 'title' => $item->title, 'price_cents' => $item->price_cents];
        });

        // Create a session
        $token = $this->createSession();

        // Set the session currency
        $this->setSessionCurency($token);

        $response = $this->graphQL('
                query {
                    products(count:10, input: {token: "' . $token . '"} ) {
                        data {
                            id
                            title
                            price_cents
                            price_currency
                        }
                        paginatorInfo {
                            currentPage
                            lastPage
                        }
                    }
                }
            ');

        $response->assertDontSee('errors');

        $result = $response->decodeResponseJson();

        $this->assertFalse(empty($result['data']['products']['data']));

        /**
         * Nested foreach loop, to loop through the response and get each product price after it has been converted to a different
         * currency. Then compare these values to the original price of the corresponding prouct, to see that the value is indeed
         * different.
         *
         * TODO: Manipulate collection of original prices using laravel collection methods
         * https://laravel.com/docs/6.x/collections
         *
         */
        $convertedPrices = $result['data']['products']['data'];

        foreach ($convertedPrices as $key => $convertedValue) {
            foreach ($originalPrices as $key => $originalValue) {
                if ($convertedValue['title'] == $originalValue['title']) {
                    // print "\n" . $convertedValue['title'] . ' == ' . $originalValue['title'] . ".\n";
                    // This shouldn't be the case, as the value should be converted to according to different currency rate
                    $this->assertFalse($convertedValue['price_cents'] == $originalValue['price_cents']);
                    break;
                }
            }
        }

        $response->assertJsonStructure([
            'data' => [
                'products' => [
                    'data' => [
                        ['id', 'title'],
                    ],
                ],
            ],
        ]);
    }
}
