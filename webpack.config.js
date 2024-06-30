require('dotenv').config();

const path = require('path');
const webpack = require('webpack');

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    entry: './src/main.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new Dotenv(),
        new NodePolyfillPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                PORT: JSON.stringify(process.env.PORT)
            }
        }),
    ]
};