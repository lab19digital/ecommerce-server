import $ from 'jquery';
import successTemplate from './templates/successTemplate';
import errorTemplate from './templates/errorTemplate';

class PaypalService {
    constructor() {}

    public onApprove(data: { orderID: number }, actions: {}) {
        var $loading = $('#loadingDiv').hide();
        $loading.show();
        return fetch('/create-paypal-transaction', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                orderID: data.orderID,
            }),
        })
            .then(function (res) {
                try {
                    return res.json();
                } catch (error) {
                    console.log(`error: ${error}`);
                    console.log('error text:' + res.text());
                }
            })
            .then(function (dataRes) {
                if (dataRes.error) {
                    console.log(dataRes.error);
                    return;
                }

                $loading.hide();
                $('#paypal-button-container').html(successTemplate('Payment successful'));
            })
            .catch((error) => {
                console.log(`.catch ${error}`);
            });
    }

    public loadScript(url: string, callback: any) {
        var script: any = document.createElement('script');
        script.type = 'text/javascript';
        script.setAttribute('data-namespace', 'paypal_sdk');

        if (script.readyState) {
            //IE
            script.onreadystatechange = function () {
                if (script.readyState == 'loaded' || script.readyState == 'complete') {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            //Others
            script.onload = function () {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }
}
export { PaypalService };
