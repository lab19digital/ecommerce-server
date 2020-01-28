const jQuery = require('jquery/dist/jquery.js');
const { parse } = require('graphql');

const product = {
    title: 'ea',
    status: 'IN_STOCK',
    published: 1,
    short_description: 'Delectus debitis eligendi',
};

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
        });
    });
};

export default jQuery;
