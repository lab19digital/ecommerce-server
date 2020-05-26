import $ = require('jquery');
import { Products } from './products';
import { Cart } from './cart';
import { Checkout } from './checkout';
import { GraphqlService } from './graphqlService';
import { SessionService } from './session';
import 'reflect-metadata';
import { GernzyContainer } from './container/inversify.config';
import { TYPES } from './types/types';
import { GernzyGraphqlService } from './interfaces/graphqlService';
import { StoreProducts } from './interfaces/products';

export default {
    init: function (userConfig = {}) {
        let userToken = localStorage.getItem('userToken');
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
        const productObj = GernzyContainer.get<StoreProducts>(TYPES.StoreProducts);
        // let sessionService = new SessionService(graphQlService);
        // let cart = new Cart(productObj, graphQlService);
        // let checkout = new Checkout(graphQlService, cart);

        // Session setup
        // sessionService.setupUser();
        // sessionService.setUpShopConfig();
        // sessionService.setUpSessionData();
        // sessionService.setUpGeoLocation();

        if (pathname.includes('shop')) {
            productObj.endpointUrl(config.apiUrl);
            productObj.getAllProducts();
        }

        // if (pathname.includes('cart')) {
        //     cart.viewProductsInCart();
        // }

        // if (pathname.includes('checkout')) {
        //     checkout.getBasketTotal();
        //     checkout.displayLineItems();
        //     checkout.checkout();
        // }
    },
};
