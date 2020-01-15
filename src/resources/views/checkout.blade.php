@extends('lab19\cart::app')

@section('content')
<div class="cart-container">
    <h1 class="uk-heading-small uk-padding-small">Complete checkout</h1>

    <div class="uk-padding">
        <form class="uk-card uk-card-default uk-card-body uk-card-large">
            <fieldset class=" uk-fieldset">

                <legend class="uk-legend">Your details</legend>

                <div class="uk-margin">
                    <input class="uk-input" type="text" placeholder="Name">
                </div>
                <div class="uk-margin">
                    <input class="uk-input" type="email" placeholder="Email">
                </div>
                <div class="uk-margin">
                    <input class="uk-input" type="tel" placeholder="Telephone">
                </div>
                <div class="uk-margin">
                    <input class="uk-input" type="tel" placeholder="Mobile">
                </div>

                <div class="uk-card uk-card-default uk-card-body">
                    <label class="uk-form-label" for="form-horizontal-text">Billing Address</label>
                    <div class="uk-margin">
                        <input class="uk-input" type="tel" placeholder="Line 1">
                    </div>
                </div>

                <div class="uk-margin">
                    <select class="uk-select">
                        <option>Option 01</option>
                        <option>Option 02</option>
                    </select>
                </div>

                <div class="uk-margin">
                    <textarea class="uk-textarea" rows="5" placeholder="Textarea"></textarea>
                </div>

                <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                    <label><input class="uk-radio" type="radio" name="radio2" checked> A</label>
                    <label><input class="uk-radio" type="radio" name="radio2"> B</label>
                </div>

                <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                    <label><input class="uk-checkbox" type="checkbox" checked> A</label>
                    <label><input class="uk-checkbox" type="checkbox"> B</label>
                </div>

                <div class="uk-margin">
                    <input class="uk-range" type="range" value="2" min="0" max="10" step="0.1">
                </div>

            </fieldset>
        </form>
    </div>
    <div class="cart-products"></div>
</div>
@endsection