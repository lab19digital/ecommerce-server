const jQuery = require('jquery/dist/jquery.js');
const { parse } = require('graphql');
import product from '../jest_mock_objects/product';
import products from '../jest_mock_objects/products';

jQuery.ajax = settings => {
    return new Promise((resolve, reject) => {
        let query = JSON.parse(settings.data);
        query = query.query;
        const object = parse(query);
        let name = object.definitions[0].selectionSet.selections[0].name.value;
        process.nextTick(() => {
            if (name == 'product') {
                resolve(product);
            }
            if (name == 'products') {
                resolve(products);
            }
        });
    });
};

export default jQuery;
