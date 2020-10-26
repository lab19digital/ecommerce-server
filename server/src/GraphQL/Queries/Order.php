<?php

namespace Gernzy\Server\GraphQL\Queries;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class Order
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
    }

    public function index($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        return true;
    }

    public function transactionData($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        // Graphql requires a string for this field, however on the OPredTransaction Model we cast the transaction_data to an array for
        // use in other places, thus this is a custom resolver to change the reponse into a json string
        return json_encode($rootValue);
    }
}
