import { StripeService } from './stripe';

export default {
    init: function (userConfig: GernzyStripe.StripeConfig) {
        let pathname = window.location.pathname;

        if (pathname.includes('payment-stripe')) {
            let stripe = new StripeService(userConfig.publishable_api_key);
            let eventData = JSON.parse(localStorage.getItem('event_data'));
            let stripeSecretkey = eventData[0].data.stripe_secret;

            if (!stripeSecretkey || 0 === stripeSecretkey.length) {
                // error stripe key undefined
            }

            stripe.formLoaded();
            stripe.formSubmitListener(stripeSecretkey);
        }
    },
};
