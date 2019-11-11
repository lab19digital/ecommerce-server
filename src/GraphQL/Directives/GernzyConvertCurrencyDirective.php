<?php

namespace Lab19\Cart\GraphQL\Directives;

use Closure;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Support\Facades\Cache;
use Lab19\Cart\Factories\CurrencyConverterFactory;
use Lab19\Cart\Services\ProductPriceConversionManager;
use Lab19\Cart\Services\SessionService;
use Nuwave\Lighthouse\Schema\Values\FieldValue;
use Nuwave\Lighthouse\Support\Contracts\Directive;
use Nuwave\Lighthouse\Support\Contracts\FieldMiddleware;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class GernzyConvertCurrencyDirective implements Directive, FieldMiddleware
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
        return 'gernzyConvertCurrency';
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

            if (!isset($args['input']['token'])) {
                return $result;
            }

            $token = $args['input']['token'];
            $session = $this->session->getFromToken($token);

            if (empty($session) || !isset($session)) {
                return $result;
            }

            // sessionCurrency is set through graphql session mutator field
            $sessionCurrency = $session['data']['currency'];

            return (new ProductPriceConversionManager())
                ->setConverter(new CurrencyConverterFactory())
                ->setResult($result)
                ->setSessionCurrency($sessionCurrency)
                ->setToken($token)
                ->setCachedRate(Cache::get($token, null))
                ->convertPrices();
        };

        // Place the wrapped resolver back upon the FieldValue
        // It is not resolved right now - we just prepare it
        $fieldValue->setResolver($wrappedResolver);

        // Keep the middleware chain going
        return $next($fieldValue);
    }
}
