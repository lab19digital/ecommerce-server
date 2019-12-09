<?php

namespace Lab19\Cart\Models;

use Illuminate\Database\Eloquent\Model;

class ProductPrice extends Model
{

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'cart_product_prices';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'country_code',
        'price',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
