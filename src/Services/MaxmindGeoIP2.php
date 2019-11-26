<?php

namespace Lab19\Cart\Services;

class MaxmindGeoIP2 implements GeolocationInterface
{
    protected $ip_address;
    protected $countryISO;
    protected $implementation;

    public function setLookupImplementation($implementation)
    {
        $this->implementation = $implementation;
        return $this;
    }

    public function lookupCountryISO($ip_address)
    {
        $record = $this->implementation->country($ip_address);
        $isoCode = $record->country->isoCode;

        $this->setCountryISO($isoCode);

        return $record->country->isoCode;
    }

    public function getCountryCodeISO()
    {
        return $this->countryISO;
    }

    public function setCountryISO($countryISO)
    {
        $this->countryISO = $countryISO;
    }
}
