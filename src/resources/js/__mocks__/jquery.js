const jQuery = require('jquery/dist/jquery.js');

const product = {
    title: 'ea',
    status: 'IN_STOCK',
    published: 1,
    short_description: 'Delectus debitis eligendi',
};

jQuery.ajax = settings => {
    return new Promise((resolve, reject) => {
        process.nextTick(() => resolve(product));
    });
};

export default jQuery;
