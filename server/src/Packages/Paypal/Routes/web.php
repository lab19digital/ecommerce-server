<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('payment-paypal', function () {
    return view('Paypal\Payment::payment');
});

Route::post('create-paypal-transaction', 'Gernzy\Server\Packages\Paypal\Http\Controllers\WebhookController@index')
    ->name('paypal.transaction');

Route::post('receive-hook-paypal', 'Gernzy\Server\Packages\Paypal\Http\Controllers\WebhookController@index')
    ->name('webhook.receive');
