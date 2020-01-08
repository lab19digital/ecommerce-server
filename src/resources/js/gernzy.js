import { hello } from './example';
hello();

$(document).ready(function() {
    $.ajax({
        url: 'http://laravel-gernzy.test/graphql',
        contentType: 'application/json',
        type: 'POST',
        data: JSON.stringify({
            query: `query {
            products(first:10) {
                data {
                    id
                    title
                    status
                    published
                }
                paginatorInfo {
                    total
                    hasMorePages
                    currentPage
                }
            }
        }`,
        }),
        success: function(result) {
            // console.log(JSON.stringify(result.data.products.data));
            // console.log(result.data.products.data);

            var container = $('<div />');

            result.data.products.data.forEach(function(message) {
                console.log(message);
                container.append(`
                <div class="uk-card uk-card-default uk-width-1-2@m">
                    <div class="uk-card-header">
                        <div class="uk-grid-small uk-flex-middle" uk-grid>
                            <div class="uk-width-auto">
                                <img class="uk-border-circle" width="40" height="40" src="images/avatar.jpg">
                            </div>
                            <div class="uk-width-expand">
                                <h3 class="uk-card-title uk-margin-remove-bottom">${message.title}</h3>
                                <p class="uk-text-meta uk-margin-remove-top"><time datetime="2016-04-01T19:00">April 01, 2016</time></p>
                            </div>
                        </div>
                    </div>
                    <div class="uk-card-body">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                    </div>
                    <div class="uk-card-footer">
                        <a href="#" class="uk-button uk-button-text">Read more</a>
                    </div>
                </div>
                
                `);
            });

            $('.products-container').html(container);
        },
    });
});
