<?php

namespace Gernzy\Server\GraphQL\Queries;

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


        $packageDataStructure = [
            // "packages_lock" => $packages,
            "require_packages" =>  $requirePackages,
            "require_dev_packages" =>  $requireDevPackages
        ];

        return json_encode($packageDataStructure);
    }
}
