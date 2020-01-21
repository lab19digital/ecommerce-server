import { Products } from './products';
import { User } from './user';
import { Cart } from './cart';
import { Checkout } from './checkout';
import { GraphqlService } from './graphqlService';

// jQuery ajax spinner
var $loading = $('#loadingDiv').hide();
$(document)
    .ajaxStart(function() {
        $loading.show();
    })
    .ajaxStop(function() {
        $loading.hide();
    });

// Session object in localStorage if it doesn't already exist
let userObj = new User();
if (!userObj.checkIfTokenInLocalStorage()) {
    userObj.createSession();
}

var pathname = window.location.pathname; // Returns path only (/path/example.html)

// Load all products on the home page
let productObj = new Products(new GraphqlService());
if (pathname.includes('shop')) {
    productObj.getAllProducts();
}

// Load all products on the cart page
let cart = new Cart(productObj);
if (pathname.includes('cart')) {
    cart.viewProductsInCart();
}

// Load all products on the cart page
let checkout = new Checkout();
if (pathname.includes('checkout')) {
    checkout.checkout();
}
