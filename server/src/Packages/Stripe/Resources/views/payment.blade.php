@extends('Gernzy\Server::app')

@section('content')
<div class="uk-container uk-container-xsmall uk-margin-large-top">
    <h1 class="uk-heading-small uk-padding-small">Complete purchase</h1>
</div>
<div id="stripeFormTemplate" class="uk-container uk-container-xsmall uk-margin-large-top">
    <div class="uk-card uk-card-default uk-card-body uk-width-auto uk-card-hover">

        <form id="payment-form">

            <div id="card-element">
                <!-- Elements will create input elements here -->
            </div>

            <!-- We'll put the error messages in this element -->
            <div id="card-errors" role="alert"></div>

            <div class="uk-margin">
                <button id="submit" class="uk-button uk-button-primary">Pay</button>
            </div>

        </form>
    </div>
</div>
@endsection