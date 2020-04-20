<?php

namespace Gernzy\Server\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderTransaction extends Model
{

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'gernzy_order_transactions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
