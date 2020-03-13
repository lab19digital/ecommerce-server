<?php

namespace Gernzy\Server\Classes;

class ActionClass
{
    public function __construct()
    {
        $this->meta = [];
        $this->data = [];
    }

    public function setMeta($action, $data = '')
    {
        array_push($this->meta, [
            'action' => $action,
            'data' => $data
        ]);
    }

    /**
     * This is the main funtion used by third parties to attach data to the Action Place holder object, to be used by next package
     *
     * @param string
     * @param $var
     */
    public function attachData($action, $data)
    {
        array_push($this->data, [
            'action' => $action,
            'data' => $data
        ]);
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
