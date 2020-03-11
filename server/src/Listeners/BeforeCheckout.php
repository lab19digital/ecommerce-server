<?php

namespace Gernzy\Server\Listeners;

class BeforeCheckout
{
    public function testFire($arg = null)
    {
        print 'BeforeCheckout event testFire()';
    }
}
