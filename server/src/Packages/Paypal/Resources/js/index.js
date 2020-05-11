import { PaypalService } from './paypal';

export default {
    init: function(userConfig = {}) {
        let pathname = window.location.pathname;

        if (pathname.includes('payment-paypal')) {
            let paypalService = new PaypalService();
            let eventData = JSON.parse(localStorage.getItem('event_data'));
            let paypalId = eventData[0].data.transaction_data.paypal_data.result.id;

            if (!paypalId || 0 === paypalId.length) {
                // error paypal id undefined
                // console.log('The paypal ID is not set');
                return;
            }

            paypal
                .Buttons({
                    createOrder: function() {
                        return paypalId;
                    },
                    onApprove: function(data, actions) {
                        return paypalService.onApprove(actions);
                    },
                })
                .render('#paypal-button-container');
        }
    },
};
