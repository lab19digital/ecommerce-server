<?php

namespace Gernzy\Server\Classes;

class ActionClass
{
    protected $meta;
    protected $dataModified = [];
    protected $dataOriginal = [];

    public function __construct($dataOriginal = null)
    {
        $this->meta = [];
        $this->dataModified = [];
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
     * This is the main funtion used by third parties to attach data to the Action Place holder object, to be used by next package.
     * This data will be appended to the $dataModified array property of this object
     * @param string
     * @param $var
     */
    public function attachData($action = '', $data = [])
    {
        array_push($this->dataModified, [
            'action' => $action,
            'data' => $data
        ]);
    }

    public function getMeta()
    {
        return $this->meta;
    }

    /**
     * Returns the last element of the modified data array
     * @param string
     * @param $var
     */
    public function getLastModifiedData()
    {
        $data = end($this->dataModified);
        return $data['data'];
    }

    public function getAllModifiedData()
    {
        return $this->dataModified;
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
