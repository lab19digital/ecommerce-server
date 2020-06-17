@extends('Gernzy\Server::app')

@section('content')
<div class="checkout-container" x-data="checkoutForm()" x-init="initValues()">
    <div class="uk-flex  uk-flex-right" x-data="checkoutCartTotal()" x-init="fetch()">
        <div class="uk-card uk-card-default uk-card-body">
            <span class="uk-margin-small-right" uk-icon="cart">Basket total </span>
            <span id="checkout-cart-total" class="uk-badge" x-text="formatPriceAndCurrency(total)"></span>
        </div>
    </div>

    <x-gernzy-line-items />

    <div class="uk-container">
        <x-gernzy-success-alert />
        <x-gernzy-error-alert />
    </div>

    <x-gernzy-checkout />
</div>
@endsection