import { Products } from '../products';
import { GraphqlService } from '../graphqlService';

// __mocks__/jquery.js
jest.mock('jquery');

// Test single product.
test('query for single product', () => {
    let graphQlService = new GraphqlService();
    let prods = new Products(graphQlService);
    expect.assertions(1);
    return prods.getProduct(1).then(data => {
        expect(data).toEqual({
            title: 'ea',
            status: 'IN_STOCK',
            published: 1,
            short_description: 'Delectus debitis eligendi',
        });
    });
});

// Test all products.
test('query for all products', () => {
    let graphQlService = new GraphqlService();
    let prods = new Products(graphQlService);
    expect.assertions(1);
    return prods.getAllProducts().then(data => {
        expect(data).toEqual({
            title: 'ea',
            status: 'IN_STOCK',
            published: 1,
            short_description: 'Delectus debitis eligendi',
        });
    });
});
