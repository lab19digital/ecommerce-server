const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
    entry: './src/resources/js/gernzy.js',
    output: {
        filename: 'gernzy.js',
        path: path.resolve(__dirname, './src/resources/js/dist'),
    },
    plugins: [
        new FileManagerPlugin({
            onEnd: {
                copy: [{ source: './src/resources/js/dist/gernzy.js', destination: '../../../public/js' }],
            },
        }),
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        // }),
    ],
};
