<?php

namespace Gernzy\Server\Classes;

class ActionClassPaymentHistory
{
    protected $provider;
    protected $status;
    protected $amount;
    protected $date;

    public function __construct($provider, $status, $amount, $date)
    {
        $this->provider = $provider;
        $this->status = $status;
        $this->amount = $amount;
        $this->date = $date;
    }

    public function getProvider()
    {
        return $this->provider;
    }

    public function getStatus()
    {
        return $this->status;
    }

    public function getAmount()
    {
        return $this->amount;
    }

    public function getDate()
    {
        return $this->date;
    }
}
