import { StripeService } from './stripe';

export default {
    init: function() {
        let pathname = window.location.pathname;

        if (pathname.includes('payment')) {
            let stripe = new StripeService();
            let eventData = JSON.parse(localStorage.getItem('event_data'));
            let stripeSecretkey = eventData[0].data.stripe_data;

            if (!stripeSecretkey || 0 === stripeSecretkey.length) {
                // error stripe key undefined
            }

            stripe.formLoaded();
            stripe.formSubmitListener(stripeSecretkey);
        }
    },
};
