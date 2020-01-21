import productTemplate from './templates/productTemplate';

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
                let mappFields = re.data.products.data.map(product => {
                    return { title: product.title, short_description: product.short_description, id: product.id };
                });

                $('.products-container').html(mappFields.map(productTemplate).join(''));

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
