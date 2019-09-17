<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCartProductTagTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cart_product_tag', function (Blueprint $table) {
            $table->primary(['cart_product_id', 'cart_tag_id']); //This is to avoid duplicate  relationships
            $table->unsignedInteger('cart_product_id');
            $table->unsignedInteger('cart_tag_id');

            $table->foreign('cart_product_id')->references('id')->on('products')->onDelete('cascade'); //this is to remove the assosciated rows in the other table
            $table->foreign('cart_tag_id')->references('id')->on('tags')->onDelete('cascade'); //this is to remove the assosciated rows in the other table

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cart_product_tag');
    }
}
