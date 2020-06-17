import productTemplate from './templates/productTemplate';
import errorTemplate from './templates/errorTemplate';
import { injectable, inject } from 'inversify';
import { GernzyGraphqlService } from './interfaces/graphqlService';
import { TYPES } from './types/types';
import { StoreProducts } from './interfaces/products';
import { GernzyCart } from './interfaces/cart';

@injectable()
class Cart implements GernzyCart {
    private graphqlService: GernzyGraphqlService;
    private productObj: StoreProducts;
    private url: string = '';

    public constructor(
        @inject(TYPES.GernzyGraphqlService) private _graphqlService: GernzyGraphqlService,
        @inject(TYPES.StoreProducts) private _productObj: StoreProducts,
    ) {
        this.graphqlService = _graphqlService;
        this.productObj = _productObj;
    }

    public endpointUrl(url: string) {
        this.url = url;
    }

    public cartSetup() {
        var userToken = localStorage.getItem('userToken') || '';
        var self = this;

        window.cartProducts = () => {
            return {
                products: [],
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

                    self.graphqlService.sendQuery(query, userToken, self.url).then((re) => {
                        try {
                            let itemsInCart = re.data.me.cart.items;
                            let productIds: number[] = self.extractIDsFromItemsInCart(itemsInCart);
                            self.cartProductsDetails(itemsInCart, productIds).then((re) => {
                                this.products = re;
                            });
                        } catch (error) {
                            this.showError = true;
                            this.errorText = 'An error occured while loading products in cart. Please try again';
                            window.scroll({
                                top: 100,
                                behavior: 'smooth', //
                            });
                            // console.log('cartSetup() .then(  try { catch ' + error);
                        }
                    });
                },
                removeFromCartButtonClick(event: { target: HTMLInputElement }) {
                    let productID = event.target.getAttribute('data-id');
                    let query = `
                        mutation {
                            removeFromCart(input: {
                                product_id: ${productID},
                                quantity: 1
                                }) {
                                cart {
                                    items {
                                        product_id
                                        quantity
                                    }
                                }
                            }
                        }
                    `;

                    self.graphqlService.sendQuery(query, userToken, self.url).then((re) => {
                        try {
                            let itemsInCart = re.data.removeFromCart.cart.items;
                            let productIds: number[] = self.extractIDsFromItemsInCart(itemsInCart);
                            self.cartProductsDetails(itemsInCart, productIds).then((re) => {
                                this.products = re;
                            });
                        } catch (error) {
                            this.showError = true;
                            this.errorText = 'An error occured while loading products in cart. Please try again';
                            window.scroll({
                                top: 100,
                                behavior: 'smooth', //
                            });
                            // console.log('removeFromCartButtonClick() .then(  try { catch ' + error);
                        }
                    });
                },
                updateCartQuantity(event: { target: HTMLInputElement }) {
                    let productID = event.target.getAttribute('data-id');
                    let result: any = this.products.filter((item: any) => {
                        return item.product_id === productID;
                    });
                    let updatedQuantity = result[0].quantity;

                    let updateQuantityMutation = `
                        mutation {
                            updateCartQuantity(input: {
                                product_id: ${productID},
                                quantity: ${updatedQuantity}
                                }) {
                                cart {
                                    items {
                                        product_id
                                        quantity
                                    }
                                }
                            }
                        }
                    `;

                    self.graphqlService.sendQuery(updateQuantityMutation, userToken, self.url).then((re) => {
                        console.log(re);

                        try {
                            let itemsInCart = re.data.updateCartQuantity.cart.items;
                            let productIds: number[] = self.extractIDsFromItemsInCart(itemsInCart);
                            self.cartProductsDetails(itemsInCart, productIds).then((re) => {
                                this.products = re;
                            });
                        } catch (error) {
                            this.showError = true;
                            this.errorText = 'An error occured while loading products in cart. Please try again';
                            window.scroll({
                                top: 100,
                                behavior: 'smooth', //
                            });
                            console.log('removeFromCartButtonClick() .then(  try { catch ' + error);
                        }
                    });
                },
            };
        };
    }

    public async cartProductsDetails(itemsInCart: object[], productIds: number[]) {
        this.productObj.endpointUrl(this.url);

        return this.productObj.getProductsByIDs(productIds).then((re) => {
            let products = re.data.productsByIds.data;

            const productsWithQuantity = products.map((element: { id: string }) => {
                let result = itemsInCart.filter((item: any) => item.product_id === element.id);

                try {
                    let mergedObj = { ...element, ...result[0] };
                    return mergedObj;
                } catch (error) {
                    // console.log('cartSetup() .then(  try { catch');
                    // console.log(error);
                }
            });

            // set the reactive products property
            return productsWithQuantity;
        });
    }

    public extractIDsFromItemsInCart(itemsInCart: []) {
        let productIds: number[] = [];

        itemsInCart.forEach((element: { product_id: number }) => {
            productIds.push(element.product_id);
        });

        return productIds;
    }
}
export { Cart };
