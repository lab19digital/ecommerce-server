<?php

namespace Gernzy\Server\Services;

use \App;

class InspectorService
{
    public function parseLogFile($composerFileContents)
    {
        // Split up file for each log message into an array, based on [YYYY-MM-DD HH:MM:SS]
        $logMessages = preg_split('/(?=\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}([\+-]\d{4})?\].*)/', $composerFileContents);

        if (strlen($logMessages[0]) < 1) {
            array_shift($logMessages);
        }

        return array_reverse($logMessages);
    }

    public function composerPackages($composerLockFilePath, $composerFilePath)
    {
        try {
            $lockFilePackages = json_decode(file_get_contents($composerLockFilePath), true)['packages'];
        } catch (\Throwable $th) {
            $lockFilePackages = '';
        }

        try {
            $fileContents = file_get_contents($composerFilePath);
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

        // $paymentProviderServices = App::make('Gernzy\PaymentProviderServices');

        if (!$providers = config('payment_providers')) {
            $providers = '';
        }


        $paymentProviderInformation = [];
        foreach ($providers as $key => $value) {
            array_push($paymentProviderInformation, [
                'provider_name' => $key,
                'provider_log' => '',
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
