<?php

namespace Lab19\Cart\Services;

interface GeolocationInterface
{
    /**
     * Get's a conversion rate by it's currency
     *
     * @param string
     */
    public function geoFindCountryISO($ip_address);
    public function setGeoRepository($implementation);
}
