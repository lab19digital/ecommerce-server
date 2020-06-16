import successTemplate from './templates/successTemplate';
import errorTemplate from './templates/errorTemplate';
import $ from 'jquery';
import { TYPES } from './types/types';
import { inject, injectable } from 'inversify';
import { GernzyGraphqlService } from './interfaces/graphqlService';
import { GernzyCart } from './interfaces/cart';
import { GernzyCheckout } from './interfaces/checkout';

@injectable()
class Checkout implements GernzyCheckout {
    @inject(TYPES.GernzyGraphqlService) private graphqlService!: GernzyGraphqlService;
    @inject(TYPES.GernzyCart) private cart!: GernzyCart;
    private url!: string;

    public endpointUrl(url: string) {
        this.url = url;
    }

    public checkout() {
        var userToken = localStorage.getItem('userToken') || '';
        var self = this;
        let query = `
            query {
                shopConfig {
                    payment_providers
                }
            }
        `;
        // $('#checkout-form').submit(function (event) {
        //     event.preventDefault();

        //     // get all the inputs into an array.
        //     let inputs = $('#checkout-form :input');

        //     // get an associative array of just the values.
        //     let values: Gernzy.CheckoutInfo = {};

        //     inputs.each((i, ele) => {
        //         let key = $(ele).attr('name');
        //         let value = $(ele).val();

        //         typeof key !== 'undefined' ? (values[key] = value) : {};
        //     });

        //     // Checkbox values
        //     values['use_shipping_for_billing'] = $('#use_shipping_for_billing').prop('checked');
        //     values['agree_to_terms'] = $('#agree_to_terms').prop('checked');

        //     self.sendOfCheckoutInfo(values);
        // });

        window.checkoutForm = () => {
            return {
                values: {},
                paymentProviders: [],
                initValues() {
                    // get an associative array of just the values.
                    let values: Gernzy.CheckoutInfo = {};

                    //@ts-ignore
                    let elements = document.getElementById('checkout-form')!.elements;

                    // Iterate over the form controls
                    for (let i = 0; i < elements.length; i++) {
                        let key = elements[i].name;
                        let value = elements[i].value;
                        typeof key !== 'undefined' ? (values[key] = value) : {};
                    }

                    // Checkbox values
                    values['use_shipping_for_billing'] = $('#use_shipping_for_billing').prop('checked');
                    values['agree_to_terms'] = $('#agree_to_terms').prop('checked');

                    this.values = values;

                    // Now populate payment providers
                    this.fetchPaymentProviders();
                },
                fetchPaymentProviders() {
                    self.graphqlService.sendQuery(query, userToken, self.url).then((re) => {
                        let paymentProviders = JSON.parse(re.data.shopConfig.payment_providers);
                        paymentProviders.unshift({ ui_option: 'Select a payment method', ui_value: 'null' });
                        this.paymentProviders = paymentProviders;
                    });
                },
                submitClick(event: { target: EventTarget; preventDefault: Function }) {
                    document
                        .getElementById('checkout-form')!
                        .querySelectorAll('[required]')
                        .forEach(function (i: any) {
                            if (!i.value) throw new Error('All required fields are not filled in.');
                        });

                    event.preventDefault();
                    self.sendOfCheckoutInfo(this.values);
                },
            };
        };
    }

    public sendOfCheckoutInfo(values: Gernzy.CheckoutInfo) {
        var userToken = localStorage.getItem('userToken') || '';
        let query = ` mutation {
            checkout(input: {
                name: "${values['name']}",
                email: "${values['email']}",
                telephone: "${values['telephone']}",
                mobile: "${values['mobile']}",
                billing_address: {
                    line_1: "${values['billing_address_line_1']}",
                    line_2: "${values['billing_address_line_2']}",
                    state: "${values['billing_address_state']}",
                    postcode: "${values['billing_address_postcode']}",
                    country: "${values['billing_address_country']}"
                },
                shipping_address: {
                    line_1: "${values['shipping_address_line_1']}",
                    line_2: "${values['shipping_address_line_2']}",
                    state: "${values['shipping_address_state']}",
                    postcode: "${values['shipping_address_postcode']}",
                    country: "${values['shipping_address_country']}"
                },
                use_shipping_for_billing: ${values['use_shipping_for_billing']},
                payment_method: "${values['payment_method']}",
                agree_to_terms: ${values['agree_to_terms']},
                notes: "${values['notes']}"
            }){
                event_data
                order {
                    id
                }
            }
        }`;

        return this.graphqlService
            .sendQuery(query, userToken, this.url)
            .then((re: Gernzy.reSendOfCheckoutInfo) => {
                if (re.errors) {
                    let errors = re.errors;
                    let debugMessage = re.errors[0].debugMessage;
                    // console.log(errors);
                } else {
                    $('.checkout-container').html(successTemplate('Your details have been submitted.'));
                }

                // Now try and do the next step
                try {
                    console.log(re);

                    let eventData: [{ data: { redirect_url: string } }] = JSON.parse(re.data.checkout.event_data);
                    let redirectUrl = eventData[0].data.redirect_url;

                    localStorage.setItem('event_data', JSON.stringify(eventData));
                    window.location.replace(redirectUrl);
                } catch (error) {
                    console.log(error);
                }

                return re;
            })
            .catch((error) => {
                // console.log(error);
            });
    }

    public getBasketTotal() {
        var userToken = localStorage.getItem('userToken') || '';
        var self = this;

        let query = `{
            me {
                cart {
                    cart_total
                }
            }
        }`;

        window.checkoutCartTotal = () => {
            return {
                total: [],
                fetch() {
                    self.graphqlService.sendQuery(query, userToken, self.url).then((re) => {
                        let total = re.data.me.cart.cart_total;
                        this.total = total;
                    });
                },
                formatPriceAndCurrency(cents: number) {
                    let currency = localStorage.getItem('currency');

                    // get the default currency from the shopConfig
                    if (!currency) {
                        currency = localStorage.getItem('default_currency');
                    }

                    return cents / 100 + ' ' + currency;
                },
            };
        };
    }

    public displayLineItems() {
        this.cart.endpointUrl(this.url);
        let self = this;
        let userToken = localStorage.getItem('userToken') || '';
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

        window.lineItems = () => {
            return {
                products: [],
                formatPriceAndCurrency(cents: number, currency: string) {
                    return cents / 100 + ' ' + currency;
                },
                fetch() {
                    self.graphqlService.sendQuery(query, userToken, self.url).then((re) => {
                        try {
                            let itemsInCart = re.data.me.cart.items;
                            let productIds: number[] = self.cart.extractIDsFromItemsInCart(itemsInCart);
                            self.cart.cartProductsDetails(itemsInCart, productIds).then((re: []) => {
                                this.products = re;
                            });
                        } catch (error) {
                            console.log('productsComponent() .then(  try { catch' + error);
                        }
                    });
                },
            };
        };
    }

    public setupCheckoutFactory(url: string) {
        this.endpointUrl(url);
        this.getBasketTotal();
        this.displayLineItems();
        this.checkout();
    }
}
export { Checkout };
