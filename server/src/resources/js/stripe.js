class Stripe {
    constructor(graphqlService) {
        this.graphqlService = graphqlService;
        this.stripe = Stripe('pk_test_U2JalAfKOyR5DHS7R4KFeJLh00AdOsjkgo');
        this.elements = this.stripe.elements();
    }

    createSession() {
        let query = `mutation {
            createSession {
                token
            }
        }`;

        return this.graphqlService
            .sendQuery(query)
            .then(re => {
                return re;
            })
            .catch(error => {
                console.log(error);
            });
    }

    formLoaded() {
        // Set up Stripe.js and Elements to use in checkout form
        var style = {
            base: {
                color: '#32325d',
            },
        };

        var card = this.elements.create('card', { style: style });
        card.mount('#card-element');

        card.addEventListener('change', ({ error }) => {
            const displayError = document.getElementById('card-errors');
            if (error) {
                displayError.textContent = error.message;
            } else {
                displayError.textContent = '';
            }
        });
    }

    formSubmitListener() {
        var form = document.getElementById('payment-form');

        form.addEventListener('submit', function(ev) {
            ev.preventDefault();
            stripe
                .confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: card,
                        billing_details: {
                            name: 'Jenny Rosen',
                        },
                    },
                })
                .then(function(result) {
                    if (result.error) {
                        // Show error to your customer (e.g., insufficient funds)
                        console.log(result.error.message);
                    } else {
                        // The payment has been processed!
                        if (result.paymentIntent.status === 'succeeded') {
                            // Show a success message to your customer
                            // There's a risk of the customer closing the window before callback
                            // execution. Set up a webhook or plugin to listen for the
                            // payment_intent.succeeded event that handles any business critical
                            // post-payment actions.
                        }
                    }
                });
        });
    }
}
export { Stripe };
