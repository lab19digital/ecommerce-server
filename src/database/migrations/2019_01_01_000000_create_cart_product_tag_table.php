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
        Schema::create('product_tag', function (Blueprint $table) {
            $table->primary(['product_id', 'tag_id']); //This is to avoid duplicate  relationships
            $table->unsignedInteger('product_id');
            $table->unsignedInteger('tag_id');

            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade'); //this is to remove the assosciated rows in the other table
            $table->foreign('tag_id')->references('id')->on('tags')->onDelete('cascade'); //this is to remove the assosciated rows in the other table

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
