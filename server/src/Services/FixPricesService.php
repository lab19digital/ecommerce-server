<?php

namespace Gernzy\Server\Services;

use \App;
use Gernzy\Server\Models\Product;
use Gernzy\Server\Models\ProductFixedPrice;

class FixPricesService
{
    public $fixCurrencies;
    public $productPrice;
    public $productBaseCurrency;
    public $product;

    public function setProduct(Product $product)
    {
        $this->product = $product;
        return $this;
    }

    public function setFixCurrencies($fixCurrencies)
    {
        $this->fixCurrencies = $fixCurrencies;
        return $this;
    }

    public function setProductPrice($productPrice)
    {
        $this->productPrice = $productPrice;
        return $this;
    }

    public function setProductBaseCurrency($productBaseCurrency)
    {
        $this->productBaseCurrency = $productBaseCurrency;
        return $this;
    }

    public function handleFixedPrices()
    {
        $product = $this->product;
        $productPrice = $this->productPrice;
        $productBaseCurrency = $this->productBaseCurrency;
        $fixCurrencies = $this->fixCurrencies;

        // Map over $fixCurrencies and fix the price for the product in that currency
        // and pass the resultant array to the save many function
        $convertedFixedPrices = array_map(function ($pricingInput) use ($productPrice, $productBaseCurrency) {
            $productManualOverridePrice = $pricingInput['price_cents'] ?? false;
            $targetCurrency = $pricingInput['currency'];

            if (!$productManualOverridePrice) {

                // Use the Exhange Rate manager object to convert the prices, only if no manual override is present
                $converter = (App::make(ExhangeRatesManager::class))
                    ->setPrices([0 => ['price_currency' =>  $productBaseCurrency, 'price_cents' => $productPrice]])
                    ->setTargetCurrency($targetCurrency)
                    ->convertPrices();

                // return a new instance of the ProductFixedPrice model and run the function that fixes the price
                return (new ProductFixedPrice(['country_code' => $targetCurrency, 'price' => $converter[0]['price_cents']]))->fixPrice();
            }

            return (new ProductFixedPrice(['country_code' => $targetCurrency, 'price' => $productManualOverridePrice]));
        }, $fixCurrencies);

        // Create latavel relationship for the products fixed prices in the specified currencies
        $product->fixedPrices()->saveMany($convertedFixedPrices);

        return $product;
    }
}
