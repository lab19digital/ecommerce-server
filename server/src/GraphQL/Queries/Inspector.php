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
        $file = __DIR__ . "/../../../composer.json";
        $file2 = __DIR__ . "/../../../composer.lock";
        $packages = json_decode(file_get_contents($file2), true)['packages'];
        $requirePackages = json_decode(file_get_contents($file), true)['require'];
        $requireDevPackages = json_decode(file_get_contents($file), true)['require-dev'];

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

        $filePath = storage_path() . '/logs/laravel.log';
        $data = File::get($filePath);


        $packageDataStructure = [
            // "packages_lock" => $packages,
            "require_packages" =>  $requirePackages,
            "require_dev_packages" =>  $requireDevPackages,
            "providers" =>  config('app.providers'),
            "payment_providers" => $paymentProviderInformation,
            "events" => $eventMapping,
            "publishable_providers" => $publishableProviders,
            "laravel_log" => $this->all()
        ];

        return json_encode($packageDataStructure);
    }


    public function all()
    {
        $levels_imgs = [
            'debug' => 'info-circle',
            'info' => 'info-circle',
            'notice' => 'info-circle',
            'warning' => 'exclamation-triangle',
            'error' => 'exclamation-triangle',
            'critical' => 'exclamation-triangle',
            'alert' => 'exclamation-triangle',
            'emergency' => 'exclamation-triangle',
            'processed' => 'info-circle',
            'failed' => 'exclamation-triangle'
        ];

        $log = [];
        $filePath = storage_path() . '/logs/laravel.log';
        $file = File::get($filePath);

        preg_match_all('/\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}([\+-]\d{4})?\].*/', $file, $headings);

        if (!is_array($headings)) {
            return $log;
        }

        $log_data = preg_split('/\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}([\+-]\d{4})?\].*/', $file);

        if ($log_data[0] < 1) {
            array_shift($log_data);
        }

        foreach ($headings as $h) {
            for ($i = 0, $j = count($h); $i < $j; $i++) {
                foreach (array_keys($levels_imgs) as $level) {
                    if (strpos(strtolower($h[$i]), '.' . $level) || strpos(strtolower($h[$i]), $level . ':')) {
                        preg_match('/^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}([\+-]\d{4})?)\](?:.*?(\w+)\.|.*?)' . $level . ': (.*?)( in .*?:[0-9]+)?$/i', $h[$i], $current);
                        if (!isset($current[4])) {
                            continue;
                        }

                        $log[] = [
                            'context' => $current[3],
                            'level' => $level,
                            // 'folder' => $this->folder,
                            // 'level_class' => $this->level->cssClass($level),
                            // 'level_img' => $this->level->img($level),
                            'date' => $current[1],
                            'text' => $current[4],
                            // 'in_file' => isset($current[5]) ? $current[5] : null,
                            'stack' => preg_replace("/^\n*/", '', $log_data[$i])
                        ];
                    }
                }
            }
        }

        if (empty($log)) {
            $lines = explode(PHP_EOL, $file);
            $log = [];

            foreach ($lines as $key => $line) {
                $log[] = [
                    'context' => '',
                    'level' => '',
                    'folder' => '',
                    'level_class' => '',
                    'level_img' => '',
                    'date' => $key + 1,
                    'text' => $line,
                    'in_file' => null,
                    'stack' => '',
                ];
            }
        }

        return array_reverse($log);
    }
}
