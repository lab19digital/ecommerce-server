import $ = require('jquery');
import 'reflect-metadata';
import { GernzyContainer } from './container/inversify.config';
import { TYPES } from './types/types';
import { StoreProducts } from './interfaces/products';
import { GernzySession } from './interfaces/session';
import { GernzyCart } from './interfaces/cart';
import { GernzyCheckout } from './interfaces/checkout';

export default {
    init: function (userConfig: Gernzy.GernzyConfig) {
        let config = {
            ...{
                apiUrl: 'http://laravel-gernzy.test/graphql',
            },
            ...userConfig,
        };

        // jQuery ajax spinner
        var $loading = $('#loadingDiv').hide();
        $(document)
            .ajaxStart(function () {
                $loading.show();
            })
            .ajaxStop(function () {
                $loading.hide();
            });

        let pathname: string = window.location.pathname;

        // New up instances for use
        const productObj = GernzyContainer.get<StoreProducts>(TYPES.StoreProducts);
        const sessionService = GernzyContainer.get<GernzySession>(TYPES.GernzySession);
        const cart = GernzyContainer.get<GernzyCart>(TYPES.GernzyCart);
        const checkout = GernzyContainer.get<GernzyCheckout>(TYPES.GernzyCheckout);

        // Session setup
        sessionService.endpointUrl(config.apiUrl);
        sessionService.setupUser();
        sessionService.setUpShopConfig();
        sessionService.setUpSessionData();
        // sessionService.setUpGeoLocation();

        // Switch on page url
        if (pathname.includes('shop')) {
            productObj.endpointUrl(config.apiUrl);
            productObj.getAllProducts();
        }

        if (pathname.includes('cart')) {
            cart.endpointUrl(config.apiUrl);
            cart.viewProductsInCart();
        }

        if (pathname.includes('checkout')) {
            checkout.endpointUrl(config.apiUrl);
            checkout.getBasketTotal();
            checkout.displayLineItems();
            checkout.populatePaymentProviders();
            checkout.checkout();
        }
    },
};
