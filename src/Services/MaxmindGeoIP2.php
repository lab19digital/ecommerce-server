<?php

namespace Lab19\Cart\Services;

class MaxmindGeoIP2 implements GeolocationInterface
{
    protected $ip_address;
    protected $countryISO;
    protected $implementation;

    public function setGeoRepository($implementation)
    {
        $this->implementation = $implementation;
        return $this;
    }

    public function geoFindCountryISO($ip_address)
    {
        $record = $this->implementation->country($ip_address);

        $isoCode = $record->country->isoCode;

        return $isoCode;
    }
}
