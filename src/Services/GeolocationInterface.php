<?php

namespace Lab19\Cart\Services;

interface GeolocationInterface
{
    /**
     * Get's a conversion rate by it's currency
     *
     * @param string
     */
    public function lookupCountryISO($ip_address);
    public function setLookupImplementation($implementation);
    public function getCountryCodeISO();
}
