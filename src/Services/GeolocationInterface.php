<?php

namespace Lab19\Cart\Services;

interface GeolocationInterface
{
    /**
     * Get's a conversion rate by it's currency
     *
     * @param string
     */
    public function getLocation();
}
