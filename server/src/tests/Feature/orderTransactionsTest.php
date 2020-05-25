<?php

namespace Gernzy\Server\Tests\Feature;

use Gernzy\Server\Models\Order;
use Gernzy\Server\Models\OrderTransaction;
use Gernzy\Server\Testing\TestCase;
use Illuminate\Foundation\Testing\WithFaker;

class GernzyOrderTransactionsTest extends TestCase
{
    use WithFaker;


    public function setUp(): void
    {
        parent::setUp();
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testRelationshipsForOrderandOrderTransactions()
    {
        // Creat order and associate transaction
        factory(Order::class, 5)->create()->each(function ($order) {
            $orderTransaction = new OrderTransaction();
            $orderTransaction->order_id = $order->id;
            $orderTransaction->status = 'pending';
            $orderTransaction->save();

            $order->orderTransaction()->save($orderTransaction);

            $order->save();
        });


        // Check the one to one relationship
        $order = OrderTransaction::find(rand(1, 5))->order;
        $orderTransaction = Order::find(rand(1, 5))->orderTransaction;
        $this->assertNotEmpty($orderTransaction->id);
        $this->assertNotEmpty($order->id);
    }
}
