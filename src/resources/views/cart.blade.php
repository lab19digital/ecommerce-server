@extends('lab19\cart::app')

@section('content')
<div class="cart-container">

    <div class="uk-flex  uk-flex-right">
        <div class="uk-card uk-card-default uk-card-body">
            <a href="/checkout" class="uk-button uk-button-primary tm-button-default">Checkout </a>
        </div>
    </div>
    <h1 class="uk-heading-small uk-padding-small">Your cart items</h1>
    <div class="cart-products"></div>
</div>
@endsection