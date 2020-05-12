import { PaypalService } from './paypal';

export default {
    init: function(userConfig = {}) {
        let pathname = window.location.pathname;

        if (pathname.includes('payment-paypal')) {
            /** Setup sdk url*/
            let currency = localStorage.getItem('currency');
            // get the default currency from the shopConfig
            if (!currency) {
                currency = localStorage.getItem('default_currency');
            }
            let url = `https://www.paypal.com/sdk/js?client-id=AaPIMFArYm6R5VZgKCqAeh9bTTf1g3JA8zeiWz62xPa1niqDcHk4dQVWjJLz_R3RVPraZEnT1uossdfE&currency=${currency}`;

            let paypalService = new PaypalService();
            let eventData = JSON.parse(localStorage.getItem('event_data'));
            let pyapalOrderID = eventData[0].data.transaction_data.paypal_data.result.id;
            if (!pyapalOrderID || 0 === pyapalOrderID.length) {
                // error paypal id undefined
                // console.log('The paypal ID is not set');
                return;
            }

            paypalService.loadScript(url, function() {
                paypal_sdk
                    .Buttons({
                        createOrder: function() {
                            return pyapalOrderID;
                        },
                        onApprove: function(data, actions) {
                            return paypalService.onApprove(actions);
                        },
                    })
                    .render('#paypal-button-container');
            });
        }
    },
};
