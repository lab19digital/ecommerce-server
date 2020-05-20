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

Route::post('create-paypal-transaction', 'Gernzy\Server\Packages\Paypal\Http\Controllers\CapturePaymentController@index')
    ->name('paypal.transaction');
