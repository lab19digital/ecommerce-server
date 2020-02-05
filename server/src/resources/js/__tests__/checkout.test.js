import { checkout } from '../checkout';
import { GraphqlService } from '../graphqlService';

// __mocks__/jquery.js
jest.mock('jquery');

test('MJfc34Icn query for all products in cart', () => {
    // Set up our document body
    document.body.innerHTML = '<div class="cart-products"></div>';

    let graphQlService = new GraphqlService();
    let checkout = new Checkout(graphQlService);
    if (pathname.includes('checkout')) {
        checkout.checkout();
    }
    expect.assertions(2);
    return cart.viewProductsInCart().then(data => {
        expect(data).toBeObject();
        expect(data.data.me.cart.items[0]).toContainAllKeys(['product_id', 'quantity']);
    });
});
