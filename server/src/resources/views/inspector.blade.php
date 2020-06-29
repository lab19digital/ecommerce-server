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
                            <div x-text="item"></div>
                        </template>
                        <em>require-dev</em>
                        <template x-for="(item, index) in requireDevPackages" :key="index">
                            <div x-text="item"></div>
                        </template>
                    </li>

                    <li>
                        <template x-for="(item, index) in paymentProviders" :key="index">
                            <div x-text="item.ui_option"></div>
                        </template>
                    </li>

                    <li>
                        <template x-for="event in events">
                            <div class="uk-margin-bottom">
                                <div class="uk-flex">
                                    <strong class="uk-width-1-3">event</strong>
                                    <em x-text="event.event" class="uk-width-1-2"></em>
                                </div>

                                <div class="uk-flex">
                                    <strong class="uk-width-1-3">actions</strong>
                                    <div class="uk-width-1-2">
                                        <template x-for="action in event.actions">
                                            <div x-text="action"></div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</div>
@endsection