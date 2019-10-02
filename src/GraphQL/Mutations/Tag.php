<?php

namespace Lab19\Cart\GraphQL\Mutations;

use \App;
use GraphQL\Type\Definition\ResolveInfo;
use Lab19\Cart\Actions\CreateTag;
// use Lab19\Cart\Actions\UpdateTag;
// use Lab19\Cart\Actions\DeleteTag;
// use Lab19\Cart\Actions\TagAttachImages;
// use Lab19\Cart\Actions\TagSetFeaturedImage;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class Product
{

    /**
     * Return a value for the field.
     *
     * @param  null  $rootValue Usually contains the result returned from the parent field. In this case, it is always `null`.
     * @param  mixed[]  $args The arguments that were passed into the field.
     * @param  \Nuwave\Lighthouse\Support\Contracts\GraphQLContext  $context Arbitrary data that is shared between all fields of a single query.
     * @param  \GraphQL\Type\Definition\ResolveInfo  $resolveInfo Information about the query itself, such as the execution state, the field name, path to the field from the root, and more.
     * @return mixed
     */
    public function create($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $createTag = App::make(CreateTag::class);
        $result = $createTag->handle($args['input']);
        return $result;
    }

    public function update($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $updateProduct = App::make(UpdateProduct::class);
        $result = $updateProduct->handle($args['id'], $args['input']);
        return $result;
    }

    public function delete($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $deleteProduct = App::make(DeleteProduct::class);
        $result = $deleteProduct->handle($args['id']);
        return ['success' => $result];
    }

    public function attachImages($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $attachImage = App::make(ProductAttachImages::class);
        $result = $attachImage->handle($args['product_id'], $args['images']);
        return [
            'product' => $result
        ];
    }

    public function setFeaturedImage($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $setFeaturedImage = App::make(ProductSetFeaturedImage::class);
        $result = $setFeaturedImage->handle($args['product_id'], $args['image_id']);
        return [
            'product' => $result
        ];
    }
}
