<?php

namespace Gernzy\Server\GraphQL\Queries;

use \App;
use Gernzy\Server\Listeners\TransactionHistory;
use Gernzy\Server\Services\EventService;
use Gernzy\Server\Services\SessionService;
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
        $sessionService = App::make(SessionService::class);

        if (!$sessionService->exists()) {
            return false;
        }

        $user = $sessionService->getUser();

        $orders = $user->orders;

        foreach ($orders as $order) {
            $orderTransaction = $order->orderTransaction;
            // Fire the before checkout event
            $eventService = EventService::triggerEvent(
                TransactionHistory::class,
                [
                    'order_transaction_id' => $orderTransaction->id,
                    'payment_method' => $orderTransaction->payment_method
                ]
            );

            // Get all the data that was modified by the event service and corresponding listeners
            try {
                array_push($eventServiceData, $eventService->getAllModifiedData());
            } catch (\Throwable $th) {
                // throw $th;
            }
        }


        return json_encode(empty($eventServiceData) ? $eventServiceData = "" : $eventServiceData);
    }
}
