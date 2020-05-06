// import { PaypalService } from './paypal';

export default {
    init: function(userConfig = {}) {
        let pathname = window.location.pathname;

        if (pathname.includes('payment-paypal')) {
            // let paypal = new PaypalService(userConfig.publishable_api_key);
            // let eventData = JSON.parse(localStorage.getItem('event_data'));
            // let paypalSecretkey = eventData[0].data.paypal_secret;
            // if (!paypalSecretkey || 0 === paypalSecretkey.length) {
            //     // error paypal key undefined
            // }
            // paypal.formLoaded();
            // paypal.formSubmitListener(paypalSecretkey);
            console.log('Hello from payapal');
        }
    },
};
