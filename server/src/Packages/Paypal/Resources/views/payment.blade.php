@extends('Paypal\Payment::app')

@section('content')
<div class="uk-container uk-container-xsmall uk-margin-large-top">
    <h1 class="uk-heading-small uk-padding-small">Complete purchase</h1>
</div>
<div id="paypalFormTemplate" class="uk-container uk-container-xsmall uk-margin-large-top">
    <div class="uk-card uk-card-default uk-card-body uk-width-auto uk-card-hover">
        <div>
            <div id="paypal-button-container"></div>
        </div>
    </div>
</div>
@endsection