<?php

namespace Gernzy\Server\Classes;

class ActionClass
{
    protected $meta;
    protected $data;
    protected $dataOriginal;

    public function __construct($dataOriginal = null)
    {
        $this->meta = [];
        $this->data = [];
        $this->dataOriginal = $dataOriginal;
        $this->eventPreventDefault = false;
    }

    public function setMeta($action)
    {
        array_push($this->meta, [
            'action' => $action
        ]);
    }

    /**
     * This is the main funtion used by third parties to attach data to the Action Place holder object, to be used by next package
     *
     * @param string
     * @param $var
     */
    public function attachData($action = null, $data)
    {
        array_push($this->data, [
            'action' => $action,
            'data' => $data
        ]);
    }

    public function getMeta()
    {
        return $this->meta;
    }

    public function getModifiedData()
    {
        return $this->data;
    }

    public function getOriginalData()
    {
        return $this->dataOriginal;
    }

    public function attachOriginalData($data)
    {
        $this->dataOriginal = $data;
    }

    public function eventPreventDefault()
    {
        $this->eventPreventDefault = true;
    }
}
