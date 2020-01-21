import productTemplate from './templates/productTemplate';

class Cart {
    constructor(productObj, graphqlService) {
        this.productObj = productObj;
        this.graphqlService = graphqlService;
    }
    viewProductsInCart() {
        var userToken = localStorage.getItem('userToken');
        var self = this;

        let query = `{
            me {
                cart {
                    items {
                        product_id
                        quantity
                    }
                }
            }
        }`;

        this.graphqlService
            .sendQuery(query, userToken)
            .then(re => {
                let items = re.data.me.cart.items;
                if (items && items.length > 0) {
                    this.lookupProductsInCart(re.data.me.cart.items);
                } else {
                    $('.cart-products').html(`<div class="uk-alert-danger" uk-alert>
                    <a class="uk-alert-close" uk-close></a>
                    <p>No products in cart</p>
                </div>`);

                    // Disable checkout as there are no products in the cart
                    $('#cart-checkout').addClass('uk-disabled');
                }
            })
            .catch(error => {
                console.log(error);
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
        let mapFields = products.map(product => {
            return {
                title: product.data.product.title,
                short_description: product.data.product.short_description,
                id: product.data.product.id,
            };
        });

        $('.cart-products').html(mapFields.map(productTemplate).join(''));
    }
}
export { Cart };
