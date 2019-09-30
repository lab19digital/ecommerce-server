<?php

namespace Lab19\Cart\GraphQL\Builders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;
use GraphQL\Type\Definition\ResolveInfo;
use Lab19\Cart\Models\Product;
use Lab19\Cart\Models\Tag;

class ProductsBuilder
{
    public function search($root, array $args, $context, ResolveInfo $resolveInfo)
    {
        if (isset($args['input'])) {
            $query = Product::searchByKeyword($args['input']['keyword']);
        } else {
            $query = Product::query();
        }

        return $query;
    }


    public function productsByTag($root, array $args, $context, ResolveInfo $resolveInfo)
    {

        if (isset($args['tag'])) {
            $query = Product::searchByTag([$args['tag']]);
        } else {
            $query = Product::query();
        }

        return $query;
    }


    public function productsByTags($root, array $args, $context, ResolveInfo $resolveInfo)
    {

        if (isset($args['tags'])) {
            $query = Product::searchByTag($args['tags']);
        } else {
            $query = Product::query();
        }

        return $query;
    }
}
