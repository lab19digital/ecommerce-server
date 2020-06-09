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

    public productsComponent() {
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

        let userToken = localStorage.getItem('userToken') || '';
        var self = this;

        window.products = () => {
            return {
                products: [],
                formatPriceAndCurrency(cents: number, currency: string) {
                    return cents / 100 + ' ' + currency;
                },
                fetch() {
                    self.graphqlService.sendQuery(query, userToken, self.url).then((data) => {
                        try {
                            this.products = data.data.products.data;
                        } catch (error) {
                            // console.log('productsComponent() .then(  try { catch');
                            // console.log(error);
                        }
                    });
                },
                addToCartButtonClick($event: { target: EventTarget }) {
                    self.addProductToCart($event);
                },
            };
        };
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

        let userToken = localStorage.getItem('userToken') || '';

        return this.graphqlService.sendQuery(query, userToken, this.url);
    }

    public addProductToCart(event: { target: EventTarget }) {
        // let id = event.target.getAttribute('data-id');
        let productID = $(event.target).attr('data-id');
        var userToken = localStorage.getItem('userToken') || '';

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
