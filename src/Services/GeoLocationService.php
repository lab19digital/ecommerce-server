<?php

namespace Lab19\Cart\Services;

class GeoLocationService
{
    protected $geoLocation;

    public function __construct(GeolocationInterface $geoLocation)
    {
        $this->geoLocation = $geoLocation;
    }

    public function injectGeoRepositoryType($implementation)
    {
        $this->geoLocation->setGeoRepository($implementation);
        return $this;
    }

    public function findCountryIsoCodeByIP($ip_address)
    {
        return $this->geoLocation->geoFindCountryISO($ip_address);
    }
}
