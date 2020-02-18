import { Products } from './products';
import { Cart } from './cart';
import { Checkout } from './checkout';
import { GraphqlService } from './graphqlService';
import { SessionService } from './session';

// jQuery ajax spinner
var $loading = $('#loadingDiv').hide();
$(document)
    .ajaxStart(function() {
        $loading.show();
    })
    .ajaxStop(function() {
        $loading.hide();
    });

let pathname = window.location.pathname;
let graphQlService = new GraphqlService();

let sessionService = new SessionService(graphQlService);
sessionService.setupUser();
// sessionService.setGeoLocation();
// sessionService.setCurrency();
sessionService.getSessionData();

// Load all products on the home page
let productObj = new Products(graphQlService);
if (pathname.includes('shop')) {
    productObj.getAllProducts();
}

// Load all products on the cart page
let cart = new Cart(productObj, graphQlService);
if (pathname.includes('cart')) {
    cart.viewProductsInCart();
}

// Load all products on the cart page
let checkout = new Checkout(graphQlService);
if (pathname.includes('checkout')) {
    checkout.getBasketTotal();
    checkout.checkout();
}
