<?php

namespace Gernzy\Server\Services;

use \App;

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

    public function composerPackages()
    {
        $composerLockFile = base_path() . '\packages\gernzy\server\composer.lock';
        $composerFile = base_path() . '\packages\gernzy\server\composer.json';

        try {
            $lockFilePackages = json_decode(file_get_contents($composerLockFile), true)['packages'];
        } catch (\Throwable $th) {
            $lockFilePackages = '';
        }

        try {
            $fileContents = file_get_contents($composerFile);
            $requirePackages = json_decode($fileContents, true)['require'];
            $requireDevPackages = json_decode($fileContents, true)['require-dev'];
        } catch (\Throwable $th) {
            $requirePackages = 'no file found';
            $requireDevPackages = 'no file found';
        }

        return [
            'require_packages' => $requirePackages,
            'require_dev_packages' => $requireDevPackages,
            'packages_lock' => $lockFilePackages
        ];
    }

    public function paymentProviders()
    {
        $publishableProviders = App::make('Gernzy\PublishableProviders');
        $paymentProviderServices = App::make('Gernzy\PaymentProviderServices');

        $paymentProviderInformation = [];
        foreach ($paymentProviderServices  as $key => $value) {
            $instance = new $value();
            array_push($paymentProviderInformation, [
                'provider_name' => $instance->providerName(),
                'provider_log' => $instance->logFile(),
                'provider_class' => $value
            ]);
        }

        return [
            'payment_providers' => $paymentProviderInformation,
            'publishable_providers' => $publishableProviders,
        ];
    }

    public function allLogNames()
    {
        $logFileNames = [];
        foreach (glob(storage_path() . '/logs/*.log') as $filename) {
            array_push($logFileNames, basename($filename));
        }
        return $logFileNames;
    }
}
