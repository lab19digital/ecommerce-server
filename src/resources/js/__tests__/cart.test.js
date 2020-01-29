import { Products } from '../products';
import { GraphqlService } from '../graphqlService';
import { Cart } from '../cart';
import cartProducts from '../jest_mock_objects/cartProducts';

// __mocks__/jquery.js
jest.mock('jquery');

test('query for all products with DOM in cart', () => {
    // Set up our document body
    document.body.innerHTML = '<div class="cart-products"></div>';

    let graphQlService = new GraphqlService();
    let prods = new Products(graphQlService);
    let cart = new Cart(prods, graphQlService);

    expect.assertions(1);
    return cart.viewProductsInCart().then(data => {
        expect(data).toEqual(cartProducts);
    });
});

test('DOM in cart ui', () => {
    // Set up our document body
    document.body.innerHTML = '<div class="cart-products"></div>';

    let graphQlService = new GraphqlService();
    let prods = new Products(graphQlService);
    let cart = new Cart(prods, graphQlService);

    cart.populateUIWithProducts([
        {
            data: {
                product: {
                    id: 1,
                    title: 'shoes',
                    status: 'IN_STOCK',
                    published: 1,
                    short_description: 'Et autem libero ducimus dolorem explicabo ratione.',
                },
                product_id: 1,
                quantity: 1,
            },
        },
    ]);

    var productTitle = document.getElementById('product-title-1').textContent;
    expect(productTitle).toEqual('shoes');
});
