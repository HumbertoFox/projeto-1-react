import dotenv from 'dotenv';
import path from 'path';
import webpack from 'webpack';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import Dotenv from 'dotenv-webpack';

dotenv.config();

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
        })
    ]
};