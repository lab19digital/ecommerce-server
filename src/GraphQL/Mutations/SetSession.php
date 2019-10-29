<?php

namespace Lab19\Cart\GraphQL\Mutations;

use \App;
use GraphQL\Type\Definition\ResolveInfo;
use Lab19\Cart\Factories\CurrencyConverterFactory;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class SetSession
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
    public function set($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $session = App::make('Lab19\SessionService');

        $session->update($args['input']);

        return $session->get();
    }

    public function setCurrency($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $session = App::make('Lab19\SessionService');

        $currency = $args['input']['currency'];
        $baseCurrency = $args['input']['baseCurrency'];

        $currencyObject = CurrencyConverterFactory::create($currency, $baseCurrency);

        $rate = $currencyObject->getRate();

        $session->update(['currency' => $currency, 'baseCurrency' => $baseCurrency, 'rate' => $rate]);

        return $session->get();
    }
}
