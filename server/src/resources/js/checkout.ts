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
    @inject(TYPES.GernzyGraphqlService) private graphqlService: GernzyGraphqlService;
    @inject(TYPES.GernzyCart) private cart: GernzyCart;
    private url: string;

    public endpointUrl(url: string) {
        this.url = url;
    }

    public populatePaymentProviders() {
        var userToken = localStorage.getItem('userToken');

        let query = `
            query {
                shopConfig {
                    payment_providers
                }
            }
        `;

        return this.graphqlService.sendQuery(query, userToken, this.url).then((re) => {
            let paymentProviders = JSON.parse(re.data.shopConfig.payment_providers);

            // If no payment providers where specified, error out
            if (paymentProviders.length == 0) {
                $('#checkout-form').html(errorTemplate('No payment option has been configure in the backend.'));
                return re;
            }

            paymentProviders.forEach((element) => {
                $('#checkout_payment_method').append(
                    `<option value="${element.ui_value}">${element.ui_option}</option>`,
                );
            });

            return re;
        });
    }

    public checkout() {
        // This is to keep the object context of and access it's methods
        var self = this;
        $('#checkout-form').submit(function (event) {
            event.preventDefault();

            // get all the inputs into an array.
            var inputs = $('#checkout-form :input');

            // get an associative array of just the values.
            var values = {};
            inputs.each((i, ele) => {
                values[$(ele).attr('name')] = $(ele).val();
            });

            // Checkbox values
            values['use_shipping_for_billing'] = $('#use_shipping_for_billing').prop('checked');
            values['agree_to_terms'] = $('#agree_to_terms').prop('checked');

            self.sendOfCheckoutInfo(values);
        });
    }

    public sendOfCheckoutInfo(values) {
        var userToken = localStorage.getItem('userToken');
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
            .then((re) => {
                if (re.errors) {
                    let errors = re.errors;
                    let debugMessage = re.errors[0].debugMessage;
                    // console.log(errors);
                } else {
                    $('.checkout-container').html(successTemplate('Your details have been submitted.'));
                }

                // Now try and do the next step
                try {
                    let eventData = JSON.parse(re.data.checkout.event_data);
                    let redirectUrl = eventData[0].data.redirect_url;

                    localStorage.setItem('event_data', JSON.stringify(eventData));
                    window.location.replace(redirectUrl);
                } catch (error) {
                    // console.log(error);
                }

                return re;
            })
            .catch((error) => {
                // console.log(error);
            });
    }

    public getBasketTotal() {
        var userToken = localStorage.getItem('userToken');

        let query = `{
            me {
                cart {
                    cart_total
                }
            }
        }`;

        return this.graphqlService
            .sendQuery(query, userToken, this.url)
            .then((re) => {
                let currency = localStorage.getItem('currency');

                // get the default currency from the shopConfig
                if (!currency) {
                    currency = localStorage.getItem('default_currency');
                }

                $('#checkout-cart-total').html(`${re.data.me.cart.cart_total / 100} ${currency}`);
                return re;
            })
            .catch((error) => {
                // console.log(error);
            });
    }

    public displayLineItems() {
        this.cart.endpointUrl(this.url);

        return this.cart.viewProductsInCart().then((re) => {
            try {
                // See if there is an error
                let error = re.errors[0].debugMessage;
                // console.log(error);
            } catch {
                let items = re.data.me.cart.items;

                if (items && items.length > 0) {
                    this.cart.lookupProductsInCart(items).then((re) => {
                        let currency = localStorage.getItem('currency');

                        // get the default currency from the shopConfig
                        if (!currency) {
                            currency = localStorage.getItem('default_currency');
                        }

                        re.forEach((element) => {
                            $('#table-body-line-item').append(
                                $(`<tr>
                                    <td>${element.title}</td>
                                    <td>${element.quantity}</td>
                                    <td>${element.price_cents / 100} ${currency}</td>
                                </tr>`),
                            );
                        });
                    });
                } else {
                    $('.checkout-container').html(errorTemplate('No products in cart.'));
                }
            }

            return re;
        });
    }
}
export { Checkout };
