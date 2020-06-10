@extends('Gernzy\Server::app')

@section('content')
<div class="checkout-container">
    <div class="uk-flex  uk-flex-right">
        <div class="uk-card uk-card-default uk-card-body">
            <span class="uk-margin-small-right" uk-icon="cart">Basket total </span>
            <span id="checkout-cart-total" class="uk-badge"></span>
        </div>
    </div>

    <!-- Line items -->
    <x-gernzy-line-items />


    <!-- Checkout form -->
    <x-gernzy-checkout />
</div>
@endsection