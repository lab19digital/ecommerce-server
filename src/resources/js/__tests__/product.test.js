import { Products } from '../products';
import { GraphqlService } from '../graphqlService';

// __mocks__/jquery.js
jest.mock('jquery');

// The assertion for a promise must be returned.
it('works with promises', () => {
    let graphQlService = new GraphqlService();
    let prods = new Products(graphQlService);
    expect.assertions(1);
    return prods.getProduct(1).then(data => {
        expect(data).toEqual('Some value');
    });
});
