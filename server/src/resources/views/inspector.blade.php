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
                    <li><a href="#">Publishable Providers</a></li>
                    <li><a href="#">Laravel Log</a></li>
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
                            <div>
                                <div class="uk-margin-bottom">
                                    <div class="uk-flex">
                                        <strong class="uk-width-1-3">provider</strong>
                                        <em x-text="item.provider_name" class="uk-width-1-2"></em>
                                    </div>
                                    <div class="uk-flex">
                                        <strong class="uk-width-1-3">info</strong>
                                        <div class="uk-width-1-2">
                                            <div x-text="item.provider_class"></div>
                                            <!-- <div x-text="item.provider_log"></div> -->
                                            <a href="#/" x-on:click="viewLogClick" x-text="item.provider_log"></a>
                                        </div>
                                    </div>
                                </div>

                            </div>
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


                    <li>
                        <template x-for="(item, index) in publishableProviders" :key="index">
                            <div x-bind:class="{ 'uk-badge': item.class }" x-text="item.item"></div>
                        </template>
                    </li>

                    <li>
                        <label for="logdate">Log file (date and time):</label>
                        <input x-on:change="updateListOfFiles($event)" x-model="dateInput" type="date" id="logdate" name="logdate">

                        <template x-for="(item, index) in laravel_log" :key="index">
                            <div>
                                <div x-show.transition="item.showLogName" class="uk-card-small uk-card-default uk-card-body uk-margin uk-flex">
                                    <p x-text="item.item" class="uk-width-1-1"></p>
                                    <button :data-log="item.item" class="uk-button uk-button-default uk-button-small uk-margin-left" x-on:click="viewLogClick">Open</button>
                                </div>
                                <!-- Log contents -->
                                <div x-show.transition="item.showLogContents">
                                    <template x-for="(subItem, subIndex) in logContent" :key="subIndex">
                                        <div class="uk-margin-bottom">
                                            <template x-if="subIndex == 0">
                                                <div class="uk-flex" style="width: 80vw;">
                                                    <span class="uk-label uk-label-primary">Log File: <span x-text="subItem"></span></span>
                                                </div>
                                            </template>

                                            <div>
                                                <template x-if="subIndex > 0">
                                                    <div>
                                                        <template x-for="(subSubItem, subSubItemindex) in subItem" :key="subSubItemindex">
                                                            <div>
                                                                <div class="uk-margin-bottom">
                                                                    <span class="uk-label uk-label-warning">Log item <span x-text="subSubItemindex"></span></span>

                                                                    <div class=" uk-flex">
                                                                        <strong class="uk-width-1-3">context</strong>
                                                                        <em x-text="subSubItem.context" class="uk-width-1-2"></em>
                                                                    </div>
                                                                    <div class="uk-flex">
                                                                        <strong class="uk-width-1-3">date</strong>
                                                                        <em x-text="subSubItem.date" class="uk-width-1-2"></em>
                                                                    </div>

                                                                    <div class="uk-flex">
                                                                        <strong class="uk-width-1-3">level</strong>
                                                                        <em x-text="subSubItem.level" class="uk-width-1-2"></em>
                                                                    </div>
                                                                    <strong>stack</strong>
                                                                    <div style="width:80vw;">
                                                                        <template x-for=" (subSubSubItem, subSubSubItemindex) in subSubItem.stack" :key="subSubSubItemindex">
                                                                            <p x-text="subSubSubItem" class="uk-margin-small"></p>
                                                                        </template>
                                                                    </div>
                                                                    <div class="uk-flex uk-flex-wrap" style="width:80vw;">
                                                                        <strong>text</strong>
                                                                        <p x-text="subSubItem.text"></p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </template>
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                                <!--  -->
                            </div>
                        </template>
                    </li>

                </ul>
            </div>
        </div>
    </div>

</div>
@endsection