class Products {
    constructor() {}
    getAllProducts() {
        $.ajax({
            url: 'http://laravel-gernzy.test/graphql',
            contentType: 'application/json',
            type: 'POST',
            context: this,
            data: JSON.stringify({
                query: `query {
                    products(first:10) {
                        data {
                            id
                            title
                            status
                            published
                            short_description
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
                var container = $('<div class="uk-flex uk-flex-wrap uk-flex-wrap-around ">');

                result.data.products.data.forEach(function(message) {
                    container.append(`
                    <div>
                        <div class="uk-card uk-card-default uk-margin-left uk-margin-top">
                            <div class="uk-card-header">
                                <div class="uk-grid-small uk-flex-middle" uk-grid>
                                    <div class="uk-width-auto">
                                        <//img class="uk-border-circle" width="40" height="40" src="images/avatar.jpg">
                                        <span uk-icon="icon: camera"></span>
                                    </div>
                                    <div class="uk-width-expand">
                                        <h3 class="uk-card-title uk-margin-remove-bottom">${message.title}</h3>
                                        <p class="uk-text-meta uk-margin-remove-top"><time datetime="2016-04-01T19:00">April 01, 2016</time></p>
                                    </div>
                                </div>
                            </div>
                            <div class="uk-card-body">
                                <p>${message.short_description}</p>
                            </div>
                            <div class="uk-card-footer">
                                <a  href="#" class="uk-button uk-button-text add-to-cart" data-id="${message.id}">Add to cart</a>
                            </div>
                        </div>
                    </div>
                        `);
                });

                $('.products-container').html(container);

                $('.add-to-cart').on('click', this.addItemToCart);
            },
        });
    }

    addItemToCart(event) {
        let productID = $(event.target).attr('data-id');
        var userToken = localStorage.getItem('userToken');

        $.ajax({
            url: 'http://laravel-gernzy.test/graphql',
            contentType: 'application/json',
            type: 'POST',
            context: this,
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
            data: JSON.stringify({
                query: ` mutation {
                    addToCart(input: {
                            items: [
                                { product_id: ${productID}, quantity: 5 }
                            ]
                        }) {
                        cart {
                            items {
                                product_id
                                quantity
                            }
                        }
                    }
                }`,
            }),
            success: function(result) {
                console.log(result);
            },
        });
    }
}
export { Products };
