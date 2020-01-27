// import { Products } from './products';

// __tests__/user-test.js
jest.mock('../jquery');

import * as user from '../user';

// The assertion for a promise must be returned.
it('works with promises', () => {
    expect.assertions(1);
    return user.getUserName(4).then(data => expect(data).toEqual('Mark'));
});
