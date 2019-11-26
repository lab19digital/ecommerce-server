<?php

namespace Lab19\Cart\Services;

class GeoLocationService
{
    protected $geoLocation;

    public function __construct(GeolocationInterface $geoLocation)
    {
        $this->geoLocation = $geoLocation;
    }

    public function setLookupImplementation($implementation)
    {
        $this->geoLocation->setLookupImplementation($implementation);
        return $this;
    }

    public function lookupCountryISO($ip_address)
    {
        return $this->geoLocation->lookupCountryISO($ip_address);
    }

    public function getCountryCodeISO()
    {
        return $this->geoLocation->getCountryCodeISO();
    }
}
