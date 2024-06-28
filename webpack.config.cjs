const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    target: 'web',
    entry: {
        main: ['webpack-hot-moddleware/?reload=true&timout=2000', './src/App.jsx']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bunble.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new webpack.EnvironmentPlugin([
            'NODE_ENV',
            'SERVER_HOST',
            'SERVER_PORT'
        ]),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /.\(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            ['@babel/preset-react', { 'runtime': 'automatic' }]
                        ]
                    }
                }
            }
        ]
    },
    resulve: {
        extensions: ['.js', '.jsx']
    }
};