class Products {
    constructor(graphqlService, cart) {
        this.graphqlService = graphqlService;
        this.cart = cart;
    }
    getAllProducts() {
        let query = `query {
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
        }`;

        this.graphqlService
            .sendQuery(query)
            .then(re => {
                var container = $('<div class="uk-flex uk-flex-wrap uk-flex-wrap-around ">');

                re.data.products.data.forEach(function(message) {
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

                $('.add-to-cart').on('click', this.addProductToCart.bind(this));
            })
            .catch(error => {
                console.log(error);
            });
    }

    getProduct(id) {
        let query = `query {
            product(id:${id}) {
                    title
                    status
                    published
                    short_description
            }
        }`;

        return this.graphqlService.sendQuery(query);
    }

    addProductToCart(event) {
        let productID = $(event.target).attr('data-id');
        var userToken = localStorage.getItem('userToken');

        let query = ` mutation {
            addToCart(input: {
                    items: [
                        { product_id: ${productID}, quantity: 1 }
                    ]
                }) {
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
                re.data.addToCart.cart.items.forEach(element => {
                    if (element.product_id == productID) {
                        $(event.target)
                            .parent()
                            .append($(`<span class="uk-badge">${element.quantity}</span>`));
                    }
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
}
export { Products };
