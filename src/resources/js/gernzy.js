import { Products } from './products';
import { User } from './user';
import { Cart } from './cart';

// Session object in localStorage if it doesn't already exist
let userObj = new User();
if (!userObj.checkIfTokenInLocalStorage()) {
    userObj.createSession();
}

var pathname = window.location.pathname; // Returns path only (/path/example.html)

// Load all products on the home page
if (pathname.includes('shop')) {
    let allProducts = new Products();
    allProducts.getAllProducts();
}

// Load all products on the cart page
if (pathname.includes('cart')) {
    let cart = new Cart();
    cart.viewProductsInCart();
}
