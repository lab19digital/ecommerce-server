import productTemplate from './templates/productTemplate';
import $ = require('jquery');
import errorTemplate from './templates/errorTemplate';
import { injectable, inject } from 'inversify';
import { StoreProducts } from './interfaces/products';
import { GernzyGraphqlService } from './interfaces/graphqlService';
import { TYPES } from './types/types';

@injectable()
class Products implements StoreProducts {
    @inject(TYPES.GernzyGraphqlService) private graphqlService!: GernzyGraphqlService;
    private url!: string;

    public endpointUrl(url: string) {
        this.url = url;
    }

    public getAllProducts() {
        let query = `query {
            products(first:10) {
                data {
                    id
                    title
                    status
                    published
                    short_description
                    price_cents
                    price_currency
                }
                paginatorInfo {
                    total
                    hasMorePages
                    currentPage
                }
            }
        }`;

        let userToken = localStorage.getItem('userToken') ?? '';

        return this.graphqlService
            .sendQuery(query, userToken, this.url)
            .then((re) => {
                let productsArray;
                try {
                    productsArray = re.data.products.data;
                } catch (error) {
                    // console.log('getAllProducts() .then(  try { catch');
                    // console.log(error);
                    $('.products-container').html(
                        errorTemplate(`There was an error loading products. <br> ${re.errors[0].extensions.reason}`),
                    );
                    return;
                }

                let mapFields = productsArray.map((product: Gernzy.Product) => {
                    var currency = localStorage.getItem('currency');
                    if (!currency) {
                        currency = product.price_currency;
                    }

                    return {
                        title: product.title,
                        price_cents: product.price_cents / 100,
                        price_currency: currency,
                        short_description: product.short_description,
                        id: product.id,
                        quantity: 1,
                        buttonText: 'Add to cart',
                    };
                });

                $('.products-container').html(mapFields.map(productTemplate).join(''));

                $('.add-to-cart').on('click', this.addProductToCart.bind(this));

                return re;
            })
            .catch((error) => {
                console.log('getAllProducts() { .then .catch(');
                console.log(error);
            });
    }

    public getProduct(id: number) {
        let query = `query {
            product(id:${id}) {
                    id
                    title
                    status
                    published
                    short_description
                    price_cents
                    price_currency
            }
        }`;

        let userToken = localStorage.getItem('userToken') ?? '';

        return this.graphqlService.sendQuery(query, userToken, this.url);
    }

    public addProductToCart(event: Gernzy.EventTarget) {
        let productID = $(event.target).attr('data-id');
        var userToken = localStorage.getItem('userToken') ?? '';

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
            .sendQuery(query, userToken, this.url)
            .then((re) => {
                re.data.addToCart.cart.items.forEach((element: { product_id: string; quantity: number }) => {
                    if (element.product_id == productID) {
                        $(event.target)
                            .parent()
                            .append($(`<span class="uk-badge">${element.quantity}</span>`));
                    }
                });
            })
            .catch((error) => {
                // console.log(`addProductToCart: ${error}`);
            });
    }
}
export { Products };
