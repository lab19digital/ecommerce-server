const jQuery = require('jquery/dist/jquery.js');

// const products = {
//     title: 'ea',
//     status: 'IN_STOCK',
//     published: 1,
//     short_description: 'Delectus debitis eligendi',
// };

jQuery.ajax = settings => {
    return new Promise((resolve, reject) => {
        process.nextTick(() => resolve('Some value'));
    });
};

export default jQuery;
