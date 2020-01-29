import { Products } from '../products';
import { GraphqlService } from '../graphqlService';
import product from '../jest_mock_objects/product';
import products from '../jest_mock_objects/products';

// __mocks__/jquery.js
jest.mock('jquery');

// Test single product.
test('query for single product', () => {
    let graphQlService = new GraphqlService();
    let prods = new Products(graphQlService);
    expect.assertions(1);
    return prods.getProduct(1).then(data => {
        expect(data).toEqual(product);
    });
});

// Test all products.
test('query for all products', () => {
    let graphQlService = new GraphqlService();
    let prods = new Products(graphQlService);
    expect.assertions(1);
    return prods.getAllProducts().then(data => {
        console.log(`the data: ${data.data.products.data}`);
        expect(data).toEqual(products);
    });
});
