<?php

    namespace Lab19\Cart\Models;

    use Illuminate\Database\Eloquent\Model;

    class Image extends Model
    {

        /**
         * The table associated with the model.
         *
         * @var string
         */
        protected $table = 'gernzy_images';

        /**
         * The attributes that are mass assignable.
         *
         * @var array
         */
        protected $fillable = [
            'name',
            'url',
            'type'
        ];
    }
