@extends('Gernzy\Server::app')

@section('content')
<h1 class="uk-heading-medium">Dev tools</h1>
<div class="uk-child-width-1-2@s" uk-grid x-data="inspector()" x-init="fetch()">
    <div>
        <div uk-grid>
            <div class="uk-width-auto@m">
                <ul class="uk-tab-left" uk-tab="connect: #component-tab-left; animation: uk-animation-fade">
                    <li><a href="#">First party packages</a></li>
                    <li><a href="#">Third party packages</a></li>
                    <li><a href="#">Payment providers</a></li>
                    <li><a href="#">Actions browser</a></li>
                </ul>
            </div>
            <div class="uk-width-expand@m">
                <ul id="component-tab-left" class="uk-switcher">
                    <li>
                        <template x-for="(item, index) in providers" :key="index">
                            <div x-bind:class="{ 'uk-badge': item.class }" x-text="item.item"></div>
                        </template>
                    </li>

                    <li>
                        <em>require</em>
                        <template x-for="(item, index) in requirePackages" :key="index">
                            <!-- You can also reference "index" inside the iteration if you need. -->
                            <div x-text="item"></div>
                        </template>
                        <em>require-dev</em>
                        <template x-for="(item, index) in requireDevPackages" :key="index">
                            <!-- You can also reference "index" inside the iteration if you need. -->
                            <div x-text="item"></div>
                        </template>
                    </li>

                    <li>Coite en de riit in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur, sed do eiusmod.</li>
                </ul>
            </div>
        </div>
    </div>

</div>
@endsection