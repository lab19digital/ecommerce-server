import { Products } from './products';
import { User } from './user';

// Session object in localStorage
let userObj = new User();
userObj.createSession();

// Load all products on the home page
let allProducts = new Products();
allProducts.getAllProducts();
