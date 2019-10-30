<?php

namespace Lab19\Cart\GraphQL\Directives;

use Closure;
use GraphQL\Type\Definition\ResolveInfo;
use Lab19\Cart\Factories\CurrencyConverterFactory;
use Lab19\Cart\Services\SessionService;
use Nuwave\Lighthouse\Schema\Values\FieldValue;
use Nuwave\Lighthouse\Support\Contracts\Directive;
use Nuwave\Lighthouse\Support\Contracts\FieldMiddleware;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class UpperCaseDirective implements Directive, FieldMiddleware
{
    public function __construct(SessionService $session)
    {
        $this->session = $session;
    }
    /**
     * Name of the directive as used in the schema.
     *
     * @return string
     */
    public function name(): string
    {
        return 'upperCase';
    }

    /**
     * Wrap around the final field resolver.
     *
     * @param \Nuwave\Lighthouse\Schema\Values\FieldValue $fieldValue
     * @param \Closure $next
     * @return \Nuwave\Lighthouse\Schema\Values\FieldValue
     */
    public function handleField(FieldValue $fieldValue, Closure $next): FieldValue
    {
        // Retrieve the existing resolver function
        /** @var Closure $previousResolver */
        $previousResolver = $fieldValue->getResolver();

        // Wrap around the resolver
        $wrappedResolver = function ($root, array $args, GraphQLContext $context, ResolveInfo $info) use ($previousResolver) {
            // Call the resolver, passing along the resolver arguments
            /** @var string $result */
            $result = $previousResolver($root, $args, $context, $info);

            // Get the session by the provided token
            $session = $this->session->getFromToken($args['input']['token']);

            if (empty($session) || !isset($session)) {
                return $result;
            }

            $sessionCurrency = $session['data']['currency'];
            $sessionBaseCurrency = $session['data']['baseCurrency'];

            $currencyConverter = CurrencyConverterFactory::create($sessionCurrency, $sessionBaseCurrency);

            foreach ($result as $key => $value) {
                $result[$key]['title'] = 'blah';
            }

            return $result;
        };

        // Place the wrapped resolver back upon the FieldValue
        // It is not resolved right now - we just prepare it
        $fieldValue->setResolver($wrappedResolver);

        // Keep the middleware chain going
        return $next($fieldValue);
    }
}
