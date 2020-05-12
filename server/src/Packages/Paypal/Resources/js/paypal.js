import $ from 'jquery';
import successTemplate from './templates/successTemplate';
import errorTemplate from './templates/errorTemplate';

class PaypalService {
    constructor() {}

    creatOrder(userToken) {
        const data = { userToken: userToken };
        return fetch('/create-paypal-transaction', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(function(res) {
                return res.json();
            })
            .then(function(data) {
                console.log(data.result.id);
                return data.result.id; // Use the same key name for order ID on the client and server
            });
    }

    onApprove(actions) {
        // This function captures the funds from the transaction.
        return actions.order.capture().then(function(details) {
            // This function shows a transaction success message to your buyer.
            // alert('Transaction completed by ' + details.payer.name.given_name);
            $('#paypal-button-container').html(successTemplate('Payment successful ' + details.payer.name.given_name));
        });
    }

    loadScript(url, callback) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.setAttribute('data-namespace', 'paypal_sdk');

        if (script.readyState) {
            //IE
            script.onreadystatechange = function() {
                if (script.readyState == 'loaded' || script.readyState == 'complete') {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            //Others
            script.onload = function() {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }
}
export { PaypalService };
