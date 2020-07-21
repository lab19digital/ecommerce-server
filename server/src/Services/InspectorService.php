<?php

namespace Gernzy\Server\Services;

class InspectorService
{
    public function parseLogFile($composerFile)
    {
        // Split up file for each log message into an array, based on [YYYY-MM-DD HH:MM:SS]
        $logMessages = preg_split('/(?=\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}([\+-]\d{4})?\].*)/', $composerFile);

        if (strlen($logMessages[0]) < 1) {
            array_shift($logMessages);
        }

        return array_reverse($logMessages);
    }
}
