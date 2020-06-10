import productTemplate from './templates/productTemplate';
import errorTemplate from './templates/errorTemplate';
import $ = require('jquery');
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

        window.cartProducts = () => {
            return {
                products: [],
                formatPriceAndCurrency(cents: number, currency: string) {
                    return cents / 100 + ' ' + currency;
                },
                fetch() {
                    self.graphqlService.sendQuery(query, userToken, self.url).then((re) => {
                        try {
                            // 1
                            let itemsInCart = re.data.me.cart.items;
                            let productIds: number[] = [];

                            // 2
                            itemsInCart.forEach((element: { product_id: number }) => {
                                productIds.push(element.product_id);
                            });

                            // 3
                            self.productObj.endpointUrl(self.url);
                            let cartProductsDetails = self.productObj.getProductsByIDs(productIds).then((re) => {
                                let products = re.data.productsByIds.data;

                                const productsWithQuantity = products.map((element: any) => {
                                    let result = itemsInCart.filter((obj: any) => {
                                        return obj.product_id === element.id;
                                    });
                                    try {
                                        let mergedObj = { ...element, ...result[0] };
                                        return mergedObj;
                                    } catch (error) {
                                        // console.log('cartSetup() .then(  try { catch');
                                        // console.log(error);
                                    }
                                });

                                // set the reactive products property
                                this.products = productsWithQuantity;
                            });
                        } catch (error) {
                            // console.log('cartSetup() .then(  try { catch');
                            // console.log(error);
                        }
                    });
                },
                // addToCartButtonClick($event: { target: EventTarget }) {
                //     self.addProductToCart($event);
                // },
            };
        };
    }
}
export { Cart };
