/**
 * Created by chengyong.lin on 18/1/7.
 */

const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const env = process.env.NODE_ENV;

module.exports = {
    entry: {
        app: path.join(__dirname, '../src/client/app.js')
    },
    output: {
        filename: '[name]@[hash].js',
        path: path.join(__dirname, '../dist')
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules:[
            {
                test: /\.jsx$/,
                use: 'babel-loader',
                include: path.join(__dirname, '../src')
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: [
                    path.join(__dirname, '../node_modules')
                ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            title: 'a spa base on react',
            template: path.join(__dirname, '../index.html')
        })
    ]
};
