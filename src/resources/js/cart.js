class Cart {
    constructor(productObj) {
        this.productObj = productObj;
    }
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
                if (result.data.me.cart.items) {
                    this.lookupProductsInCart(result.data.me.cart.items);
                } else {
                    $('.cart-products').html(`<div class="uk-alert-danger" uk-alert>
                    <a class="uk-alert-close" uk-close></a>
                    <p>No products in cart</p>
                </div>`);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                // console.log(XMLHttpRequest + textStatus + errorThrown);
            },
        });
    }

    async lookupProductsInCart(products) {
        await Promise.all(
            products.map(async product => {
                const queriedProducts = await this.productObj.getProduct(product.product_id);
                const mergedProduct = { ...queriedProducts, ...product };
                return mergedProduct;
            }),
        )
            .then(re => {
                this.populateUIWithProducts(re);
            })
            .catch(error => {
                console.log(error);
            });
    }

    populateUIWithProducts(products) {
        let container = $('<div class="uk-flex uk-flex-wrap uk-flex-wrap-around ">');

        products.forEach(function(product) {
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
                                <h3 class="uk-card-title uk-margin-remove-bottom">${product.title}</h3>
                            </div>
                        </div>
                    </div>
                    <div class="uk-card-body">
                        <p>Quantity: ${product.quantity}</p>
                    </div>
                    <div class="uk-card-footer">
                        <a  href="#" class="uk-button uk-button-text add-to-cart" data-id="${product.product_id}">Remove</a>
                    </div>
                </div>
            </div>
                `);
        });

        $('.cart-products').html(container);
    }
}
export { Cart };
