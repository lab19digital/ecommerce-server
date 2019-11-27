<?php

namespace Lab19\Cart\Services;

class MaxmindGeoIP2 implements GeolocationInterface
{
    protected $ip_address;
    protected $countryISO;
    protected $implementation;

    /**
     * Set Repository
     *
     * @param object
     */
    public function setGeoRepository($implementation)
    {
        $this->implementation = $implementation;
        return $this;
    }

    /**
     * Country code lookup in Repository
     *
     * @param $var
     */
    public function geoFindCountryISO($ip_address)
    {
        $record = $this->implementation->country($ip_address);

        $isoCode = $record->country->isoCode;

        return $isoCode;
    }
}
