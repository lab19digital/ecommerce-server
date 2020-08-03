<?php

namespace Gernzy\Server\GraphQL\Queries;

use \App;
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

    public function __construct()
    {
        $this->inspectorService = App::make('Gernzy\InspectorService');
    }

    public function index($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return true;
    }


    public function packages($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        // composer files and packages
        $composerFileDetails = $this->inspectorService->composerPackages(
            base_path() . '\packages\gernzy\server\composer.lock',
            base_path() . '\packages\gernzy\server\composer.json'
        );

        // Payment providers
        $gernzyProviderInfo = $this->inspectorService->paymentProviders();

        // Events
        if (!$eventMapping = config('events')) {
            $eventMapping = '';
        }

        // providers
        if (!$providers = config('app.providers')) {
            $providers = '';
        }

        // log file names
        $logFileNames = $this->inspectorService->allLogNames();

        // return info
        $packageDataStructure = [
            "providers" =>  $providers,
            "events" => $eventMapping,
            "laravel_log" => $logFileNames
        ];
        $packageDataStructure = array_merge($packageDataStructure, $composerFileDetails, $gernzyProviderInfo);

        return json_encode($packageDataStructure);
    }

    public function logContents($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $fileToLookFor = $args['filename'];
        $returnArray = [];
        foreach (glob(storage_path() . '/logs/*.log') as $filename) {
            if (basename($filename) == $fileToLookFor) {
                $logFile = File::get($filename);
                $parsed = $this->inspectorService->parseLogFile($logFile);
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
        $filePaths = glob(storage_path() . '/logs/*.log');
        $result = $this->inspectorService->searchLogFile($incomingFileNames, $keyword, $filePaths);
        return json_encode($result);
    }
}
