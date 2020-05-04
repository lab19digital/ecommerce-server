<?php

namespace Gernzy\Server\GraphQL\Mutations;

use \App;
use Gernzy\Server\Actions\CreateCheckout;
use Gernzy\Server\Listeners\BeforeCheckout;
use Gernzy\Server\Models\OrderTransaction;
use Gernzy\Server\Services\CartService;
use Gernzy\Server\Services\EventService;
use Gernzy\Server\Services\SessionService;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Exceptions\GenericException;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class Checkout
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
    public function checkout($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $payment_method = $args['input']['payment_method'] ?? "none";
        $cartService = App::make(CartService::class);
        $sessionService = App::make(SessionService::class);

        if (!$sessionService->exists()) {
            return false;
        }

        if ($cartService->hasItems()) {

            // Fire the before checkout event
            $eventService = EventService::triggerEvent(
                BeforeCheckout::class,
                [
                    'session_service' => $sessionService,
                    'cart_service' => $cartService,
                    'payment_method' => $payment_method
                ]
            );

            // Get all the data that was modified by the event service and corresponding listeners
            $eventServiceData = $eventService->getAllModifiedData();

            $createCheckout = App::make(CreateCheckout::class);
            $order = $createCheckout->handle($args['input']);

            // Attach the transaction data to the order_transactions table
            if (isset($eventServiceData[0]['data']['transaction_data'])) {
                // Create and associate order to transaction
                $orderTransaction = new OrderTransaction();
                $orderTransaction->order_id = $order->id;
                $orderTransaction->transaction_data = $eventServiceData[0]['data']['transaction_data'];
                $orderTransaction->status = 'pending';
                $orderTransaction->payment_method = $payment_method;
                $orderTransaction->save();

                // Associate transaction to order
                $order->orderTransaction()->save($orderTransaction);
                $order->save();
            }

            return [
                'order' => $order,
                'event_data' => json_encode($eventServiceData)
            ];
        } else {
            throw new GenericException(
                'Cannot checkout without items in the cart'
            );
        }
    }
}
