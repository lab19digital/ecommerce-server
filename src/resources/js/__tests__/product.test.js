import { Products } from '../products';
import { GraphqlService } from '../graphqlService';
import product from '../jest_mock_objects/product';
import products from '../jest_mock_objects/products';

// __mocks__/jquery.js
jest.mock('jquery');

// Test single product.
test('9oQi5H query for single product', () => {
    let graphQlService = new GraphqlService();
    let prods = new Products(graphQlService);
    expect.assertions(1);
    return prods.getProduct(1).then(data => {
        expect(data).toBeObject();
    });
});

// Test all products.
test('(dvphY5 query for all products', () => {
    let graphQlService = new GraphqlService();
    let prods = new Products(graphQlService);
    expect.assertions(1);
    return prods.getAllProducts().then(data => {
        expect(data).toBeObject();
    });
});

test('Iu75fv query for all products with DOM', () => {
    // Set up our document body
    document.body.innerHTML = '<div class="products-container"></div>';

    let graphQlService = new GraphqlService();
    let prods = new Products(graphQlService);
    expect.assertions(2);
    return prods.getAllProducts().then(data => {
        expect(data).toBeObject();
        console.log('data' + JSON.stringify(data));

        var productTitle = document.getElementById('product-title-1').textContent;
        expect(productTitle).toEqual('Hello World');
    });
});
