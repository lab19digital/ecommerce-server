<?php

namespace Lab19\Cart\Services;

class MaxmindGeoIP2 implements GeolocationInterface
{
    protected $ip_address;
    protected $countryISO;
    protected $implementation;

    protected $record;

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

        $this->record = $record;

        $isoCode = $record->country->isoCode;

        return $isoCode;
    }

    public function getLatitude()
    {
        return $this->record->location->latitude;
    }

    public function getLongitude()
    {
        return $this->record->location->longitude;
    }

    public function geoFindCity($ip_address)
    {
        $record = $this->implementation->city($ip_address);

        $this->record = $record;

        $cityName = $record->mostSpecificSubdivision->name;

        return $cityName;
    }
}
