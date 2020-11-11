<?php

namespace Gernzy\Server\Classes;

class ActionClassPaymentHistory
{
    protected $provider;
    protected $status;
    protected $amount;
    protected $date;

    public function __construct($provider = '', $status = '', $amount = '', $date = '', $error = '')
    {
        $this->provider = $provider;
        $this->status = $status;
        $this->amount = $amount;
        $this->date = $date;
        $this->error = $error;
    }

    // Setters
    public function setProvider($provider)
    {
        $this->provider = $provider;
        return $this;
    }

    public function setStatus($status)
    {
        $this->status = $status;
        return $this;
    }

    public function setAmount($amount)
    {
        $this->amount = $amount;
        return $this;
    }

    public function setDate($date)
    {
        $this->date = $date;
        return $this;
    }

    public function setError($error)
    {
        $this->error = $error;
        return $this;
    }

    // Getters
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

    public function getError()
    {
        return $this->date;
    }
}
