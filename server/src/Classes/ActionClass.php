<?php

namespace Gernzy\Server\Classes;

class ActionClass
{
    public function __construct()
    {
    }

    public function setMeta($data)
    {
        $this->meta[get_class($data)] = $data;
    }

    public function setData($data)
    {
        # code...
    }

    public function getModifiedData()
    {
        # code...
    }

    public function getOriginalData()
    {
        # code...
    }
}
