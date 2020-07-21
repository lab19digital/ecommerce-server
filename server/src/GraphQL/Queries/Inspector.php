<?php

namespace Gernzy\Server\GraphQL\Queries;

use \App;
use Gernzy\Server\Exceptions\GernzyException;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Support\Facades\File;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class Inspector
{
    /**
     * Return a value for the field.
     *
     * @param  null  $rootValue Usually contains the result returned from the parent field. In this case, it is always `null`.
     * @param  mixed[]  $args The arguments that were passed into the field.
     * @param  \Nuwave\Lighthouse\Support\Contracts\GraphQLContext  $context Arbitrary data that is shared between all fields of a single query.
     * @param  \GraphQL\Type\Definition\ResolveInfo  $resolveInfo Information about the query itself, such as the execution state, the field name, path to the field from the root, and more.
     * @return mixed
     */

    public function index($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return true;
    }


    public function packages($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $composerFile = base_path() . '\packages\gernzy\server\composer.json';
        $composerLockFile = base_path() . '\packages\gernzy\server\composer.lock';
        $packages = json_decode(file_get_contents($composerLockFile), true)['packages'];
        $requirePackages = json_decode(file_get_contents($composerFile), true)['require'];
        $requireDevPackages = json_decode(file_get_contents($composerFile), true)['require-dev'];

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

        if (!$eventMapping = config('events')) {
            throw new GernzyException(
                'An error occured.',
                'An error occured when determining the eventMapping. None specified.'
            );
        }

        $logFileNames = [];
        foreach (glob(storage_path() . '/logs/*.log') as $filename) {
            array_push($logFileNames, basename($filename));
        }

        $packageDataStructure = [
            // "packages_lock" => $packages,
            "require_packages" =>  $requirePackages,
            "require_dev_packages" =>  $requireDevPackages,
            "providers" =>  config('app.providers'),
            "payment_providers" => $paymentProviderInformation,
            "events" => $eventMapping,
            "publishable_providers" => $publishableProviders,
            "laravel_log" => $logFileNames
        ];

        return json_encode($packageDataStructure);
    }

    public function logContents($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $inspectorService = App::make('Gernzy\InspectorService');

        $fileToLookFor = $args['filename'];
        $returnArray = [];
        foreach (glob(storage_path() . '/logs/*.log') as $filename) {
            if (basename($filename) == $fileToLookFor) {
                $logFile = File::get($filename);
                $parsed = $inspectorService->parseLogFile($logFile);
                array_push($returnArray, $fileToLookFor);
                array_push($returnArray, $parsed);
            }
        }
        return json_encode($returnArray);
    }

    public function filteredLogContents($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $incomingFileNames = $args['filenames'];
        $keyword = $args['keyword'];
        $result = [];

        // Parse all files that have been specified in the args if they contain the keyword
        foreach (glob(storage_path() . '/logs/*.log') as $filename) {
            if (in_array(basename($filename), $incomingFileNames)) {
                $logFile = File::get($filename);
                if (preg_match("/{$keyword}/i", $logFile)) {
                    array_push($result, basename($filename));
                }
            }
        }

        return json_encode($result);
    }
}
