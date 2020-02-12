<?php

namespace Gernzy\Server\Observers;

use Gernzy\Server\Models\Cart;

class CartObserver
{
    /**
     * Handle the Cart "created" event.
     *
     * @param  \App\Cart  $cart
     * @return void
     */
    public function created(Cart $cart)
    {
    }


    /**
     * Handle the Cart "saving" event.
     *
     * @param  \App\Cart  $cart
     * @return void
     */
    public function saving(Cart $cart)
    {
        $cartTotal = $cart->calcCartTotal();
        $cart->cart_total = $cartTotal;
    }


    /**
     * Handle the Cart "updated" event.
     *
     * @param  \App\Cart  $cart
     * @return void
     */
    public function updated(Cart $cart)
    {
    }

    /**
     * Handle the Cart "deleted" event.
     *
     * @param  \App\Cart  $cart
     * @return void
     */
    public function deleted(Cart $cart)
    {
        //
    }

    /**
     * Handle the Cart "forceDeleted" event.
     *
     * @param  \App\Cart  $cart
     * @return void
     */
    public function forceDeleted(Cart $cart)
    {
        //
    }
}
