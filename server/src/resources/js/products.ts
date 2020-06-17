import productTemplate from './templates/productTemplate';
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
                products: [{ addedToCart: false, id: '' }],
                showSuccess: false,
                successText: 'Success!',
                showError: false,
                errorText: 'An error occured.',
                formatPriceAndCurrency(cents: number, currency: string) {
                    let currencyLocalStorage = localStorage.getItem('currency') || '';

                    // Check to see if the user has specified a different currency
                    if (currencyLocalStorage) {
                        currency = currencyLocalStorage;
                    }

                    return cents / 100 + ' ' + currency;
                },
                fetch() {
                    self.graphqlService.sendQuery(query, userToken, self.url).then((data) => {
                        try {
                            let products = data.data.products.data.map((item: {}) => ({
                                ...item,
                                addedToCart: false,
                            }));
                            this.products = products;
                        } catch (error) {
                            this.showError = true;
                            this.errorText = 'An error occured while loading product. Please try again';
                            // console.log('productsComponent() .then(  try { catch');
                            // console.log(error);
                        }
                    });
                },
                addToCartButtonClick(event: { target: HTMLInputElement }) {
                    let productID = event.target.getAttribute('data-id');

                    self.addProductToCart(productID)
                        .then((re) => {
                            if (re.errors) {
                                let errors = re.errors;
                                let debugMessage = re.errors[0].debugMessage;

                                this.showError = true;
                                this.errorText = 'An error occured while adding product to cart. Please try again';
                                window.scroll({
                                    top: 100,
                                    behavior: 'smooth', //
                                });
                            }

                            re.data.addToCart.cart.items.forEach(
                                (element: { product_id: string; quantity: number }) => {
                                    if (element.product_id == productID) {
                                        let index = this.products.findIndex((x: { id: string }) => x.id === productID);

                                        this.products[index].addedToCart = true;
                                    }
                                },
                            );
                        })
                        .catch((error) => {
                            this.showError = true;
                            this.errorText = 'An error occured while adding product to cart. Please try again';
                            // console.log(`addProductToCart: ${error}`);
                        });
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

    public addProductToCart(productID: string | null) {
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

        return this.graphqlService.sendQuery(query, userToken, this.url);
    }

    public getProductsByIDs(productIDs: number[]) {
        var userToken = localStorage.getItem('userToken') || '';
        let query = `{
            productsByIds(includeIds:[${productIDs}], first:10){
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

        return this.graphqlService.sendQuery(query, userToken, this.url);
    }
}
export { Products };
