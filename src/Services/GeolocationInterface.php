<?php

namespace Lab19\Cart\Services;

interface GeolocationInterface
{
    public function geoFindCountryISO($ip_address);
    public function setGeoRepository($implementation);
    public function getLatitude();
    public function getLongitude();
    public function getCity();
}
