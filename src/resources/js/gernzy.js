import { Products } from './products';
import { User } from './user';

// Session object in localStorage if it doesn't already exist
let userObj = new User();
if (!userObj.checkIfTokenInLocalStorage()) {
    userObj.createSession();
}

// Load all products on the home page
let allProducts = new Products();
allProducts.getAllProducts();
