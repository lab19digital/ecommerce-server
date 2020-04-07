import successTemplate from './templates/successTemplate';
import errorTemplate from './templates/errorTemplate';
import $ from 'jquery';
class StripeService {
    constructor(graphqlService) {
        this.graphqlService = graphqlService;
        this.stripe = Stripe('pk_test_U2JalAfKOyR5DHS7R4KFeJLh00AdOsjkgo');
        this.elements = this.stripe.elements();
        this.card = '';
    }

    formLoaded() {
        // Set up Stripe.js and Elements to use in checkout form
        var style = {
            base: {
                color: '#32325d',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
            },
        };

        var card = this.elements.create('card', { style: style });
        card.mount('#card-element');
        this.card = card;

        card.addEventListener('change', ({ error }) => {
            const displayError = document.getElementById('card-errors');
            if (error) {
                displayError.textContent = error.message;
            } else {
                displayError.textContent = '';
            }
        });
    }

    formSubmitListener(clientSecret) {
        var form = document.getElementById('payment-form');
        var self = this;

        form.addEventListener('submit', function(ev) {
            ev.preventDefault();

            self.stripe
                .confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: self.card,
                        billing_details: {
                            name: 'Bob Rosen',
                        },
                    },
                })
                .then(function(result) {
                    if (result.error) {
                        // Show error to your customer (e.g., insufficient funds)
                        $('#stripeFormTemplate').append(errorTemplate(result.error.message));

                        console.log(result.error.message);
                    } else {
                        // The payment has been processed!
                        if (result.paymentIntent.status === 'succeeded') {
                            // Show a success message to your customer
                            // There's a risk of the customer closing the window before callback
                            // execution. Set up a webhook or plugin to listen for the
                            // payment_intent.succeeded event that handles any business critical
                            // post-payment actions.
                            $('.checkout-container').html(successTemplate('Payment successful.'));
                        }
                    }
                });
        });
    }
}
export { StripeService };
