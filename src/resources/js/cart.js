class Cart {
    constructor() {}
    viewProductsInCart() {
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
                query: `{
                        me {
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
                console.log(result.data.me.cart.items);
                var container = $('<div class="uk-flex uk-flex-wrap uk-flex-wrap-around ">');

                result.data.me.cart.items.forEach(function(item) {
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
                                        <h3 class="uk-card-title uk-margin-remove-bottom">Lorem ipsum</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="uk-card-body">
                                <p>Quantity: ${item.quantity}</p>
                            </div>
                            <div class="uk-card-footer">
                                <a  href="#" class="uk-button uk-button-text add-to-cart" data-id="${item.product_id}">Remove</a>
                            </div>
                        </div>
                    </div>
                        `);
                });

                $('.cart-products').html(container);
            },
        });
    }

    exmpleFunction(arg) {
        //
    }
}
export { Cart };
