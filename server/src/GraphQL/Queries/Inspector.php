<?php

namespace Gernzy\Server\GraphQL\Queries;

use Gernzy\Server\Exceptions\GernzyException;
use GraphQL\Type\Definition\ResolveInfo;
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

        if (!$paymentProviders = config('gernzy-packages')) {
            throw new GernzyException(
                'An error occured.',
                'An error occured when determining the payment provider. None specified.'
            );
        }

        if (!$eventMapping = config('events')) {
            throw new GernzyException(
                'An error occured.',
                'An error occured when determining the eventMapping. None specified.'
            );
        }

        $packageDataStructure = [
            // "packages_lock" => $packages,
            "require_packages" =>  $requirePackages,
            "require_dev_packages" =>  $requireDevPackages,
            "providers" =>  config('app.providers'),
            "payment_providers" => $paymentProviders,
            "events" => $eventMapping
        ];

        return json_encode($packageDataStructure);
    }
}
