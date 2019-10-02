<?php

namespace Lab19\Cart\Actions;

use Lab19\Cart\Models\Tag;

class CreateTag
{
    public static function handle($args): Tag
    {
        $tag = new Tag([
            'name' => $args['name']
        ]);

        $tag->save();

        return $tag;
    }
}
