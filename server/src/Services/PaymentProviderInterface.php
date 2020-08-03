<?php

namespace Gernzy\Server\Services;

interface PaymentProviderInterface
{
    /**
     * Name of the payment provider
     */
    public function providerName();

    /**
     * File path of the log file
     */
    public function logFile();
}
