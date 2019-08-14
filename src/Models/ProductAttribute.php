<?php

    namespace Lab19\Cart\Models;

    use Illuminate\Database\Eloquent\Model;
    use Illuminate\Database\Eloquent\Relations\BelongsTo;

    use Lab19\Cart\Models\Product;

    class ProductAttribute extends Model {

        /**
         * The table associated with the model.
         *
         * @var string
         */
        protected $table = 'cart_product_attributes';

        /**
         * The attributes that are mass assignable.
         *
         * @var array
         */
        protected $fillable = [
            'group',
            'key',
            'value',
        ];

        /**
         * Product relation
         */
        public function product(){
            return $this->belongsTo(Product::class);
        }

    }
